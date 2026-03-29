import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { createDb } from '../db';
import { users, bots, channels, messages } from '../db/schema';
import { sql } from 'drizzle-orm';
import type { AppEnv } from '../types';

export const statsRoutes = new Hono<AppEnv>();

statsRoutes.use('*', authMiddleware);

statsRoutes.get('/', async (c) => {
  const db = createDb(c.env.DB);

  const [userCount, botCount, channelCount, msgCount] = await Promise.all([
    db.select({ count: sql`count(*)` }).from(users),
    db.select({ count: sql`count(*)` }).from(bots),
    db.select({ count: sql`count(*)` }).from(channels),
    db.select({ count: sql`count(*)` }).from(messages)
  ]);

  return c.json({
    users: Number(userCount[0].count),
    bots: Number(botCount[0].count),
    channels: Number(channelCount[0].count),
    messages: Number(msgCount[0].count)
  });
});
