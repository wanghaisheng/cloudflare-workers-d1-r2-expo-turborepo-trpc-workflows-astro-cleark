# SEO & GEO Skills Library — Versions

Current versions of all skills. Agents can fetch this file from `https://raw.githubusercontent.com/aaron-he-zhu/seo-geo-claude-skills/main/VERSIONS.md` once per session to check for updates.

## Skills

| Skill | Category | Version | Last Updated |
|-------|----------|---------|--------------|
| keyword-research | research | 2.0.0 | 2026-02-08 |
| competitor-analysis | research | 2.0.0 | 2026-02-08 |
| serp-analysis | research | 2.0.0 | 2026-02-08 |
| content-gap-analysis | research | 2.0.0 | 2026-02-08 |
| seo-content-writer | build | 2.0.0 | 2026-02-08 |
| geo-content-optimizer | build | 2.0.0 | 2026-02-08 |
| meta-tags-optimizer | build | 2.0.0 | 2026-02-08 |
| schema-markup-generator | build | 2.0.0 | 2026-02-08 |
| on-page-seo-auditor | optimize | 2.0.0 | 2026-02-08 |
| technical-seo-checker | optimize | 2.0.0 | 2026-02-08 |
| internal-linking-optimizer | optimize | 2.0.0 | 2026-02-08 |
| content-refresher | optimize | 2.0.0 | 2026-02-08 |
| rank-tracker | monitor | 2.0.0 | 2026-02-08 |
| backlink-analyzer | monitor | 2.0.0 | 2026-02-08 |
| performance-reporter | monitor | 2.0.0 | 2026-02-08 |
| alert-manager | monitor | 2.0.0 | 2026-02-08 |
| content-quality-auditor | cross-cutting | 2.0.0 | 2026-02-08 |
| domain-authority-auditor | cross-cutting | 2.0.0 | 2026-02-08 |
| entity-optimizer | cross-cutting | 2.0.0 | 2026-02-08 |
| memory-management | cross-cutting | 2.0.0 | 2026-02-08 |

## Changelog

### v2.0.0 (2026-02-08)
- CORE-EEAT content quality benchmark (80 items, 8 dimensions, veto system)
- CITE domain authority rating (40 items, 4 dimensions, veto system)
- Content-type weighted scoring and domain-type weighted scoring
- Entity optimizer with Knowledge Graph + Wikidata + AI resolution
- Memory management with two-layer hot/cold storage
- Tool-agnostic ~~placeholder connector system with progressive enhancement tiers
- 9 one-shot commands (`/seo:audit-page`, `/seo:audit-domain`, etc.)
- Inter-skill handoff protocol with score passthrough
- skills.sh marketplace and Claude Code plugin distribution

### v1.0.0 (2026-01-28)
- 20 skills across 5 categories (research, build, optimize, monitor, cross-cutting)
- Basic SEO and GEO content optimization workflows
