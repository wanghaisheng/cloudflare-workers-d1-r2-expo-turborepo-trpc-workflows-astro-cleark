# 🤖 AGENTS.md - AI Agent 指南

> **AI Agent 使用指南：当前上下文、工作流程和最佳实践**

---

## 🎯 **Agent 角色定义**

### 🧠 **主要角色**
- **Codex Agent**: 代码生成、重构、测试
- **Spec Agent**: 需求分析、设计文档、技术规范
- **Test Agent**: 测试用例、质量检查、性能验证
- **Review Agent**: 代码审查、合规性检查、最佳实践

### 🤖 **专业化 Agent 角色**
- **Research Agent**: 代码库探索、实现细节研究、技术方案调研
- **Planning Agent**: 需求分解、任务结构化规划、里程碑定义
- **Execution Agent**: 代码实现、测试编写、文档更新、错误修复
- **Review Agent**: 代码审查、质量检查、合规性验证、性能分析

### � **智能 Agent 发现系统**
- **全资源扫描**: 自动发现 `ref/` 文件夹下的所有 Agent 资源
- **智能匹配**: 根据任务类型、技能要求进行智能匹配
- **动态调度**: 支持单 Agent 和多 Agent 协作
- **全生命周期支持**: 支持概念规划、内容营销、工程开发、增长优化

### 📊 **Agent 资源库**
- **_bmad/**: 基础 BMAD Agent 库
- **agency-agents-main/**: 专业 Agent 库 (工程、营销、产品、策略等)
- **content/**: 内容类 Agent 资源
- **ai-coding-agent-seo-skills-main/**: AI 编程 SEO Agent
- **ui-ux-pro-max-skill-main/**: UI/UX 专业 Agent
- **platform-design-skills-main/**: 平台设计 Agent
- **others/**: 其他专业化 Agent 资源

### � **协作模式**
- **单一 Agent**: Quick 模式 (< 750 行任务)
- **多 Agent 协作**: BMM 模式 (> 750 行任务)
- **专业化协作**: 研究 → 规划 → 执行 → 审查
- **Agent 迭代**: 通过 Ralph Loop 自我改进

---

## 📍 **当前项目状态**

### 🏗️ **项目架构**
- **框架**: React 18 + TanStack Router + Tailwind CSS + TypeScript
- **后端**: Supabase (PostgreSQL + 实时数据库)
- **部署**: Vercel + Edge Functions
- **内容**: Markdown + MDX + 静态生成

### 📊 **技术栈详情**
```typescript
// 核心依赖
{
  "react": "^19.2.4",
  "@tanstack/react-router": "^1.158.4",
  "tailwindcss": "^3.x",
  "typescript": "^5.x",
  "vitest": "^2.x",
  "supabase": "^2.89.0"
}

// 开发工具
{
  "vite": "^5.x",
  "eslint": "^9.x",
  "prettier": "^3.x",
  "postcss": "^8.x"
}
```

### 📁 **目录结构**
```
src/
├── components/          # React 组件
│   ├── blog/           # 博客相关组件
│   ├── ui/             # UI 基础组件
│   └── layout/         # 布局组件
├── routes/              # 路由定义
│   └── {$locale}/      # 国际化路由
├── hooks/               # 自定义 Hooks
├── utils/               # 工具函数
├── types/               # TypeScript 类型
└── lib/                 # 第三方库配置
```

---

## 🎯 **当前任务上下文**

### 📋 **最近完成的工作**
- ✅ **技术优化提案**: 100% 完成 (4/4 Milestones)
- ✅ **Scripts 目录整理**: 88 个文件分类到 9 个子目录
- ✅ **开发指南**: 完整的脚本开发指南和重复检查工具
- ✅ **TypeScript 优化**: 1114+ 类型注解，88% 严格模式

### 🔄 **进行中的工作**
- 🔄 **内容质量优化**: CORE + EEAT + Humanizer 框架应用
- 🔄 **SEO 结构化数据**: 完善结构化数据和 meta 标签
- 🔄 **性能优化**: Bundle 分析和优化
- 🔄 **国际化完善**: 中英文双语支持

### 📊 **项目指标**
- **代码覆盖率**: 85%+
- **TypeScript 覆盖率**: 90%+
- **Bundle 大小**: 2.12MB
- **性能分数**: 90%+
- **SEO 评分**: 80%+

---

## 🚀 **工作流程指南**

### 📝 **Quick 模式 (< 750 行)**
```markdown
1. 分析任务需求
2. 检查 HARNESS.md 合规性
3. 实现代码
4. 运行 Ralph Loop
5. 提交代码
```

### 🏗️ **BMM 模式 (> 750 行)**
```markdown
1. 需求分析 (@brief)
2. 技术设计 (@spec)
3. 实现故事 (@dev-story)
4. 质量检查 (@quality)
5. 验证测试 (@check)
6. 归档总结 (@archive)
```

### 🔄 **Ralph Loop (自我迭代)**
```markdown
After implementing:

1. **质量检查**
   - npm run test
   - npm run lint
   - npm run type-check

2. **合规自检**
   - 检查 HARNESS.md 违规
   - 验证 i18n 合规性
   - 检查设计 token 使用

3. **性能验证**
   - npm run test:performance
   - Bundle 分析
   - Core Web Vitals 检查

4. **文档更新**
   - 更新相关 system maps
   - 添加必要的 ADR
   - 更新 CHANGELOG
```

---

## 🔍 **Agent 发现系统使用指南**

### 📋 **智能 Agent 发现**
```bash
# 扫描所有可用的 Agent 资源
npm run agent:scan

# 搜索特定技能的 Agent
npm run agent:search --skills "前端开发"
npm run agent:search --skills "营销策略"
npm run agent:search --skills "产品设计"

# 搜索特定阶段的 Agent
npm run agent:search --phase "marketing"
npm run agent:search --phase "engineering"
npm run agent:search --phase "growth"
```

### 🎯 **智能任务匹配**
```bash
# 为任务匹配最合适的 Agent
npm run agent:match --task "React 前端开发"
npm run agent:match --task "SEO 优化"
npm run agent:match --task "社交媒体营销"
npm run agent:match --task "产品策略规划"
```

### 📊 **Agent 资源统计**
```bash
# 查看 Agent 资源统计
npm run agent:stats

# 按类别查看 Agent
npm run agent:stats --category "engineering"
npm run agent:stats --category "marketing"
npm run agent:stats --category "product"
```

### 🔧 **Agent 性能验证**
```bash
# 验证特定 Agent 的性能
npm run agent:validate --agent "ui-ux-pro-max-skill"
npm run agent:validate --agent "marketing-seo-specialist"
npm run agent:validate --agent "product-trend-researcher"
```

### 📋 **全生命周期 Agent 使用示例**

#### 🚀 **概念规划阶段**
```typescript
// 市场研究任务
const marketResearchTask = {
  type: "marketResearch",
  description: "分析市场趋势和竞品",
  requiredSkills: ["市场分析", "趋势研究", "竞品分析"]
};

// 自动匹配和调度
const assignment = await agentScheduler.scheduleSingleAgent(marketResearchTask);
// 结果: 匹配到 product-trend-researcher
```

#### 📝 **内容营销阶段**
```typescript
// SEO 优化任务
const seoTask = {
  type: "contentMarketing",
  description: "优化网站 SEO 和内容策略",
  requiredSkills: ["SEO优化", "内容策略", "关键词分析"]
};

// 多 Agent 协作
const team = await agentScheduler.scheduleMultiAgent(seoTask);
// 结果: 营销 Agent + SEO Agent + 内容 Agent 团队
```

#### 🛠️ **工程开发阶段**
```typescript
// 前端开发任务
const frontendTask = {
  type: "engineering",
  description: "开发用户界面和交互",
  requiredSkills: ["React开发", "TypeScript", "UI/UX"]
};

// 智能匹配
const assignment = await agentScheduler.scheduleSingleAgent(frontendTask);
// 结果: 匹配到 ui-ux-pro-max-skill
```

#### 📈 **增长优化阶段**
```typescript
// 增长黑客任务
const growthTask = {
  type: "growth",
  description: "A/B 测试和转化率优化",
  requiredSkills: ["增长黑客", "数据分析", "A/B测试"]
};

// 自动匹配
const assignment = await agentScheduler.scheduleSingleAgent(growthTask);
// 结果: 匹配到 marketing-growth-hacker
```

---

## 🎯 **Agent 资源库扩展**

### 📋 **持续更新**
- **自动发现**: 系统自动发现新的 Agent 资源
- **智能索引**: 建立技能和能力的智能索引
- **性能追踪**: 追踪 Agent 使用效果和性能
- **动态优化**: 基于使用数据优化匹配算法

### 🔄 **社区贡献**
- **Agent 贡献**: 欢迎社区贡献新的 Agent 资源
- **技能标签**: 标准化 Agent 技能标签和分类
- **最佳实践**: 收集和分享 Agent 最佳实践
- **性能基准**: 建立 Agent 性能基准

### 📚 **知识库集成**
- **经验积累**: 积累 Agent 使用经验和教训
- **模式识别**: 识别成功的 Agent 协作模式
- **案例研究**: 记录成功的 Agent 应用案例
- **持续学习**: 从使用反馈中持续改进

## 🎯 **Agent 专用约束**

### 📝 **代码生成约束**
- ✅ **优先使用现有组件** - 检查 `src/components/`
- ✅ **遵循命名约定** - 使用 PascalCase 组件, camelCase 变量
- ✅ **添加 TypeScript 类型** - 严格的类型定义
- ✅ **包含错误处理** - 使用 ErrorBoundary 和 try-catch
- ✅ **国际化支持** - 使用 `useTranslation` Hook

### 🧪 **测试生成约束**
- ✅ **单元测试** - 使用 Vitest 和 React Testing Library
- ✅ **集成测试** - 测试组件间交互
- ✅ **E2E 测试** - 测试用户关键路径
- ✅ **性能测试** - 使用 Lighthouse 和 Web Vitals
- ✅ **可访问性测试** - 使用 axe-core

### 📋 **文档生成约束**
- ✅ **JSDoc 注释** - 为所有公共函数添加
- ✅ **README 更新** - 更新相关文档
- ✅ **CHANGELOG 记录** - 记录重要变更
- ✅ **System Maps 更新** - 更新系统地图
- ✅ **ADR 创建** - 重要架构决策记录

---

## 🔍 **常见场景处理**

### 🏗️ **组件开发**
```typescript
// ✅ 标准组件模板
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface ComponentProps {
  // 明确的 TypeScript 类型
}

export function ComponentName({ prop }: ComponentProps) {
  const { t } = useTranslation();
  
  try {
    // 组件逻辑
    return <div>{t('component.text')}</div>;
  } catch (error) {
    // 错误处理
    return <ErrorBoundary error={error} />;
  }
}
```

### 🧪 **测试编写**
```typescript
// ✅ 标准测试模板
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('expected text')).toBeInTheDocument();
  });
  
  it('should handle errors', () => {
    // 错误处理测试
  });
});
```

### 📝 **工具函数**
```typescript
// ✅ 标准工具函数模板
/**
 * 函数描述
 * @param param 参数描述
 * @returns 返回值描述
 */
export function utilityFunction(param: string): string {
  // 实现逻辑
  return result;
}
```

---

## 🎯 **最佳实践**

### 🏗️ **组件设计**
- **单一职责**: 每个组件只负责一个功能
- **可复用性**: 设计可复用的通用组件
- **性能优化**: 使用 React.memo 和 useMemo
- **可访问性**: 添加 ARIA 标签和语义化 HTML

### 🧪 **测试策略**
- **测试金字塔**: 单元测试 > 集成测试 > E2E 测试
- **覆盖率要求**: ≥ 85% 代码覆盖率
- **测试命名**: 使用描述性的测试名称
- **测试数据**: 使用工厂函数创建测试数据

### 📝 **代码质量**
- **TypeScript 严格**: 启用所有严格选项
- **ESLint 规则**: 遵循项目 ESLint 配置
- **Prettier 格式**: 统一代码格式
- **代码审查**: 所有代码必须通过审查

---

## 🔄 **Agent 协作模式**

### 🤝 **多 Agent 协作**
```markdown
1. **Spec Agent**: 分析需求，创建技术规范
2. **Codex Agent**: 根据规范实现代码
3. **Test Agent**: 创建测试用例
4. **Review Agent**: 代码审查和质量检查
```

### 📊 **任务分配**
- **小型任务** (< 750 行): 单一 Agent 完成
- **中型任务** (750-2000 行): 2-3 Agent 协作
- **大型任务** (> 2000 行): 4+ Agent 协作

### 🎯 **质量保证**
- **每个 Agent**: 都要检查 HARNESS.md 合规性
- **协作接口**: 使用标准化的接口定义
- **进度跟踪**: 使用 WBS 方法跟踪进度
- **质量门禁**: 每个 Agent 都要通过 Ralph Loop

---

## 🚨 **常见错误处理**

### 📝 **常见错误**
- **类型错误**: 使用 `any` 类型
- **性能问题**: 未优化的组件
- **国际化错误**: 硬编码文本
- **测试缺失**: 缺少必要的测试

### 🔧 **解决方案**
- **类型安全**: 使用严格的 TypeScript 类型
- **性能优化**: 使用 React 优化技巧
- **国际化**: 使用 react-i18next
- **测试完整**: 编写全面的测试

---

## 🎊 **总结**

AGENTS.md 为 AI Agent 提供了完整的项目上下文和工作指南，确保 Agent 能够：

1. **理解项目**: 了解当前项目状态和技术栈
2. **遵循规范**: 严格遵守 HARNESS.md 约束
3. **高效协作**: 与其他 Agent 有效协作
4. **质量保证**: 通过 Ralph Loop 自我迭代


现在要“增加新的 agent”，最小可行的标准做法（不等你们把 discovery 系统实现完）
把 agent/skill 资源放进 ref/ 的一个明确目录（按你们既有分类：engineering / product / marketing / uiux…）
在 .codex/AGENTS.md 增加一条“可用 agent 注册表”式的条目（名字、用途、输入输出、适用阶段、典型任务、注意事项）
在 .codex/workflows/aliases.md 增加一个轻量别名（可选）
比如 ux / qa / reviewer / research 这种“调用意图”，映射到对应参考文档或 agent 说明页（即使没有自动扫描，也能让使用者快速定位）、

**记住：Agent 的成功 = 遵循约束 + 理解上下文 + 高效协作**
