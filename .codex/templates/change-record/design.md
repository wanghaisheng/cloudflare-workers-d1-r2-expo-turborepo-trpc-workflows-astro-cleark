<!-- input: a new or updated BMM change record -->
<!-- output: starter design scaffold for openspec/changes/<change-name>/design.md -->
<!-- pos: starter design template -->
# Design: <Change Title>

## Problem Statement

- <problem framing>
- <why a simple patch is not enough>

## ADR 1: <Decision Title>

Context:

- <context>
- <context>

Decision:

- <decision>

Tradeoffs:

- <tradeoff>
- <tradeoff>

Validation impact:

- <impact on validation or closeout>

Migration and follow-up implications:

- <follow-up>
- <follow-up>

## Pilot Gate B: Design-first validation (pre-coding checks)

Before coding, explicitly validate the design by answering:

- Edge cases and failure modes:
  - <edge case>
  - <failure mode>
- Determinism and scope:
  - what is the exact unit of change? (should align with Gate A)
  - what must remain unchanged?
- Stage Gate 1 seed (acceptance + trophy):
  - 2–3 core acceptance criteria seeds (testable statements):
    - <AC seed>
    - <AC seed>
  - Trophy candidate (or exemption):
    - proposed trophy test: <test type + target file or scenario>
    - command to run: <command>
    - if exempt: <why trophy is not applicable> + <what evidence replaces it>
- Verification plan:
  - which tests/commands will be used to prove correctness?
  - what would falsify this design?
- Fallback / rollback:
  - where is the safe stopping point if implementation fails mid-way?

## Milestone Sizing Note

- one milestone should be one coherent WBS-style Level 3 execution slice
- one milestone should have one dominant validation story

## Milestone 1: <Name>

Goal:

- <one coherent outcome>

Execution slices:

- <item>
- <item>

Out of scope:

- <item>
- <item>

Touched systems:

- <runtime | content-pipeline | seo-audit | i18n | build | docs | other>

Entry context:

- <docs or specs that must be read first>

Acceptance criteria:

- <criterion>
- <criterion>

Validation package:

- <package from validation-matrix.md>
- <extra gate if needed>

Persona review:

- <required lens or none>

Fallback note:

- <rollback, pause point, or compatibility note>

Next dependency:

- <next milestone or none>
