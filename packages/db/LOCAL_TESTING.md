# 本地 SQLite 测试环境配置指南

## 概述

本项目现在支持在本地使用 SQLite 进行完整的数据库测试，无需连接 Cloudflare D1。

## 新增文件

### 1. 本地数据库客户端
- `packages/db/src/client-local.ts` - 本地 SQLite 客户端，支持文件数据库和内存数据库

### 2. 本地配置文件
- `packages/db/drizzle.config.local.ts` - 本地 Drizzle 配置，使用 better-sqlite3
- `packages/db/vitest.config.local.ts` - Vitest 测试配置

### 3. 测试文件
- `packages/db/tests/db.test.ts` - 完整的数据库操作测试

## 安装依赖

```bash
# 在 packages/db 目录下安装新增的依赖
pnpm install
```

## 使用方法

### 1. 生成迁移文件
```bash
# 使用本地配置生成迁移
pnpm db:generate-local
```

### 2. 运行测试
```bash
# 运行本地数据库测试
pnpm test:local
```

### 3. 数据库可视化
```bash
# 启动本地数据库 studio
pnpm db:studio-local
```

### 4. 编程方式使用

#### 内存数据库（推荐用于测试）
```typescript
import { getMemoryDB } from '@acme/db/client-local';

const db = getMemoryDB();
// 数据库在测试结束后自动清理
```

#### 文件数据库
```typescript
import { getLocalDB } from '@acme/db/client-local';

const db = getLocalDB('./my-test.db');
// 数据库持久化到文件
```

## 测试覆盖

测试文件包含以下场景：

1. **用户元数据操作**
   - 创建和检索用户信息
   - 更新用户设置

2. **时刻记录操作**
   - 创建和检索时刻记录

3. **回顾操作**
   - 创建和检索不同类型的回顾

4. **关系测试**
   - 用户与多个时刻和回顾的关联

## 环境隔离

- 本地测试使用独立的配置文件 `drizzle.config.local.ts`
- 不会影响生产环境的 Cloudflare D1 配置
- 测试使用内存数据库，确保测试间的隔离

## 下一步

1. 安装依赖：`pnpm install`
2. 生成迁移：`pnpm db:generate-local`
3. 运行测试：`pnpm test:local`
4. 根据需要添加更多测试用例
