import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { createDb } from '../db';
import { channels, bots } from '../db/schema';
import { eq, and, inArray } from 'drizzle-orm';
import type { AppEnv } from '../types';

export const channelRoutes = new Hono<AppEnv>();

channelRoutes.use('*', authMiddleware);

channelRoutes.get('/', async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const userBots = await db.select({ id: bots.id }).from(bots).where(eq(bots.userId, userId));
  const botIds = userBots.map(b => b.id);
  if (botIds.length === 0) return c.json([]);

  const result = await db.select().from(channels).where(inArray(channels.botId, botIds));
  return c.json(result);
});

channelRoutes.post('/', async (c) => {
  const userId = c.get('userId');
  const { bot_id, name, handle, filter_rule, ai_config } = await c.req.json();
  if (!bot_id || !name) return c.json({ error: 'bot_id and name required' }, 400);

  const db = createDb(c.env.DB);
  const bot = await db.select().from(bots).where(and(eq(bots.id, bot_id), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'bot not found' }, 404);

  const channelId = crypto.randomUUID();
  const apiKey = crypto.randomUUID();
  await db.insert(channels).values({
    id: channelId, botId: bot_id, name, apiKey,
    handle: handle || '',
    filterRule: JSON.stringify(filter_rule || {}),
    aiConfig: JSON.stringify(ai_config || {})
  });

  const ch = await db.select().from(channels).where(eq(channels.id, channelId)).limit(1);
  return c.json(ch[0], 201);
});

channelRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const ch = await db.select().from(channels).where(eq(channels.id, id)).limit(1);
  if (ch.length === 0) return c.json({ error: 'not found' }, 404);

  const bot = await db.select().from(bots).where(and(eq(bots.id, ch[0].botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  const body = await c.req.json();
  const updates: any = { updatedAt: new Date() };
  if (body.name) updates.name = body.name;
  if (body.handle !== undefined) updates.handle = body.handle;
  if (body.filter_rule) updates.filterRule = JSON.stringify(body.filter_rule);
  if (body.ai_config) updates.aiConfig = JSON.stringify(body.ai_config);
  if (body.enabled !== undefined) updates.enabled = body.enabled;

  await db.update(channels).set(updates).where(eq(channels.id, id));
  return c.json({ ok: true });
});

channelRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const ch = await db.select().from(channels).where(eq(channels.id, id)).limit(1);
  if (ch.length === 0) return c.json({ error: 'not found' }, 404);

  const bot = await db.select().from(bots).where(and(eq(bots.id, ch[0].botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  await db.delete(channels).where(eq(channels.id, id));
  return c.json({ ok: true });
});

channelRoutes.post('/:id/rotate-key', async (c) => {
  const id = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const ch = await db.select().from(channels).where(eq(channels.id, id)).limit(1);
  if (ch.length === 0) return c.json({ error: 'not found' }, 404);

  const bot = await db.select().from(bots).where(and(eq(bots.id, ch[0].botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  const newKey = crypto.randomUUID();
  await db.update(channels).set({ apiKey: newKey, updatedAt: new Date() }).where(eq(channels.id, id));
  return c.json({ api_key: newKey });
});
