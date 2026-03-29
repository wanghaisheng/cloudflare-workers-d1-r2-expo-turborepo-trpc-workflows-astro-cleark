# 主题集群 (Topic Cluster) 规划模板

> Pillar-Cluster 模型是内容 SEO 的核心架构，支柱页与集群页互链形成主题权威。

## 📋 概念说明

### 什么是 Topic Cluster？
```
                    ┌─────────────┐
                    │   集群页1   │
                    └──────┬──────┘
                           │
    ┌─────────────┐   ┌────┴────┐   ┌─────────────┐
    │   集群页2   │───│ 支柱页  │───│   集群页3   │
    └─────────────┘   └────┬────┘   └─────────────┘
                           │
                    ┌──────┴──────┐
                    │   集群页4   │
                    └─────────────┘
```

| 页面类型 | 定义 | 特点 |
|----------|------|------|
| 支柱页 (Pillar Page) | 某主题的综合指南页 | 3000-5000字，覆盖所有子话题 |
| 集群页 (Cluster Page) | 深入某个子话题的详细页 | 1500-2500字，专注单一话题 |

---

## 🎯 Topic Cluster 规划模板

### Cluster #1: [主题名称]

#### 支柱页信息
| 字段 | 内容 |
|------|------|
| **支柱页标题** | The Complete Guide to [主题] |
| **目标关键词** | [核心关键词] |
| **URL** | /guide/[主题-slug] |
| **预计字数** | 4000+ |
| **发布优先级** | 🔴 高 |

#### 集群页列表
| 序号 | 集群页标题 | 目标关键词 | URL | 字数 | 优先级 | 状态 |
|------|------------|------------|-----|------|--------|------|
| 1 | [子话题1标题] | [关键词1] | /[主题]/[子话题1] | 2000 | 🔴 高 | 待创建 |
| 2 | [子话题2标题] | [关键词2] | /[主题]/[子话题2] | 1800 | 🟡 中 | 待创建 |
| 3 | [子话题3标题] | [关键词3] | /[主题]/[子话题3] | 2200 | 🟡 中 | 待创建 |

#### 内链规划
```markdown
## 内链策略

### 支柱页 → 集群页
- 在支柱页的 [章节1] 链接到 集群页1
- 在支柱页的 [章节2] 链接到 集群页2
- ...

### 集群页 → 支柱页
- 每个集群页开头链接到支柱页
- 每个集群页结尾CTA链接到支柱页

### 集群页 ↔ 集群页
- 集群页1 链接到 集群页2（相关话题）
- 集群页3 链接到 集群页1（补充阅读）
```

---

## 📝 完整 Cluster 示例：Berberine

### Cluster: Berberine Complete Guide

#### 支柱页
| 字段 | 内容 |
|------|------|
| **标题** | Berberine: The Complete Science-Based Guide (2026) |
| **关键词** | berberine, berberine supplement, berberine benefits |
| **URL** | /guide/berberine-complete-guide |
| **H2结构** | What is Berberine / Benefits / Dosage / Side Effects / Best Products / FAQ |

#### 集群页矩阵
| 类型 | 标题 | 关键词 | URL | 优先级 |
|------|------|--------|-----|--------|
| 功效 | Berberine for Blood Sugar: Complete Guide | berberine blood sugar | /knowledge/berberine-blood-sugar | 🔴 P0 |
| 功效 | Berberine for Weight Loss: What Research Shows | berberine weight loss | /knowledge/berberine-weight-loss | 🔴 P0 |
| 功效 | Berberine and Gut Health: The Microbiome Connection | berberine gut health | /knowledge/berberine-gut-health | 🟡 P1 |
| 对比 | Berberine vs Metformin: Which is Better? | berberine vs metformin | /knowledge/berberine-vs-metformin | 🔴 P0 |
| 对比 | Berberine vs Ozempic: A Detailed Comparison | berberine vs ozempic | /knowledge/berberine-vs-ozempic | 🟡 P1 |
| 用法 | Berberine Dosage Guide: How Much to Take | berberine dosage | /guide/berberine-dosage | 🔴 P0 |
| 安全 | Berberine Side Effects: What You Need to Know | berberine side effects | /knowledge/berberine-side-effects | 🔴 P0 |
| 产品 | Best Berberine Supplements: Expert Reviews | best berberine supplement | /products/best-berberine | 🔴 P0 |
| 研究 | Latest Berberine Research: 2026 Updates | berberine research | /research/berberine-latest | 🟡 P1 |
| FAQ | Berberine FAQ: 50 Common Questions Answered | berberine faq | /guide/berberine-faq | 🟢 P2 |

---

## 📊 页面类型标准结构

### 支柱页结构模板
```markdown
# [H1: 包含主关键词的标题]

[开篇介绍 - 100字内包含主关键词]

## Table of Contents
- [自动生成目录]

## What is [主题]? {#what-is}
[基础介绍，链接到相关集群页]

## [主题] Benefits {#benefits}
### Benefit 1: [子标题]
[内容，内链到详细集群页]
### Benefit 2: [子标题]
...

## How to Use [主题] {#how-to-use}
[用法指南，内链到剂量集群页]

## [主题] Side Effects {#side-effects}
[安全信息，内链到副作用集群页]

## Best [主题] Products {#products}
[产品推荐，内链到产品对比页]

## Frequently Asked Questions {#faq}
[FAQ Schema标记]

## Conclusion
[总结 + CTA]
```

### 集群页结构模板
```markdown
# [H1: 长尾关键词标题]

[开篇介绍 - 链接到支柱页]

## Key Takeaways
- [要点1]
- [要点2]
- [要点3]

## [H2: 子话题1]
[详细内容]

## [H2: 子话题2]
[详细内容]

## [H2: 子话题3]
[详细内容]

## Related Topics
- [内链到其他集群页1]
- [内链到其他集群页2]

## FAQ
[FAQ Schema]

## Next Steps
[CTA + 链接回支柱页]
```

---

## 📅 发布计划模板

### 阶段一：支柱页优先（第1-2周）
| 周 | 任务 | 交付物 |
|-----|------|--------|
| Week 1 | 支柱页内容创作 | 初稿完成 |
| Week 2 | 支柱页优化发布 | 上线 |

### 阶段二：核心集群页（第3-6周）
| 周 | 发布内容 | 数量 |
|-----|----------|------|
| Week 3 | P0优先级集群页 | 2篇 |
| Week 4 | P0优先级集群页 | 2篇 |
| Week 5 | P1优先级集群页 | 2篇 |
| Week 6 | P1优先级集群页 | 2篇 |

### 阶段三：补充内容（持续）
- 每周 2-3 篇集群页
- 每月更新支柱页
- 季度新增 Cluster

---

## ✅ Cluster 完成度检查

### 每个 Cluster 需满足
- [ ] 1个支柱页（3000+字）
- [ ] 10-30个集群页
- [ ] 支柱页链接到所有集群页
- [ ] 所有集群页链接回支柱页
- [ ] 相关集群页之间有交叉链接
- [ ] 锚文本语义明确（非"点击这里"）
- [ ] 每页内链数 5-20 个
