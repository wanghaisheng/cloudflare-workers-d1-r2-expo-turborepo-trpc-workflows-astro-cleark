# 转化追踪配置协议

> 关键词 → 流量 → 转化，闭环追踪才能验证 SEO ROI。

---

## 🎯 转化追踪目标

### 核心转化链路
```
关键词排名 → 点击流量 → 页面浏览 → 转化行为 → 付费
     ↑                                        ↓
     └────────── 优化反馈循环 ─────────────────┘
```

### 转化类型定义
| 转化类型 | 说明 | 价值权重 |
|----------|------|----------|
| 注册 | 创建账号 | 中 |
| 订阅 | 邮件订阅 | 低 |
| 下载 | 资料下载 | 低 |
| 试用 | 开始试用 | 高 |
| 购买 | 完成付费 | 最高 |
| 咨询 | 联系销售 | 高 |

---

## 📊 追踪配置清单

### 1. Google Analytics 4 (GA4)

#### 基础配置
- [ ] GA4 属性已创建
- [ ] 跟踪代码已安装
- [ ] 数据流已配置
- [ ] 与 GSC 已关联

#### 转化事件配置
```javascript
// 注册事件
gtag('event', 'sign_up', {
  method: 'email'
});

// 订阅事件
gtag('event', 'subscribe', {
  content_type: 'newsletter'
});

// 试用开始事件
gtag('event', 'start_trial', {
  product_name: 'berberine_guide'
});

// 购买事件
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 29.99,
  currency: 'USD'
});
```

#### 自定义维度
| 维度名称 | 用途 | 范围 |
|----------|------|------|
| content_type | 内容类型（文章/产品/研究） | Event |
| user_status | 用户状态（访客/注册/付费） | User |
| traffic_source | 流量来源细分 | Session |

### 2. GSC 关联

#### 配置步骤
1. GA4 → 管理 → 产品关联
2. 选择 Search Console
3. 确认关联账户
4. 选择关联属性

#### 关联后可用报告
- 搜索词 → 着陆页 → 转化
- 自然流量质量分析
- 关键词转化归因

---

## 🔄 页面 CTA 配置

### CTA 布局标准

#### 每个页面必须包含
| 位置 | CTA 类型 | 设计要求 |
|------|----------|----------|
| 首屏 | 主 CTA | 醒目、明确行动指向 |
| 中部 | 辅助 CTA | 与内容相关的软转化 |
| 底部 | 收尾 CTA | 总结后的行动号召 |

#### CTA 文案模板
```markdown
## CTA 文案库

### 主 CTA（首屏）
- "Start Your Free Trial"
- "Get Started Free"
- "Try [Product] Today"
- "Download Free Guide"

### 辅助 CTA（中部）
- "Subscribe for Weekly Updates"
- "Download the Complete Guide"
- "Join 10,000+ Health Enthusiasts"

### 收尾 CTA（底部）
- "Ready to Start? Begin Your Journey"
- "Have Questions? Contact Our Experts"
- "Get Personalized Recommendations"
```

### CTA 追踪代码
```html
<!-- 主 CTA 按钮 -->
<button 
  onclick="gtag('event', 'cta_click', {
    cta_location: 'hero',
    cta_text: 'Start Free Trial',
    page_path: window.location.pathname
  })"
>
  Start Free Trial
</button>

<!-- 中部 CTA -->
<a 
  href="/subscribe"
  onclick="gtag('event', 'cta_click', {
    cta_location: 'mid_content',
    cta_text: 'Subscribe Now'
  })"
>
  Subscribe Now
</a>
```

---

## 📈 漏斗追踪配置

### 转化漏斗定义
```
Stage 1: 访问着陆页
    ↓
Stage 2: 浏览核心内容（≥2页或≥60秒）
    ↓
Stage 3: 互动行为（点击CTA/滚动到底部）
    ↓
Stage 4: 开始转化流程（填写表单/加购物车）
    ↓
Stage 5: 完成转化
```

### GA4 漏斗配置
```javascript
// 页面浏览事件
gtag('event', 'page_view', {
  page_path: '/products/berberine',
  content_type: 'product_page'
});

// 内容互动事件
gtag('event', 'content_engagement', {
  engagement_type: 'scroll_75_percent',
  page_path: window.location.pathname
});

// 表单开始事件
gtag('event', 'form_start', {
  form_name: 'contact_form'
});

// 表单完成事件
gtag('event', 'form_submit', {
  form_name: 'contact_form'
});
```

---

## 📊 报告与监控

### 周度监控指标
| 指标 | 数据源 | 目标 |
|------|--------|------|
| 自然流量 | GA4 | 周环比 ≥ 0% |
| 跳出率 | GA4 | ≤ 60% |
| 平均会话时长 | GA4 | ≥ 2分钟 |
| 转化率 | GA4 | ≥ 2% |
| 每次转化成本 | 计算 | 持续优化 |

### 月度报告模板
```markdown
## 转化追踪月报 - [月份]

### 流量概览
| 指标 | 本月 | 上月 | 环比 |
|------|------|------|------|
| 自然流量 | 15,000 | 14,000 | +7% |
| 自然流量占比 | 45% | 42% | +3% |

### 转化表现
| 转化类型 | 数量 | 转化率 | 环比 |
|----------|------|--------|------|
| 注册 | 300 | 2.0% | +10% |
| 订阅 | 450 | 3.0% | +5% |
| 试用 | 100 | 0.7% | +15% |
| 购买 | 25 | 0.17% | +20% |

### 关键词转化归因
| 关键词 | 流量 | 转化 | 转化率 | ROI评估 |
|--------|------|------|--------|---------|
| berberine benefits | 2,000 | 45 | 2.25% | 高 |
| best berberine supplement | 800 | 30 | 3.75% | 最高 |
| what is berberine | 1,500 | 15 | 1.00% | 中 |

### 页面转化表现
| 页面 | 流量 | 转化 | 转化率 | 行动 |
|------|------|------|--------|------|
| /products | 3,000 | 100 | 3.3% | 继续优化 |
| /knowledge/benefits | 2,500 | 40 | 1.6% | 增加CTA |
| /guide | 1,800 | 60 | 3.3% | 表现良好 |

### 优化建议
1. [建议1]
2. [建议2]
3. [建议3]
```

---

## 🔧 UTM 参数规范

### 标准 UTM 结构
```
https://yoursite.com/page?utm_source=xxx&utm_medium=xxx&utm_campaign=xxx
```

### UTM 参数定义
| 参数 | 用途 | 示例值 |
|------|------|--------|
| utm_source | 流量来源 | google, newsletter, twitter |
| utm_medium | 媒介类型 | organic, cpc, email, social |
| utm_campaign | 活动名称 | spring_sale, launch_2026 |
| utm_content | 内容标识 | cta_button, hero_banner |
| utm_term | 关键词 | berberine_benefits |

### 内部链接 UTM 规范
```markdown
## 内部链接 UTM 模板

### 邮件营销
?utm_source=newsletter&utm_medium=email&utm_campaign=[campaign_name]

### 社交媒体
?utm_source=[platform]&utm_medium=social&utm_campaign=[campaign_name]

### 付费广告
?utm_source=google&utm_medium=cpc&utm_campaign=[campaign_name]&utm_term=[keyword]
```

---

## ✅ 配置检查清单

### 上线前检查
```markdown
## 转化追踪配置检查

### 基础配置
- [ ] GA4 跟踪代码已安装
- [ ] 数据收集正常（实时报告可见）
- [ ] 与 GSC 已关联
- [ ] 转化目标已定义

### 事件追踪
- [ ] 页面浏览事件正常
- [ ] CTA 点击事件已配置
- [ ] 表单提交事件已配置
- [ ] 购买事件已配置

### CTA 配置
- [ ] 首屏 CTA 存在
- [ ] 中部 CTA 存在
- [ ] 底部 CTA 存在
- [ ] CTA 追踪代码正常

### 测试验证
- [ ] 在 GA4 实时报告中验证事件
- [ ] 转化流程完整测试
- [ ] 跨设备追踪验证

检查人: ___
检查日期: ___
```

---

## 📉 异常处理

### 常见问题排查
| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| 转化数据为0 | 事件未触发 | 检查事件代码 |
| 流量数据异常 | 跟踪代码问题 | 使用 Tag Assistant 调试 |
| 跳出率异常高 | 页面体验差 | 优化页面速度/内容 |
| 转化率下降 | CTA/页面问题 | A/B测试优化 |
