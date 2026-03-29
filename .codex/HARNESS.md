# 🛡️ HARNESS.md - 项目约束宪法

> **First, read and strictly follow HARNESS.md**  
> 这是项目的核心约束文件，所有 AI Agent 必须严格遵守

---

## 🚫 **禁止清单** (全局约束)

### 📝 **代码质量**
- ❌ **禁止使用 `any` 类型** - 必须使用明确的 TypeScript 类型
- ❌ **禁止硬编码颜色值** - 必须使用设计系统 token
- ❌ **禁止直接 DOM 操作** - 必须通过 React 组件或工具函数
- ❌ **禁止循环依赖** - 模块间必须保持单向依赖
- ❌ **禁止全局状态** - 必须使用状态管理工具
- ❌ **禁止 `console.log`** - 必须使用日志工具
- ❌ **禁止魔法数字** - 必须使用命名常量

### 🏗️ **架构约束**
- ✅ **严格分层架构**: Types → Config → Repo → Service → Runtime → UI
- ❌ **禁止跨层直接调用**: 必须通过接口层或 Provider
- ❌ **禁止在组件中直接操作数据库**: 必须通过服务层
- ❌ **禁止业务逻辑在 UI 层**: 必须在 Domain 层
- ❌ **禁止绕过缓存**: 必须使用缓存策略
- ✅ **必须使用 Provider 接口**: 横切关注点通过 Provider 管理

### 🔧 **品味不变式 (Taste Invariants)**
- ✅ **结构化日志记录**: 必须使用 logger.info/error/warn，禁止 console.log
- ✅ **命名约定**: 组件 PascalCase、Hook use 前缀、函数 camelCase、常量 UPPER_SNAKE_CASE
- ✅ **文件大小限制**: 组件 ≤ 500KB、页面 ≤ 300KB、Hook ≤ 200KB、其他 ≤ 1MB
- ✅ **函数复杂度控制**: 单一职责、逻辑简单、嵌套 ≤ 3 层
- ❌ **禁止魔法数字**: 必须使用命名常量
- ❌ **禁止全局状态**: 必须使用状态管理工具

### 🌐 **国际化约束**
- ❌ **禁止硬编码文本** - 必须使用 i18n 系统
- ❌ **禁止缺少双语支持** - 必须支持中文/英文
- ❌ **禁止忽略时区处理** - 必须使用 UTC + 本地化

---

## ✅ **必须遵守** (质量标准)

### 🔧 **TypeScript 要求**
- ✅ **严格模式** - `strict: true` 必须启用
- ✅ **类型覆盖** - ≥ 90% TypeScript 覆盖率
- ✅ **接口优先** - 所有数据结构必须定义接口
- ✅ **泛型使用** - 复用逻辑必须使用泛型

### 🧪 **测试要求**
- ✅ **测试覆盖率** - ≥ 85% 代码覆盖率
- ✅ **单元测试** - 所有工具函数必须有单元测试
- ✅ **集成测试** - 关键业务流程必须有集成测试
- ✅ **E2E 测试** - 用户关键路径必须有 E2E 测试

### 🏗️ **架构原则**
- ✅ **分层架构** - Domain/Application/Infrastructure 分层
- ✅ **接口优先** - 所有跨层通信必须通过接口
- ✅ **依赖注入** - 使用依赖注入模式
- ✅ **单一职责** - 每个模块只负责一个职责

### 🌐 **国际化要求**
- ✅ **双语支持** - 所有用户界面文本必须支持中英文
- ✅ **i18n 集成** - 使用 react-i18next 进行国际化
- ✅ **时区处理** - 使用 UTC + 本地化时区转换
- ✅ **文化适配** - 考虑不同地区的文化差异

---

## 📋 **模块职责矩阵**

| 层级 | 职责 | 允许 | 禁止 | 示例 |
|------|------|------|------|------|
| **Domain** | 业务逻辑、实体、规则 | ✅ 业务规则<br>✅ 实体定义<br>✅ 领域服务 | ❌ 数据库操作<br>❌ UI 逻辑<br>❌ 网络请求 | `User.ts`, `Post.ts`, `CommentService.ts` |
| **Application** | 用例协调、流程控制 | ✅ 用例服务<br>✅ 流程编排<br>✅ 事务管理 | ❌ UI 组件<br>❌ HTTP 处理<br>❌ 业务逻辑 | `CreatePostUseCase.ts`, `LoginUseCase.ts` |
| **Infrastructure** | 外部集成、技术实现 | ✅ 数据库访问<br>✅ HTTP 客户端<br>✅ 缓存实现 | ❌ 业务逻辑<br>❌ UI 渲染<br>❌ 用户交互 | `PostRepository.ts`, `ApiClient.ts`, `CacheService.ts` |
| **Presentation** | UI 组件、用户交互 | ✅ React 组件<br>✅ 用户事件<br>✅ 状态管理 | ❌ 业务逻辑<br>❌ 数据库操作<br>❌ 复杂计算 | `PostList.tsx`, `LoginForm.tsx`, `Button.tsx` |

---

## 🎨 **设计系统约束**

### 🎯 **颜色使用**
```typescript
// ✅ 正确：使用设计系统 token
const primaryColor = theme.colors.primary[500];
const textColor = theme.colors.text.primary;

// ❌ 错误：硬编码颜色
const primaryColor = '#3B82F6';
const textColor = '#000000';
```

### 📏 **间距和尺寸**
```typescript
// ✅ 正确：使用设计系统 token
const padding = theme.spacing.md;
const fontSize = theme.typography.sizes.lg;

// ❌ 错误：硬编码尺寸
const padding = '16px';
const fontSize = '18px';
```

### 🎭 **组件约束**
- ✅ **组件库优先** - 优先使用已设计组件
- ✅ **可访问性** - 必须满足 WCAG 2.1 AA 标准
- ✅ **响应式** - 必须支持移动端和桌面端
- ❌ **自定义样式** - 避免内联样式和 CSS-in-JS

---

## 🔍 **代码质量检查清单**

### 📝 **提交前检查**
- [ ] TypeScript 编译无错误无警告
- [ ] ESLint 检查通过
- [ ] 测试覆盖率 ≥ 85%
- [ ] Bundle 大小增长 < 10%
- [ ] 性能指标无退化
- [ ] HARNESS.md 合规性检查通过

### 🧪 **测试要求**
- [ ] 单元测试覆盖所有工具函数
- [ ] 集成测试覆盖关键流程
- [ ] E2E 测试覆盖用户关键路径
- [ ] 性能测试通过基准线
- [ ] 可访问性测试通过

### 🌐 **国际化检查**
- [ ] 所有用户界面文本使用 i18n
- [ ] 中英文翻译完整
- [ ] 时区处理正确
- [ ] 文化适配考虑

---

## 📊 **性能指标约束**

### ⚡ **Core Web Vitals**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 📦 **Bundle 大小**
- **JavaScript Bundle**: < 2.1MB (当前基准)
- **CSS Bundle**: < 100KB
- **Image Assets**: 优化压缩，使用 WebP/AVIF

### 🔄 **缓存策略**
- **静态资源**: 1年缓存
- **API 响应**: 5分钟缓存
- **页面缓存**: 1小时缓存

---

## 🛡️ **安全约束**

### 🔐 **数据安全**
- ✅ **输入验证** - 所有用户输入必须验证
- ✅ **输出编码** - 防止 XSS 攻击
- ✅ **CSRF 保护** - 表单必须包含 CSRF token
- ✅ **HTTPS 强制** - 生产环境必须使用 HTTPS

### 🔒 **API 安全**
- ✅ **认证授权** - 所有 API 必须认证
- ✅ **速率限制** - 防止 API 滥用
- ✅ **数据脱敏** - 敏感数据必须脱敏
- ✅ **审计日志** - 关键操作必须记录

---

## 🔄 **维护和更新**

### 📅 **定期检查**
- **每周**: 代码质量指标检查
- **每月**: HARNESS.md 合规性审计
- **每季度**: 性能基准更新
- **每半年**: 架构约束评估

### 📝 **更新流程**
1. **识别变更需求**
2. **评估影响范围**
3. **更新 HARNESS.md**
4. **更新相关文档**
5. **通知团队成员**
6. **验证合规性**

---

## 🎯 **违规处理**

### ⚠️ **违规等级**
- **严重违规**: 阻止合并，必须修复
- **中等违规**: 需要解释，建议修复
- **轻微违规**: 记录在案，后续改进

### 🚨 **紧急修复**
- **安全漏洞**: 立即修复
- **性能退化**: 24小时内修复
- **功能故障**: 4小时内修复
- **合规问题**: 1周内修复

---

## 📚 **相关文档**

- [AGENTS.md](./AGENTS.md) - Agent 使用指南
- [WORKFLOW_GUIDE.md](./workflows/router.md) - 工作流程指南
- [SYSTEM_MAPS.md](../../docs/system-maps/) - 系统地图
- [DESIGN_TOKENS.md](../../docs/design/tokens.md) - 设计系统

---

## 🎊 **总结**

HARNESS.md 是项目的"宪法"，确保代码质量、架构一致性和长期可维护性。所有 AI Agent 和开发人员都必须严格遵守这些约束。

**记住：质量不是可选项，而是必需品。**
