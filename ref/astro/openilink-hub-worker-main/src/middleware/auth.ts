import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import { createDb } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { AppEnv } from '../types';

export async function authMiddleware(c: Context<AppEnv>, next: Next) {
  const cookie = c.req.header('Cookie');
  const token = cookie?.match(/session=([^;]+)/)?.[1];
  if (!token) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const secret = c.env.SESSION_SECRET;
    if (!secret) return c.json({ error: 'SESSION_SECRET not configured' }, 500);
    const payload = await verify(token, secret, 'HS256');
    c.set('userId', payload.id as string);
    await next();
  } catch {
    return c.json({ error: 'Invalid token' }, 401);
  }
}

export async function adminMiddleware(c: Context<AppEnv>, next: Next) {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length === 0 || user[0].role !== 'admin') {
    return c.json({ error: 'Admin required' }, 403);
  }
  await next();
}
