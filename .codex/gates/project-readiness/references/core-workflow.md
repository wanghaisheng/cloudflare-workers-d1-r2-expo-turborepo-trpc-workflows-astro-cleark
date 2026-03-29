# Project Readiness Core Workflow

1. Resolve packet targets from `assets/manifests/packet-types.yaml`.
2. Exclude archived change records.
3. Match each packet to a readiness contract.
4. Check the required packet fields.
5. Apply waivers and fail on expired approvals.
6. Emit a deterministic report to `reports/governance/`.
