# Doc Quality Contract Schema

Each contract file under `assets/contracts/` defines default rules for one governed doc class.

Current fields:

- `id`
- `description`
- `waiver_class`
- `rules.require_frontmatter`
- `rules.required_frontmatter_keys`
- `rules.frontmatter_array_keys`
- `rules.freshness_days`
- `rules.require_source_of_truth_entries`
- `rules.require_validation_entrypoints`
- `rules.required_source_of_truth_any_of_patterns`
- `rules.allowed_source_of_truth_patterns`
- `rules.check_links`
- `rules.check_review_recency`
- `rules.check_forbidden_reference_patterns`
- `rules.check_validation_entrypoints`
- `rules.check_source_of_truth`
- `rules.check_workflow_command_patterns`

Manifest entries may override individual rule fields per path.
