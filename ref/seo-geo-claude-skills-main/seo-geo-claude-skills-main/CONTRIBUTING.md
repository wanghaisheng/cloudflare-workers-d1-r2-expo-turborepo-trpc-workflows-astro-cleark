# Contributing

Thanks for your interest in contributing to the SEO & GEO Skills Library! This guide covers how to add new skills, improve existing ones, and submit your changes.

## Requesting a Skill

If you have an idea for a skill but don't want to build it yourself, [open a Skill Request issue](https://github.com/aaron-he-zhu/seo-geo-claude-skills/issues/new?template=skill-request.yml).

## Adding a New Skill

### 1. Choose the correct category

| Category | Directory | Use when the skill... |
|----------|-----------|----------------------|
| Research | `research/` | Gathers market data before content creation (keywords, competitors, SERP, gaps) |
| Build | `build/` | Creates new content or markup (writing, meta tags, schema, GEO optimization) |
| Optimize | `optimize/` | Improves existing content or site health (audits, linking, refresh) |
| Monitor | `monitor/` | Tracks performance over time (rankings, backlinks, alerts, reports) |
| Cross-cutting | `cross-cutting/` | Spans multiple phases (quality frameworks, entity, memory) |

### 2. Create the skill directory

```bash
mkdir -p <category>/<skill-name>
```

The directory name must:
- Be 1-64 characters
- Use only lowercase letters, numbers, and hyphens
- Not start or end with a hyphen
- Not contain consecutive hyphens

### 3. Create `SKILL.md` with required frontmatter

```yaml
---
name: your-skill-name
description: 'Use when the user asks to "[trigger phrase 1]", "[trigger phrase 2]". [What it does in one sentence]. For [related task], see [other-skill].'
license: Apache-2.0
metadata:
  author: your-github-username
  version: "2.0.0"
  geo-relevance: "high|medium|low"
  tags:
    - seo
    - your-tags-here
  triggers:
    - "trigger phrase 1"
    - "trigger phrase 2"
---

# Your Skill Name

[Skill instructions here...]
```

**Critical**: The `name` field must match the directory name exactly.

### 4. Write effective instructions

A well-structured SKILL.md includes:

- **When to Use This Skill** — specific use cases
- **What This Skill Does** — numbered list of functions
- **How to Use** — invocation examples
- **Data Sources** — which `~~placeholders` it uses (see [CONNECTORS.md](./CONNECTORS.md))
- **Instructions** — step-by-step workflow with markdown templates for output
- **Validation Checkpoints** — input and output quality checks
- **Example** — concrete input/output example
- **Related Skills** — links to complementary skills

Keep the main SKILL.md under 500 lines. Put detailed references, templates, and rubrics in a `references/` subdirectory.

### 5. Update tracking files

After adding or updating a skill, update these files:

- [ ] `VERSIONS.md` — add or update the skill's version and date
- [ ] `.claude-plugin/marketplace.json` — add the skill path to the `skills` array
- [ ] `.claude-plugin/plugin.json` — add the skill path to the `skills` array
- [ ] `README.md` — add the skill to the appropriate category table

## Improving Existing Skills

- Keep changes focused on the specific improvement
- Bump the version in the skill's `metadata.version` field
- Update `VERSIONS.md` with the new version and date
- If adding reference documents, put them in the skill's `references/` subdirectory

## Quality Checklist

Before submitting a PR:

- [ ] `name` field matches directory name exactly
- [ ] `description` includes trigger phrases AND scope boundaries
- [ ] SKILL.md is under 500 lines
- [ ] Follows the [Agent Skills specification](https://agentskills.io/specification.md)
- [ ] Uses `~~placeholder` pattern for tool references (not specific tool names)
- [ ] Includes validation checkpoints
- [ ] Includes at least one concrete example
- [ ] Related skills are linked correctly
- [ ] All tracking files updated (VERSIONS.md, marketplace.json, plugin.json, README.md)

## Submitting Your Contribution

1. Fork this repository
2. Create a feature branch: `feature/your-skill-name`
3. Make your changes following the guidelines above
4. Submit a pull request with a clear description

## Code of Conduct

Be respectful, constructive, and focused on making the skills library better for everyone.
