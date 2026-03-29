<!-- input: a proposed task, milestone intent, and known dependencies -->
<!-- output: a self-contained task packaging gate for Quick and BMM -->
<!-- pos: shared execution-readiness rules between sizing and milestone design -->
# Task Packaging

Use this file before implementation starts.

For non-trivial work that is recorded in a change packet, the machine-checkable companion gate is `npm run governance:readiness`.

The goal is not more ceremony. The goal is to prevent tasks from entering implementation with hidden dependencies, fuzzy boundaries, or execution-time context hunting.

## Self-Contained Standard

A task is ready only when the implementer can start with a bounded packet instead of reconstructing context during execution.

That packet must define:

- one primary goal
- in scope and out of scope
- upstream dependencies and how they are resolved
- deterministic interface
- acceptance criteria
- validation story
- fallback or stopping point

If those items are missing, the task is not packaged yet.

## Deterministic Interface Rule

Prefer decomposing by deterministic interface instead of by vague module or page names.

A deterministic interface means these are explicit:

- inputs
- outputs
- invariants
- failure modes

Examples:

- an API request/response contract
- a schema or type boundary
- a generator input/output pair
- a concrete file delivery list

## Dependency Resolution Rule

Do not leave dependency discovery to implementation time.

Before implementation, state:

- which dependencies exist
- whether they are data, API, code, or knowledge dependencies
- whether they are already available, mocked, stubbed, or blocked on an upstream milestone

If a task depends on "we'll figure it out while coding", it is not self-contained.

## Packaging Checklist

Before coding, confirm all of these:

1. the primary goal fits in one coherent milestone
2. in scope and out of scope are locked
3. the dominant validation story is known
4. inputs and outputs are explicit
5. failure modes are explicit
6. upstream dependencies are already resolved or deliberately deferred
7. the stopping point is coherent if later work never ships

## Failure Signals

Split again or escalate when any of these appear:

- the implementer needs execution-time repository archaeology to understand the task
- multiple plausible interfaces still exist
- upstream work is assumed but not named
- one milestone needs more than one major validation story
- multiple workers would have to negotiate shared state ad hoc

## Worker Packet Rule

If a task is handed to another engineer, worker, or worktree, package it as a minimal execution packet that includes:

- goal
- constraints
- dependencies
- inputs and outputs
- acceptance criteria
- validation package
- fallback note

Return results as a small packet, not an execution diary.
