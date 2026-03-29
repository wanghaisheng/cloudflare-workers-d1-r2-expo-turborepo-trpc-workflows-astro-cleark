import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import type {
  RegistrationResponseJSON,
  AuthenticationResponseJSON,
} from '@simplewebauthn/server';
import { authMiddleware } from '../middleware/auth';
import { createDb } from '../db';
import { users, credentials } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import * as settings from '../lib/settings';
import type { AppEnv } from '../types';

export const passkeyRoutes = new Hono<AppEnv>();

const COOKIE_MAX_AGE = 604800;

function getRpInfo(c: any) {
  const origin = c.env.SITE_ORIGIN || new URL(c.req.url).origin;
  const rpID = new URL(origin).hostname;
  return { rpName: 'OpenILink Hub', rpID, origin };
}

// ─── Registration (requires auth) ──────────────────────────

passkeyRoutes.post('/register/begin', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);
  const { rpName, rpID } = getRpInfo(c);

  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length === 0) return c.json({ error: 'user not found' }, 404);

  const existingCreds = await db.select().from(credentials).where(eq(credentials.userId, userId));
  const excludeCredentials = existingCreds.map(cred => ({
    id: cred.id,
    transports: JSON.parse(cred.transport || '[]'),
  }));

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userName: user[0].username,
    userID: new TextEncoder().encode(userId) as Uint8Array<ArrayBuffer>,
    excludeCredentials,
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
    },
  });

  // Store challenge for verification
  await settings.set(db, `passkey_challenge.${userId}`, JSON.stringify({
    challenge: options.challenge,
    timestamp: Date.now(),
  }));

  return c.json(options);
});

passkeyRoutes.post('/register/finish', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);
  const { rpID, origin } = getRpInfo(c);

  const challengeRaw = await settings.get(db, `passkey_challenge.${userId}`);
  if (!challengeRaw) return c.json({ error: 'no challenge found' }, 400);
  const { challenge, timestamp } = JSON.parse(challengeRaw);

  // 5 min TTL
  if (Date.now() - timestamp > 300_000) {
    await settings.del(db, `passkey_challenge.${userId}`);
    return c.json({ error: 'challenge expired' }, 400);
  }

  const body = await c.req.json() as RegistrationResponseJSON;

  let verification;
  try {
    verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });
  } catch (err: any) {
    return c.json({ error: err.message }, 400);
  }

  if (!verification.verified || !verification.registrationInfo) {
    return c.json({ error: 'verification failed' }, 400);
  }

  const { credential } = verification.registrationInfo;

  await db.insert(credentials).values({
    id: credential.id,
    userId,
    publicKey: Buffer.from(credential.publicKey).toString('base64'),
    attestationType: verification.registrationInfo.credentialDeviceType || '',
    transport: JSON.stringify(credential.transports ?? []),
    signCount: credential.counter,
  });

  await settings.del(db, `passkey_challenge.${userId}`);
  return c.json({ ok: true });
});

// ─── Login (public) ─────────────────────────────────────────

passkeyRoutes.post('/login/begin', async (c) => {
  const db = createDb(c.env.DB);
  const { rpID } = getRpInfo(c);

  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: 'preferred',
  });

  // Store challenge keyed by challenge value (no user yet)
  await settings.set(db, `passkey_login.${options.challenge}`, JSON.stringify({
    challenge: options.challenge,
    timestamp: Date.now(),
  }));

  return c.json(options);
});

passkeyRoutes.post('/login/finish', async (c) => {
  const db = createDb(c.env.DB);
  const { rpID, origin } = getRpInfo(c);

  const body = await c.req.json() as AuthenticationResponseJSON;
  const credId = body.id;

  // Find credential
  const cred = await db.select().from(credentials).where(eq(credentials.id, credId)).limit(1);
  if (cred.length === 0) return c.json({ error: 'credential not found' }, 400);

  // Find challenge (try stored by challenge value)
  // The challenge is in the clientDataJSON, but we need to find it from our store
  // We'll iterate recent challenges — or use a different strategy
  // For simplicity, pass the challenge in the request body
  const challengeKey = c.req.query('challenge') || '';
  const challengeRaw = await settings.get(db, `passkey_login.${challengeKey}`);
  if (!challengeRaw) return c.json({ error: 'no challenge found' }, 400);
  const { challenge, timestamp } = JSON.parse(challengeRaw);

  if (Date.now() - timestamp > 300_000) {
    await settings.del(db, `passkey_login.${challengeKey}`);
    return c.json({ error: 'challenge expired' }, 400);
  }

  const publicKeyBytes = Buffer.from(cred[0].publicKey, 'base64');

  let verification;
  try {
    verification = await verifyAuthenticationResponse({
      response: body,
      expectedChallenge: challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: cred[0].id,
        publicKey: new Uint8Array(publicKeyBytes),
        counter: cred[0].signCount ?? 0,
        transports: JSON.parse(cred[0].transport || '[]'),
      },
    });
  } catch (err: any) {
    return c.json({ error: err.message }, 400);
  }

  if (!verification.verified) return c.json({ error: 'verification failed' }, 400);

  // Update sign count
  await db.update(credentials).set({
    signCount: verification.authenticationInfo.newCounter,
  }).where(eq(credentials.id, credId));

  await settings.del(db, `passkey_login.${challengeKey}`);

  // Check user status
  const user = await db.select().from(users).where(eq(users.id, cred[0].userId)).limit(1);
  if (user.length === 0) return c.json({ error: 'user not found' }, 404);
  if (user[0].status !== 'active') return c.json({ error: 'account disabled' }, 403);

  // Issue session
  const secret = c.env.SESSION_SECRET;
  if (!secret) return c.json({ error: 'SESSION_SECRET not configured' }, 500);
  const token = await sign({ id: cred[0].userId, exp: Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE }, secret, 'HS256');
  c.header('Set-Cookie', `session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`);
  return c.json({ ok: true, user: { id: user[0].id, username: user[0].username, role: user[0].role } });
});
