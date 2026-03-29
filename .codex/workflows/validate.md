<!-- input: completed changes, change records, test results, and synced docs -->
<!-- output: readiness assessment for closing or continuing a change -->
<!-- pos: validation workflow for the local Codex layer -->
# Validate Workflow

Use this before closing meaningful work in either `Quick` or `BMM`.

## Validation Checklist

### Behavior

- the requested behavior is implemented
- changed code paths were inspected, not just edited
- the validation package from `.codex/core/validation-matrix.md` was applied at the right depth

### Docs

- changed behavior or architecture is reflected in local docs
- folder overviews were updated when folder responsibilities changed
- workflow docs stay aligned if `.codex` behavior changed
- `npm run docs:check` ran when workflow docs, root governance docs, or durable repo knowledge changed
- any `docs:check` warnings were either accepted explicitly or upgraded to blocking through `npm run docs:check:strict`

### Change Record

If the task uses a change record, keep one primary truth source:

- preferred: `openspec/changes/{change-name}/`
- legacy only when already in use: `_bmad-output/changes/{change-name}/`

At minimum, the record should still explain:

- why the change exists
- what was implemented
- how it was verified
- what remains deferred or risky
- which WBS-style Level 3 milestone closed or remains open

### Closure

Before declaring the task done, capture:

- what was verified
- what could not be verified locally
- what remains risky
- whether follow-up work is needed
- whether the active milestone state in repository files matches the closeout claim
- whether the docs integrity gate passed or why it was deferred
