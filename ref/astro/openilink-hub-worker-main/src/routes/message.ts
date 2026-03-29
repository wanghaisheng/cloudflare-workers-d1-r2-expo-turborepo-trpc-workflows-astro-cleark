import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { createDb } from '../db';
import { messages, bots } from '../db/schema';
import { eq, and, lt, desc } from 'drizzle-orm';
import type { AppEnv } from '../types';

export const messageRoutes = new Hono<AppEnv>();

messageRoutes.use('*', authMiddleware);

messageRoutes.get('/', async (c) => {
  const userId = c.get('userId');
  const botId = c.req.query('bot_id');
  if (!botId) return c.json({ error: 'bot_id required' }, 400);

  const db = createDb(c.env.DB);
  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  const limit = Math.min(Number(c.req.query('limit') || '50'), 200);
  const before = c.req.query('before');

  let query = db.select().from(messages).where(eq(messages.botId, botId));
  if (before) {
    query = db.select().from(messages).where(and(eq(messages.botId, botId), lt(messages.id, Number(before))));
  }

  const msgs = await query.orderBy(desc(messages.id)).limit(limit);
  return c.json(msgs);
});
