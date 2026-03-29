<!-- input: ref/warning.md command usage rules and platform compatibility guidelines -->
<!-- output: standardized command execution standards for Codex workflows -->
<!-- pos: command execution standards ensuring cross-platform compatibility -->
# Command Execution Standards

## 🎯 核心原则

在Windsurf Cascade中，应该自动执行命令而不是等待用户手动确认。同时确保跨平台兼容性和可维护性。

## 🚫 避免使用的命令

### PowerShell直接命令
- **避免使用原生PowerShell命令**
- 示例：`Get-ChildItem`, `Set-Content`, `Copy-Item`

### 复杂shell链式
- **避免复杂的命令行链式操作**
- 示例：`command1 | command2 | command3`

### 平台特定命令
- **避免使用grep等Unix命令在Windows环境**
- 示例：`grep`, `sed`, `awk`, `find`

### 批量脚本
- **尽量避免使用批量的脚本**
- 即使要使用，也要优先用一个文件进行测试通过后再延伸到其他文件

## ✅ 推荐的命令

### 简单Node.js脚本
- **优先使用Node.js脚本，方便后续复用**
- 因为我们使用的是es module
- 优势：跨平台兼容、易于维护、可集成到项目

### PowerShell -Command格式
- **如必须使用PowerShell，则使用powershell -Command格式**
- 示例：`powershell -Command "Get-ChildItem"`

### 标准命令接口
- **npm run ...**：使用npm scripts作为标准命令接口
- **node scripts/...**：使用Node.js脚本作为标准命令接口

## 📝 实施原则

1. **跨平台兼容性**：确保命令在Windows、macOS、Linux上都能运行
2. **可维护性**：优先选择易于理解和维护的解决方案
3. **可复用性**：创建可在项目中重复使用的脚本
4. **一致性**：在整个项目中保持命令使用风格的一致性

## 📁 脚本输出目录一致性（报告与产物）

当脚本需要产出报告/检查结果/可供后续排查的工件时，统一写到：

- `reports/<area>/...`

约定：

- `<area>` 用小写短名，例如 `governance`, `docs`, `scripts`, `e2e`
- 输出必须是可重复执行、可覆盖写入的（deterministic），避免散落在临时目录
- 脚本在失败时必须：
  - 打印结构化摘要到 stderr/stdout
  - 设置非 0 退出码
  - 仍尽量写出 `reports/<area>/...` 报告，便于复盘

## 🛠️ 常用命令替换方案

| 避免使用 | 推荐替换 |
|---------|---------|
| `ls` / `dir` | `node scripts/list-files.js` |
| `grep pattern file` | `node scripts/search.js pattern file` |
| `find . -name "*.js"` | `node scripts/find-files.js --ext=js` |
| `cat file.txt` | `node scripts/read-file.js file.txt` |
| `echo "text" > file.txt` | `node scripts/write-file.js file.txt "text"` |

## 🔧 Codex工作流集成

### Quick模式命令标准
- 优先使用现有的npm scripts
- 对于新操作，创建专用的Node.js脚本
- 避免直接shell操作

### BMM模式命令标准
- 复杂操作必须封装为Node.js脚本
- 批量操作需要试点验证
- 提供回滚脚本

### 自动执行规则
- 安全的命令可以直接执行（SafeToAutoRun: true）
- 潜在破坏性命令必须用户确认
- 提供清晰的命令说明和预期结果

## 📋 命令审查清单

### 执行前检查
- [ ] 命令是否跨平台兼容？
- [ ] 是否有更安全的Node.js替代方案？
- [ ] 是否会产生破坏性副作用？
- [ ] 是否需要用户确认？

### 执行后验证
- [ ] 命令是否按预期执行？
- [ ] 是否有错误或警告？
- [ ] 是否影响了其他文件或系统？
- [ ] 是否需要清理临时文件？

## 🚨 错误处理

### 命令失败处理
1. 分析错误原因
2. 提供清晰的错误信息
3. 建议替代方案
4. 必要时提供回滚选项

### 常见错误模式
- 权限不足 → 使用更安全的操作
- 路径问题 → 使用绝对路径
- 依赖缺失 → 检查前置条件
- 平台差异 → 使用跨平台方案

## 📚 相关资源

- **Node.js文档**：https://nodejs.org/docs/
- **npm scripts指南**：https://docs.npmjs.com/cli/v8/using-npm/scripts
- **PowerShell文档**：https://docs.microsoft.com/powershell/
- `.codex/core/executable-guardrails.md` - 执行约束
- `.codex/core/pilot-promotion.md` - 试点推广方法

---

*最后更新：2026年3月*
