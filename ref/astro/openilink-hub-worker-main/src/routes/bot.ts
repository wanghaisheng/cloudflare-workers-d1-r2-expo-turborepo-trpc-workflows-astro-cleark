import { Hono } from 'hono';
import { streamSSE } from 'hono/streaming';
import { Client } from '@openilink/openilink-sdk-node';
import { authMiddleware } from '../middleware/auth';
import { createDb } from '../db';
import { bots, channels, messages, users } from '../db/schema';
import * as settings from '../lib/settings';
import { createILinkClientFromBot } from '../lib/ilink';
import { eq, and, sql, lt, desc, inArray } from 'drizzle-orm';
import type { AppEnv } from '../types';

export const botRoutes = new Hono<AppEnv>();

function botResponse(bot: any) {
  const creds = JSON.parse(bot.credentials ?? '{}');
  return {
    id: bot.id,
    name: bot.name,
    provider: bot.provider,
    status: bot.status,
    msgCount: bot.msgCount,
    createdAt: bot.createdAt,
    extra: {
      bot_id: creds.bot_id || '',
      ilink_user_id: creds.ilink_user_id || '',
    },
  };
}

botRoutes.use('*', authMiddleware);

// ─── Stats (must be before /:id to avoid matching "stats" as id) ───
botRoutes.get('/stats', async (c) => {
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

// ─── Bot CRUD ──────────────────────────────────────────────

botRoutes.get('/', async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);
  const userBots = await db.select().from(bots).where(eq(bots.userId, userId));
  return c.json(userBots.map(botResponse));
});

botRoutes.post('/bind/start', async (c) => {
  const userId = c.get('userId');
  const db = createDb(c.env.DB);
  const client = new Client();
  const qr = await client.fetchQRCode();

  const sessionId = crypto.randomUUID();
  await settings.set(db, `bind.${sessionId}`, JSON.stringify({
    qrcode: qr.qrcode,
    userId,
  }));

  return c.json({ session_id: sessionId, qr_url: qr.qrcode_img_content });
});

botRoutes.get('/bind/status/:session_id', async (c) => {
  const sessionId = c.req.param('session_id');
  const db = createDb(c.env.DB);

  const raw = await settings.get(db, `bind.${sessionId}`);
  if (!raw) return c.json({ error: 'session not found' }, 404);
  const session = JSON.parse(raw) as { qrcode: string; userId: string };

  return streamSSE(c, async (stream) => {
    const client = new Client();
    let qrcode = session.qrcode;
    const TIMEOUT = 480_000;
    const start = Date.now();

    while (Date.now() - start < TIMEOUT) {
      let status;
      try {
        status = await client.pollQRStatus(qrcode);
      } catch {
        await stream.sleep(2_000);
        continue;
      }

      switch (status.status) {
        case 'scaned':
          await stream.writeSSE({ event: 'status', data: '{"status":"scanned"}' });
          break;

        case 'expired': {
          const newQr = await client.fetchQRCode();
          qrcode = newQr.qrcode ?? '';
          await settings.set(db, `bind.${sessionId}`, JSON.stringify({
            qrcode,
            userId: session.userId,
          }));
          await stream.writeSSE({
            event: 'status',
            data: JSON.stringify({ status: 'refreshed', qr_url: newQr.qrcode_img_content }),
          });
          break;
        }

        case 'confirmed': {
          const botId = crypto.randomUUID();
          const creds = JSON.stringify({
            bot_id: status.ilink_bot_id ?? '',
            bot_token: status.bot_token ?? '',
            base_url: status.baseurl ?? '',
            ilink_user_id: status.ilink_user_id ?? '',
          });

          await db.insert(bots).values({
            id: botId,
            userId: session.userId,
            name: '',
            provider: 'ilink',
            status: 'connected',
            credentials: creds,
          });

          await settings.del(db, `bind.${sessionId}`);

          await stream.writeSSE({
            event: 'status',
            data: JSON.stringify({ status: 'connected', bot_id: botId }),
          });
          return;
        }

        default:
          break;
      }
    }
  });
});

botRoutes.put('/:id', async (c) => {
  const botId = c.req.param('id');
  const userId = c.get('userId');
  const body = await c.req.json();

  const db = createDb(c.env.DB);
  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  const updates: any = { updatedAt: new Date() };
  if (body.name !== undefined) updates.name = body.name;

  await db.update(bots).set(updates).where(eq(bots.id, botId));
  return c.json({ ok: true });
});

botRoutes.post('/:id/reconnect', async (c) => {
  const botId = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  try {
    const client = createILinkClientFromBot(bot[0]);
    const creds = JSON.parse(bot[0].credentials ?? '{}');
    await client.getConfig(creds.ilink_user_id, '');
    await db.update(bots).set({ status: 'connected', updatedAt: new Date() }).where(eq(bots.id, botId));
    return c.json({ ok: true, status: 'connected' });
  } catch {
    await db.update(bots).set({ status: 'error', updatedAt: new Date() }).where(eq(bots.id, botId));
    return c.json({ ok: false, status: 'error', message: 'failed to reconnect' });
  }
});

botRoutes.delete('/:id', async (c) => {
  const botId = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  await db.delete(bots).where(eq(bots.id, botId));
  return c.json({ ok: true });
});

botRoutes.post('/:id/send', async (c) => {
  const botId = c.req.param('id');
  const userId = c.get('userId');
  const { recipient, text, context_token } = await c.req.json();
  if (!text) return c.json({ error: 'text required' }, 400);

  const db = createDb(c.env.DB);
  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  const client = createILinkClientFromBot(bot[0]);
  const clientId = await client.sendText(recipient, text, context_token || '');

  await db.insert(messages).values({
    botId, direction: 'outbound', recipient: recipient || '',
    msgType: 'text', payload: JSON.stringify({ content: text }),
  });

  return c.json({ ok: true, client_id: clientId });
});

botRoutes.get('/:id/contacts', async (c) => {
  const botId = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  const contacts = await db.selectDistinct({ sender: messages.sender })
    .from(messages)
    .where(and(eq(messages.botId, botId), eq(messages.direction, 'inbound'), sql`${messages.sender} != ''`));

  return c.json(contacts.map(r => r.sender));
});

// ─── Channels (nested under /bots/:id/channels) ───────────

botRoutes.get('/:id/channels', async (c) => {
  const botId = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  const result = await db.select().from(channels).where(eq(channels.botId, botId));
  return c.json(result);
});

botRoutes.post('/:id/channels', async (c) => {
  const botId = c.req.param('id');
  const userId = c.get('userId');
  const { name, handle, filter_rule, ai_config, webhook_config } = await c.req.json();
  if (!name) return c.json({ error: 'name required' }, 400);

  const db = createDb(c.env.DB);
  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'bot not found' }, 404);

  const channelId = crypto.randomUUID();
  const apiKey = crypto.randomUUID();
  await db.insert(channels).values({
    id: channelId, botId, name, apiKey,
    handle: handle || '',
    filterRule: JSON.stringify(filter_rule || {}),
    aiConfig: JSON.stringify(ai_config || {}),
    webhookConfig: JSON.stringify(webhook_config || {}),
  });

  const ch = await db.select().from(channels).where(eq(channels.id, channelId)).limit(1);
  return c.json(ch[0], 201);
});

botRoutes.put('/:id/channels/:cid', async (c) => {
  const botId = c.req.param('id');
  const cid = c.req.param('cid');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  const ch = await db.select().from(channels).where(and(eq(channels.id, cid), eq(channels.botId, botId))).limit(1);
  if (ch.length === 0) return c.json({ error: 'channel not found' }, 404);

  const body = await c.req.json();
  const updates: any = { updatedAt: new Date() };
  if (body.name) updates.name = body.name;
  if (body.handle !== undefined) updates.handle = body.handle;
  if (body.filter_rule) updates.filterRule = JSON.stringify(body.filter_rule);
  if (body.ai_config) updates.aiConfig = JSON.stringify(body.ai_config);
  if (body.webhook_config) updates.webhookConfig = JSON.stringify(body.webhook_config);
  if (body.enabled !== undefined) updates.enabled = body.enabled;

  await db.update(channels).set(updates).where(eq(channels.id, cid));
  return c.json({ ok: true });
});

botRoutes.delete('/:id/channels/:cid', async (c) => {
  const botId = c.req.param('id');
  const cid = c.req.param('cid');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  const ch = await db.select().from(channels).where(and(eq(channels.id, cid), eq(channels.botId, botId))).limit(1);
  if (ch.length === 0) return c.json({ error: 'channel not found' }, 404);

  await db.delete(channels).where(eq(channels.id, cid));
  return c.json({ ok: true });
});

botRoutes.post('/:id/channels/:cid/rotate_key', async (c) => {
  const botId = c.req.param('id');
  const cid = c.req.param('cid');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  const ch = await db.select().from(channels).where(and(eq(channels.id, cid), eq(channels.botId, botId))).limit(1);
  if (ch.length === 0) return c.json({ error: 'channel not found' }, 404);

  const newKey = crypto.randomUUID();
  await db.update(channels).set({ apiKey: newKey, updatedAt: new Date() }).where(eq(channels.id, cid));
  return c.json({ api_key: newKey });
});

// ─── Messages (nested under /bots/:id/messages) ───────────

botRoutes.get('/:id/messages', async (c) => {
  const botId = c.req.param('id');
  const userId = c.get('userId');
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

botRoutes.post('/:id/messages/:msgId/retry_media', async (c) => {
  const botId = c.req.param('id');
  const userId = c.get('userId');
  const db = createDb(c.env.DB);

  const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, userId))).limit(1);
  if (bot.length === 0) return c.json({ error: 'not found' }, 404);

  // Worker mode: media is proxied via CDN, no background download needed
  return c.json({ ok: true });
});
