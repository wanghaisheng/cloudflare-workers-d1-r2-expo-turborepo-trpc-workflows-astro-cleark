<!-- input: routed task mode, repo conventions, system maps, and repo-level guardrails -->
<!-- output: shared execution constraints applied under Quick and BMM -->
<!-- pos: internal harness rules for the repo-local Codex layer -->
# Harness

This is the internal execution constitution shared by the `Quick` and `BMM` execution modes.

It exists to make the workflow stronger without making the user learn more execution modes.

## Non-Negotiable Rules

- Requests may enter through `spec.md` or `dev.md`, but every task must resolve into `Quick` or `BMM` before implementation expands.
- Do not invent a third execution mode beyond `Quick` and `BMM`.
- Always inspect local code and docs before proposing or editing changes.
- Keep durable progress, validation, and risk state in repository files rather than only in chat.
- Prefer repo-local workflow docs over copied upstream reference docs.
- Prefer `openspec/changes/` for new change records.
- Use layered context loading: small always-on docs first, then relevant core docs and system maps, then copied references only if still needed.
- Do not leave validation, risk, or documentation sync as implicit cleanup.
- Treat `.codex/reference/` as background material, not the active execution layer.

## Context Loading Model

Load context in three layers so the active task stays focused instead of drifting under too much reference material.

### Always-On

Load these first for every non-trivial task:

- `AGENTS.md`
- `.codex/README.md`
- the active workflow entrypoint and execution mode doc

### Focused

Load only the docs needed for the touched system and milestone:

- relevant `.codex/core/*` docs
- root governance docs such as `ARCHITECTURE.md`, `QUALITY_SCORE.md`, `RELIABILITY.md`, and `SECURITY.md`
- the relevant files under `docs/system-maps/`

### On-Demand

Load these only when the focused layer is insufficient:

- `.codex/reference/*`
- `ref/*`
- archived change records under `openspec/changes/archive/`

## Forbidden

- Do not close work without running the required validation package.
- Do not silently ignore a failing command, audit, or report.
- Do not keep a task in `Quick` once it clearly exceeds the sizing envelope.
- Do not edit generated output instead of the source generator or source content.
- Do not create new non-trivial change records under `_bmad-output/changes/`.
- Do not let milestone truth live in three places; prefer the active change record as the detailed source of truth.
- Do not let docs, change records, and implementation drift apart at closeout.
- Do not try to solve a non-trivial task in one branch-sized jump without milestone decomposition.
- Do not treat a passing unit test or one narrow command as proof that the task is done.
- Do not assume a fresh session has enough context; recover state from repo truth before continuing.

## Musts

- Every meaningful change must name the touched system area and load the relevant repo map.
- Every non-trivial task must be expressed as one or more WBS-style Level 3 milestones.
- Every non-trivial task must be decomposed before implementation expands.
- Every implementation task must map to one named milestone, even in `Quick`.
- Every meaningful change must choose a validation package from `validation-matrix.md`.
- Every meaningful change must finish with the closeout loop from `closeout-loop.md`.
- Substantial work must include a persona review pass from `persona-review.md`.
- Architecture, contract, or durable system-rule changes must follow `adr-rules.md`.
- Failures must be diagnosed using `observability.md` before broad speculative fixes.
- When the same class of failure repeats, strengthen the harness docs, templates, or checks instead of hoping memory improves.

## Common Failure Modes

These are the four recurring failure modes worth defending against in the local harness.

### One-Shotting

- symptom: one request turns into a branch-sized implementation with no stable milestone boundary
- defense: stop and decompose the work using `wbs-planning.md`, `work-breakdown.md`, and `milestone-design.md`

### Premature Victory

- symptom: the change is declared done because part of the feature works
- defense: re-check scope, acceptance criteria, and the declared validation package before closing

### Premature Completion

- symptom: code is marked complete after unit checks while integrated behavior is still unverified
- defense: run the minimum credible end-to-end validation for the touched system, not just the easiest local test

### Context-Recovery Failure

- symptom: a fresh session or resumed task cannot explain current state, residual risk, or remaining work
- defense: recover from repository truth first by reading the active change record, milestone status, reports, and the relevant system map

## Dependency Rules

Use these direction rules when changes cross system boundaries:

- runtime routes and entrypoints may depend on route helpers, SEO helpers, and generated artifacts
- generator and audit scripts may shape runtime behavior, but runtime code should not patch generator outputs by hand
- locale SEO files feed runtime metadata and audits, so SEO changes need both runtime and audit proof
- change records describe the work; they do not replace runnable validation

## Naming And Record Rules

- use `kebab-case` for `openspec/changes/{change-name}/`
- keep one primary truth source per task
- if a task already uses `_bmad-output/changes/{change-name}/`, keep it coherent but treat it as legacy
- update local docs when folder responsibility, behavior, or workflow expectations change

## ADR Trigger Rules

Read `adr-rules.md` and leave a durable decision record when the change:

- changes architecture or system boundaries
- introduces a new shared contract, generator rule, or build gate
- changes how Quick or BMM should operate
- adds a compatibility shim or removes an old compatibility path

## Standard Loop

1. Route the task through `workflows/router.md` plus the appropriate `spec.md` or `dev.md` entry workflow.
2. Load the relevant system map for the touched area.
3. Inspect the existing code and documentation.
4. Check `task-sizing.md` before implementation expands.
5. Use `wbs-planning.md` to map the work into the right decomposition level.
6. Decompose the work using `work-breakdown.md` and `milestone-design.md`.
7. Execute the chosen mode one milestone at a time.
8. Apply the required validation package and hard gates.
9. Run persona review when the change is substantial.
10. Sync docs and change-record state.
11. Close with verified scope, unverified gaps, residual risk, and milestone status.
