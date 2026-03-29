## What does this PR do?

<!-- Brief description of changes -->

## Type of change

- [ ] New skill
- [ ] Skill update
- [ ] Documentation
- [ ] Bug fix
- [ ] Other

## Checklist

### For new skills:
- [ ] `name` field matches directory name exactly
- [ ] `description` includes trigger phrases AND scope boundaries
- [ ] Placed in the correct category directory (research/build/optimize/monitor/cross-cutting)
- [ ] SKILL.md is under 500 lines
- [ ] Uses `~~placeholder` pattern for tool references
- [ ] Includes validation checkpoints
- [ ] Includes at least one concrete example
- [ ] Related skills are linked correctly

### For all changes:
- [ ] Follows the [Agent Skills specification](https://agentskills.io/specification.md)
- [ ] `VERSIONS.md` updated with new version and date
- [ ] `.claude-plugin/marketplace.json` skills array updated (if adding a new skill)
- [ ] `.claude-plugin/plugin.json` skills array updated (if adding a new skill)
- [ ] `README.md` skills table updated (if adding a new skill)
