import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').default(''),
  displayName: text('display_name').default(''),
  passwordHash: text('password_hash').default(''),
  role: text('role').default('member'),
  status: text('status').default('active'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const credentials = sqliteTable('credentials', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  publicKey: text('public_key').notNull(),
  attestationType: text('attestation_type').default(''),
  transport: text('transport').default('[]'),
  signCount: integer('sign_count').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const sessions = sqliteTable('sessions', {
  token: text('token').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const oauthAccounts = sqliteTable('oauth_accounts', {
  provider: text('provider').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => users.id),
  username: text('username').default(''),
  avatarUrl: text('avatar_url').default(''),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const bots = sqliteTable('bots', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').default(''),
  provider: text('provider').default('ilink'),
  status: text('status').default('disconnected'),
  credentials: text('credentials').default('{}'),
  syncState: text('sync_state').default('{}'),
  msgCount: integer('msg_count').default(0),
  lastMsgAt: integer('last_msg_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const channels = sqliteTable('channels', {
  id: text('id').primaryKey(),
  botId: text('bot_id').notNull().references(() => bots.id),
  name: text('name').notNull(),
  apiKey: text('api_key').notNull().unique(),
  filterRule: text('filter_rule').default('{}'),
  enabled: integer('enabled', { mode: 'boolean' }).default(true),
  lastSeq: integer('last_seq').default(0),
  handle: text('handle').default(''),
  aiConfig: text('ai_config').default('{}'),
  webhookConfig: text('webhook_config').default('{}'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  botId: text('bot_id').notNull().references(() => bots.id),
  channelId: text('channel_id'),
  direction: text('direction').notNull(),
  sender: text('sender').default(''),
  recipient: text('recipient').default(''),
  msgType: text('msg_type').default('text'),
  payload: text('payload').default('{}'),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').default(''),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date())
});
