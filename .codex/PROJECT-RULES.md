<!-- input: repository structure changes, file responsibilities, and documentation updates -->
<!-- output: project-level documentation and maintenance rules for Codex -->
<!-- pos: shared conventions used across the .codex workflow layer -->
# Project Rules

These rules were distilled from the repo's existing `.cursor` and `.windsurf` guidance and rewritten for Codex.

## Documentation Maintenance

- If functionality, architecture, or implementation style changes, update the relevant docs before finishing.
- If a folder changes in purpose or contents, update that folder's overview doc at the same time.
- Keep documentation short and local. Prefer one small folder-level overview over a large central document.
- Treat `docs/` as durable repo knowledge, `openspec/changes/` as the execution-plan layer, and `ref/` as external reference only.
- Treat `ref/_bmad/` as copied upstream/source material; fixture and archive paths under `ref/_bmad/` are non-authoritative reference surfaces.
- When repository structure, command policy, or governance contracts change, update the relevant root docs such as `ARCHITECTURE.md`, `QUALITY_SCORE.md`, `RELIABILITY.md`, and `SECURITY.md`.
- Keep CI, scheduled governance workflows, and local command contracts aligned when docs gates, architecture gates, or taste invariants change.

## Folder Overviews

Each meaningful folder should have a short overview doc when practical.

Recommended format:

1. a 1-3 line summary of what the folder is for
2. a small file list with name, location, and responsibility
3. a note that the doc must be updated whenever the folder changes materially

Non-production folders inside governed source trees such as `src/` should still have a short local exclusion note instead of remaining undocumented.

## File Headers

When practical, non-generated files should start with concise header comments covering:

- `input`: what the file depends on
- `output`: what the file provides
- `pos`: where the file sits in the system

Also keep the header comment current when the file's responsibility changes.

Files that do not support comments or are generated artifacts can be skipped, for example:

- `package.json`
- lockfiles
- generated JSON payloads

Demo-only folders, example surfaces, and `.bak` files under `src/` must be explicitly registered through a local exclusion note or the docs-gate registry. They are not allowed to remain implicit.

## Command Surface

- Standard agent-facing command examples should use `npm run ...` or `node scripts/...`.
- Do not use shell chaining, `echo`, or PowerShell-specific one-liners as the durable workflow contract.
- When a multi-step command surface matters to the workflow, wrap it in a Node script under `scripts/` and expose it through `package.json`.
- Keep `npm run docs:check`, `npm run lint:architecture`, and `npm run lint:taste` as the standard governance entrypoints when those contracts are in scope.

## Workflow Preference

- Treat `spec.md` and `dev.md` as entry workflows, not extra execution modes.
- Default `spec.md` requests toward `BMM`, unless the task is already fully framed and can stay inside one managed milestone.
- Default `dev.md` requests toward `Quick`, unless the task grows, needs discovery, or requires a reusable change record.
- Keep `Quick` and `BMM` as the only execution modes.
- Treat one WBS-style milestone as the preferred execution unit even when the user did not ask for planning terminology.
- Use `review.md`, `validate.md`, `archive.md`, and `hygiene.md` as support workflows inside the current `Quick` or `BMM` context when the task needs them.
- In `BMM`, do not stop at design prose. The change record must also define success criteria, validation gates, and the required test scope for implementation.

## Source Of Truth

- Codex should prefer `.codex/workflows/` and `.codex/core/` for execution guidance, plus `docs/system-maps/` for repo-specific hot-path context.
- `.codex/gates/` contains machine-readable gate packs that support `docs:check` and readiness automation; it is execution machinery, not the durable rationale layer.
- `.codex/reference/` is the copied upstream reference set.
- copied pages under `.codex/reference/` must keep an explicit non-authoritative marker near the top of the file
- `openspec/changes/` is the preferred location for new change records.
- durable task truth should live in repository files such as active change records rather than only in chat
- If a task already uses `_bmad-output/changes/`, keep it coherent, but do not start new work there by default.
- If local execution docs and copied upstream references diverge, update the local execution docs intentionally rather than following stale copied text by accident.
