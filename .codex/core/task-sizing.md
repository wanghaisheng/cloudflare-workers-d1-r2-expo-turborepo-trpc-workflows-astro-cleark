<!-- input: task scope, acceptance clarity, touched systems, and expected diff size -->
<!-- output: sizing guidance for staying in Quick or escalating to BMM -->
<!-- pos: shared task-sizing rules for the repo-local Codex layer -->
# Task Sizing

Use this to decide whether work can stay in `Quick` or must move to `BMM`.

## Target Milestone Shape

Aim for one milestone that:

- changes one coherent behavior, pipeline, or contract surface
- prefers roughly 350 to 750 net changed lines
- still fits roughly within 300 to 800 net changed lines in the normal case
- touches roughly 3 to 12 files
- can be validated locally in about 10 to 20 minutes
- can be reviewed without scrolling through unrelated subproblems

Treat this as the preferred execution envelope, not as optional flavor text.

Split or re-route when:

- the milestone grows beyond about 1000 net changed lines
- it needs more than one major validation package
- the review story no longer fits one coherent delivery slice

Merge or demote when:

- the work is below about 200 net changed lines and does not justify an independent milestone
- the work is only an internal implementation step inside a larger coherent slice

## Stay In Quick When

Quick is appropriate when all of these are mostly true:

- the request can be stated clearly in one or two sentences
- acceptance criteria are already known
- the work targets one primary behavior or one bounded pipeline
- no new shared contract, migration, or rollout plan is needed
- the diff still fits the milestone shape above
- inputs and outputs are already clear
- upstream dependencies are already resolved
- the dominant validation story is already known

## Escalate To BMM When

Move to `BMM` when any of these are true:

- requirements are unclear or competing interpretations exist
- the task crosses multiple subsystems, such as routing plus content generation plus SEO auditing
- the change introduces a new shared contract, generator behavior, architecture rule, or release gate
- the work needs milestone sequencing, rollout planning, or explicit non-goals
- the diff keeps expanding beyond the Quick envelope
- hidden dependency risk remains
- multiple workers or worktrees would need explicit coordination
- the deterministic interface is not fixed yet
- the task is a bulk rollout or promotion request across many targets (pilot-first batching is required)

## Split Patterns

Use one of these patterns instead of letting a task sprawl:

- analysis -> shim -> migrate -> remove old path
- spec -> implement -> audit -> archive
- generator change -> snapshot regen -> runtime verify
- SEO change -> head verify -> audit verify -> integrated build gate

## Decomposition Rules

Before implementation:

1. state the primary behavior, pipeline, or contract surface
2. state the milestone boundary
3. state the dominant validation story
4. state the stopping point if later milestones never ship
5. state the inputs, outputs, and dependency resolution path

If those four statements are fuzzy, the task is not ready to implement.

If step 5 is fuzzy, the task is not self-contained enough to implement.

## Edge Cases

- pure docs or configuration tasks can be smaller, but they still need a coherent closeout
- exploratory work should become a bounded spike, then either close or escalate to BMM
- large refactors should be broken into reversible milestones, not one branch-sized rewrite

## Mid-Task Escalation

If a task starts in `Quick` and then grows:

1. stop treating it as a simple scoped implementation
2. open or update `openspec/changes/{change-name}/`
3. decompose the remaining work into milestones
4. continue in `BMM` without discarding the work already done
