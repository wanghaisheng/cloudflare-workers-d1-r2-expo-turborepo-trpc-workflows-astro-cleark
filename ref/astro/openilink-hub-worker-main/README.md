# OpenILink Hub Worker

[openilink-hub](https://github.com/openilink/openilink-hub) 的 Cloudflare Workers 版本。多 Bot 管理与消息中继系统，通过扫码绑定微信 Bot，将消息实时转发给下游服务。

## 与 Go 版本的区别

| | Go 版本 | Worker 版本 |
|---|---|---|
| 运行环境 | Docker / 自建服务器 | Cloudflare Workers (Serverless) |
| 数据库 | PostgreSQL | Cloudflare D1 (SQLite) |
| WebSocket | 内置 | Durable Objects |
| 媒体存储 | MinIO / 本地 | CDN 代理 (iLink SDK) |
| ORM | 原生 SQL | Drizzle ORM |
| 框架 | net/http | Hono |

API 路由与 Go 版本 100% 兼容（51/51 端点），前端无需修改。

## 快速开始

### 1. 创建 D1 数据库

在 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → D1 中创建数据库，名称建议 `openilink_hub`，记下 `database_id`。

### 2. 克隆并配置

```bash
git clone --recursive https://github.com/openilink/openilink-hub-worker.git
cd openilink-hub-worker
pnpm install
cp wrangler.toml.example wrangler.toml
```

编辑 `wrangler.toml`，填入你的 `database_id`。

### 3. 设置 Secrets

```bash
npx -y wrangler secret put SESSION_SECRET
npx -y wrangler secret put SITE_ORIGIN
```

- `SESSION_SECRET` — JWT 签名密钥（随机字符串）
- `SITE_ORIGIN` — 站点地址，如 `https://hub.example.com`

### 4. 部署

```bash
make deploy
```

自动完成：构建前端 → 应用数据库迁移 → 部署 Worker。

### 5. 初始化

访问部署后的 URL，注册第一个账号即自动成为管理员。OAuth / AI 配置在管理员后台 Settings 页面。

## 本地开发

```bash
make dev
```

自动完成：构建前端 → 应用本地迁移 → 启动开发服务器。

需要创建 `.dev.vars` 文件：

```
SESSION_SECRET=dev-secret-change-me
SITE_ORIGIN=http://localhost:8787
```

## API 路由

### 认证
- `POST /api/auth/register` — 注册（首个用户自动成为管理员）
- `POST /api/auth/login` — 登录
- `POST /api/auth/logout` — 登出
- `POST /api/auth/passkey/*` — WebAuthn Passkey 认证
- `GET /api/auth/oauth/*` — OAuth 登录 (GitHub, LinuxDo)

### 用户
- `GET /api/me` — 当前用户信息
- `PUT /api/me/profile` — 更新资料
- `PUT /api/me/password` — 修改密码
- `GET /api/me/linked-accounts` — 关联的 OAuth 账号
- `GET /api/me/linked-accounts/:provider/bind` — 绑定 OAuth 账号

### Bot 管理
- `GET /api/bots` — 列出 Bot
- `POST /api/bots/bind/start` — 开始扫码绑定
- `GET /api/bots/bind/status/:id` — 绑定状态 (SSE)
- `PUT /api/bots/:id` — 更新 Bot
- `DELETE /api/bots/:id` — 删除 Bot
- `POST /api/bots/:id/reconnect` — 重连
- `POST /api/bots/:id/send` — 发送消息
- `GET /api/bots/:id/contacts` — 联系人列表
- `GET /api/bots/stats` — 系统统计

### Channel
- `GET /api/bots/:id/channels` — 列出通道
- `POST /api/bots/:id/channels` — 创建通道
- `PUT /api/bots/:id/channels/:cid` — 更新通道
- `DELETE /api/bots/:id/channels/:cid` — 删除通道
- `POST /api/bots/:id/channels/:cid/rotate_key` — 轮换 API Key

### 消息
- `GET /api/bots/:id/messages` — 消息列表
- `POST /api/bots/:id/messages/:msgId/retry_media` — 重试媒体下载

### Channel API（第三方集成，API Key 认证）
- `GET /api/v1/channels/connect` — WebSocket 连接
- `GET /api/v1/channels/messages` — 拉取消息
- `POST /api/v1/channels/send` — 发送消息
- `POST /api/v1/channels/typing` — 输入状态
- `POST /api/v1/channels/config` — 获取配置
- `GET /api/v1/channels/status` — 通道状态
- `GET /api/v1/channels/media` — 媒体代理 (CDN)

### 管理员
- `GET/POST /api/admin/users` — 用户管理
- `PUT /api/admin/users/:id/{role,status,password}` — 用户设置
- `GET/PUT/DELETE /api/admin/config/oauth` — OAuth 配置
- `GET/PUT/DELETE /api/admin/config/ai` — AI 配置

## 项目结构

```
src/
├── index.tsx          # 入口 + 路由挂载 + 全局中间件
├── types.ts           # AppEnv 类型
├── db/
│   └── schema.ts      # Drizzle ORM schema (D1)
├── durable/
│   └── websocket.ts   # Durable Object (WebSocket 管理)
├── lib/
│   ├── case.ts        # camelCase → snake_case 响应转换
│   ├── crypto.ts      # PBKDF2 密码哈希 (Web Crypto API)
│   ├── ilink.ts       # iLink SDK 客户端工厂
│   ├── settings.ts    # D1 settings KV 存储
│   └── utils.ts       # safeUser 等工具函数
├── middleware/
│   └── auth.ts        # JWT 认证 + 管理员权限中间件
└── routes/
    ├── auth.ts        # 注册/登录/登出
    ├── bot.ts         # Bot + Channel + Message CRUD + Stats
    ├── channel_api.ts # Channel API + WebSocket + 媒体代理
    ├── config.ts      # 管理员配置 (OAuth/AI)
    ├── me.ts          # 用户资料/密码/OAuth 绑定
    ├── oauth.ts       # OAuth 登录流程
    ├── passkey.ts     # WebAuthn Passkey
    └── user.ts        # 管理员用户管理
```

## Schema 迁移

基于 [Drizzle ORM](https://orm.drizzle.team)，schema 定义在 `src/db/schema.ts`。

```bash
# 修改 schema 后生成迁移
pnpm drizzle-kit generate

# 迁移在 make deploy / make dev 时自动应用
```

## Makefile

| 命令 | 说明 |
|------|------|
| `make dev` | 构建前端 + 本地迁移 + 启动开发服务器 |
| `make build` | 构建前端 |
| `make migrate` | 应用远程数据库迁移 |
| `make deploy` | 构建 + 迁移 + 部署 |

## 技术栈

- [Hono](https://hono.dev) — Web 框架
- [Cloudflare Workers](https://workers.cloudflare.com) — 边缘计算
- [D1](https://developers.cloudflare.com/d1) — SQLite 数据库
- [Durable Objects](https://developers.cloudflare.com/durable-objects) — WebSocket 管理
- [Drizzle ORM](https://orm.drizzle.team) — 数据库 ORM
- [@openilink/openilink-sdk-node](https://github.com/openilink/openilink-sdk-node) — iLink SDK
- [@simplewebauthn/server](https://simplewebauthn.dev) — WebAuthn/Passkey

## License

MIT
