## 通俗解释：整个开发流的运作方式

### 🏗️ 四层治理体系

把整个系统想象成一个**建筑工地**：

| 层 | 文件 | 比喻 |
|---|---|---|
| **底线规则** | `HARNESS.md` | 建筑法规——不准用 `any` 类型、不准硬编码颜色、必须双语 |
| **快速索引** | `AGENTS.md` | 工人手册——告诉 AI 当前在哪个里程碑、文件在哪 |
| **进度管理** | `docs/ROADMAP-WBS.md` | 施工进度表——每个任务 350-750 行，三问检查 |
| **变更结构** | OpenSpec 四件套 | 施工蓝图——proposal/spec/design/tasks |

### 🎭 BMAD = 角色分工

BMAD 提供了 PM、Architect、Dev、QA 等角色。**OpenSpec 管产出格式，BMAD 管谁来做**。

### 🔀 两种模式现在的状态

**Quick Dev 模式**（< 750 行小任务）：
```
@spec → @dev → @ralph-loop → @check → @archive
```
一人全干，精简四件套，但现在**每一步都绑定了 HARNESS 和 WBS 检查**。

**BMM 完整模式**（> 750 行大功能）：
```
@brief → @spec → @dev-story → @quality → @check → @archive
```
多角色协作，完整四件套，同样**每一步都绑定了治理约束**。

### ✅ 现在已经完成的整合

之前 `@dev`、`@spec`、`@check` 等核心命令是"空壳别名"，**没有**引用 HARNESS 和 WBS。上一轮已经修复：

- `@dev` / `@dev-story` → 加了强制前置检查（HARNESS + WBS + 三问）和后置自检（Ralph Loop）
- `@spec` → 加了粒度门禁（每个 task 必须 350-750 行）
- `@check` → 加了 HARNESS 合规清单（禁止项、i18n、设计令牌）
- `@archive` → 加了 WBS 关闭要求（更新状态 + 记录行数）

**一句话总结：OpenSpec 管格式，BMAD 管角色，Quick/BMM 管轻重档位，HARNESS 管底线，WBS 管进度。五层通过 `@alias` 命令串成流水线，现在两种模式都已完整绑定治理层，没有命令能绕过规则。**

