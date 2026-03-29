# 关键词研究标准操作流程 (SOP)

> 关键词是用户搜索意图的具体表现，围绕关键词输出内容就是在解决用户问题。

## 📋 前置准备

### 工具清单
- [ ] Semrush / Ahrefs（付费）
- [ ] Google Search Console（免费）
- [ ] Google Keyword Planner（免费）
- [ ] AnswerThePublic（免费额度）

### 输入材料
- [ ] 网站核心业务线清单
- [ ] 主产品/服务列表
- [ ] 竞争对手网站列表（10-30个）

---

## 🔄 执行流程

### 阶段一：核心词挖掘（第1-2天）

#### Step 1: 业务词梳理
```markdown
## 业务词清单模板

### 产品/服务1: [名称]
- 核心功能词: 
- 用户痛点词:
- 解决方案词:

### 产品/服务2: [名称]
- 核心功能词:
- 用户痛点词:
- 解决方案词:
```

#### Step 2: 工具导出
1. 登录 Semrush/Ahrefs
2. 输入核心业务词
3. 导出关键词列表（CSV格式）
4. 包含字段：关键词、搜索量、KD难度、CPC

#### Step 3: 竞品词分析
```markdown
## 竞品关键词收集模板

| 竞品网站 | 排名Top10关键词 | 月搜索量 | 我们是否覆盖 |
|----------|-----------------|----------|--------------|
| competitor1.com | keyword1 | 10,000 | ❌ |
| competitor1.com | keyword2 | 5,000 | ✅ |
```

---

### 阶段二：意图分类（第3天）

#### 搜索意图分类标准

| 意图类型 | 英文 | 特征词 | 漏斗阶段 | 优先级 |
|----------|------|--------|----------|--------|
| 学习型 | Informational | what, how, why, guide | TOFU | 中 |
| 比较型 | Commercial | best, vs, review, alternative | MOFU | 高 |
| 购买型 | Transactional | buy, price, discount, free trial | BOFU | 最高 |
| 导航型 | Navigational | [品牌名], login, official | - | 低 |

#### 意图分类模板
```markdown
## 关键词意图分类表

### 学习型 (Informational) - TOFU
| 关键词 | 搜索量 | KD | 备注 |
|--------|--------|-----|------|
| what is berberine | 12,000 | 25 | 入门科普 |
| berberine benefits | 8,000 | 30 | 功效介绍 |

### 比较型 (Commercial) - MOFU
| 关键词 | 搜索量 | KD | 备注 |
|--------|--------|-----|------|
| berberine vs metformin | 5,000 | 35 | 对比页 |
| best berberine supplement | 3,000 | 40 | 产品推荐 |

### 购买型 (Transactional) - BOFU
| 关键词 | 搜索量 | KD | 备注 |
|--------|--------|-----|------|
| buy berberine online | 2,000 | 45 | 购买页 |
| berberine price | 1,500 | 30 | 定价页 |
```

---

### 阶段三：Money List 标记（第4天）

#### Money Keywords 识别标准
- ✅ 高商业意图（比较型/购买型）
- ✅ 搜索量 > 1,000/月
- ✅ 与产品直接相关
- ✅ 竞争难度可接受（KD < 50）

#### Money List 模板
```markdown
## Money Keywords 优先列表

| 优先级 | 关键词 | 搜索量 | KD | CPC | 对应页面 | 状态 |
|--------|--------|--------|-----|-----|----------|------|
| P0 | best berberine for weight loss | 4,000 | 35 | $2.5 | /products | 待创建 |
| P0 | berberine supplement reviews | 3,500 | 40 | $1.8 | /reviews | 已有 |
| P1 | berberine dosage for diabetes | 2,000 | 30 | $1.2 | /guide | 待优化 |
```

---

### 阶段四：关键词分组（第5天）

#### 按产品/功能分组
```markdown
## 产品关键词分组

### 产品1: Berberine Supplement
#### 核心词
- berberine supplement (8,000)
- berberine capsules (3,000)

#### 对比词
- berberine vs metformin (5,000)
- berberine alternative (1,200)

#### 用例词
- berberine for blood sugar (2,500)
- berberine for weight loss (4,000)

#### 定价词
- berberine price (1,500)
- cheap berberine (800)
```

---

## 📊 交付物清单

### 必须交付
- [ ] 关键词主表（Excel/Google Sheets）
- [ ] 意图分类表（3个视图）
- [ ] Money List 优先级排序
- [ ] 竞品关键词gap分析

### 表格字段标准
| 字段 | 必填 | 说明 |
|------|------|------|
| 关键词 | ✅ | 原始关键词 |
| 搜索量 | ✅ | 月均搜索量 |
| KD难度 | ✅ | 0-100 |
| CPC | ⬚ | 广告出价参考 |
| 主要国家 | ⬚ | 搜索来源国 |
| 意图类型 | ✅ | Info/Commercial/Trans |
| 漏斗阶段 | ✅ | TOFU/MOFU/BOFU |
| 对应页面 | ⬚ | 目标着陆页 |
| 优先级 | ✅ | P0/P1/P2 |

---

## ⚠️ 常见误区

### ❌ 错误做法
1. 只追求高搜索量词，忽略转化意图
2. 创造新词期望用户搜索（SEO无法做到）
3. 忽略长尾词的转化价值
4. 不做竞品关键词分析

### ✅ 正确做法
1. 优先商业意图词，平衡搜索量与转化
2. 基于用户已有搜索行为做优化
3. 长尾词往往转化率更高
4. 从竞品gap中发现机会

---

## 🔄 更新周期

| 任务 | 频率 | 责任人 |
|------|------|--------|
| 完整关键词研究 | 每季度 | SEO负责人 |
| Money List 更新 | 每月 | SEO负责人 |
| 竞品监控 | 每两周 | 内容团队 |
| GSC新词发现 | 每周 | 内容团队 |
