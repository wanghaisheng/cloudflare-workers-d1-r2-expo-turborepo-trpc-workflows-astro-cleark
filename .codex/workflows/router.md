<!-- input: task size, uncertainty, review intent, and existing change artifacts -->
<!-- output: workflow selection guidance for Codex -->
<!-- pos: workflow router for the local Codex layer -->
# Router

Use this document to resolve a request in two stages:

- entry semantic: `spec` or `dev`
- execution mode: `Quick` or `BMM`

## Stage 1: Identify The Entry Semantic

Route the request through `spec.md` when it is primarily about:

- requirements, proposal, design, or spec work
- change framing or change-record creation
- scope clarification before implementation
- cross-cutting goals that still need definition

Route the request through `dev.md` when it is primarily about:

- implementation
- bug fixing
- bounded refactoring
- a scoped delivery request

The entry semantic does not decide the execution mode by itself.

## Stage 2: Choose The Execution Mode

Route to `quick.md` when all of these are effectively true:

- the task is a bug fix, scoped feature, or bounded refactor
- acceptance criteria are already clear
- the touched surface area is limited
- verification can be handled with focused local checks
- the work still fits one coherent WBS-style Level 3 milestone
- the task can be packaged as self-contained with explicit dependencies and deterministic inputs/outputs

Quick automatically pulls in the internal harness, decomposition, validation, and closeout docs.

Route to `bmm.md` when any of these are true:

- requirements are unclear or need discovery
- the change affects architecture, shared contracts, or multiple subsystems
- the user asks for planning, design, proposal, or spec work
- the task should leave behind a reusable change record
- the work is likely to exceed the Quick sizing envelope
- the work needs more than one WBS-style Level 3 milestone or its milestone boundary is unclear

BMM still uses the same internal harness, but adds change-record discipline and milestone planning.

## Batch Or Promotion Requests (pilot-first)

When the request implies bulk rollout, promotion, or repeated edits across many files/modules:

- treat it as `BMM` even if each individual edit is small
- apply `.codex/core/pilot-promotion.md`:
  - start with a small pilot slice
  - validate and record evidence
  - only then promote to larger batches
- use WBS Level 3 milestones to represent each batch or promotion step, not one branch-sized rewrite

## Common Landing Patterns

- `spec -> BMM`
  Recommended default for proposal, design, and change-framing work.
- `spec -> Quick`
  Allowed when the request is already well-framed and compresses into one implementation-ready milestone.
- `dev -> Quick`
  Recommended default for clear scoped delivery.
- `dev -> BMM`
  Required when implementation reveals unclear requirements, architecture impact, or multi-milestone scope.

## Use Support Workflows As Needed

- `review.md`: when the user explicitly asks for a review, or when a final findings-first pass is needed
- `validate.md`: when implementation is mostly done and needs a closing gate
- `archive.md`: when the task is complete and should leave behind final notes

These are support workflows, not separate execution modes.

## Decomposition Rule

Before doing substantial work:

1. identify the primary behavior or contract surface
2. identify whether the request entered through `spec` or `dev`
3. confirm the task can be packaged as self-contained
4. decide whether it fits one WBS-style Level 3 milestone
5. if not, route to `bmm.md` and write the milestones down

## Fast Heuristic

- `spec` request plus clear single milestone: `spec -> quick.md`
- `spec` request plus unclear or multi-milestone scope: `spec -> bmm.md`
- `dev` request plus clear single milestone: `dev -> quick.md`
- `dev` request plus unclear or multi-milestone scope: `dev -> bmm.md`
- Review requested: `review.md` inside the current mode context
- Closing work: `validate.md`, then `archive.md` if a durable record is needed
