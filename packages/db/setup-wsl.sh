#!/bin/bash

# WSL 本地 SQLite 测试环境设置脚本

echo "🚀 设置 WSL 本地 SQLite 测试环境..."

# 检查是否在 WSL 环境中
if ! grep -q Microsoft /proc/version; then
    echo "❌ 此脚本需要在 WSL 环境中运行"
    exit 1
fi

# 进入项目目录
cd "$(dirname "$0")"

echo "📦 安装依赖..."
pnpm install

echo "🗄️ 生成本地迁移文件..."
pnpm db:generate-local

echo "🧪 运行本地测试..."
pnpm test:local

echo "✅ 本地 SQLite 测试环境设置完成！"
echo ""
echo "📋 可用命令："
echo "  pnpm test:local     - 运行本地测试"
echo "  pnpm db:generate-local - 生成迁移文件"
echo "  pnpm db:studio-local  - 启动数据库可视化"
