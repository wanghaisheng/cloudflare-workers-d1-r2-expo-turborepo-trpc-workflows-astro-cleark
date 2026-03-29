# 技术 SEO 审计协议

> 技术SEO是基础，确保网站可抓取、可索引、速度快。

---

## 📅 审计频率

| 审计类型 | 频率 | 触发条件 |
|----------|------|----------|
| 完整审计 | 每季度 | 定期执行 |
| 快速检查 | 每月 | GSC异常时 |
| 专项审计 | 按需 | 重大改版后 |

---

## 🔧 模块A：抓取与索引（15项）

### robots.txt 检查
- [ ] robots.txt 文件存在且可访问
- [ ] 未误屏蔽核心页面
- [ ] 允许爬取 CSS/JS 资源
- [ ] 包含 Sitemap 位置声明

**检查方法**：
```bash
# 访问 robots.txt
curl https://your-domain.com/robots.txt

# 验证内容
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Sitemap: https://your-domain.com/sitemap.xml
```

### XML Sitemap 检查
- [ ] Sitemap 已自动生成
- [ ] 包含所有应被索引的页面
- [ ] 不包含 noindex 页面
- [ ] 已提交到 GSC
- [ ] 最后更新时间正确

**Sitemap 格式验证**：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/page</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 索引状态检查
- [ ] 关键页面未设置 `noindex`
- [ ] 使用规范 `canonical` 标签
- [ ] 不同 URL 不出现相同内容
- [ ] 检查 GSC 索引覆盖报告
- [ ] 无意外的索引排除

**Canonical 标签检查**：
```html
<!-- 每个页面应有规范URL -->
<link rel="canonical" href="https://your-domain.com/canonical-url" />
```

---

## 🏗️ 模块B：站点结构（10项）

### URL 规范
- [ ] URL 使用小写字母
- [ ] URL 使用连字符分隔
- [ ] URL 简短有意义
- [ ] 避免无意义参数
- [ ] 旧 URL 全部 301 重定向

**URL 规范示例**：
```
✅ /knowledge/berberine-benefits
✅ /products/thorne-berberine-500
❌ /page.php?id=123
❌ /Knowledge/Berberine_Benefits
```

### 站点层级
- [ ] 层级深度 ≤ 3（首页 → 栏目 → 内容）
- [ ] 使用子目录而非子域名
- [ ] 导航菜单清晰
- [ ] 重要页面 1-2 次点击可达
- [ ] 面包屑导航正确

**理想层级结构**：
```
首页 (/)
├── 知识库 (/knowledge)
│   ├── 文章1 (/knowledge/article-1)
│   └── 文章2 (/knowledge/article-2)
├── 产品 (/products)
│   ├── 产品1 (/products/product-1)
│   └── 产品2 (/products/product-2)
└── 研究 (/research)
    └── 论文1 (/research/study-1)
```

---

## ⚡ 模块C：Core Web Vitals（10项）

### 性能指标目标
| 指标 | 目标值 | 当前值 | 状态 |
|------|--------|--------|------|
| LCP (Largest Contentful Paint) | ≤ 2.5s | ___s | ✅/❌ |
| INP (Interaction to Next Paint) | ≤ 200ms | ___ms | ✅/❌ |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | ___ | ✅/❌ |

### 优化检查项
- [ ] 图片已压缩并使用 WebP 格式
- [ ] 已开启浏览器缓存（cache-control）
- [ ] 非首屏图片使用 lazy load
- [ ] 减少第三方脚本
- [ ] 移除无用追踪代码
- [ ] CSS/JS 已压缩
- [ ] 使用 CDN 加速

**图片优化命令**：
```bash
# 转换为WebP格式
cwebp -q 80 input.png -o output.webp

# 批量压缩
find . -name "*.png" -exec cwebp -q 80 {} -o {}.webp \;
```

### 检测工具
```bash
# PageSpeed Insights
https://pagespeed.web.dev/?url=https://your-domain.com

# WebPageTest
https://www.webpagetest.org/

# Lighthouse
# Chrome DevTools → Lighthouse 面板
```

---

## 📱 模块D：移动端（5项）

### 移动友好检查
- [ ] 通过 Google 移动端友好测试
- [ ] CTA 按钮尺寸 ≥ 48x48px
- [ ] 文字大小 ≥ 16px
- [ ] 无水平滚动
- [ ] 触摸目标间距合理

**测试工具**：
```
https://search.google.com/test/mobile-friendly?url=https://your-domain.com
```

---

## 📊 模块E：结构化数据（5项）

### Schema 标记检查
- [ ] Article/BlogPosting Schema（文章页）
- [ ] FAQPage Schema（FAQ 内容）
- [ ] Product Schema（产品页）
- [ ] SoftwareApplication Schema（应用页）
- [ ] BreadcrumbList Schema（面包屑）

**Schema 验证**：
```
https://search.google.com/test/rich-results?url=https://your-domain.com
https://validator.schema.org/
```

**Article Schema 示例**：
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Berberine Benefits: 12 Science-Backed Effects",
  "author": {
    "@type": "Organization",
    "name": "Berberine Health"
  },
  "datePublished": "2026-01-01",
  "dateModified": "2026-01-01"
}
```

---

## 🔒 模块F：安全与HTTPS（5项）

### 安全检查
- [ ] 全站使用 HTTPS
- [ ] HTTP 自动重定向到 HTTPS
- [ ] SSL 证书有效且未过期
- [ ] 无混合内容（mixed content）
- [ ] 安全头配置正确

**安全头检查**：
```bash
curl -I https://your-domain.com

# 应包含
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

---

## 📋 审计报告模板

```markdown
# 技术SEO审计报告

## 基本信息
- 审计日期: 2026-01-01
- 审计人员: [姓名]
- 网站URL: https://your-domain.com

## 执行摘要
- 总检查项: 50项
- 通过: ___项
- 需改进: ___项
- 严重问题: ___项

## 详细发现

### 🔴 严重问题（需立即修复）
1. [问题描述]
   - 影响: [影响说明]
   - 建议: [修复建议]

### 🟡 中等问题（需计划修复）
1. [问题描述]
   - 影响: [影响说明]
   - 建议: [修复建议]

### 🟢 小问题/建议
1. [问题描述]
   - 建议: [优化建议]

## Core Web Vitals 报告
| 页面 | LCP | INP | CLS | 状态 |
|------|-----|-----|-----|------|
| 首页 | 2.1s | 150ms | 0.05 | ✅ |
| /products | 3.2s | 180ms | 0.12 | ⚠️ |

## 修复优先级
| 优先级 | 问题 | 负责人 | 预计完成 |
|--------|------|--------|----------|
| P0 | [问题1] | [姓名] | [日期] |
| P1 | [问题2] | [姓名] | [日期] |

## 下次审计时间
2026-04-01
```

---

## 🛠️ 推荐工具

| 用途 | 工具 |
|------|------|
| 全站爬取 | Screaming Frog SEO Spider |
| 性能测试 | PageSpeed Insights, WebPageTest |
| 移动测试 | Google Mobile-Friendly Test |
| Schema验证 | Rich Results Test, Schema Validator |
| 安全检查 | SSL Labs, Security Headers |
| 日志分析 | Splunk, ELK Stack |
