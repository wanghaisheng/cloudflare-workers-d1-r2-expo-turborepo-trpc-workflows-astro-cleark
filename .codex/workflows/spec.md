<!-- input: requirement, proposal, design, or change-framing requests plus repository context -->
<!-- output: a routed spec entry workflow that resolves into Quick or BMM -->
<!-- pos: spec entrypoint for the local Codex layer -->
# Spec Workflow

Use this entry workflow for requirement discovery, proposal shaping, spec-first requests, and change framing.

`spec.md` is an entry semantic, not an execution mode.

Every request that starts here must still resolve into either:

- `.codex/workflows/quick.md`
- `.codex/workflows/bmm.md`

Default landing mode:

- `bmm.md`

Compression rule:

- if the request is already well-framed, has deterministic inputs and outputs, and fits one coherent WBS-style Level 3 milestone with one dominant validation story, `spec.md` may resolve into `quick.md`

## What To Do

1. Inspect the current code, docs, and any existing change record before deciding the landing mode.
2. Read `.codex/workflows/router.md` and classify the request as a `spec` entry.
3. Default to `bmm.md` when the request still needs discovery, proposal framing, architecture choices, or more than one milestone.
4. Route to `quick.md` only when the work is already implementation-ready and can stay inside one managed Level 3 milestone.
5. Apply the shared internal rules from:
   - `.codex/core/harness.md`
   - `.codex/core/wbs-planning.md`
   - `.codex/core/work-breakdown.md`
   - `.codex/core/task-sizing.md`
   - `.codex/core/milestone-design.md`
   - `.codex/core/validation-matrix.md`
   - `.codex/core/closeout-loop.md`
   - `.codex/core/adr-rules.md`
   - `.codex/core/openspec-sync.md`
6. Treat one OpenSpec change packet as the default pilot unit:
   - `.codex/core/pilot-promotion.md` (Gate A–D + failure loop)
7. For non-trivial work packaged as a change packet, ensure the packet is machine-checkable:
   - run `npm run governance:readiness` when change-record templates, readiness packets, or task-packaging contracts are touched
8. Stage-gate rule (design-first):
   - before coding, ensure the design includes Gate 1 seed (2–3 core acceptance criteria + a trophy candidate or explicit exemption)
   - if verification reveals spec ambiguity, stop coding and return to spec/design rather than expanding implementation
9. Failure handling rule (fail-closed, pilot-first):
   - if a gate or guardrail fails, stop expansion (do not widen scope)
   - debug and adjust the method
   - re-run the selected validation package
   - update the change packet and WAL entry before continuing
10. Prefer new change records under `openspec/changes/{change-name}/` when the routed work needs one.
11. If the task already has a coherent legacy folder under `_bmad-output/changes/{change-name}/`, keep that record accurate rather than splitting the truth source mid-task.
12. Use `.codex/core/milestone-design.md` as the shared layer to define and manage milestone-level execution slices instead of leaving the spec as one large planning block.
13. Keep milestone validation, ADR, and closeout expectations explicit in the change record or milestone notes.

## Hard Rule

`spec.md` does not create a third mode.

It is the entry workflow for spec-shaped requests, and it must resolve into `Quick` or `BMM` before implementation expands.
