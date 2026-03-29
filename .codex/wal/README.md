# AI Development WAL (Write-Ahead Log)

思考支持p0-p3的single of source优先级

This repository uses a lightweight **AI Development WAL** convention to preserve:

- the **decision chain** (why we chose an approach)
- the **action chain** (what we changed, what we ran, what passed/failed)

The goal is **fast context recovery across sessions/agents** without storing bulky full transcripts.

This WAL is intentionally **checkpointed** by OpenSpec change records and closeout evidence.

## Relationship to existing repo artifacts

- **`openspec/changes/<change>/`**: the primary “change packet” (proposal/design/tasks/specs)
  - WAL entries should link to the change packet and capture the “delta narrative” + verification evidence.
- **`openspec/changes/archive/<change>/`**: a “checkpoint” indicating a change is closed/frozen.
- **`CHANGELOG.md` / `roadmap.md`**: high-level product story; WAL points to the exact change packets and commits.
- **Raw transcripts** (Cursor/agent logs): optional deep trace; WAL never depends on them.

## WAL building blocks

- **WAL entry**: one bounded unit of work or decision episode.
  - default unit in this repo: **one OpenSpec change packet** (plus optional sub-entries for major decisions/incidents)
- **Checkpoint**: a frozen set of WAL entries (typically when a change is archived or released)
- **Index**: small files that make entries discoverable by topic, file, or change id

## Directory layout

```
.codex/wal/
  README.md
  schema/
    wal-entry.schema.json
  entries/
    2026/
      2026-03-17_scope-schemas-by-domain-and-url-pattern.json
      2026-03-17_optimize-extension-ui.json
  index/
    index.json
    by-change.json
    by-file.json
    by-topic.json
```

Notes:

- Entries are **small JSON** so future agents can parse them reliably.
- Index files are optional but recommended once entries grow beyond a handful.

## Naming convention

Entry filename:

`YYYY-MM-DD_<change-id>.json`

Where `<change-id>` matches the OpenSpec folder name (kebab-case).

## Size rules (keep WAL lightweight)

- A single WAL entry SHOULD be **≤ 50KB**.
- Prefer referencing artifacts instead of embedding large content:
  - commit SHAs, file paths, test commands
  - OpenSpec change docs
- Avoid embedding large diffs, full tables, or long transcripts.

## When to write a WAL entry

Write/update a WAL entry when:

- a change packet is created (initial intent + plan)
- a major decision is made (schema, storage, concurrency, UI structure)
- validation is run (record commands and pass/fail)
- the change is archived (final checkpoint)

## Troubleshooting (2-minute WAL lookup)

When something breaks (flake, crash, regression, confusing behavior), use WAL to recover the last known-good decision/action chain without replaying full chat logs.

Lookup order:

1. **By change**: open the most relevant entry under `entries/YYYY/YYYY-MM-DD_<change-id>.json`.
2. **By topic**: check `index/by-topic.json` for matches (when maintained), then open the referenced entries.
3. **By file**: check `index/by-file.json` (when maintained) to find entries that previously touched the same surface.

Read these fields first:

- **`intent`**: confirm you are solving the same problem (avoid “fixing the wrong thing”).
- **`decisions[]`**: reuse the rationale/tradeoffs and watch for previously rejected options.
- **`actions.commandsRun` / `actions.testsRun`**: run the same shortest proof commands first.
- **`evidence.validationStatus` + notes**: see what was actually proven and what was left risky.
- **`links.changePaths`**: jump to the exact OpenSpec packet and closeout evidence.

If the investigation changes the method (new root cause, new mitigation, new validation):

- update the active change packet first (Gate A–C), then update the WAL entry (Gate D)
- after checkpoint/archival, prefer a **new** entry for follow-on incidents instead of growing the old one

