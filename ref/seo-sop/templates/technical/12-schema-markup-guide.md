# Schema 结构化数据指南

> 结构化数据帮助搜索引擎理解内容，增加富媒体搜索结果展示机会。

---

## 📋 Schema 类型选择

### 按页面类型选择 Schema
| 页面类型 | 推荐 Schema | 富媒体结果 |
|----------|-------------|------------|
| 文章/博客 | Article, BlogPosting | 文章卡片 |
| 产品页 | Product | 价格、评分、库存 |
| FAQ 页面 | FAQPage | FAQ 下拉展开 |
| 操作指南 | HowTo | 步骤列表 |
| 应用/软件 | SoftwareApplication | 应用信息 |
| 组织/公司 | Organization | 知识面板 |
| 人物 | Person | 知识面板 |
| 面包屑 | BreadcrumbList | 面包屑导航 |

---

## 📝 Schema 实现模板

### 1. Article Schema（文章页）

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Berberine Benefits: 12 Science-Backed Health Effects",
  "description": "Discover the proven health benefits of berberine, from blood sugar control to weight loss. Based on scientific research.",
  "image": "https://yoursite.com/images/berberine-benefits-hero.webp",
  "author": {
    "@type": "Organization",
    "name": "Berberine Health",
    "url": "https://yoursite.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Berberine Health",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yoursite.com/logo.png"
    }
  },
  "datePublished": "2026-01-01",
  "dateModified": "2026-01-01",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://yoursite.com/knowledge/berberine-benefits"
  }
}
```

### 2. FAQPage Schema（FAQ 内容）

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is berberine used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Berberine is primarily used for blood sugar management, weight loss support, and cardiovascular health. It's a natural compound found in several plants and has been studied for its metabolic benefits."
      }
    },
    {
      "@type": "Question",
      "name": "How much berberine should I take daily?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The typical dosage is 500mg taken 2-3 times daily, for a total of 1000-1500mg per day. It's best taken with meals to enhance absorption and minimize digestive discomfort."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any side effects of berberine?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Common side effects include digestive issues like diarrhea, constipation, and stomach cramps. These usually subside as your body adjusts. Berberine may also interact with certain medications."
      }
    }
  ]
}
```

### 3. Product Schema（产品页）

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Thorne Berberine 500mg",
  "image": "https://yoursite.com/images/thorne-berberine.webp",
  "description": "Premium berberine supplement with 500mg per capsule. Third-party tested for purity and potency.",
  "brand": {
    "@type": "Brand",
    "name": "Thorne"
  },
  "sku": "TB500",
  "offers": {
    "@type": "Offer",
    "url": "https://yoursite.com/products/thorne-berberine-500",
    "priceCurrency": "USD",
    "price": "39.99",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Berberine Health"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "256"
  }
}
```

### 4. SoftwareApplication Schema（应用页）

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Berberine Health App",
  "operatingSystem": "iOS, Android",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "ratingCount": "1250"
  },
  "description": "Track your berberine supplementation and health metrics with our comprehensive health tracking app."
}
```

### 5. BreadcrumbList Schema（面包屑）

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yoursite.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Knowledge",
      "item": "https://yoursite.com/knowledge"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Berberine Benefits",
      "item": "https://yoursite.com/knowledge/berberine-benefits"
    }
  ]
}
```

### 6. HowTo Schema（操作指南）

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Take Berberine for Best Results",
  "description": "A complete guide on how to take berberine supplements for optimal health benefits.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Choose the Right Dosage",
      "text": "Start with 500mg per day and gradually increase to 1000-1500mg daily, split into 2-3 doses."
    },
    {
      "@type": "HowToStep",
      "name": "Take with Meals",
      "text": "Take berberine with meals to enhance absorption and reduce digestive discomfort."
    },
    {
      "@type": "HowToStep",
      "name": "Be Consistent",
      "text": "Take berberine at the same times each day for best results. Most benefits are seen after 4-8 weeks."
    }
  ],
  "totalTime": "PT5M"
}
```

### 7. Organization Schema（组织页）

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Berberine Health",
  "url": "https://yoursite.com",
  "logo": "https://yoursite.com/logo.png",
  "sameAs": [
    "https://twitter.com/berberinehealth",
    "https://www.facebook.com/berberinehealth",
    "https://www.linkedin.com/company/berberinehealth"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "customer service",
    "email": "support@yoursite.com"
  }
}
```

---

## 🔧 实现方式

### 方式一：JSON-LD（推荐）

```html
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "..."
  }
  </script>
</head>
```

### 方式二：React 组件实现

```tsx
// components/SEOHead.tsx
import { Helmet } from 'react-helmet-async';

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  url: string;
}

export const ArticleSchema = ({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  url
}: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image,
    author: {
      "@type": "Organization",
      name: "Berberine Health",
      url: "https://yoursite.com"
    },
    publisher: {
      "@type": "Organization",
      name: "Berberine Health",
      logo: {
        "@type": "ImageObject",
        url: "https://yoursite.com/logo.png"
      }
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
```

---

## ✅ Schema 检查清单

### 部署前检查
- [ ] 选择了正确的 Schema 类型
- [ ] 所有必填字段已填写
- [ ] 日期格式正确（ISO 8601）
- [ ] URL 使用绝对路径
- [ ] 图片 URL 可访问

### 验证工具
| 工具 | 用途 | 链接 |
|------|------|------|
| Rich Results Test | 测试富媒体资格 | search.google.com/test/rich-results |
| Schema Markup Validator | 验证语法 | validator.schema.org |
| GSC 增强功能 | 查看索引状态 | Search Console |

### 验证流程
1. 在 Rich Results Test 中输入 URL
2. 检查是否检测到 Schema
3. 查看是否有错误或警告
4. 预览富媒体结果效果
5. 在 GSC 中监控索引状态

---

## ⚠️ 常见错误

| 错误 | 影响 | 修复 |
|------|------|------|
| 缺少必填字段 | Schema 无效 | 补充必填字段 |
| 日期格式错误 | 解析失败 | 使用 ISO 8601 格式 |
| 图片 URL 404 | 降低可信度 | 确保图片可访问 |
| 与页面内容不符 | 可能被处罚 | 确保数据准确 |
| 重复 Schema | 混淆搜索引擎 | 每种类型只用一次 |

---

## 📊 效果监控

### GSC 增强功能报告
路径：GSC → 增强功能

监控指标：
- 有效项目数
- 警告项目数
- 错误项目数
- 富媒体结果展示次数

### 月度检查
```markdown
## Schema 月度检查 - [月份]

| Schema 类型 | 有效 | 警告 | 错误 | 展示次数 |
|-------------|------|------|------|----------|
| Article | 50 | 2 | 0 | 5,000 |
| FAQPage | 20 | 0 | 0 | 2,500 |
| Product | 15 | 1 | 0 | 1,800 |
| BreadcrumbList | 85 | 0 | 0 | 8,000 |

### 问题修复记录
| 日期 | Schema | 问题 | 修复状态 |
|------|--------|------|----------|
| 2026-01-05 | Article | 缺少 dateModified | ✅ 已修复 |
```
