# Doc Quality Core Workflow

1. Resolve the governed doc and workflow surfaces from `assets/manifests/governed-surfaces.yaml`.
2. Match each surface to one contract.
3. Apply the contract rules plus fail-closed policy.
4. Apply semantic-policy checks and script governance checks.
5. Apply waivers, failing on expired approvals.
6. Emit a deterministic report to `reports/governance/`.
