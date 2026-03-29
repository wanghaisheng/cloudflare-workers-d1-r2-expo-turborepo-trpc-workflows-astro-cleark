<!-- input: repo-local workflows, internal harness docs, and upstream reference copies -->
<!-- output: the primary Codex workflow entrypoint for this repository -->
<!-- pos: main index for the repo-local Codex layer -->
# Codex Development Layer

This folder is the Codex workflow layer for this repository.

The local workflow model uses three layers:

- entrypoints: `spec.md`, `dev.md`
- execution modes: `Quick`, `BMM`
- support workflows: `review.md`, `validate.md`, `archive.md`, `hygiene.md`

Harness, WBS-style decomposition, task sizing, milestone design, and validation gates live in `.codex/`; repo-specific system maps live in `docs/system-maps/`. They are all support docs loaded by the two modes, not separate user modes.

Machine-readable gate packs live under `.codex/gates/`. They support the execution layer but do not replace `docs/` as the durable source-of-truth.

Root governance and durable knowledge stay outside `.codex/`:

- `ARCHITECTURE.md`, `QUALITY_SCORE.md`, `RELIABILITY.md`, and `SECURITY.md` are the root governance surfaces
- `docs/` is the durable repo knowledge layer
- `openspec/changes/` is the execution-plan layer
- `ref/` is external reference only
- `ref/_bmad/` is copied upstream/source material only; its fixture and archive paths are not durable repo truth

## Start Here

1. Read `.codex/workflows/router.md`.
2. Enter either `.codex/workflows/spec.md` or `.codex/workflows/dev.md`.
3. Use the entry workflow plus `router.md` to resolve into `.codex/workflows/quick.md` or `.codex/workflows/bmm.md`.
4. Use `.codex/workflows/review.md`, `.codex/workflows/validate.md`, `.codex/workflows/archive.md`, and `.codex/workflows/hygiene.md` as support workflows when the task needs them.
4. Open `.codex/reference/` only when the lightweight local workflow docs are not enough.
5. For any non-trivial task, enforce packaging and decomposition through `.codex/core/task-packaging.md`, `.codex/core/wbs-planning.md`, `.codex/core/work-breakdown.md`, `.codex/core/task-sizing.md`, and `.codex/core/milestone-design.md` before implementation grows.
6. Load `ARCHITECTURE.md` plus the relevant repo-specific hot-path maps from `docs/system-maps/` when the active workflow calls for them.
7. Prefer `npm run ...` or `node scripts/...` for the standard command surface; do not encode shell chaining as the durable workflow contract.
8. When governance surfaces change, treat `npm run docs:check`, `npm run lint:architecture`, and `npm run lint:taste` as the primary mechanical gates before closeout.

Every copied page under `.codex/reference/` should carry an explicit non-authoritative marker near the top so it cannot be mistaken for the active local workflow layer.

## Folder Map

- `workflows/`: entrypoints, execution-mode docs, router, and support workflows.
- `core/`: internal harness rules, WBS and milestone decomposition rules, hard gates, review lenses, ADR rules, observability guidance, and openspec sync rules shared by both modes.
- `gates/`: reusable governance gate packs with contracts, manifests, policies, suites, waivers, and maintainer references.
- `templates/`: reusable prompt and closeout scaffolds for Quick and BMM work.
- `reference/`: copied upstream BMAD/OpenSpec material kept for local reference and compatibility.
- `LESSONS-LEARNED.md`: recurring project mistakes and local implementation lessons.
- `quick-dev.png` and `bmm-dev.png`: copied diagrams from the upstream workflow set.

Outside `.codex/`:

- `ARCHITECTURE.md`, `QUALITY_SCORE.md`, `RELIABILITY.md`, and `SECURITY.md`: root governance surfaces for architecture, quality, reliability, and security.
- `docs/`: durable repo knowledge, including system maps, technical contracts, and promoted references.
- `docs/system-maps/`: repo-specific system maps for high-frequency change areas. These stay outside `.codex/` because they are coupled to the current project codebase.
- `openspec/changes/`: active and archived execution plans.
- `ref/`: copied external reference material, not the local execution source of truth.

## Entrypoints

### Spec

Use `spec.md` when the request starts from:

- requirement discovery
- proposal, design, or spec framing
- change-record creation or update
- a cross-cutting or still-unclear goal

Default landing mode:

- `BMM`

Compression rule:

- if the problem is already well-framed and the work fits one coherent WBS-style Level 3 milestone, `spec.md` may resolve to `Quick`

### Dev

Use `dev.md` when the request starts from:

- implementation
- bug fixing
- bounded refactoring
- a scoped delivery request

Default landing mode:

- `Quick`

Escalation rule:

- if the work exposes unclear requirements, shared-contract change, or multi-milestone scope, `dev.md` must resolve to `BMM`

## Execution Modes

### Quick

Use Quick when:

- the task is a bug fix, scoped feature, or bounded refactor
- acceptance criteria are already clear
- the touched surface area is limited
- existing tests or straightforward local checks can verify the result
- the work still fits one coherent WBS-style Level 3 milestone

Primary docs:

- `.codex/workflows/router.md`
- `.codex/workflows/quick.md`
- `.codex/workflows/review.md`
- `.codex/workflows/validate.md`

### BMM

Use BMM when:

- requirements are unclear or still need discovery
- the change is architectural, cross-cutting, or high-risk
- the work should leave behind a reusable change record
- the task needs proposal, design, task breakdown, and implementation
- the work needs more than one WBS-style Level 3 milestone

Primary docs:

- `.codex/workflows/router.md`
- `.codex/workflows/bmm.md`
- `.codex/workflows/validate.md`
- `.codex/workflows/archive.md`

## Change Record Convention

For new non-trivial changes, prefer:

`openspec/changes/{change-name}/`

Use `kebab-case` for `{change-name}`.

If a task already has a coherent legacy change folder under `_bmad-output/changes/{change-name}/`, keep that record consistent instead of migrating it mid-task. New change records should start in `openspec/changes/`.

## Strengthening Rule

In this repository, stronger workflow means:

- every implementation task must pass a self-contained packaging check before coding starts
- every non-trivial task must be decomposed before implementation expands
- every implementation task must map to one reviewable Level 3 milestone
- `spec.md` and `dev.md` are formal entrypoints, not extra execution modes
- every task entered through `spec.md` or `dev.md` must still resolve to `Quick` or `BMM`
- milestone status, validation evidence, and residual risk must be visible in the active record before closeout

## Sync Policy

This folder is a repo-local workflow layer built on top of copied upstream BMAD/OpenSpec references.

When the workflow changes:

1. update the local execution docs under `.codex/workflows/` and `.codex/core/`, plus repo-specific maps under `docs/system-maps/`
2. keep `AGENTS.md` aligned with the current preferred user-facing flow
3. keep the root governance docs aligned when the change affects repo architecture, quality gates, reliability, or security boundaries
4. refresh `.codex/reference/` only when upstream source material actually changes

## Governance Automation

- `.github/workflows/ci.yml` blocks on docs integrity, architecture lint, and taste invariants.
- `.github/workflows/doc-gardening.yml` runs scheduled drift scans and only applies mechanical fixes.
- strict governance commands remain available for scheduled or focused cleanup runs:
  - `npm run docs:check:strict`
  - `npm run lint:architecture:strict`
  - `npm run lint:taste:strict`
