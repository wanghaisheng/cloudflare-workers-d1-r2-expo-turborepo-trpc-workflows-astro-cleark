---
name: write-content
description: Write SEO and GEO optimized content from a topic and target keyword
argument-hint: "<topic> keyword=\"<target keyword>\" type=\"<content type>\""
---

# Write Content Command

Writes search-engine-optimized content, then applies a GEO optimization pass for AI citability. Delivers final content with SEO metadata and quality scores.

## Usage

```
/seo:write-content "email marketing for SaaS" keyword="saas email marketing" type="how-to guide"
/seo:write-content "cloud hosting comparison" keyword="best cloud hosting"
/seo:write-content "React performance tips" keyword="react performance optimization" type="blog post"
```

**Arguments:**
- Topic (required)
- `keyword="target keyword"` (required) -- primary SEO keyword
- `type="content type"` (optional, default: blog post) -- blog post, how-to guide, comparison, listicle, landing page, ultimate guide

## Workflow

1. **Run SEO Content Writer** -- Invoke `seo-content-writer` with topic, keyword, and type. Executes full workflow: SERP analysis, keyword map, title options, meta description, SEO headers, full content draft, featured snippet optimization, link recommendations, SEO review, and CORE-EEAT self-check.
2. **Run GEO Content Optimizer** -- Pass draft to `geo-content-optimizer` for a GEO enhancement pass: optimize for clear definitions, quotable statements with data, authority signals, AI-friendly structure (Q&A, tables, lists), factual density, and schema-ready FAQ.
3. **Compile Final Output** -- Assemble deliverables into the format below.

## Output Format

```markdown
# [Final Optimized Title]

**Meta Description**: "[description]" ([X] chars)
**Primary Keyword**: [keyword] | **Content Type**: [type]

---

[Full written content with GEO enhancements applied]

---

## SEO Metadata
| Element | Value |
| Title Tag, Meta Description, URL Slug, Keywords, Word Count |

## CORE Self-Check Scores (Content Body)
| Dimension | Score | Key Notes |
| C / O / R / E dimensions with GEO Score avg |

## GEO Optimization Notes
| GEO Factor | Score (1-10) | Notes |
| Definitions, Quotable statements, Factual density, Citations, Q&A, Authority |
**GEO Readiness**: X/10
```

## Tips

- Specify content type explicitly -- it affects CORE-EEAT weight profiles and content structure
- For competitive keywords, run `/seo:keyword-research` first to inform the content angle
- After publishing, run `/seo:audit-page` to verify on-page optimization
- Provide secondary keywords and target audience in your prompt for better results

## Related Skills

- [seo-content-writer](../build/seo-content-writer/) -- SEO content creation
- [geo-content-optimizer](../build/geo-content-optimizer/) -- GEO optimization
- [keyword-research](../research/keyword-research/) -- Research keywords before writing
- [content-quality-auditor](../cross-cutting/content-quality-auditor/) -- Full 80-item CORE-EEAT audit
