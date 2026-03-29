<!-- input: ref/试点-推广.md methodology and risk control principles -->
<!-- output: systematic pilot-to-scale workflow for Codex execution -->
<!-- pos: pilot promotion methodology for safe, controlled changes -->
# Pilot Promotion Methodology

## 🔄 核心流程

```
选择试点 → 实施修复 → 测试验证 → 确认成功 → 批量推广
    ↑                                                    ↓
    └─────────── 如果失败 ────────── 调试方法 ──────────┘
```

## 🎯 适用场景

### Quick模式试点
- **单一文件修复**: 先修复一个文件，验证方法有效性
- **小范围重构**: 限制在单个模块或组件
- **API变更**: 先变更一个endpoint，验证兼容性
- **配置调整**: 先调整一个环境配置

### BMM模式试点
- **架构变更**: 先在非关键路径试点
- **数据模型变更**: 先影响单个表或集合
- **工作流变更**: 先在单个团队或流程试点
- **依赖升级**: 先升级一个非关键依赖

## 🚀 关键优势

### ✅ 风险控制
- 小范围验证方法有效性
- 及时发现和修复问题
- 避免大规模错误

### ✅ 质量保证
- 每个步骤都经过测试验证
- 确保推广的可靠性
- 保持系统稳定性

### ✅ 效率提升
- 快速反馈循环
- 减少调试时间
- 提高成功率

## 🔧 失败处理策略

### 试点失败处理
1. **深入调试**: 找到真正问题
2. **调整方法**: 尝试不同的解决方案
3. **重新试点**: 用新方法再次试点

### 调试方法清单
- [ ] 检查日志和错误信息
- [ ] 验证前置条件和依赖
- [ ] 测试边界情况
- [ ] 回滚到稳定状态
- [ ] 重新设计解决方案

## 📋 试点检查清单

### 试点前准备
- [ ] 明确试点范围和边界
- [ ] 定义成功标准和失败条件
- [ ] 准备回滚计划
- [ ] 选择低风险试点对象
- [ ] 建立监控和观察指标

### 试点执行
- [ ] 按计划实施变更
- [ ] 实时监控关键指标
- [ ] 记录所有观察和异常
- [ ] 及时响应问题

### 试点验证
- [ ] 运行完整测试套件
- [ ] 验证业务功能正常
- [ ] 检查性能影响
- [ ] 确认无副作用

## Gates A–D (artifact mapping for this repo)

This repo treats **one OpenSpec change packet** as the default pilot unit.

### Gate A: Scope / Non-goals / Stop conditions

**Where:** `openspec/changes/<change-id>/README.md`

**Pass criteria:**

- explicit in-scope boundaries (folders/modules/APIs)
- explicit non-goals (what must not be changed)
- explicit stop conditions (what triggers pause/rollback instead of expansion)

### Gate B: Design-first validation (pre-coding)

**Where:** `openspec/changes/<change-id>/design.md`

**Pass criteria:**

- edge cases and failure modes enumerated
- verification plan names concrete tests/commands (what would falsify the design)
- fallback/rollback note identifies a safe stopping point

### Gate C: Validation evidence (closeout)

**Where:** `openspec/changes/<change-id>/tasks.md` Closeout section (and/or `.codex/templates/closeout.md`)

**Pass criteria:**

- commands that ran are recorded
- pass/fail is explicit
- residual risk is explicit (not implied)

### Gate D: Context recoverability (WAL)

**Where:** `.codex/wal/entries/YYYY/YYYY-MM-DD_<change-id>.json`

**Pass criteria:**

- intent + key decisions + actions + evidence + links are present
- entry stays lightweight (prefer links; avoid large diffs/transcripts)

### Checkpoint rule

When a change is complete:

- move the change packet to `openspec/changes/archive/<change-id>/` (checkpoint)
- treat the corresponding WAL entry as “frozen” (only small typo/link fixes afterwards)

### Failure loop (gated)

If any gate fails:

- stop expansion (do not widen scope)
- debug and adjust the method
- re-run the selected validation package
- update the change packet and WAL entry before continuing

## 📈 推广策略

### 渐进式推广
1. **小批量**: 2-5个文件/组件
2. **中批量**: 10-20个文件/组件  
3. **大批量**: 整个模块或系统
4. **全量**: 完整系统推广

### 推广检查点
- 每个推广批次后都要验证
- 发现问题立即停止推广
- 问题解决后才能继续

## 🎯 成功标准

### 技术标准
- [ ] 所有测试通过
- [ ] 性能指标达标
- [ ] 无新增错误或警告
- [ ] 功能行为符合预期

### 业务标准
- [ ] 用户体验无负面影响
- [ ] 关键业务流程正常
- [ ] 数据完整性保持
- [ ] 系统稳定性维持

## 📚 相关资源

- `.codex/core/executable-guardrails.md` - 执行约束
- `.codex/core/validation-matrix.md` - 验证矩阵
- `.codex/templates/milestone-status.md` - 里程碑状态跟踪
- `docs/system-maps/` - 系统映射和热路径

---

*最后更新：2026年3月*
