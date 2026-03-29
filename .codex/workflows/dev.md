<!-- input: implementation, bug-fix, or scoped-delivery requests plus repository context -->
<!-- output: a routed dev entry workflow that resolves into Quick or BMM -->
<!-- pos: dev entrypoint for the local Codex layer -->
# Dev Workflow

Use this entry workflow for implementation-first requests, bug fixes, scoped refactors, and bounded delivery work.

`dev.md` is an entry semantic, not an execution mode.

Every request that starts here must still resolve into either:

- `.codex/workflows/quick.md`
- `.codex/workflows/bmm.md`

Default landing mode:

- `quick.md`

Escalation rule:

- if the work exposes unclear requirements, shared-contract changes, architecture impact, or more than one coherent milestone, `dev.md` must route into `bmm.md`

## What To Do

1. Inspect the current code, docs, and any active change record before deciding the landing mode.
2. Read `.codex/workflows/router.md` and classify the request as a `dev` entry.
3. Stay in `quick.md` only when the task remains scoped, clear, and packageable as one managed Level 3 milestone.
4. Move to `bmm.md` when the task grows beyond the Quick envelope or needs discovery, change framing, or a reusable change record.
5. Apply the shared internal rules from:
   - `.codex/core/harness.md`
   - `.codex/core/wbs-planning.md`
   - `.codex/core/work-breakdown.md`
   - `.codex/core/task-sizing.md`
   - `.codex/core/milestone-design.md`
   - `.codex/core/validation-matrix.md`
   - `.codex/core/closeout-loop.md`
6. Use `.codex/core/milestone-design.md` as the shared layer to define and manage one coherent milestone before implementation expands.
7. If the task outgrows Quick or no longer fits one managed Level 3 milestone, switch to `.codex/workflows/bmm.md`.
8. Failure handling rule (pilot-style, fail-closed):
   - when a guardrail or validation fails, stop expansion (do not widen scope)
   - inspect the first failure output, debug the actual cause, then re-run the affected validation
   - if verification reveals requirements ambiguity, route back through `spec.md` (update acceptance criteria + trophy seed) before continuing
   - record validation evidence + residual risk at closeout, and update WAL when the change is non-trivial

## Hard Rule

`dev.md` does not create a third mode.

It is the entry workflow for implementation-shaped requests, and it must resolve into `Quick` or `BMM` before implementation expands.
