<!-- input: task scope, ambiguity, and expected implementation surface -->
<!-- output: a common hierarchy for breaking work into epics, features, milestones, and sub-tasks -->
<!-- pos: work breakdown rules for the repo-local harness -->
# Work Breakdown

Use this file to decide how deep a task needs to be decomposed after the high-level WBS shape is known.

## Levels

Use the WBS labels below as a shared vocabulary, even when the repository does not maintain a separate `WBS.md` artifact.

### Initiative

Equivalent to WBS Level 0.

Use for the overall product goal or a major objective that spans multiple epics.

### Epic

Equivalent to WBS Level 1.

Use for a large initiative or architecture theme that spans multiple features.

Typical shape:

- several features
- multiple milestones
- likely always `BMM`

### Feature

Equivalent to WBS Level 2.

Use for one user-visible capability or one coherent system improvement.

Typical shape:

- one or more milestones
- may still fit in `Quick` if it compresses to a single milestone

### Milestone

Equivalent to WBS Level 3.

This is the preferred execution unit.

Typical shape:

- one coherent delivery slice
- one validation story
- one reviewable diff
- one explicit fallback or stopping point

### Sub-task

Equivalent to WBS Level 4.

This is the internal execution loop inside a milestone.

Typical shape:

- code -> test -> fix -> refactor
- not usually exposed as a user-facing planning layer

Do not expose sub-tasks as if they were full milestones just to make the plan look busy.

## Coverage Rule

Apply the WBS 100 percent rule:

- child items should cover the known parent scope
- missing work should surface as an explicit item, not as hidden implementation-time discovery
- if a milestone still depends on "we will figure the rest out while coding", decompose or re-package it again

## Self-Contained Rule

Breaking work down further is not the goal by itself.

The goal is to create units that are:

- self-contained enough to execute without hidden context hunting
- independently reviewable
- independently verifiable

If a unit is smaller but still depends on implementation-time guesswork, it is not better decomposed.

Use `.codex/core/task-packaging.md` before implementation starts.

## Mode Mapping

- `Quick` usually means one Level 3 milestone, with Level 4 sub-tasks handled internally
- `BMM` usually means two to five Level 3 milestones, each with its own validation package

Feature-level intent may appear in `BMM`, but implementation still closes milestone by milestone.

## Escalation Signals

Break work down further or escalate to `BMM` when:

- one milestone starts affecting more than one feature-level concern
- validation exceeds a comfortable local loop
- rollback or fallback is unclear
- the review scope no longer fits one screen of coherent reasoning
- inputs or outputs are still fuzzy
- dependency resolution is still implicit
- the task is named by module or page only, without a deterministic interface
- the request implies batch rollout or repeated edits across many targets (use pilot-first promotion)

## Record Rule

For non-trivial `BMM` work, milestones should be tracked in the active change record under `openspec/changes/{change-name}/`.

If the repository also keeps a higher-level WBS artifact:

- use that artifact for Level 0 to Level 2 summaries
- keep the active change record as the detailed truth for current milestone scope, validation, and residual risk

## Strengthening Rules

- do not start implementation for non-trivial work until the current milestone is named
- do not let one milestone cover multiple unrelated behaviors just because they are all part of the same feature
- do not let milestone wording stay at roadmap level; it must be implementable and reviewable
- prefer milestone names that describe the deliverable or contract, not just the folder touched
- if a task starts in `Quick`, the milestone should usually be short enough to restate in one or two sentences
- prefer splitting by deterministic interface, not by loose file ownership alone
- if a unit cannot be handed to another implementer as a self-contained packet, split or package it again

## Batch Requests (pilot then promote)

When the user asks for bulk rollout ("批量"/"推广"/"apply everywhere"):

- do not treat it as one milestone even if each edit is small
- route to `BMM`, create a change packet, and model:
  - pilot milestone (small representative set)
  - promotion milestones (increasing batches)
- apply the stop/rollback discipline and failure loop in `.codex/core/pilot-promotion.md`
