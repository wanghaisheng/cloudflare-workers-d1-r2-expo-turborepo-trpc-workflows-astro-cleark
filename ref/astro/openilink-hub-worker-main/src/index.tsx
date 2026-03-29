import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { verify } from 'hono/jwt';
import { createDb } from './db';
import { bots } from './db/schema';
import { eq, and } from 'drizzle-orm';
import * as settings from './lib/settings';
import { toSnake } from './lib/case';
import type { AppEnv } from './types';

// Routes
import { authRoutes } from './routes/auth';
import { oauthRoutes } from './routes/oauth';
import { passkeyRoutes } from './routes/passkey';
import { meRoutes } from './routes/me';
import { botRoutes } from './routes/bot';
import { channelApiRoutes } from './routes/channel_api';
import { userRoutes } from './routes/user';
import { adminConfigRoutes } from './routes/config';

const app = new Hono<AppEnv>();

// ─── Global Middleware ─────────────────────────────────────
app.use('*', cors({
  origin: (origin) => origin || '*',
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-API-Key']
}));

// Convert camelCase JSON to snake_case for frontend compatibility
app.use('/api/*', async (c, next) => {
  await next();
  const res = c.res;
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json') && res.body) {
    try {
      const clone = res.clone();
      const body = await clone.json();
      const converted = JSON.stringify(toSnake(body));
      const newHeaders = new Headers(res.headers);
      c.res = new Response(converted, {
        status: res.status,
        headers: newHeaders,
      });
    } catch { /* not valid JSON, skip */ }
  }
});

app.onError((err, c) => {
  console.error(`[ERROR] ${c.req.method} ${c.req.url}:`, err.message);
  return c.json({ error: 'Internal Server Error' }, 500);
});

// ─── Health Check ──────────────────────────────────────────
app.get('/health', (c) => c.json({ ok: true }));

// ─── Public: Info ──────────────────────────────────────────
app.get('/api/info', async (c) => {
  const db = createDb(c.env.DB);
  const apiKey = await settings.get(db, 'ai.api_key');
  return c.json({ ai: !!apiKey });
});

// ─── API Routes ────────────────────────────────────────────
app.route('/api/auth', authRoutes);
app.route('/api/auth/oauth', oauthRoutes);
app.route('/api/auth/passkey', passkeyRoutes);
app.route('/api/me', meRoutes);
app.route('/api/bots', botRoutes);
app.route('/api/v1/channels', channelApiRoutes);
app.route('/api/admin/users', userRoutes);
app.route('/api/admin/config', adminConfigRoutes);

// ─── Media Proxy (session-auth for frontend) ───────────────
app.get('/api/v1/media/*', async (c) => {
  const key = c.req.url.split('/api/v1/media/')[1]?.split('?')[0];
  if (!key) return c.json({ error: 'key required' }, 400);

  const parts = key.split('/');
  if (parts.length < 2) return c.json({ error: 'invalid key' }, 400);
  const botId = parts[0];

  // Auth: session cookie → check bot ownership
  let authed = false;
  const cookie = c.req.header('Cookie');
  if (cookie) {
    const match = cookie.match(/session=([^;]+)/);
    if (match) {
      try {
        const secret = c.env.SESSION_SECRET;
        const payload = await verify(match[1], secret, 'HS256') as any;
        if (payload?.id) {
          const db = createDb(c.env.DB);
          const bot = await db.select().from(bots).where(and(eq(bots.id, botId), eq(bots.userId, payload.id))).limit(1);
          if (bot.length > 0) authed = true;
        }
      } catch { /* invalid token */ }
    }
  }

  if (!authed) return c.json({ error: 'unauthorized' }, 401);

  // For now, media storage is not configured in worker mode
  return c.json({ error: 'storage not configured' }, 404);
});

// ─── SPA Fallback ──────────────────────────────────────────
app.get('*', (c) => {
  return c.text('OpenILink Hub Worker API', 200);
});

export default app;
export { WebSocketManager } from './durable/websocket';
