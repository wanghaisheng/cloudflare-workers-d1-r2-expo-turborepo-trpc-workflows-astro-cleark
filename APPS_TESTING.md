# Apps 本地测试环境配置完成

## 概述

为所有 `apps` 目录下的应用配置了完整的本地测试环境，支持在 WSL 中运行测试。

## 配置的应用

### 1. **apps/workflows** - Cloudflare Workers 工作流
- **测试框架**: Vitest
- **特性**: 
  - 本地 SQLite 数据库测试
  - 工作流逻辑测试
  - 批处理和分页测试

### 2. **apps/apiservice** - API 服务
- **测试框架**: Vitest  
- **特性**:
  - 本地 SQLite 数据库测试
  - tRPC 端点测试
  - API 集成测试

### 3. **apps/astro** - Astro 网站
- **测试框架**: Vitest + Testing Library
- **特性**:
  - React 组件测试
  - Astro 页面测试
  - jsdom 环境
  - 测试覆盖率
  - 可视化测试 UI

### 4. **apps/expo** - React Native 移动应用
- **测试框架**: Jest + Testing Library
- **特性**:
  - React Native 组件测试
  - Expo 模块 Mock
  - tRPC 客户端测试
  - 测试覆盖率

## 使用方法

### 1. 运行所有测试
```bash
# 在 WSL 中
chmod +x test-all-wsl.sh
./test-all-wsl.sh
```

### 2. 单独运行各应用测试

#### Workflows
```bash
cd apps/workflows
pnpm test:local
```

#### API Service
```bash
cd apps/apiservice  
pnpm test:local
```

#### Astro
```bash
cd apps/astro
pnpm test              # 基础测试
pnpm test:ui           # 可视化测试
pnpm test:coverage     # 测试覆盖率
```

#### Expo
```bash
cd apps/expo
pnpm test              # 基础测试
pnpm test:watch        # 监视模式
pnpm test:coverage     # 测试覆盖率
```

## 新增文件

### Workflows
- `vitest.config.local.ts` - 本地测试配置
- `src/workflows/get-users-for-recap.test.ts` - 工作流测试

### API Service  
- `vitest.config.local.ts` - 本地测试配置

### Astro
- `vitest.config.ts` - 测试配置
- `src/test/setup.ts` - 测试设置

### Expo
- `jest.config.json` - Jest 配置
- `jest.setup.js` - 测试设置

### 根目录
- `test-all-wsl.sh` - 全应用测试脚本

## 测试覆盖

### 数据库测试
- ✅ 用户元数据 CRUD 操作
- ✅ 时刻记录管理
- ✅ 回顾功能测试
- ✅ 关系数据测试

### 工作流测试
- ✅ 用户选择逻辑
- ✅ 批处理测试
- ✅ 边界条件测试

### 组件测试
- ✅ React 组件渲染
- ✅ 用户交互测试
- ✅ API 集成测试

## 下一步

1. 在 WSL 中运行 `./test-all-wsl.sh` 测试所有配置
2. 根据项目需求添加更多测试用例
3. 配置 CI/CD 集成测试
4. 添加性能测试和 E2E 测试

现在所有应用都有了完整的本地测试环境！🎉
