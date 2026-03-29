#!/bin/bash

# WSL 全应用测试脚本

echo "🚀 运行所有应用的本地测试..."

# 检查是否在 WSL 环境中
if ! grep -q Microsoft /proc/version; then
    echo "❌ 此脚本需要在 WSL 环境中运行"
    exit 1
fi

# 进入项目根目录
cd "$(dirname "$0")/../.."

echo "📦 安装所有依赖..."
pnpm install

echo "🧪 运行 packages/db 测试..."
echo "================================"
cd packages/db
pnpm test:local
echo ""

echo "🧪 运行 apps/workflows 测试..."
echo "================================"
cd ../apps/workflows
pnpm test:local
echo ""

echo "🧪 运行 apps/apiservice 测试..."
echo "================================"
cd ../apiservice
pnpm test:local
echo ""

echo "🧪 运行 apps/astro 测试..."
echo "================================"
cd ../astro
pnpm test
echo ""

echo "🧪 运行 apps/expo 测试..."
echo "================================"
cd ../expo
pnpm test
echo ""

echo "✅ 所有测试完成！"
echo ""
echo "📋 可用命令："
echo "  packages/db:"
echo "    pnpm test:local     - 运行本地数据库测试"
echo "  apps/workflows:"
echo "    pnpm test:local     - 运行工作流测试"
echo "  apps/apiservice:"
echo "    pnpm test:local     - 运行 API 服务测试"
echo "  apps/astro:"
echo "    pnpm test           - 运行 Astro 测试"
echo "    pnpm test:ui        - 运行测试 UI"
echo "    pnpm test:coverage  - 运行测试覆盖率"
echo "  apps/expo:"
echo "    pnpm test           - 运行 Expo 测试"
echo "    pnpm test:watch     - 监视模式运行测试"
echo "    pnpm test:coverage  - 运行测试覆盖率"
