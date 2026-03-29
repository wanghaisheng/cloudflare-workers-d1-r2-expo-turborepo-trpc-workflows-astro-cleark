<!-- input: approved scoped tasks, repository context, tests, and optional change records -->
<!-- output: implemented and verified code changes using the Quick mode -->
<!-- pos: primary scoped-delivery workflow for Codex -->
# Quick Workflow

Use this for normal implementation work when the request is clear and bounded.

## Internal Docs To Load

Quick automatically relies on:

- `.codex/core/harness.md`
- `.codex/core/task-packaging.md`
- `.codex/core/wbs-planning.md`
- `.codex/core/task-sizing.md`
- `.codex/core/milestone-design.md`
- `.codex/core/work-breakdown.md`
- `.codex/core/validation-matrix.md`
- `.codex/core/closeout-loop.md`
- `.codex/core/executable-guardrails.md`
- `.codex/core/persona-review.md`
- `.codex/core/adr-rules.md`
- `.codex/core/observability.md`
- `.codex/core/maturity-checklist.md`

Optional scaffolds:

- `.codex/templates/quick-prompt.md`
- `.codex/templates/milestone.md`
- `.codex/templates/persona-review.md`
- `.codex/templates/closeout.md`

Load the relevant repo map when the task touches a known hot path:

- `ARCHITECTURE.md`
- `docs/system-maps/runtime.md`
- `docs/system-maps/content-pipeline.md`
- `docs/system-maps/seo-audit.md`

## Objective

Deliver the requested change end-to-end without expanding the user-facing process surface.

That means:

- inspect local code before editing
- compress the task into one explicit WBS-style Level 3 milestone before implementation
- implement the smallest coherent change
- run the right targeted validations first
- sync docs before closing
- escalate to `BMM` if the task stops being small and clear

## Working Sequence

1. Inspect the affected code paths, docs, and any existing change record.
2. Check `.codex/core/task-sizing.md`, `.codex/core/wbs-planning.md`, and `.codex/core/work-breakdown.md`.
3. Run the short packaging check from `.codex/core/task-packaging.md`:
   - one primary goal
   - in scope and out of scope locked
   - dependency resolution explicit
   - deterministic interface explicit
   - one dominant validation story
4. Write the task down as one WBS-style Level 3 milestone using `.codex/core/milestone-design.md` before implementation expands.
5. If you cannot satisfy the packaging check or state one coherent Level 3 milestone with one dominant validation story, stop treating the task as Quick and switch to `bmm.md`.
6. Implement only the bounded milestone you defined.
7. Run the relevant commands from `.codex/core/validation-matrix.md`.
8. Apply any required hard gates from `.codex/core/executable-guardrails.md`.
9. If the task changes architecture or durable workflow behavior, follow `.codex/core/adr-rules.md`.
10. If routing, SSR, SEO, or generated content changed, finish with `npm run build:dev` unless a narrower gate is explicitly sufficient.
11. Use `.codex/core/persona-review.md` for substantial work or shared behavior changes.
12. Update affected docs, including any existing `openspec/changes/...` record when the task belongs to one.
13. If workflow docs, root governance docs, or durable knowledge docs changed, run `npm run docs:check`.
14. Finish with `.codex/core/closeout-loop.md`, including milestone status, validation evidence, residual risk, and the compact worker-style result packet.

## Quick Does Not Mean Loose

Quick is a compressed strong workflow, not a weaker workflow.

It still requires:

- code-path inspection
- explicit milestone definition
- internal sub-task loop of code -> test -> fix -> refactor
- explicit validation
- documentation sync
- a final closeout summary of verified and unverified risk
