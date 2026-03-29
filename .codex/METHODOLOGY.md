<!-- input: BMAD + OpenSpec + Harness Engineering + WBS + pilot-promotion + local .codex workflows/core/gates/wal -->
<!-- output: a concise methodology that explains why .codex is shaped this way -->
<!-- pos: durable explanation of the repo-local Codex layer -->
# `.codex` 背后的方法论（BMAD + OpenSpec + Harness + WBS + 试点推广 融合体）

这份文档解释：为什么本仓库要用 `.codex/` 这一层、它依赖什么工程方法论、以及你在日常用 `@spec` / `@dev` 时实际上在执行什么“可靠交付协议”。

`.codex` 不是单一方法论，而是把多套工程化实践“取其可执行部分”融合成一个可落地的执行层：

- **BMAD**：提供工作流/角色/模式（入口 `spec/dev`、执行 `Quick/BMM`、支持 `review/validate/archive`）的组织方式
- **OpenSpec**：提供 **change packet** 作为默认执行/试点单元（`openspec/changes/<change-id>/...`）
- **Harness Engineering（ref/2.md）**：提供四支柱与 Stage Gates 思想（Spec→Verification→Orchestration→Evolution）
- **WBS + Milestone**：把 work 拆成可审核、可验证、可回退的 WBS Level 3 里程碑
- **试点-推广（pilot-promotion）**：把批量/推广任务强制转成 pilot-first 的分批扩展策略（失败即停）
- **WAL**：把关键决策链/动作链/证据链变成跨会话可恢复的轻量日志（Gate D）

本仓库将这些抽象原则本地化为：**可复用的 change packet、可验证的命令面、可回退的里程碑、可恢复的 WAL**。

## 融合映射（一句话版）

- **BMAD** 解决“怎么组织人/agent 的工作流入口与节奏”
- **OpenSpec** 解决“怎么把任务打包成可交付、可复盘的变更包”
- **Harness** 解决“怎么用 Stage Gates 把交付变得可预测”
- **WBS/Milestone** 解决“怎么拆成可验证的执行单元”
- **试点-推广** 解决“批量改动怎么控风险、怎么扩展”
- **WAL** 解决“跨会话记忆断裂与证据链恢复”

---

## 目标：把“概率性产出”变成“可预测交付”

AI 很擅长加速“写代码”，但会放大这些昂贵环节的失败成本：需求歧义、验证缺失、调试耗时、跨会话上下文丢失、批量推广带来的回归。

`.codex` 的目标不是增加流程，而是把以下内容变成默认行为：

- **Spec 清晰**：做什么、边界是什么、成功如何判定
- **Verification 锚定**：至少 1 个难作弊的“行为级证据”（Trophy）+ 最小验证包
- **Orchestration 可控**：按 WBS/里程碑拆解，试点→验证→再推广
- **Evolution 可积累**：用 WAL/变更包/模板把经验固化，避免重踩

---

## 四支柱在本仓库的对应关系（ref/2.md → `.codex`）

### 1) Spec（做什么）

落地到：

- **入口别名**：`@spec`（`.codex/workflows/spec.md`）用于需求/设计/变更包 framing  
- **Change packet**：`openspec/changes/<change-id>/README.md`（Gate A：Scope/Non-goals/Stop conditions）
- **设计前置**：`openspec/changes/<change-id>/design.md`（Gate B：边界、失败模式、验证计划、fallback）

关键原则：

- 先让“完成定义”机器可读、可测试，而不是只写愿景
- 发现歧义时允许回退到 Spec 阶段，而不是在实现阶段硬猜

### 2) Verification（对不对）

落地到：

- **Stage Gates**（编码前置条件）：设计里写 **2–3 条核心 AC + Trophy 雏形或豁免**  
  - 模板位置：`.codex/templates/change-record/design.md`（Stage Gate 1 seed）
- **Closeout 证据合同**：任务收尾必须记录命令、Trophy 证据、AC→证据映射  
  - 模板位置：`.codex/templates/change-record/tasks.md`
- **验证矩阵**：按变更类型选择最小可信验证包  
  - `.codex/core/validation-matrix.md`
- **硬性守护栏**：该跑的集成路径必须跑，失败按规则处理  
  - `.codex/core/executable-guardrails.md`

Trophy 测试的本地解释：

- “用户可感知、端到端、难走捷径作假”的最小验证锚点  
- 例如本仓库 UI/扩展行为常用 Playwright E2E：`npm run test:pw`
- 不适用时允许豁免，但必须写明 **为什么不适用** + **替代证据**（截图/录屏/手工步骤/日志）

### 3) Orchestration（怎么组织）

落地到：

- **两入口，两模式**：`@spec/@dev` 只是入口语义；最终必须落到 `Quick` 或 `BMM`
  - `.codex/workflows/router.md` / `spec.md` / `dev.md`
- **WBS 与里程碑**：以 WBS Level 3 milestone 作为首选执行单元
  - `.codex/core/wbs-planning.md`
  - `.codex/core/milestone-design.md`
  - `.codex/core/work-breakdown.md`
  - `.codex/core/task-sizing.md`
- **批量/推广任务的默认策略**：pilot-first（试点→验证→分批推广）
  - `.codex/core/pilot-promotion.md`
  - `.codex/workflows/router.md`（Batch/Promotion requests）

这解决的核心问题是：**不要“一次性全量重构/全量推广”**。把“方法是否可靠”的验证成本控制在小范围内，然后再扩展。

### 4) Evolution（怎么变好）

落地到：

- **WAL（Gate D）**：把关键决策链/动作链/证据链接固化成轻量 JSON，便于跨会话恢复
  - `.codex/wal/README.md`
  - `.codex/wal/LIFECYCLE.md`
  - `.codex/wal/schema/wal-entry.schema.json`
- **模板化**：把常见正确做法写进模板，减少每次从 0 设计流程
  - `.codex/templates/change-record/*`

WAL 的定位是：**不依赖长聊天记录**，而是用结构化字段让后来的人/agent 可以在 2 分钟内恢复“为什么这么做、怎么验证过、风险是什么”。

---

## Gate A–D：把“试点”变成可执行的检查点

本仓库把一个 OpenSpec change packet 作为默认试点单元，并映射为 Gate A–D：

- **Gate A（范围与停止条件）**：`openspec/changes/<change-id>/README.md`
- **Gate B（设计先验证）**：`openspec/changes/<change-id>/design.md`（含 Stage Gate 1 seed）
- **Gate C（验证证据）**：`openspec/changes/<change-id>/tasks.md` closeout（含 Trophy/AC 映射）
- **Gate D（可恢复性）**：`.codex/wal/entries/...`（WAL entry）

失败处理的统一规则（fail-closed）：

- 任一 gate/guardrail 失败：**停止扩展**（不扩大范围/不继续推广）
- 调试根因、调整方法、重跑验证
- 回写 change packet + WAL，再继续

参考实现：`.codex/core/pilot-promotion.md` 与 `.codex/core/executable-guardrails.md`。

---

## 命令面与输出一致性（自动化优先）

`.codex` 的约束之一是：把“需要人脑记忆的步骤”变成可重复执行的命令面。

原则：

- 优先 `npm run ...` 或 `node scripts/...`，避免平台特定与交互式命令
- 脚本必须非交互、可重复执行、失败非 0 退出码
- 脚本产物统一写到 `reports/<area>/...`，避免散落

相关规则：

- `.codex/core/command-standards.md`
- `ref/warning.md`（命令/脚本约束来源）

---

## 快速上手：你用 `@spec/@dev` 时的最短路径

### `@spec`（先把“做什么”钉住）

1. 通过 router 判定 Quick/BMM（默认 BMM）
2. 为非 trivial 任务创建 `openspec/changes/<change-id>/`
3. Gate A：README 写清 scope/non-goals/stop conditions
4. Gate B：design 写清失败模式、验证计划、Stage Gate 1 seed（AC + Trophy）

### `@dev`（实现但不放松约束）

1. 先 packaging：一段话能说清目标+边界+验证 → 才能 Quick
2. 一旦出现批量/推广/范围扩大风险 → 路由到 BMM + pilot-first
3. 按验证矩阵选择最小可信验证包，失败按 guardrails 处理
4. Closeout：证据合同 + WAL 更新（非 trivial）

---

## 这套方法论要解决的 4 类常见失败模式

本仓库的 `.codex` 规则刻意对抗这些失败模式（见 `.codex/core/closeout-loop.md` 与 `ref/2.md`）：

- **one-shotting**：把一个大任务拆成可关闭的里程碑
- **premature victory**：AC 没覆盖完就宣布完成
- **premature completion**：只过了单测/局部验证，没有行为级证据
- **context-recovery failure**：跨会话无法恢复决策链与验证证据 → 用 WAL 解决

---

## 参考与边界

- 本方法论的来源链（演进式融合）：
  - BMAD：最初的工作流与执行模式骨架（入口/模式/支持工作流）
  - OpenSpec：引入 change packet 作为可交付/可复盘的执行单元
  - OpenAI Harness Engineering（`ref/2.md`）：引入四支柱与 Stage Gates 的可靠交付思想
  - WBS + Milestone：引入可审核、可验证、可回退的拆解单位（Level 3 milestone）
  - 试点-推广：引入 pilot-first 的批量扩展与失败即停循环
  - WAL：引入跨会话可恢复的决策链/动作链/证据链记录（Gate D）
- `ref/2.md` 参考它对已有内容进行了升级融合
- `.codex` 是本仓库的“执行层”，不是外部通用标准；所有命令面必须以本仓库 `package.json` 为准
- 当 `.codex/reference/` 与本地执行规则冲突时，以 `.codex/workflows/` 与 `.codex/core/` 为准

