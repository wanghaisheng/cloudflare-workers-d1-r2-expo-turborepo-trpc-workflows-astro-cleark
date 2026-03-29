import { Hono } from 'hono';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import { createDb } from '../db';
import * as settings from '../lib/settings';
import type { AppEnv } from '../types';

export const adminConfigRoutes = new Hono<AppEnv>();

adminConfigRoutes.use('*', authMiddleware);
adminConfigRoutes.use('*', adminMiddleware);

function maskSecret(s: string): string {
  if (s.length <= 8) return '*'.repeat(s.length);
  return s.slice(0, 4) + '*'.repeat(s.length - 8) + s.slice(-4);
}

// ─── OAuth Config ──────────────────────────────────────────
adminConfigRoutes.get('/oauth', async (c) => {
  const db = createDb(c.env.DB);
  const conf = await settings.listByPrefix(db, 'oauth.');

  const result: Record<string, any> = {};
  for (const name of ['github', 'linuxdo']) {
    const clientId = conf[`oauth.${name}.client_id`] || '';
    const clientSecret = conf[`oauth.${name}.client_secret`] || '';
    result[name] = {
      client_id: clientId,
      client_secret: clientSecret ? maskSecret(clientSecret) : '',
      enabled: !!clientId,
      source: clientId ? 'db' : ''
    };
  }
  return c.json(result);
});

adminConfigRoutes.put('/oauth/:provider', async (c) => {
  const name = c.req.param('provider');
  if (name !== 'github' && name !== 'linuxdo') return c.json({ error: 'unknown provider' }, 400);

  const { client_id, client_secret } = await c.req.json();
  if (!client_id) return c.json({ error: 'client_id required' }, 400);

  const db = createDb(c.env.DB);
  await settings.set(db, `oauth.${name}.client_id`, client_id);
  if (client_secret) await settings.set(db, `oauth.${name}.client_secret`, client_secret);
  return c.json({ ok: true });
});

adminConfigRoutes.delete('/oauth/:provider', async (c) => {
  const name = c.req.param('provider');
  if (name !== 'github' && name !== 'linuxdo') return c.json({ error: 'unknown provider' }, 400);

  const db = createDb(c.env.DB);
  await settings.del(db, `oauth.${name}.client_id`);
  await settings.del(db, `oauth.${name}.client_secret`);
  return c.json({ ok: true });
});

// ─── AI Config ─────────────────────────────────────────────
adminConfigRoutes.get('/ai', async (c) => {
  const db = createDb(c.env.DB);
  const conf = await settings.listByPrefix(db, 'ai.');
  return c.json({
    base_url: conf['ai.base_url'] || '',
    api_key: conf['ai.api_key'] ? maskSecret(conf['ai.api_key']) : '',
    model: conf['ai.model'] || '',
    system_prompt: conf['ai.system_prompt'] || '',
    max_history: conf['ai.max_history'] || '',
    enabled: !!conf['ai.api_key']
  });
});

adminConfigRoutes.put('/ai', async (c) => {
  const { base_url, api_key, model, system_prompt, max_history } = await c.req.json();
  const db = createDb(c.env.DB);
  if (base_url !== undefined) await settings.set(db, 'ai.base_url', base_url);
  if (api_key) await settings.set(db, 'ai.api_key', api_key);
  if (model !== undefined) await settings.set(db, 'ai.model', model);
  if (system_prompt !== undefined) await settings.set(db, 'ai.system_prompt', system_prompt);
  if (max_history !== undefined) await settings.set(db, 'ai.max_history', max_history);
  return c.json({ ok: true });
});

adminConfigRoutes.delete('/ai', async (c) => {
  const db = createDb(c.env.DB);
  await settings.del(db, 'ai.base_url');
  await settings.del(db, 'ai.api_key');
  await settings.del(db, 'ai.model');
  await settings.del(db, 'ai.system_prompt');
  await settings.del(db, 'ai.max_history');
  return c.json({ ok: true });
});
