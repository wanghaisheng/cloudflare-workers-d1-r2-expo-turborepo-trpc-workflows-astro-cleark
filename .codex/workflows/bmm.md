<!-- input: unclear or cross-cutting goals, repository context, and implementation tasks -->
<!-- output: a full requirement-to-implementation workflow for larger changes -->
<!-- pos: primary end-to-end BMM workflow for Codex -->
# BMM Workflow

Use this when the task needs requirement discovery, change framing, and implementation.

## Internal Docs To Load

BMM uses the same internal support layer as Quick:

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
- `.codex/core/openspec-sync.md`
- `.codex/core/maturity-checklist.md`

Optional scaffolds:

- `.codex/templates/bmm-spec-checklist.md`
- `.codex/templates/change-record/README.md`
- `.codex/templates/change-record/proposal.md`
- `.codex/templates/change-record/design.md`
- `.codex/templates/change-record/tasks.md`
- `.codex/templates/change-record/durable-spec.md`
- `.codex/templates/milestone.md`
- `.codex/templates/milestone-status.md`
- `.codex/templates/closeout.md`

Also load the relevant repo maps from `docs/system-maps/` for the touched system areas.
Also load `ARCHITECTURE.md` when the change affects repo structure, governance, or command-surface rules.

## Objective

Take a change from problem framing through implementation as the `BMM` execution mode.

Users may reach this mode directly or through the `spec.md` or `dev.md` entry workflows.

Inside the workflow, however, the work must still be decomposed. BMM is feature-through-milestone delivery, not one branch-sized task.

Treat WBS-style Level 3 milestones as the preferred execution unit inside a BMM change.

## Change Record Convention

Prefer a change record under:

`openspec/changes/{change-name}/`

Use `kebab-case` for `{change-name}`.

Recommended minimum files for non-trivial work:

- `README.md`
- `proposal.md`
- `tasks.md`

Add `design.md` when the task changes architecture, shared contracts, or non-obvious technical behavior.

If the work already lives under `_bmad-output/changes/{change-name}/`, keep that record coherent instead of splitting the source of truth.

When creating a new change record, prefer this template flow:

1. use `.codex/templates/bmm-spec-checklist.md` to frame the whole change
2. use `.codex/templates/change-record/` starter files to write the first draft of `README.md`, `proposal.md`, `design.md`, `tasks.md`, and the durable contract spec
3. then tailor the files to the actual problem, validation package, ADR content, and milestone plan

## Working Sequence

1. Inspect the current code, docs, and any existing change artifacts before designing anything.
2. Define the problem, non-goals, scope, acceptance criteria, and success criteria.
3. Draft the change record using `.codex/templates/bmm-spec-checklist.md` plus the starter files under `.codex/templates/change-record/`.
4. Declare the validation package up front using `.codex/core/validation-matrix.md`.
5. Use `.codex/core/wbs-planning.md` to confirm the feature to milestone hierarchy, then break the work into feature intent and milestone execution slices using `.codex/core/work-breakdown.md`.
6. For each milestone, run the short packaging check from `.codex/core/task-packaging.md`:
   - one primary goal
   - in scope and out of scope locked
   - dependency resolution explicit
   - deterministic interface explicit
   - one dominant validation story
7. Design each milestone with `.codex/core/milestone-design.md`, including entry context, dependencies, inputs, outputs, invariants, failure modes, acceptance criteria, validation package, fallback notes, and follow-on dependency before implementation starts.
8. Record those milestones in the active change record rather than leaving them implicit in chat reasoning.
9. Implement one milestone at a time with the same code, guardrail, observability, and doc discipline used by `Quick`.
10. Use `.codex/core/adr-rules.md` whenever the change records a durable architecture or workflow decision.
11. Use `.codex/core/persona-review.md` before closing a substantial milestone.
12. Sync milestone progress and validation state using `.codex/core/openspec-sync.md`.
13. Use `.codex/core/maturity-checklist.md` when refining the workflow itself or evaluating repeated delivery pain points.
14. Run `npm run docs:check` when the change affects workflow docs, root governance docs, or durable repo knowledge.
15. Finish with `.codex/workflows/validate.md`, and use `.codex/workflows/archive.md` when the record should be formally closed out.

## BMM Still Has To Ship

BMM is not a documentation-only mode.

The output is not complete until:

- the code is implemented or explicitly deferred
- the declared validations are run or any gaps are called out
- the change record matches reality
- milestone status and residual risk are current
