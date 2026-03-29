<!-- input: finished implementation, validation evidence, and doc updates -->
<!-- output: a consistent final self-check before closing work -->
<!-- pos: shared closeout loop for Quick and BMM -->
# Closeout Loop

Before closing a task, run this loop.

If you want a ready-made summary shape, use `.codex/templates/closeout.md`.

## Ralph Loop

1. Re-read the user request and confirm the final diff still matches it.
2. Run the selected validation package and required hard gates.
3. Self-review against `harness.md`, the active mode expectations, and the current milestone boundary.
4. If a command fails, read the output, report, or latest log before changing code.
5. Fix the actual cause, then re-run the affected validation.
6. Run `npm run docs:check` when workflow docs, root governance docs, or durable repo knowledge changed.
7. If the closeout expects zero warning drift for governed docs, run `npm run docs:check:strict`.
8. Update milestone status, changed docs, any active change record, and any optional high-level WBS tracker that the task used.
9. Only close when the implementation, validation, and documentation story is coherent.

## Failure-Mode Checks

Before closing, explicitly rule out these four failure modes:

- `one-shotting`: confirm the delivered scope still fits the named milestone rather than a hidden larger task
- premature victory: confirm no declared acceptance criterion was skipped just because the main diff looks complete
- premature completion: confirm integrated behavior was checked when the touched surface required more than unit proof
- context-recovery failure: confirm a later engineer can recover state from docs, reports, and the change record without replaying chat

## Closeout Checklist

Capture all of these:

- what changed
- the compact result packet:
  - summary
  - files changed
  - validation
  - risks
  - next step
- which milestone closed
- what was verified
- what could not be verified locally
- what remains risky or deferred
- which docs or change records were updated
- which failure mode was actively guarded against if the task had unusual risk

## Closure Standard

Do not close work on a vague statement like "should be fine".

Close only when:

- required validations are green or clearly explained
- docs and change records match the implementation
- residual risk is explicit rather than implied
