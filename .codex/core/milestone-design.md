<!-- input: a scoped task, chosen mode, touched systems, and required validation -->
<!-- output: rules for designing milestones that are coherent, reviewable, and verifiable -->
<!-- pos: milestone design guidance for the repo-local harness -->
# Milestone Design

Use this file whenever work needs to be split into milestones.

This file is also the shared milestone management layer for entry workflows such as `@dev` and `@spec`; entrypoints may route to different execution modes, but they should still define and manage milestones here.

When the work is tracked through a change packet, keep the packet fields aligned so `npm run governance:readiness` can verify the packaging mechanically.

The goal is not to create more ceremony. The goal is to create milestones that can be implemented, validated, reviewed, and recovered cleanly.

## Milestone Standard

A good milestone must define all of these:

- milestone id or short name: something stable enough to reference in notes and closeout
- goal: one coherent behavior, migration step, or pipeline change
- in scope: what this milestone will change
- out of scope: what it will not change yet
- upstream dependencies: what must already exist or be mocked before implementation starts
- dependency resolution: how those dependencies are satisfied
- touched systems: runtime, content-pipeline, SEO-audit, or another named area
- entry context: which local docs or specs must be loaded before implementation
- inputs: the concrete interface, sources, or artifacts the milestone consumes
- outputs: the concrete artifacts, contracts, or behaviors the milestone produces
- invariants: what must remain true while the milestone lands
- failure modes: known ways the milestone can fail or produce invalid output
- acceptance criteria: concrete checks, not vague intent
- validation package: the commands or gates that prove the milestone
- persona review trigger: which lens must run, if any
- fallback note: what to do if the milestone fails or must stop midway
- next dependency: what milestone it unlocks, if any

## Design Rules

- one milestone should solve one primary problem, not a bundle of loosely related problems
- one milestone should have one dominant validation story
- one milestone should leave the system in a coherent state even if later milestones never ship
- one milestone should be explainable in a short review without replaying the whole project
- one milestone should make closeout evidence obvious rather than reconstructed from memory
- one milestone must not depend on implementation-time repo archaeology to discover its real interface

## Smells That Mean "Split Again"

Split the milestone again if:

- it needs more than one major validation package
- it changes runtime plus generators plus audits in one jump
- it needs more than about five acceptance criteria
- it has no clear fallback or stopping point
- it requires explaining multiple unrelated code paths to justify the same diff

## Batch Or Promotion Milestones (pilot-first)

If the work is a bulk rollout ("apply this change everywhere") or a promotion step:

- the milestone must still be one coherent slice with one dominant validation story
- define the pilot target set explicitly (3–8% or a small representative set)
- define promotion batches explicitly (e.g. 2–5 targets, then 10–20, then full) and treat each as its own milestone
- stop conditions must include "any batch regression" and name the rollback/safe fallback
- follow `.codex/core/pilot-promotion.md` for the failure loop: stop expansion → debug → re-validate → continue

## Required Output Shape

When you write a milestone into a change record or planning doc, prefer this order:

1. goal
2. execution slices or in scope
3. out of scope
4. upstream dependencies and dependency resolution
5. touched systems
6. entry context
7. inputs, outputs, invariants, and failure modes
8. acceptance criteria
9. validation package
10. persona review
11. fallback note
12. next dependency if relevant

## Recommended Shapes

Use one of these shapes when possible:

- establish contract -> implement producer -> implement consumer -> remove compatibility path
- generate source artifact -> verify generated output -> wire runtime usage -> run integrated gate
- introduce shim -> migrate callers -> prove parity -> delete old path
- define spec -> implement behavior -> run audits -> archive decision
