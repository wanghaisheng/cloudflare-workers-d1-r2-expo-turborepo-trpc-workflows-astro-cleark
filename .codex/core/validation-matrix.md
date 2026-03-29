<!-- input: touched subsystems, changed code paths, and available local commands -->
<!-- output: repo-specific validation requirements by change type -->
<!-- pos: shared validation matrix for Quick and BMM -->
# Validation Matrix

Choose the smallest validation package that credibly proves the change, then add broader gates when the touched area requires it.

For every package below, report:

- what commands ran
- whether they passed
- what could not be verified locally

## Baseline Package

Use when the change is local and does not affect shipped integrated behavior.

Minimum:

- `npm run lint`
- `npm run check:syntax`
- `npx vitest run <targeted-test-file>`

Ship gate:

- all selected commands green

If fail:

- read the failure output first
- fix the cause or call out the remaining gap explicitly

## Docs, Workflow, Or Governance Package

Use when workflow docs, root governance docs, durable knowledge docs, or command-surface contracts change.

Minimum:

- `npm run docs:check`
- `npm run governance:readiness` when the change affects readiness packets, change-record task templates, or task-packaging contracts
- `npm run check:syntax` when `package.json` or scripts changed
- `npm run check:scripts` when script entrypoints, wrappers, or `scripts/README.md` changed
- `npm run lint:architecture` when the change affects source-family boundaries, import rules, or architecture allowlists
- `npx vitest run tests/governance/architecture-lint.spec.ts` when the change extends layer rules, provider seam rules, or architecture fixtures
- `npm run lint:taste` when the change affects taste invariants, hardcoded-text governance, console usage policy, or taste allowlists

Add when relevant:

- `npm run docs:check:strict` when the change promotes new governed-doc classes or the closeout requires zero warning drift
- `npm run lint:architecture:strict` or `npm run lint:taste:strict` when the closeout explicitly requires zero warning drift from those governance surfaces
- `node scripts/taste-baseline.mjs --check` when the change modifies taste baselines or the rollout expects strict taste governance to stay reproducible

Ship gate:

- `npm run build:dev` only when the command-surface change affects integrated shipped behavior

If fail:

- fix the drift, missing metadata, broken link, or non-standard command contract before closing

## Routing, SSR, Or Head Package

Use when routing, SSR output, head tags, navigation semantics, or entrypoints change.

Minimum:

- `npx vitest run tests/ssr-head.test.ts`

Ship gate:

- `npm run build:dev`

Add when relevant:

- route-specific tests from `tests/routes/` or `tests/ssr/`

If fail:

- inspect SSR output or build tail before patching broadly

## I18n Or Language-Selection Package

Use when locale detection, language switching, route locale behavior, or translated output changes.

Minimum:

- `npx vitest run tests/i18n/language-suggestion.spec.ts`
- `npm run i18n:check`

Ship gate:

- `npm run build:dev` when routing, navigation, or SSR output changed

If fail:

- separate text issues from navigation-history or SSR issues before fixing

## SEO, Metadata, Sitemap, Or Audit Package

Use when metadata generation, locale SEO files, sitemap coverage, or audit behavior changes.

Minimum:

- `npx vitest run tests/ssr-head.test.ts`
- `node scripts/run-check-links.mjs --mode=dev`
- `node scripts/seo/check-seo-coverage.js`

Ship gate:

- `npm run build:dev` when the change affects shipped output or integrated audits

If fail:

- read the latest report in `reports/` or the command tail
- determine whether the failure is new or pre-existing

## Content Pipeline Or Generated-Asset Package

Use when content, snapshots, routes, sitemap generation, or prerender inputs change.

Minimum:

- `npm run generate:snapshots`
- `npm run generate:routes`
- `npm run generate:sitemap`
- `npm run generate:prerender`

Ship gate:

- `npm run prebuild`
- `npm run build:dev` when runtime output or audits depend on generated results

If fail:

- identify the first broken generator rather than only fixing the final build symptom

## Full Gate

Use `npm run build:dev` when the change touches more than one major system, or when a narrower package would not prove the shipped behavior.
