import { Hono } from 'hono';
import { createDb } from '../db';
import { bots, channels, messages } from '../db/schema';
import { eq, and, gt } from 'drizzle-orm';
import type { AppEnv } from '../types';

export const wsRoutes = new Hono<AppEnv>();

wsRoutes.get('/connect', async (c) => {
  const key = c.req.query('key');
  if (!key) return c.json({ error: 'api key required' }, 401);

  const db = createDb(c.env.DB);
  const ch = await db.select().from(channels).where(eq(channels.apiKey, key)).limit(1);
  if (ch.length === 0 || !ch[0].enabled) return c.json({ error: 'invalid or disabled key' }, 401);

  const channel = ch[0];

  // Load missed messages for replay
  let missed: any[] = [];
  if (channel.lastSeq && channel.lastSeq > 0) {
    missed = await db.select().from(messages)
      .where(and(eq(messages.botId, channel.botId), gt(messages.id, channel.lastSeq)))
      .limit(100);

    if (missed.length > 0) {
      await db.update(channels)
        .set({ lastSeq: missed[missed.length - 1].id })
        .where(eq(channels.id, channel.id));
    }
  }

  // Load bot credentials for DO to use when sending
  const bot = await db.select().from(bots).where(eq(bots.id, channel.botId)).limit(1);
  const botStatus = bot[0]?.status ?? 'disconnected';
  const botCredentials = bot[0]?.credentials ?? '{}';

  // Get Durable Object stub and upgrade to WebSocket
  const doId = c.env.WS_MANAGER.idFromName('global');
  const stub = c.env.WS_MANAGER.get(doId);

  const params = new URLSearchParams({
    channel_id: channel.id,
    bot_id: channel.botId,
    channel_name: channel.name,
    bot_status: botStatus,
    bot_credentials: botCredentials,
    missed: JSON.stringify(missed)
  });

  const doUrl = `https://do/ws?${params}`;
  return stub.fetch(doUrl, {
    headers: {
      Upgrade: 'websocket',
      Connection: 'Upgrade'
    }
  });
});
