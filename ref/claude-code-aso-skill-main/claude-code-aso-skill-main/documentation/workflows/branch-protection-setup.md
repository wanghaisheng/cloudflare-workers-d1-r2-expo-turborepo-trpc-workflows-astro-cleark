# Branch Protection Setup Guide

This guide explains how to configure GitHub branch protection rules for the ASO skill repository to enable the dual-branch protection strategy (dev → main).

**Last Updated:** November 7, 2025

---

## Overview

The ASO skill uses a **two-branch protection model**:

```
Working branches (feature-*, fix-*, docs-*) → dev → main
```

- **Working branches:** Development happens here
- **dev:** Staging branch for integration testing
- **main:** Production releases only

---

## Prerequisites

- Repository admin access
- All workflows pushed to repository
- `CLAUDE_CODE_OAUTH_TOKEN` secret configured

---

## Step 1: Create Dev Branch

If the `dev` branch doesn't exist yet:

```bash
# From main branch
git checkout main
git pull origin main

# Create dev branch
git checkout -b dev
git push -u origin dev
```

---

## Step 2: Configure Branch Protection for `dev`

### Navigate to Branch Protection Settings

1. Go to: `https://github.com/alirezarezvani/claude-code-aso-skill/settings/branches`
2. Click **"Add branch protection rule"**
3. **Branch name pattern:** `dev`

### Required Settings for Dev Branch

**Branch Protection Settings:**

✅ **Require a pull request before merging**
- Require approvals: **1**
- Dismiss stale pull request approvals when new commits are pushed: **✅**
- Require review from Code Owners: **✅**

✅ **Require status checks to pass before merging**
- Require branches to be up to date before merging: **✅**
- **Required status checks** (add these):
  - `Python Quality (3.8)`
  - `Python Quality (3.9)`
  - `Python Quality (3.10)`
  - `Python Quality (3.11)`
  - `Python Quality (3.12)`
  - `Python Quality (3.13)`
  - `CodeQL Security Analysis`
  - `Secret Scanning`
  - `Claude Code Review`

✅ **Require conversation resolution before merging**

✅ **Require linear history** (squash or rebase merge only)

✅ **Do not allow bypassing the above settings** (no admin bypass)

❌ **Allow force pushes:** OFF
❌ **Allow deletions:** OFF

---

## Step 3: Configure Branch Protection for `main`

### Navigate to Branch Protection Settings

1. Go to: `https://github.com/alirezarezvani/claude-code-aso-skill/settings/branches`
2. Click **"Add branch protection rule"**
3. **Branch name pattern:** `main`

### Required Settings for Main Branch

**Branch Protection Settings:**

✅ **Restrict who can push to matching branches**
- Only allow specific branches to push: **dev** (IMPORTANT: Only dev can push to main)

✅ **Require a pull request before merging**
- Require approvals: **1**
- Dismiss stale pull request approvals when new commits are pushed: **✅**
- Require review from Code Owners: **✅**

✅ **Require status checks to pass before merging**
- Require branches to be up to date before merging: **✅**
- **Required status checks** (add these):
  - `Claude Release Validation` (from claude-main-check.yml)
  - `Python Quality (3.13)` (one version check)
  - `CodeQL Security Analysis`

✅ **Require conversation resolution before merging**

✅ **Require linear history** (squash or rebase merge only)

✅ **Do not allow bypassing the above settings** (enforce for admins)

❌ **Allow force pushes:** OFF
❌ **Allow deletions:** OFF

---

## Step 4: Verify Protection Rules

### Test Dev Protection

```bash
# Create test branch
git checkout -b test-protection-dev
echo "test" > test.txt
git add test.txt
git commit -m "test: branch protection"
git push origin test-protection-dev

# Try to push directly to dev (should fail)
git push origin test-protection-dev:dev
# Expected: "remote: error: GH006: Protected branch update failed"

# Create PR instead (should succeed)
gh pr create --base dev --title "Test: Branch protection"
```

### Test Main Protection

```bash
# Try to push directly to main from working branch (should fail)
git push origin test-protection-dev:main
# Expected: "remote: error: GH006: Protected branch update failed"

# Try to create PR from working branch to main (should fail)
gh pr create --base main --title "Test: Invalid PR"
# Expected: Should be blocked by claude-main-check workflow
```

---

## Step 5: Configure Required Secrets

### GitHub Secrets Configuration

1. Go to: `https://github.com/alirezarezvani/claude-code-aso-skill/settings/secrets/actions`
2. Add the following secrets:

**CLAUDE_CODE_OAUTH_TOKEN** (Required)
- Get from: Claude Code app integration
- Used by: `claude-code-review.yml`, `claude.yml`, `claude-main-check.yml`

**GITHUB_TOKEN** (Automatic)
- Provided automatically by GitHub Actions
- Used for: Branch operations, PR creation, Wiki sync

---

## Step 6: Enable GitHub Discussions (Optional)

For community feedback and ideas integration:

1. Go to: `https://github.com/alirezarezvani/claude-code-aso-skill/settings`
2. Scroll to **Features**
3. Enable **Discussions**

---

## Step 7: Enable GitHub Wiki

For automatic Wiki synchronization:

1. Go to: `https://github.com/alirezarezvani/claude-code-aso-skill/settings`
2. Scroll to **Features**
3. Enable **Wikis**

---

## Workflow Summary

Once configured, the workflow operates as follows:

### 1. Create Issue
```
User creates issue → Labels it "ready"
  ↓
Automatic branch creation (feature-{issue}-{slug})
  ↓
User receives comment with checkout instructions
```

### 2. Work on Branch
```
User makes changes → Pushes to branch
  ↓
Auto-creates PR to dev
  ↓
Quality checks run (Python quality, security, Claude review)
  ↓
PR labeled by size (XS/S/M/L/XL)
```

### 3. Code Review
```
Claude Code reviews automatically
  ↓
Human reviewer approves (if quality checks pass)
  ↓
Merge to dev (squash/rebase)
  ↓
Branch deleted automatically
Issue closed automatically
```

### 4. Release to Main
```
Manual trigger: /auto-pr-main workflow
  ↓
Creates PR: dev → main
  ↓
Claude minimal check runs
  ↓
Human approval required
  ↓
Merge to main (linear history)
  ↓
Wiki auto-synced
GitHub Release created (if configured)
```

---

## Troubleshooting

### Status checks not appearing

**Problem:** Required status checks don't show up in dropdown

**Solution:**
1. Merge one PR to dev first (triggers workflows)
2. Wait for all workflows to complete
3. Status checks will then appear in settings
4. Add them to required checks

### Direct push to dev/main still works

**Problem:** Admin can still push directly

**Solution:**
1. Verify **"Do not allow bypassing"** is enabled
2. Ensure **"Include administrators"** is checked
3. For main: Verify **"Restrict who can push"** is set to dev branch only

### PR from working branch to main allowed

**Problem:** Can create PR from feature-* to main

**Solution:**
1. `claude-main-check.yml` will block non-dev PRs
2. Check workflow permissions (pull-requests: write)
3. Verify `CLAUDE_CODE_OAUTH_TOKEN` secret exists

### Workflows not triggering

**Problem:** Quality checks don't run on PR

**Solution:**
1. Check workflow file syntax (`.github/workflows/*.yml`)
2. Verify branch patterns match (`branches: [dev, main]`)
3. Check path filters (may skip if no relevant files changed)
4. Review Actions tab for errors

---

## Verification Checklist

After configuration, verify:

- [ ] `dev` branch exists and is protected
- [ ] `main` branch is protected with dev-only push restriction
- [ ] Required status checks configured for both branches
- [ ] CLAUDE_CODE_OAUTH_TOKEN secret added
- [ ] Test PR to dev triggers all quality checks
- [ ] Test PR from non-dev to main is blocked
- [ ] Branch auto-creation works (issue labeled "ready")
- [ ] Branch auto-deletion works (PR merged)
- [ ] Issue auto-close works (PR merged with linked issue)
- [ ] Wiki sync works (push to main)

---

## Maintenance

### Updating Required Checks

When adding new quality workflows:

1. Push new workflow file
2. Trigger it at least once (merge to dev)
3. Add check name to branch protection settings
4. Update this documentation

### Adjusting Protection Rules

Branch protection can be adjusted based on team size and velocity:

**For solo developer:**
- Reduce required approvals to 0 (trust automation)
- Keep all quality checks required
- Maintain linear history

**For small team (2-5):**
- Keep 1 approval requirement
- All quality checks required
- Code owners for critical files

**For larger team (5+):**
- Increase to 2 approvals
- Stricter code owner requirements
- Consider additional security checks

---

## Additional Resources

- [GitHub Branch Protection Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Status Checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks)
- [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)

---

**Questions?** Open a [GitHub Discussion](https://github.com/alirezarezvani/claude-code-aso-skill/discussions)
