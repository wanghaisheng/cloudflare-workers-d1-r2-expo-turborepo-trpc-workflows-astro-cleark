# WSL 本地 SQLite 测试环境使用指南

## 概述

使用 WSL 环境来避免 Windows 上的 better-sqlite3 构建问题，提供完整的本地 SQLite 测试环境。

## 前置条件

1. **安装 WSL**：
   ```bash
   # 在 PowerShell (管理员) 中运行
   wsl --install
   ```

2. **安装 Node.js 和 pnpm**：
   ```bash
   # 在 WSL 中
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   npm install -g pnpm
   ```

## 使用方法

### 1. 进入 WSL 环境
```bash
# 在 Windows 中打开 WSL
wsl
```

### 2. 导航到项目目录
```bash
cd /mnt/e/workspace/cloudflare-workers-d1-r2-expo-turborepo-trpc-workflows-astro-cleark/packages/db
```

### 3. 运行设置脚本
```bash
chmod +x setup-wsl.sh
./setup-wsl.sh
```

### 4. 手动操作（可选）

#### 安装依赖
```bash
pnpm install
```

#### 生成迁移文件
```bash
pnpm db:generate-local
```

#### 运行测试
```bash
pnpm test:local
```

#### 启动数据库可视化
```bash
pnpm db:studio-local
```

## WSL 优势

1. **避免构建问题**：Linux 环境下 better-sqlite3 可以直接编译
2. **性能更好**：原生 Linux 性能优于 WSL 中的 Windows 互操作
3. **环境隔离**：测试环境与 Windows 开发环境分离

## 文件结构

```
packages/db/
├── drizzle.config.local.ts    # 本地 SQLite 配置
├── src/client-local.ts        # 本地数据库客户端
├── tests/db.test.ts           # 测试文件
├── vitest.config.local.ts     # 测试配置
├── setup-wsl.sh              # WSL 设置脚本
└── LOCAL_TESTING.md          # 详细文档
```

## 故障排除

### 如果遇到权限问题
```bash
sudo chown -R $USER:$USER .
```

### 如果 node-gyp 构建失败
```bash
sudo apt-get install -y build-essential
```

### 如果 pnpm 权限问题
```bash
npm install -g pnpm --unsafe-perm
```

## 下一步

1. 在 WSL 中运行 `./setup-wsl.sh`
2. 查看测试结果
3. 根据需要添加更多测试用例
4. 使用 `pnpm db:studio-local` 进行数据库可视化
