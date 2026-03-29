# WAL Lifecycle Rules

This document defines how WAL entries are created, updated, and compressed to stay useful and lightweight.

## Creation triggers

Create a WAL entry when:

- a new OpenSpec change packet is created (`openspec/changes/<change-id>/`)
- a significant decision is made that affects architecture, storage, reliability, or UX
- an incident occurs (flake, crash, outage) that required investigation and mitigation

## Update triggers

Update the WAL entry when:

- the change scope shifts materially (intent/non-goals changed)
- a new key decision is made (add to `decisions[]`)
- you ran validations and have new evidence (update `evidence` and `actions.testsRun`)

## Checkpoint / archive triggers

Treat a WAL entry as “checkpointed” when:

- the corresponding OpenSpec change is moved to `openspec/changes/archive/<change-id>/`, or
- a release boundary is tagged and referenced from `CHANGELOG.md`

After checkpoint:

- avoid growing the old entry; instead add a new entry for follow-on work
- keep the entry immutable except for small fixes (typos, missing links)

## Compression rules (keep size small)

Prefer links over embedding:

- link to OpenSpec docs instead of repeating long explanations
- reference `commitShas` rather than embedding diffs
- summarize test output as pass/fail + short note

Hard guidance:

- entry SHOULD stay ≤ 50KB
- if it grows, move verbose detail to an OpenSpec doc and link it

## Index maintenance

Indexes are optional. If used:

- keep them small and human-reviewable
- update them only when it materially improves discoverability
- don’t block development on index freshness

