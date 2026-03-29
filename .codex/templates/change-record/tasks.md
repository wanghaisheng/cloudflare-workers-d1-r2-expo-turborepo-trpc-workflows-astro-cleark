<!-- input: a new or updated BMM change record -->
<!-- output: starter tasks scaffold for openspec/changes/<change-name>/tasks.md -->
<!-- pos: starter tasks template -->
# Tasks

## Progress Snapshot

- <source inputs>
- <current state>

## Packet Summary

- goal: <primary goal>
- in scope: <what this milestone or change will change>
- out of scope: <what stays explicitly outside this packet>
- upstream dependencies: <resolved dependencies or named upstream milestones>
- interface or delivery list: <inputs, outputs, or concrete delivery artifacts>
- acceptance criteria: <reviewable success checks>
- validation package: <package from validation-matrix.md>
- fallback note: <stopping point or safe fallback if implementation halts>
- linked docs: <proposal/design/spec/tasks paths or related durable docs>

## Milestone Execution Loop

1. read the active change and relevant `.codex/core` docs
2. confirm the milestone still fits the sizing rule
3. implement one bounded milestone only
4. select the validation package from `validation-matrix.md`
5. run commands, inspect first failure, fix, and repeat
6. self-review against the active change and spec
7. apply persona review when required
8. update ADR content when durable decisions change
9. record what ran, what passed, and what remains unverified

## M1. <Milestone Title>

- [ ] M1.1 <task>
- [ ] M1.2 <task>

## M2. <Milestone Title>

- [ ] M2.1 <task>
- [ ] M2.2 <task>

## Closeout Rule

- selected validation package
- commands that ran
- pass or fail status
- trophy evidence (at least 1 trophy, or explicit exemption)
  - trophy test: <test type + test name/path>
  - command: <command line>
  - evidence: <artifact path, output summary, or link>
  - exemption (if needed): <why not applicable> + <replacement evidence>
- acceptance criteria mapping (2–3 core AC seeds → evidence)
  - AC: <AC seed text or id> → evidence: <test/assertion/screenshot/log>
  - AC: <AC seed text or id> → evidence: <test/assertion/screenshot/log>
- residual risk
- ADR or doc follow-up required
- Pilot Gate D (WAL updated):
  - `.codex/wal/entries/YYYY/YYYY-MM-DD_<change-id>.json`
