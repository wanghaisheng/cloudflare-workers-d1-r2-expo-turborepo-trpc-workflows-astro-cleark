# Help System

## Purpose

Provide comprehensive help and guidance for using the unified workflow system.

## Help Content

### Quick Start Guide

#### 🎯 Basic Usage
```bash
# Create new change
@workflow 创建组件组织变更
@w 创建用户认证功能

# Implement feature
@workflow 实施组件重构
@w 开发新功能

# Check compliance
@workflow 检查变更合规性
@w 验证代码质量

# Get help
@workflow 帮助
@w 教程
```

#### 🔍 Intent Detection
The unified workflow automatically detects your intent:

| Intent | Keywords | Routes To |
|--------|----------|----------|
| **Create/Analyze** | 创建, 新建, 增加, 添加, 生成, 分析, 调研, 研究, 评估 | `@workflow-quick-spec` |
| **Implement/Modify** | 实施, 开发, 实现, 重构, 修改, 添加, 功能 | `@workflow-quick-dev` |
| **Check/Validate** | 检查, 验证, 测试, 确认, 合规 | `@workflow-check-compliance` |
| **Help/Guide** | 帮助, 指导, 教程, 说明, 如何 | Help System |

#### 📝 Examples

**Creating New Changes:**
```bash
@workflow 创建组件组织变更
@w 分析src\components下文件的管理和组织
@workflow 新建用户认证功能
@w 生成项目文档
```

**Implementing Features:**
```bash
@workflow 实施组件重构
@w 开发用户认证功能
@workflow 修改现有代码
@w 添加新功能
```

**Checking Compliance:**
```bash
@workflow 检查变更合规性
@w 验证代码质量
@workflow 测试功能完整性
@w 确认文档完整性
```

**Getting Help:**
```bash
@workflow 帮助
@w 指导如何创建变更
@workflow 教程：如何实施功能
@w 说明工作流使用方法
```

### Advanced Usage

#### 🎯 Mode Selection
The unified workflow automatically selects the appropriate mode based on project complexity:

- **Quick Dev Mode**: For small to medium projects (like Balance-X)
- **BMM Mode**: For large, complex projects with team collaboration

#### 🔧 Custom Routing
You can specify the target workflow explicitly:

```bash
# Explicit routing
@workflow quick-spec 创建组件组织变更
@w quick-dev 实施用户认证功能
@workflow check-compliance 检查变更合规性
```

#### 📊 Project Context
The unified workflow considers project context:

```typescript
// Balance-X project context
const projectContext = {
  name: "Balance-X",
  type: "health-information",
  complexity: "medium",
  teamSize: "small",
  preferredMode: "quick-dev"
};
```

### Troubleshooting

#### 🚨 Common Issues

**Issue: Intent Not Detected**
```bash
# Problem: @workflow 未知请求
# Solution: Use clear intent keywords
@workflow 创建新功能  # ✅ Clear intent
@w 开发用户认证    # ✅ Clear intent
```

**Issue: Workflow Not Found**
```bash
# Problem: @workflow 未知工作流
# Solution: Use standard workflow names
@workflow quick-spec  # ✅ Standard workflow
@w quick-dev        # ✅ Standard workflow
```

**Issue: Execution Failed**
```bash
# Problem: @workflow 执行失败
# Solution: Check input and try again
@workflow 创建简单功能  # ✅ Simpler input
@w 检查基础合规性    # ✅ Basic check
```

#### 🔧 Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `无法识别意图` | No intent keywords detected | Use clear intent keywords |
| `工作流未找到` | Invalid workflow name | Use standard workflow names |
| `执行失败` | Workflow execution error | Check input and retry |
| `系统错误` | System-level error | Contact support |

### Best Practices

#### ✅ Do's
- Use clear intent keywords
- Provide specific descriptions
- Follow standard workflow names
- Use appropriate intent for your task

#### ❌ Don'ts
- Use vague descriptions
- Mix multiple intents in one request
- Use non-standard workflow names
- Skip intent keywords

#### 🎯 Tips for Better Results

1. **Be Specific**: "创建组件组织变更" is better than "创建东西"
2. **Use Keywords**: Include intent keywords like "创建", "实施", "检查"
3. **Stay Focused**: One intent per request for best results
4. **Follow Examples**: Use the examples as templates

### Integration with Existing Workflows

#### 🔄 Quick Spec Integration
```bash
# Equivalent commands
@workflow 创建组件组织变更
@workflow-quick-spec 创建组件组织变更
```

#### 🔄 Quick Dev Integration
```bash
# Equivalent commands
@workflow 实施组件重构
@workflow-quick-dev 实施组件重构
```

#### 🔄 Check Compliance Integration
```bash
# Equivalent commands
@workflow 检查变更合规性
@workflow-check-compliance 检查变更合规性
```

### Performance Tips

#### ⚡ Fast Usage
- Use `@w` for fastest access (2 characters)
- Use clear intent keywords for quick routing
- Avoid complex descriptions for simple tasks

#### 📈 Efficiency
- One request per intent for best performance
- Use standard workflow names for direct routing
- Provide specific input for better results

### Advanced Features

#### 🎯 Smart Suggestions
The unified workflow provides smart suggestions:

```bash
# When user says "创建组件" without @workflow
# System suggests: 检测到创建意图，建议使用：@workflow 或 @w
```

#### 🔍 Context Awareness
The system considers project context:

```bash
# For Balance-X project
@workflow 创建功能  # Routes to quick-dev (preferred mode)
```

#### 📊 Usage Analytics
The system tracks usage patterns:

```typescript
interface UsageAnalytics {
  mostUsedIntents: string[];
  averageExecutionTime: number;
  successRate: number;
  userSatisfaction: number;
}
```

### Future Enhancements

#### 🚀 Planned Features
- **Voice Support**: Voice command recognition
- **Multilingual**: Support for multiple languages
- **GUI Integration**: Visual workflow selection
- **Machine Learning**: Improved intent detection

#### 🔮 Experimental Features
- **Predictive Routing**: Suggest next actions
- **Context Memory**: Remember previous interactions
- **Personalization**: Adapt to user preferences

### Support

#### 📞 Getting Help
- Use `@workflow help` for quick assistance
- Use `@w 帮助` for fastest help access
- Check documentation for detailed guidance

#### 📚 Documentation
- User Guide: Comprehensive usage instructions
- Developer Guide: Technical implementation details
- API Reference: Complete API documentation

#### 🐛 Bug Reports
- Report issues through the help system
- Provide detailed error descriptions
- Include usage examples for reproduction

---

*Help System created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
