<!-- input: existing repository state, compatibility shims, generated artifacts, and stale docs -->
<!-- output: a focused hygiene or debt-reduction pass with concrete follow-up actions -->
<!-- pos: maintenance workflow for repo cleanup and drift reduction -->
# Hygiene Workflow

Use this when the goal is cleanup rather than net-new feature delivery.

This is a support workflow for periodic debt reduction inside the existing `Quick` or `BMM` operating model.

## What To Look For

- dead code or files no longer referenced by the active runtime
- duplicated logic that should collapse into one source of truth
- compatibility shims that can now be removed
- stale docs or workflow guidance that no longer matches reality
- generated artifacts or reports that should not live in source control
- reference-layer drift where `.codex/reference/` implies behavior no longer used locally
- non-production surfaces that leaked into governed runtime trees without an explicit exclusion record

## Fixed Cleanup Categories

Treat hygiene passes as one or more of these bounded categories:

- dead code removal
- duplicate logic collapse
- compatibility layer retirement
- stale durable-doc cleanup
- reference drift cleanup
- non-production surface cleanup

## Required Inputs

- relevant repo map for the touched area
- `harness.md`
- `observability.md` when cleanup starts from a failing audit or build symptom

## Output Standard

A hygiene pass should produce:

- a bounded cleanup diff
- explicit proof that behavior did not regress
- a short note on what debt was removed
- follow-up items when cleanup revealed larger structural work

If the hygiene pass removes behavior that was only kept for compatibility, the output should also say what durable record now owns that retirement decision.
