# 国际化 SEO 检查清单

> 多语言站点的 SEO 核心：正确的 hreflang 实现 + 本地化内容

---

## 🌍 架构选择

### 推荐方案：子目录
```
yoursite.com/        → 默认语言（英文）
yoursite.com/zh/     → 简体中文
yoursite.com/de/     → 德语
yoursite.com/fr/     → 法语
```

### 架构对比
| 架构 | 示例 | SEO权重 | 维护成本 | 推荐 |
|------|------|---------|----------|------|
| 子目录 | site.com/zh/ | 继承主域 | 低 | ✅ 推荐 |
| 子域名 | zh.site.com | 需独立建设 | 中 | ⚪ 可选 |
| 独立域名 | site.cn | 完全独立 | 高 | ⚪ 特定市场 |

---

## ✅ 核心检查清单

### 1. URL 结构
- [ ] 采用子目录架构（/zh/, /en/, /de/）
- [ ] URL 中的语言标识一致
- [ ] 同一内容不同语言版本 URL 结构对应
  ```
  /products/berberine-500        (英文)
  /zh/products/berberine-500     (中文)
  /de/products/berberine-500     (德语)
  ```

### 2. hreflang 标签
- [ ] 每个页面都有 hreflang 标签
- [ ] 包含所有语言版本的互相引用
- [ ] 包含自引用（self-referencing）
- [ ] 包含 x-default 标签

**正确实现示例**：
```html
<!-- 在英文页面 /products/berberine-500 -->
<link rel="alternate" hreflang="en" href="https://yoursite.com/products/berberine-500" />
<link rel="alternate" hreflang="zh-CN" href="https://yoursite.com/zh/products/berberine-500" />
<link rel="alternate" hreflang="de" href="https://yoursite.com/de/products/berberine-500" />
<link rel="alternate" hreflang="x-default" href="https://yoursite.com/products/berberine-500" />
```

### 3. hreflang 语言代码

#### 常用语言代码
| 语言 | 代码 | 说明 |
|------|------|------|
| 英语 | en | 通用英语 |
| 英语（美国） | en-US | 美国英语 |
| 英语（英国） | en-GB | 英国英语 |
| 简体中文 | zh-CN | 中国大陆 |
| 繁体中文 | zh-TW | 台湾 |
| 繁体中文 | zh-HK | 香港 |
| 德语 | de | 通用德语 |
| 法语 | fr | 通用法语 |
| 日语 | ja | 日语 |
| 韩语 | ko | 韩语 |
| 西班牙语 | es | 通用西班牙语 |

### 4. x-default 配置
- [ ] x-default 指向默认语言版本
- [ ] 或指向语言选择页面
- [ ] 每个页面组只有一个 x-default

```html
<!-- x-default 通常指向英文版本 -->
<link rel="alternate" hreflang="x-default" href="https://yoursite.com/page" />
```

---

## 📝 内容本地化检查

### 翻译质量
- [ ] 非机器粗翻，有人工校对
- [ ] 专业术语翻译准确
- [ ] 符合目标语言的表达习惯
- [ ] 文化敏感内容已本地化

### 本地化调整
- [ ] 货币单位本地化（$, €, ¥）
- [ ] 日期格式本地化
- [ ] 联系方式本地化
- [ ] 法律声明本地化
- [ ] 图片中的文字已翻译

### 市场特定内容
- [ ] 每个市场有独立的关键词研究
- [ ] 本地案例/证言
- [ ] 本地支付方式
- [ ] 本地客服渠道

---

## 🔍 技术实现检查

### HTML lang 属性
- [ ] `<html lang="xx">` 正确设置

```html
<!-- 英文页面 -->
<html lang="en">

<!-- 简体中文页面 -->
<html lang="zh-CN">
```

### Sitemap 配置
- [ ] 每个语言版本的页面都在 Sitemap 中
- [ ] 考虑使用 hreflang 标注的 Sitemap

**Sitemap hreflang 示例**：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://yoursite.com/products/berberine</loc>
    <xhtml:link rel="alternate" hreflang="en" 
                href="https://yoursite.com/products/berberine"/>
    <xhtml:link rel="alternate" hreflang="zh-CN" 
                href="https://yoursite.com/zh/products/berberine"/>
    <xhtml:link rel="alternate" hreflang="x-default" 
                href="https://yoursite.com/products/berberine"/>
  </url>
</urlset>
```

### GSC 配置
- [ ] 为每个目标国家/地区添加 GSC 属性
- [ ] 设置地理位置定位（如适用）

---

## 🌐 语言切换器检查

### 实现要求
- [ ] 语言切换器在所有页面可见
- [ ] 切换后跳转到对应语言版本的同一页面
- [ ] 不使用 JavaScript 依赖的切换（影响爬虫）
- [ ] 显示语言名称而非国旗图标

**正确实现**：
```html
<nav class="language-switcher">
  <a href="/products/berberine" hreflang="en">English</a>
  <a href="/zh/products/berberine" hreflang="zh-CN">简体中文</a>
  <a href="/de/products/berberine" hreflang="de">Deutsch</a>
</nav>
```

### 注意事项
- ❌ 不要使用国旗代表语言（一种语言可能在多个国家使用）
- ❌ 不要自动根据 IP 重定向（影响爬虫）
- ✅ 可以根据浏览器语言提示切换
- ✅ 使用 Cookie 记住用户选择

---

## 📊 多语言关键词研究

### 每个市场独立研究
```markdown
## 关键词研究 - [市场/语言]

### 核心关键词
| 英文原词 | 本地翻译 | 搜索量 | KD | 备注 |
|----------|----------|--------|-----|------|
| berberine | 小檗碱 | 5,000 | 30 | 学名 |
| berberine | 黄连素 | 8,000 | 25 | 俗称 |
| berberine supplement | 小檗碱补充剂 | 1,200 | 20 | - |

### 本地特有词
| 关键词 | 搜索量 | 说明 |
|--------|--------|------|
| [本地词汇] | 3,000 | [解释] |
```

### 不要直接翻译
- 每个市场的搜索习惯不同
- 使用本地工具验证搜索量
- 考虑文化差异和俚语

---

## ✅ 发布前检查清单

### 新语言版本上线前
```markdown
## 国际化发布检查 - [语言]

### URL 结构
- [ ] 子目录路径正确 (/[lang]/)
- [ ] 所有页面 URL 可访问

### hreflang 标签
- [ ] 所有页面都有 hreflang 标签
- [ ] 自引用正确
- [ ] x-default 设置正确
- [ ] 双向引用完整

### 内容质量
- [ ] 翻译质量已审核
- [ ] 无机翻痕迹
- [ ] 本地化调整完成

### 技术检查
- [ ] html lang 属性正确
- [ ] Sitemap 已更新
- [ ] GSC 已添加属性
- [ ] 语言切换器正常工作

### SEO 元素
- [ ] Title 已翻译优化
- [ ] Meta Description 已翻译
- [ ] 图片 Alt 已翻译
- [ ] 本地关键词已融入

检查人: ___
检查日期: ___
```

---

## 🔧 hreflang 调试工具

### 推荐工具
| 工具 | 用途 | 链接 |
|------|------|------|
| Ahrefs hreflang Checker | 批量检查 | Ahrefs Site Audit |
| Merkle hreflang Tool | 生成标签 | technicalseo.com/tools/hreflang |
| Screaming Frog | 全站审计 | screamingfrog.co.uk |
| GSC International Targeting | 官方检查 | Search Console |

### 常见错误
| 错误 | 影响 | 修复 |
|------|------|------|
| 缺少自引用 | 标签无效 | 添加指向自己的 hreflang |
| 单向链接 | 标签部分无效 | 确保双向引用 |
| 语言代码错误 | 标签无效 | 使用正确的 ISO 代码 |
| 缺少 x-default | 可能导致错误版本展示 | 添加 x-default |
| URL 错误 | 标签无效 | 修正 URL |

---

## 📈 效果追踪

### 按市场监控
```markdown
## 多语言SEO月报 - [月份]

### 各市场表现
| 市场 | 语言 | 点击 | 展示 | CTR | 环比 |
|------|------|------|------|-----|------|
| 中国 | zh-CN | 5,000 | 100,000 | 5% | +10% |
| 美国 | en | 8,000 | 150,000 | 5.3% | +5% |
| 德国 | de | 1,200 | 30,000 | 4% | +15% |

### 按市场 Top 关键词
#### 中国市场
| 关键词 | 排名 | 点击 |
|--------|------|------|
| 小檗碱 | 5 | 800 |
| 黄连素功效 | 8 | 500 |

#### 美国市场
| 关键词 | 排名 | 点击 |
|--------|------|------|
| berberine benefits | 6 | 1,200 |
| berberine supplement | 9 | 800 |
```
