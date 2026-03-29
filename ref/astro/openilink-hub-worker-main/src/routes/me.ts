import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { createDb } from '../db';
import { users, oauthAccounts } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { hashPassword, verifyPassword } from '../lib/crypto';
import { safeUser } from '../lib/utils';
import * as settings from '../lib/settings';
import type { AppEnv } from '../types';

export const meRoutes = new Hono<AppEnv>();

meRoutes.use('*', authMiddleware);

meRoutes.get('/', async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length === 0) return c.json({ error: 'user not found' }, 404);
  return c.json(safeUser(user[0]));
});

meRoutes.put('/profile', async (c) => {
  const userId = c.get('userId');
  const { display_name, email } = await c.req.json();
  const db = createDb(c.env.DB);
  await db.update(users).set({ displayName: display_name, email, updatedAt: new Date() }).where(eq(users.id, userId));
  return c.json({ ok: true });
});

meRoutes.put('/password', async (c) => {
  const userId = c.get('userId');
  const { old_password, new_password } = await c.req.json();
  if (!new_password || new_password.length < 8) return c.json({ error: 'password must be at least 8 characters' }, 400);

  const db = createDb(c.env.DB);
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length === 0) return c.json({ error: 'user not found' }, 404);

  if (user[0].passwordHash && !(await verifyPassword(old_password, user[0].passwordHash))) {
    return c.json({ error: 'old password incorrect' }, 401);
  }

  const passwordHash = await hashPassword(new_password);
  await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, userId));
  return c.json({ ok: true });
});

meRoutes.get('/linked-accounts', async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);
  const accounts = await db.select().from(oauthAccounts).where(eq(oauthAccounts.userId, userId));
  return c.json(accounts);
});

meRoutes.delete('/linked-accounts/:provider', async (c) => {
  const userId = c.get('userId');
  const provider = c.req.param('provider')!;
  const db = createDb(c.env.DB);
  await db.delete(oauthAccounts).where(
    and(eq(oauthAccounts.userId, userId), eq(oauthAccounts.provider, provider))
  );
  return c.json({ ok: true });
});

const providerDefs: Record<string, { authUrl: string; tokenUrl: string; scopes: string }> = {
  github: {
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    scopes: 'read:user user:email'
  },
  linuxdo: {
    authUrl: 'https://connect.linux.do/oauth2/authorize',
    tokenUrl: 'https://connect.linux.do/oauth2/token',
    scopes: ''
  }
};

meRoutes.get('/linked-accounts/:provider/bind', async (c) => {
  const name = c.req.param('provider')!;
  const def = providerDefs[name];
  if (!def) return c.json({ error: 'unknown provider' }, 400);

  const userId = c.get('userId');
  const db = createDb(c.env.DB);
  const clientId = await settings.get(db, `oauth.${name}.client_id`);
  if (!clientId) return c.json({ error: 'provider not configured' }, 400);

  const origin = c.env.SITE_ORIGIN || new URL(c.req.url).origin;
  const state = `bind:${userId}:${crypto.randomUUID()}`;

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
