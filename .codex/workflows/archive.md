<!-- input: validated changes, change records, and final implementation state -->
<!-- output: a closed-out task with durable notes for later maintenance -->
<!-- pos: archive workflow for the local Codex layer -->
# Archive Workflow

Use this when a change is complete and should leave behind a clean record.

## Archive Steps

1. Confirm the implementation is done or explicitly paused.
2. Update the active change record under `openspec/changes/{change-name}/` when one exists.
3. If the task is still using a legacy `_bmad-output/changes/{change-name}/` folder, keep it internally consistent and note that it is legacy.
4. Record the final state of the WBS-style Level 3 milestone or milestones that this archive closes.
5. Record any follow-up items that were intentionally deferred.
6. Make sure local docs point to final behavior, not in-progress plans.
7. Leave enough context that a later engineer can understand what happened without replaying the whole task.

## Archive Completion Conditions

Archive only when these are explicit:

- implementation state: shipped, paused, or intentionally deferred
- validation evidence: the commands or reports that support the closeout
- milestone closure: which WBS-style Level 3 milestone or milestones were actually closed
- residual risk: what still matters after the archive
- follow-up work: what remains open and where it should live
- archive destination: the final change-record location under `openspec/changes/` or `openspec/changes/archive/`

## Good Archive Output

A good closeout note captures:

- final scope
- closed milestone set
- verification performed
- known limitations
- next step, if any

The thing being archived is the change record and its final state. Archive output must not create the impression that archived notes are now the primary execution truth for new work.
