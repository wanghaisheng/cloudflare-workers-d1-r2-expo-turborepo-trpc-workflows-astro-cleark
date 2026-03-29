<!-- input: non-trivial work, desired milestone shape, and any optional repo-level WBS artifact -->
<!-- output: WBS-style planning guidance that fits the local Quick/BMM workflow -->
<!-- pos: internal WBS planning rules for the repo-local Codex layer -->
# WBS Planning

Use this file when a task is large enough to need deliberate decomposition.

The goal is to import the useful parts of Work Breakdown Structure without creating another user-facing mode or a second planning system.

## WBS Hierarchy

Map work into these levels when decomposition matters:

- Level 0: initiative or overall objective
- Level 1: epic or large module area
- Level 2: feature or coherent capability
- Level 3: milestone, the preferred execution unit
- Level 4: sub-task, the internal loop inside one milestone

In this repository:

- `Quick` usually compresses to one Level 3 milestone
- `BMM` usually spans multiple Level 3 milestones under one Level 2 feature intent
- Level 4 sub-tasks stay inside implementation and should not be presented as fake milestones

## WBS Rules

- apply the 100 percent rule: child items should cover the parent scope without leaving hidden work outside the breakdown
- name milestones by deliverable or contract, not by a loose folder or module label alone
- keep milestone ids stable enough to reference in tasks, closeout, and follow-up work
- prefer one dominant validation story per milestone

## Milestone Sweet Spot

Preferred target:

- roughly 350 to 750 net changed lines, including tests and docs

Practical envelope:

- roughly 300 to 800 net changed lines
- roughly 3 to 12 touched files
- usually reviewable in one short pass

Split again when:

- the milestone grows beyond about 1000 lines
- it needs more than one major validation package
- it no longer fits one coherent review story

Merge or demote when:

- the work is below about 200 net changed lines and does not justify a separate milestone
- the work is only an internal implementation step inside a larger coherent slice

## Durable State Rule

Do not let WBS truth live only in chat.

Use these repository artifacts instead:

- active `openspec/changes/{change-name}/` records for non-trivial work
- optional repo-level `WBS.md` or `docs/WBS.md` for high-level portfolio tracking when the repository chooses to maintain one

If both an active change record and a repo-level WBS artifact exist:

- the active change record is the primary truth for current milestone scope, validation, and risk
- the WBS artifact should summarize high-level status and point back to the active change record

## Planning Loop

1. define the Level 2 feature intent or equivalent problem statement
2. break it into Level 3 milestones that each have one dominant validation story
3. package each milestone with inputs, outputs, dependencies, and fallback notes
4. implement and close one milestone at a time
5. update the durable repository state after each milestone closes

## Relationship To Other Core Docs

- use `task-sizing.md` for Quick versus BMM routing pressure
- use `work-breakdown.md` for mode mapping and escalation rules
- use `milestone-design.md` to design the current Level 3 milestone in detail
- use `task-packaging.md` before implementation starts

## Batch Work Rule (pilot then promote)

When the work is a bulk rollout (many files/components/domains) or a promotion of the same change across multiple targets:

- model the pilot and each promotion step as separate Level 3 milestones
- keep each milestone inside the usual reviewable envelope (size + one validation story)
- treat any failed batch as a stop condition: pause, debug, adjust the method, and re-validate before expanding
- use `.codex/core/pilot-promotion.md` as the default methodology for batch/promotion work
