import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { createDb } from '../db';
import { hashPassword, verifyPassword } from '../lib/crypto';
import { safeUser } from '../lib/utils';
import { users } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import type { AppEnv } from '../types';

export const authRoutes = new Hono<AppEnv>();

const COOKIE_MAX_AGE = 604800; // 7 days

async function issueSession(c: any, userId: string) {
  const secret = c.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET not configured');
  const token = await sign({ id: userId, exp: Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE }, secret, 'HS256');
  c.header('Set-Cookie', `session=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`);
}

authRoutes.post('/register', async (c) => {
  const { username, password, email, display_name } = await c.req.json();
  if (!username || !password) return c.json({ error: 'username and password required' }, 400);
  if (password.length < 8) return c.json({ error: 'password must be at least 8 characters' }, 400);

  const db = createDb(c.env.DB);
  const existing = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (existing.length > 0) return c.json({ error: 'username already taken' }, 409);

  const allUsers = await db.select({ count: sql`count(*)` }).from(users);
  const isFirstUser = Number(allUsers[0].count) === 0;
  const userId = crypto.randomUUID();
  const passwordHash = await hashPassword(password);

  await db.insert(users).values({
    id: userId, username, email: email || '',
    displayName: display_name || username,
    passwordHash,
    role: isFirstUser ? 'admin' : 'member'
  });

  await issueSession(c, userId);
  return c.json({ ok: true, user: { id: userId, username, role: isFirstUser ? 'admin' : 'member' } });
});

authRoutes.post('/login', async (c) => {
  const { username, password } = await c.req.json();
  if (!username || !password) return c.json({ error: 'username and password required' }, 400);

  const db = createDb(c.env.DB);
  const user = await db.select().from(users).where(eq(users.username, username)).limit(1);
  if (user.length === 0) return c.json({ error: 'invalid credentials' }, 401);
  if (user[0].status !== 'active') return c.json({ error: 'account disabled' }, 403);
  if (!user[0].passwordHash || !(await verifyPassword(password, user[0].passwordHash))) {
    return c.json({ error: 'invalid credentials' }, 401);
  }

  await issueSession(c, user[0].id);
  return c.json({ ok: true, user: safeUser(user[0]) });
});

authRoutes.post('/logout', (c) => {
  c.header('Set-Cookie', 'session=; Path=/; HttpOnly; Secure; Max-Age=0');
  return c.json({ ok: true });
});
