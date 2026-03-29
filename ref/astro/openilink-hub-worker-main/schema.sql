-- OpenILink Hub Worker - D1 Migration
-- Matches src/db/schema.ts

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT DEFAULT '',
  display_name TEXT DEFAULT '',
  password_hash TEXT DEFAULT '',
  role TEXT DEFAULT 'member',
  status TEXT DEFAULT 'active',
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS credentials (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  public_key TEXT NOT NULL,
  attestation_type TEXT DEFAULT '',
  transport TEXT DEFAULT '[]',
  sign_count INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  expires_at INTEGER NOT NULL,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS oauth_accounts (
  provider TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id),
  username TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  created_at INTEGER DEFAULT (unixepoch()),
  PRIMARY KEY (provider, provider_id)
);

CREATE TABLE IF NOT EXISTS bots (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT DEFAULT '',
  provider TEXT DEFAULT 'ilink',
  status TEXT DEFAULT 'disconnected',
  credentials TEXT DEFAULT '{}',
  sync_state TEXT DEFAULT '{}',
  msg_count INTEGER DEFAULT 0,
  last_msg_at INTEGER,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS channels (
  id TEXT PRIMARY KEY,
  bot_id TEXT NOT NULL REFERENCES bots(id),
  name TEXT NOT NULL,
  api_key TEXT UNIQUE NOT NULL,
  filter_rule TEXT DEFAULT '{}',
  enabled INTEGER DEFAULT 1,
  last_seq INTEGER DEFAULT 0,
  handle TEXT DEFAULT '',
  ai_config TEXT DEFAULT '{}',
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bot_id TEXT NOT NULL REFERENCES bots(id),
  channel_id TEXT,
  direction TEXT NOT NULL,
  sender TEXT DEFAULT '',
  recipient TEXT DEFAULT '',
  msg_type TEXT DEFAULT 'text',
  payload TEXT DEFAULT '{}',
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT DEFAULT '',
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_credentials_user ON credentials(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_oauth_user ON oauth_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_bots_user ON bots(user_id);
CREATE INDEX IF NOT EXISTS idx_channels_bot ON channels(bot_id);
CREATE INDEX IF NOT EXISTS idx_channels_api_key ON channels(api_key);
CREATE INDEX IF NOT EXISTS idx_messages_bot ON messages(bot_id, id);
