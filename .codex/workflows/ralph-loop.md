# 🔄 Ralph Loop - 自我迭代闭环

> **每次任务完成后必须执行的标准化质量检查流程**

---

## 🎯 **Ralph Loop 概述**

Ralph Loop 是基于《辛普森一家》中 Ralph Wiggum 名字命名的自我迭代机制。它确保每次代码提交前都经过完整的质量检查和合规验证，实现 Agent 的自我纠错和持续改进。

---

## 📋 **Ralph Loop 执行时机**

### 🚀 **必须执行的场景**
- ✅ **每次代码提交前**
- ✅ **每个功能完成时**
- ✅ **每个里程碑结束时**
- ✅ **每个 PR 创建前**

### 📝 **执行频率**
- **Quick 模式**: 每个任务完成后
- **BMM 模式**: 每个阶段完成后
- **大型项目**: 每个里程碑完成后

---

## 🔄 **Ralph Loop 标准流程**

### 1️⃣ **质量检查阶段**

#### 🧪 **测试执行**
```bash
# 运行所有测试
npm run test

# 检查测试覆盖率
npm run test:coverage

# 运行特定测试
npm run test:unit
npm run test:integration
npm run test:e2e
```

**验证标准**:
- ✅ 所有测试通过 (100% success rate)
- ✅ 测试覆盖率 ≥ 85%
- ✅ 无超时测试
- ✅ 无内存泄漏

#### 🔍 **代码质量检查**
```bash
# ESLint 检查
npm run lint

# TypeScript 类型检查
npm run type-check

# Prettier 格式检查
npm run format:check
```

**验证标准**:
- ✅ ESLint 无错误无警告
- ✅ TypeScript 编译无错误
- ✅ Prettier 格式正确
- ✅ 无未使用的导入

#### 📦 **Bundle 分析**
```bash
# Bundle 大小检查
npm run test:performance:bundle

# 性能分析
npm run test:performance

# Bundle 优化检查
npm run report:bundle
```

**验证标准**:
- ✅ Bundle 大小增长 < 10%
- ✅ 性能指标无退化
- ✅ 无新的性能瓶颈
- ✅ Bundle 分割合理

---

### 2️⃣ **合规自检阶段**

#### 🛡️ **HARNESS.md 合规检查**
```bash
# HARNESS 合规性检查
node scripts/utility/harness-validation.cjs
```

**检查项目**:
- ✅ 无 `any` 类型使用
- ✅ 无硬编码颜色值
- ✅ 无直接 DOM 操作
- ✅ 无循环依赖
- ✅ 无全局状态
- ✅ 无硬编码文本

#### 🌐 **国际化检查**
```bash
# i18n 合规性检查
npm run test:i18n

# 翻译完整性检查
npm run test:i18n:completeness
```

**检查项目**:
- ✅ 所有用户界面文本使用 i18n
- ✅ 中英文翻译完整
- ✅ 时区处理正确
- ✅ 文化适配考虑

#### 🎨 **设计系统检查**
```bash
# Design Token 使用检查
npm run test:design-tokens

# 组件库使用检查
npm run test:component-usage
```

**检查项目**:
- ✅ 使用设计系统 token
- ✅ 无硬编码样式
- ✅ 组件库使用正确
- ✅ 可访问性标准符合

---

### 3️⃣ **性能验证阶段**

#### ⚡ **Core Web Vitals 检查**
```bash
# Core Web Vitals 测试
npm run test:performance:vitals

# Lighthouse 测试
npm run test:lighthouse
```

**验证标准**:
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1
- ✅ Lighthouse 分数 ≥ 90

#### 📊 **性能基准检查**
```bash
# 性能基准测试
npm run test:performance:benchmark

# 内存使用检查
npm run test:performance:memory
```

**验证标准**:
- ✅ 性能基准达标
- ✅ 无内存泄漏
- ✅ 响应时间合理
- ✅ 资源使用优化

---

### 4️⃣ **文档更新阶段**

#### 📝 **代码文档**
```bash
# JSDoc 检查
npm run test:jsdoc

# API 文档生成
npm run docs:api
```

**更新要求**:
- ✅ 所有公共函数有 JSDoc 注释
- ✅ 组件 Props 有完整文档
- ✅ API 文档更新
- ✅ 使用示例完整

#### 🗺️ **System Maps 更新**
```bash
# System Maps 检查
npm run test:system-maps

# 架构文档更新
npm run docs:architecture
```

**更新要求**:
- ✅ 相关 System Maps 更新
- ✅ 架构图更新
- ✅ 依赖关系更新
- ✅ 接口文档更新

#### 📋 **变更记录**
```bash
# CHANGELOG 更新
npm run changelog:update

# 版本号检查
npm run version:check
```

**更新要求**:
- ✅ CHANGELOG 记录所有变更
- ✅ 版本号符合语义化版本规范
- ✅ 破坏性变更标记
- ✅ 迁移指南提供

---

## 🚨 **Ralph Loop 失败处理**

### ⚠️ **失败等级**

#### 🔴 **严重失败** - 阻止提交
- **测试失败**: 任何测试失败
- **类型错误**: TypeScript 编译错误
- **性能退化**: Core Web Vitals 不达标
- **安全漏洞**: 发现安全问题

**处理流程**:
1. 立即停止提交
2. 修复所有问题
3. 重新运行 Ralph Loop
4. 验证所有检查通过

#### 🟡 **中等失败** - 需要解释
- **覆盖率不足**: 测试覆盖率 < 85%
- **性能警告**: 性能指标接近阈值
- **文档不完整**: 缺少部分文档
- **代码质量**: 轻微代码质量问题

**处理流程**:
1. 记录问题并解释原因
2. 创建修复计划
3. 在 PR 中说明情况
4. 确定修复时间表

#### 🟢 **轻微失败** - 记录改进
- **格式问题**: 轻微格式问题
- **注释缺失**: 部分注释缺失
- **优化机会**: 性能优化机会
- **代码风格**: 代码风格改进

**处理流程**:
1. 记录改进点
2. 添加到技术债务清单
3. 计划后续改进
4. 继续提交流程

---

## 📊 **Ralph Loop 报告**

### 📋 **报告模板**
```markdown
# Ralph Loop Report

## 🧪 质量检查
- ✅ 测试通过率: 100%
- ✅ 测试覆盖率: 87%
- ✅ ESLint: 0 errors, 0 warnings
- ✅ TypeScript: 0 errors, 0 warnings

## 🛡️ 合规检查
- ✅ HARNESS.md: 0 violations
- ✅ i18n: 100% compliant
- ✅ Design Tokens: 100% compliant

## ⚡ 性能验证
- ✅ LCP: 1.8s (目标 < 2.5s)
- ✅ FID: 45ms (目标 < 100ms)
- ✅ CLS: 0.05 (目标 < 0.1)
- ✅ Lighthouse: 95 (目标 ≥ 90)

## 📝 文档更新
- ✅ JSDoc: 100% complete
- ✅ System Maps: Updated
- ✅ CHANGELOG: Updated
- ✅ API Docs: Generated

## 🎯 总体评估
- ✅ 所有检查通过
- ✅ 质量指标达标
- ✅ 准备提交
```

### 📈 **指标追踪**
```typescript
interface RalphLoopMetrics {
  testSuccessRate: number;      // 测试成功率
  testCoverage: number;         // 测试覆盖率
  eslintErrors: number;         // ESLint 错误数
  eslintWarnings: number;      // ESLint 警告数
  typeScriptErrors: number;    // TypeScript 错误数
  harnessViolations: number;    // HARNESS 违规数
  i18nCompliance: number;       // 国际化合规率
  lcp: number;                 // LCP 时间
  fid: number;                  // FID 时间
  cls: number;                  // CLS 分数
  lighthouseScore: number;      // Lighthouse 分数
  jsdocCoverage: number;       // JSDoc 覆盖率
  systemMapsUpdated: boolean;   // System Maps 更新状态
  changelogUpdated: boolean;    // CHANGELOG 更新状态
}
```

---

## 🔄 **Ralph Loop 自动化**

### 🤖 **自动化脚本**
```javascript
// scripts/utility/ralph-loop.cjs
/**
 * Ralph Loop 自动化执行脚本
 */

async function runRalphLoop() {
  console.log('🔄 Starting Ralph Loop...');
  
  try {
    // 1. 质量检查
    await runQualityChecks();
    
    // 2. 合规自检
    await runComplianceChecks();
    
    // 3. 性能验证
    await runPerformanceChecks();
    
    // 4. 文档更新
    await runDocumentationChecks();
    
    // 5. 生成报告
    await generateReport();
    
    console.log('✅ Ralph Loop completed successfully!');
  } catch (error) {
    console.error('❌ Ralph Loop failed:', error);
    process.exit(1);
  }
}
```

### 📦 **NPM 脚本**
```json
{
  "scripts": {
    "ralph:loop": "node scripts/utility/ralph-loop.cjs",
    "ralph:check": "npm run test && npm run lint && npm run type-check && npm run ralph:loop",
    "ralph:quick": "npm run test:unit && npm run lint && npm run ralph:loop:quick",
    "ralph:full": "npm run ralph:check && npm run test:e2e && npm run test:performance"
  }
}
```

---

## 🎯 **最佳实践**

### 📝 **执行频率**
- **每次提交**: 运行完整 Ralph Loop
- **功能完成**: 运行完整验证
- **里程碑**: 运行全面检查
- **发布前**: 运行完整测试套件

### 🔧 **工具集成**
- **IDE 集成**: 在 IDE 中集成 Ralph Loop 快捷键
- **Git Hooks**: 使用 Git Hooks 自动执行
- **CI/CD 集成**: 在 CI/CD 流水线中执行
- **监控集成**: 集成到监控系统

### 📊 **持续改进**
- **指标追踪**: 追踪 Ralph Loop 指标趋势
- **流程优化**: 持续优化 Ralph Loop 流程
- **工具改进**: 改进自动化工具
- **团队培训**: 培训团队使用 Ralph Loop

---

## 🎊 **总结**

Ralph Loop 是确保代码质量和项目健康的关键机制。通过标准化的质量检查、合规验证、性能测试和文档更新，Ralph Loop 实现了 Agent 的自我纠错和持续改进。

**记住：Ralph Loop 不是负担，而是质量保证的守护者。**
