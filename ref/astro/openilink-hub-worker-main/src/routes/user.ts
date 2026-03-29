import { Hono } from 'hono';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import { createDb } from '../db';
import { users, sessions } from '../db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '../lib/crypto';
import { safeUser } from '../lib/utils';
import type { AppEnv } from '../types';

export const userRoutes = new Hono<AppEnv>();

userRoutes.use('*', authMiddleware);
userRoutes.use('*', adminMiddleware);

userRoutes.get('/', async (c) => {
  const db = createDb(c.env.DB);
  const allUsers = await db.select().from(users);
  return c.json(allUsers.map(safeUser));
});

userRoutes.post('/', async (c) => {
  const { username, password, email, display_name, role } = await c.req.json();
  if (!username || !password) return c.json({ error: 'username and password required' }, 400);
  if (password.length < 8) return c.json({ error: 'password must be at least 8 characters' }, 400);

  const db = createDb(c.env.DB);
  const userId = crypto.randomUUID();
  const passwordHash = await hashPassword(password);
  await db.insert(users).values({
    id: userId, username,
    email: email || '',
    displayName: display_name || username,
    passwordHash,
    role: role === 'admin' ? 'admin' : 'member'
  });

  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return c.json(safeUser(user[0]), 201);
});

userRoutes.put('/:id/role', async (c) => {
  const id = c.req.param('id');
  const { role } = await c.req.json();
  if (role !== 'admin' && role !== 'member') return c.json({ error: 'role must be admin or member' }, 400);

  const currentUserId = c.get('userId');
  if (id === currentUserId && role !== 'admin') return c.json({ error: 'cannot demote yourself' }, 400);

  const db = createDb(c.env.DB);
  await db.update(users).set({ role, updatedAt: new Date() }).where(eq(users.id, id));
  return c.json({ ok: true });
});

userRoutes.put('/:id/status', async (c) => {
  const id = c.req.param('id');
  const { status } = await c.req.json();
  if (status !== 'active' && status !== 'disabled') return c.json({ error: 'status must be active or disabled' }, 400);

  const currentUserId = c.get('userId');
  if (id === currentUserId) return c.json({ error: 'cannot disable yourself' }, 400);

  const db = createDb(c.env.DB);
  await db.update(users).set({ status, updatedAt: new Date() }).where(eq(users.id, id));

  if (status === 'disabled') {
    await db.delete(sessions).where(eq(sessions.userId, id));
  }
  return c.json({ ok: true });
});

userRoutes.put('/:id/password', async (c) => {
  const id = c.req.param('id');
  const { password } = await c.req.json();
  if (!password || password.length < 8) return c.json({ error: 'password must be at least 8 characters' }, 400);

  const db = createDb(c.env.DB);
  const passwordHash = await hashPassword(password);
  await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, id));
  return c.json({ ok: true });
});

userRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const currentUserId = c.get('userId');
  if (id === currentUserId) return c.json({ error: 'cannot delete yourself' }, 400);

  const db = createDb(c.env.DB);
  await db.delete(users).where(eq(users.id, id));
  return c.json({ ok: true });
});
