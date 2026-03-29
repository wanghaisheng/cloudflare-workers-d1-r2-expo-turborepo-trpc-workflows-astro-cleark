import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { createDb } from '../db';
import * as settings from '../lib/settings';
import { authMiddleware } from '../middleware/auth';
import { users, oauthAccounts } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import type { AppEnv } from '../types';

export const oauthRoutes = new Hono<AppEnv>();

const COOKIE_MAX_AGE = 604800;

const providerDefs: Record<string, { authUrl: string; tokenUrl: string; userUrl: string; scopes: string }> = {
  github: {
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userUrl: 'https://api.github.com/user',
    scopes: 'read:user user:email'
  },
  linuxdo: {
    authUrl: 'https://connect.linux.do/oauth2/authorize',
    tokenUrl: 'https://connect.linux.do/oauth2/token',
    userUrl: 'https://connect.linux.do/api/user',
    scopes: ''
  }
};

oauthRoutes.get('/providers', async (c) => {
  const db = createDb(c.env.DB);
  const enabled: string[] = [];
  for (const name of Object.keys(providerDefs)) {
    const clientId = await settings.get(db, `oauth.${name}.client_id`);
    if (clientId) enabled.push(name);
  }
  return c.json({ providers: enabled });
});

oauthRoutes.get('/:provider', async (c) => {
  const name = c.req.param('provider');
  const def = providerDefs[name];
  if (!def) return c.json({ error: 'unknown provider' }, 400);

  const db = createDb(c.env.DB);
  const clientId = await settings.get(db, `oauth.${name}.client_id`);
  if (!clientId) return c.json({ error: 'provider not configured' }, 400);

  const origin = c.env.SITE_ORIGIN || new URL(c.req.url).origin;
  const state = crypto.randomUUID();

  // Store state for validation
  await settings.set(db, `oauth_state.${state}`, Date.now().toString());

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${origin}/api/auth/oauth/${name}/callback`,
    state,
    response_type: 'code'
  });
  if (def.scopes) params.set('scope', def.scopes);
  return c.redirect(`${def.authUrl}?${params}`);
});

oauthRoutes.get('/:provider/callback', async (c) => {
  const name = c.req.param('provider');
  const def = providerDefs[name];
  if (!def) return c.json({ error: 'unknown provider' }, 400);

  const code = c.req.query('code');
  const state = c.req.query('state');
  if (!code) return c.json({ error: 'no code' }, 400);

  const db = createDb(c.env.DB);

  // Validate state
  if (!state) return c.json({ error: 'missing state' }, 400);
  const storedState = await settings.get(db, `oauth_state.${state}`);
  if (!storedState) return c.json({ error: 'invalid state' }, 400);
  await settings.del(db, `oauth_state.${state}`);

  // Check state age (10 min TTL)
  if (Date.now() - Number(storedState) > 600000) {
    return c.json({ error: 'state expired' }, 400);
  }

  const clientId = await settings.get(db, `oauth.${name}.client_id`);
  const clientSecret = await settings.get(db, `oauth.${name}.client_secret`);
  const secret = c.env.SESSION_SECRET;
  if (!secret) return c.json({ error: 'SESSION_SECRET not configured' }, 500);

  const origin = c.env.SITE_ORIGIN || new URL(c.req.url).origin;

  const tokenRes = await fetch(def.tokenUrl, {
    method: 'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId!, client_secret: clientSecret!, code,
      grant_type: 'authorization_code',
      redirect_uri: `${origin}/api/auth/oauth/${name}/callback`
    })
  });
  const tokenData = await tokenRes.json() as any;
  if (!tokenData.access_token) return c.json({ error: 'oauth token exchange failed' }, 400);

  const userRes = await fetch(def.userUrl, {
    headers: { 'Authorization': `Bearer ${tokenData.access_token}`, 'User-Agent': 'OpenILink-Hub' }
  });
  const userData = await userRes.json() as any;

  const providerId = userData.id.toString();

  // Check if this is a bind flow (state starts with "bind:")
  const isBind = state!.startsWith('bind:');
  if (isBind) {
    const bindUserId = state!.split(':')[1];
    // Link OAuth to existing user
    const existing = await db.select().from(oauthAccounts).where(
      and(eq(oauthAccounts.provider, name), eq(oauthAccounts.providerId, providerId))
    ).limit(1);

    if (existing.length > 0) {
      // Already linked to someone
      if (existing[0].userId !== bindUserId) {
        return c.redirect('/?error=oauth_already_linked');
      }
    } else {
      const login = userData.username || userData.login;
      await db.insert(oauthAccounts).values({
        provider: name, providerId, userId: bindUserId,
        username: login, avatarUrl: userData.avatar_url || ''
      });
    }
    return c.redirect('/');
  }

  // Normal login/register flow
  const existing = await db.select().from(oauthAccounts).where(
    and(eq(oauthAccounts.provider, name), eq(oauthAccounts.providerId, providerId))
  ).limit(1);

  let userId: string;
  if (existing.length > 0) {
    userId = existing[0].userId;
  } else {
    userId = crypto.randomUUID();
    const login = userData.username || userData.login;
    await db.insert(users).values({
      id: userId,
      username: `${name}_${login}`,
      displayName: userData.name || login
    });
    await db.insert(oauthAccounts).values({
      provider: name, providerId, userId,
      username: login, avatarUrl: userData.avatar_url || ''
    });
  }

  const token = await sign({ id: userId, exp: Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE }, secret, 'HS256');
  c.header('Set-Cookie', `session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`);
  return c.redirect('/');
});
