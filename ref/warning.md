# 命令使用规则总结
在Windsurf Cascade中，我应该自动执行命令而不是等待用户手动确认。让我检查当前的命令使用规则并应用这个原则。

我们应该使用自动执行的Node.js脚本而不是需要手动交互的命令。避免需要手动输入 h q 退出的问题。

## 避免使用的命令

### PowerShell直接命令
- **避免使用原生PowerShell命令**
- 示例：`Get-ChildItem`, `Set-Content`, `Copy-Item`

### 复杂shell链式
- **避免复杂的命令行链式操作**
- 示例：`command1 | command2 | command3`

### 平台特定命令
- **避免使用grep等Unix命令在Windows环境**
- 示例：`grep`, `sed`, `awk`, `find`

## 推荐的命令

### 简单Node.js脚本
- **优先使用Node.js脚本，方便后续复用**
    因为我们使用的是es module，使用.cjs
- 优势：跨平台兼容、易于维护、可集成到项目

### PowerShell -Command格式
- **如必须使用PowerShell，则使用powershell -Command格式**
- 示例：`powershell -Command "Get-ChildItem"`

### 标准命令接口
- **npm run ...**：使用npm scripts作为标准命令接口
- **node scripts/...**：使用Node.js脚本作为标准命令接口

## 实施原则

1. **跨平台兼容性**：确保命令在Windows、macOS、Linux上都能运行
2. **可维护性**：优先选择易于理解和维护的解决方案
3. **可复用性**：创建可在项目中重复使用的脚本
4. **一致性**：在整个项目中保持命令使用风格的一致性

## 常用命令替换方案

| 避免使用 | 推荐替换 |
|---------|---------|
| `ls` / `dir` | `node scripts/list-files.js` |
| `grep pattern file` | `node scripts/search.js pattern file` |
| `find . -name "*.js"` | `node scripts/find-js-files.js` |

## 交互式命令原则

### 禁止使用交互式命令
- **禁止使用需要用户输入的命令**
- **禁止使用需要手动确认的命令**
- **禁止使用需要用户选择选项的命令**

### 必须使用自动化命令
- **所有命令必须自动执行**
- **所有命令必须可重复执行**
- **所有命令必须有明确的返回值**

### 命令开发规范

#### 脚本要求
- 所有脚本必须是无交互式的
- 所有脚本必须有错误处理
- 所有脚本必须有日志输出
- 所有脚本必须有返回值

#### 命令要求
- 优先使用 `npm run` 而不是直接调用脚本
- 优先使用 `node scripts/` 而不是复杂的shell命令
- 所有命令必须支持参数传递

#### 测试要求
- 所有测试必须自动运行
- 所有测试必须有明确的通过/失败标准
- 所有测试必须生成测试报告

## 相关资源

- **Node.js文档**：https://nodejs.org/docs/
- **npm scripts指南**：https://docs.npmjs.com/cli/v8/using-npm/scripts
- **PowerShell文档**：https://docs.microsoft.com/powershell/

---
*最后更新：2026年3月*
