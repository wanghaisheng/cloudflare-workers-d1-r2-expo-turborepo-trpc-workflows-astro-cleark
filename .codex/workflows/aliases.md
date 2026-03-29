<!-- input: codex workflow entry points and user convenience patterns -->
<!-- output: convenient alias mappings for spec and dev workflows -->
<!-- pos: workflow aliases for improved user experience -->
# Workflow Aliases

## 🎯 目的

为 `.codex` 工作流提供便捷的别名映射，提升用户体验和工作流效率。

## 📋 别名映射

### 入口点别名
- **`spec`** → `.codex/workflows/spec.md`
- **`dev`** → `.codex/workflows/dev.md`

### 执行模式别名
- **`quick`** → `.codex/workflows/quick.md`
- **`bmm`** → `.codex/workflows/bmm.md`

### 支持工作流别名
- **`review`** → `.codex/workflows/review.md`
- **`validate`** → `.codex/workflows/validate.md`
- **`archive`** → `.codex/workflows/archive.md`
- **`hygiene`** → `.codex/workflows/hygiene.md`

### 核心规则别名
- **`pilot`** → `.codex/core/pilot-promotion.md`
- **`commands`** → `.codex/core/command-standards.md`
- **`harness`** → `.codex/core/harness.md`
- **`rules`** → `.codex/PROJECT-RULES.md`

## 🚀 使用方式

### 直接别名调用
```
用户: spec 新功能设计
→ 自动加载 .codex/workflows/spec.md

用户: dev 修复bug
→ 自动加载 .codex/workflows/dev.md

用户: pilot 批量更新
→ 自动加载 .codex/core/pilot-promotion.md
```

### 组合使用
```
用户: spec pilot 重构项目
→ 先加载 spec.md，然后根据路由决定是否需要 pilot-promotion.md

用户: dev commands 优化脚本
→ 先加载 dev.md，应用 command-standards.md 规则
```

## 🔧 智能路由

### 基于关键词的自动增强
- 当用户请求包含 **"批量"**、**"推广"**、**"重构"** 等关键词时，自动加载 `pilot-promotion.md`
- 当用户请求包含 **"命令"**、**"脚本"**、**"执行"** 等关键词时，自动加载 `command-standards.md`
- 当用户请求包含 **"试点"**、**"验证"**、**"测试"** 等关键词时，自动应用试点推广流程

### 上下文感知
- 根据当前工作目录和文件类型，智能推荐相关的工作流和规则
- 基于历史操作模式，提供个性化的工作流建议

## 📋 别名检查清单

### 使用前检查
- [ ] 确认别名映射正确
- [ ] 验证目标文档存在
- [ ] 检查文档内容完整性
- [ ] 确认权限和访问性

### 使用后验证
- [ ] 工作流是否正确加载？
- [ ] 规则是否正确应用？
- [ ] 用户体验是否流畅？
- [ ] 是否需要调整别名？

## 🎯 用户体验优化

### 简化输入
- 支持简短别名，减少用户输入负担
- 提供自动补全和建议
- 支持模糊匹配和容错

### 智能提示
- 根据上下文提供相关别名建议
- 显示别名对应的完整文档路径
- 提供使用示例和最佳实践

### 反馈循环
- 收集用户使用反馈
- 持续优化别名映射
- 添加新的便捷别名

## 📚 相关资源

- `.codex/workflows/router.md` - 工作流路由
- `.codex/workflows/spec.md` - 规格工作流
- `.codex/workflows/dev.md` - 开发工作流
- `.codex/core/pilot-promotion.md` - 试点推广方法
- `.codex/core/command-standards.md` - 命令执行标准

---

*最后更新：2026年3月*
