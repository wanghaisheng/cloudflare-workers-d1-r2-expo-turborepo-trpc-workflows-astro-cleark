import { Hono } from 'hono';
import { createDb } from '../db';
import { bots, channels, messages } from '../db/schema';
import { eq, and, gt } from 'drizzle-orm';
import { createILinkClientFromBot, parseBotCredentials } from '../lib/ilink';
import { TYPING, CANCEL_TYPING } from '@openilink/openilink-sdk-node';
import type { AppEnv } from '../types';
import type { Context } from 'hono';

export const channelApiRoutes = new Hono<AppEnv>();

async function authenticateChannel(c: Context<AppEnv>) {
  const key = c.req.query('key') || c.req.header('X-API-Key');
  if (!key) return null;

  const db = createDb(c.env.DB);
  const ch = await db.select().from(channels).where(eq(channels.apiKey, key)).limit(1);
  if (ch.length === 0 || !ch[0].enabled) return null;
  return ch[0];
}

async function getChannelBot(c: Context<AppEnv>, ch: { botId: string }) {
  const db = createDb(c.env.DB);
  const bot = await db.select().from(bots).where(eq(bots.id, ch.botId)).limit(1);
  return bot[0] ?? null;
}

// ─── WebSocket Connect ─────────────────────────────────────

channelApiRoutes.get('/connect', async (c) => {
  const key = c.req.query('key');
  if (!key) return c.json({ error: 'api key required' }, 401);

  const db = createDb(c.env.DB);
  const ch = await db.select().from(channels).where(eq(channels.apiKey, key)).limit(1);
  if (ch.length === 0 || !ch[0].enabled) return c.json({ error: 'invalid or disabled key' }, 401);

  const channel = ch[0];

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

  const bot = await db.select().from(bots).where(eq(bots.id, channel.botId)).limit(1);
  const botStatus = bot[0]?.status ?? 'disconnected';
  const botCredentials = bot[0]?.credentials ?? '{}';

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

// ─── Channel API Endpoints ─────────────────────────────────

channelApiRoutes.get('/messages', async (c) => {
  const ch = await authenticateChannel(c);
  if (!ch) return c.json({ error: 'api key required' }, 401);

  const cursor = c.req.query('cursor');
  const limit = Math.min(Number(c.req.query('limit') || '50'), 200);
  const db = createDb(c.env.DB);

  let afterSeq = 0;
  if (cursor) {
    try { afterSeq = Number(atob(cursor).replace('v1:', '')); } catch { /* invalid cursor */ }
  }

  const msgs = await db.select().from(messages)
    .where(and(eq(messages.botId, ch.botId), gt(messages.id, afterSeq)))
    .limit(limit);

  if (msgs.length > 0) {
    await db.update(channels).set({ lastSeq: msgs[msgs.length - 1].id }).where(eq(channels.id, ch.id));
  }

  const nextCursor = msgs.length === limit ? btoa(`v1:${msgs[msgs.length - 1].id}`) : '';
  return c.json({ messages: msgs, next_cursor: nextCursor });
});

channelApiRoutes.post('/send', async (c) => {
  const ch = await authenticateChannel(c);
  if (!ch) return c.json({ error: 'api key required' }, 401);

  const { text, recipient, context_token } = await c.req.json();
  if (!text) return c.json({ error: 'text required' }, 400);

  const bot = await getChannelBot(c, ch);
  if (!bot) return c.json({ error: 'bot not found' }, 404);

  const client = createILinkClientFromBot(bot);
  const clientId = await client.sendText(recipient || '', text, context_token || '');

  const db = createDb(c.env.DB);
  await db.insert(messages).values({
    botId: ch.botId, channelId: ch.id,
    direction: 'outbound', recipient: recipient || '',
    msgType: 'text', payload: JSON.stringify({ content: text })
  });

  return c.json({ ok: true, client_id: clientId });
});

channelApiRoutes.post('/typing', async (c) => {
  const ch = await authenticateChannel(c);
  if (!ch) return c.json({ error: 'api key required' }, 401);

  const { ticket, status, user_id } = await c.req.json();
  if (!ticket) return c.json({ error: 'ticket required' }, 400);

  const bot = await getChannelBot(c, ch);
  if (!bot) return c.json({ error: 'bot not found' }, 404);

  const client = createILinkClientFromBot(bot);
  const creds = parseBotCredentials(bot.credentials ?? '{}');
  const typingStatus = status === 'cancel' ? CANCEL_TYPING : TYPING;
  await client.sendTyping(user_id || creds.ilink_user_id, ticket, typingStatus);

  return c.json({ ok: true });
});

channelApiRoutes.post('/config', async (c) => {
  const ch = await authenticateChannel(c);
  if (!ch) return c.json({ error: 'api key required' }, 401);

  const { user_id, context_token } = await c.req.json();

  const bot = await getChannelBot(c, ch);
  if (!bot) return c.json({ error: 'bot not found' }, 404);

  const client = createILinkClientFromBot(bot);
  const creds = parseBotCredentials(bot.credentials ?? '{}');
  const config = await client.getConfig(user_id || creds.ilink_user_id, context_token || '');

  return c.json(config);
});

channelApiRoutes.get('/status', async (c) => {
  const ch = await authenticateChannel(c);
  if (!ch) return c.json({ error: 'api key required' }, 401);

  const db = createDb(c.env.DB);
  const bot = await db.select({ status: bots.status }).from(bots).where(eq(bots.id, ch.botId)).limit(1);

  return c.json({
    channel_id: ch.id, channel_name: ch.name,
    bot_id: ch.botId, bot_status: bot[0]?.status ?? 'disconnected'
  });
});

// ─── Media Proxy (CDN download via iLink SDK) ──────────────

channelApiRoutes.get('/media', async (c) => {
  const ch = await authenticateChannel(c);
  if (!ch) return c.json({ error: 'api key required' }, 401);

  const eqp = c.req.query('eqp');
  const aes = c.req.query('aes');
  if (!eqp || !aes) return c.json({ error: 'eqp and aes required' }, 400);

  const bot = await getChannelBot(c, ch);
  if (!bot) return c.json({ error: 'bot not found' }, 404);

  const client = createILinkClientFromBot(bot);
  try {
    const data = await client.downloadFile(eqp, aes);
    const ct = c.req.query('ct') || 'application/octet-stream';
    return new Response(data, {
      headers: {
        'Content-Type': ct,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch {
    return c.json({ error: 'download failed' }, 502);
  }
});
