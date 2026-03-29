# 页面 SEO 优化检查清单 (On-Page SEO Checklist)

> 发布前必检，确保每个页面都符合 SEO 最佳实践。

---

## 📋 快速检查（发布前必做）

### ✅ Title 标签
- [ ] 长度 50-60 字符
- [ ] 主关键词在标题靠前位置
- [ ] 包含价值描述
- [ ] 以品牌名结尾（如 `| Berberine Health`）
- [ ] 与其他页面 Title 不重复

**示例**：
```
✅ Berberine Benefits: 12 Science-Backed Health Effects | Berberine Health
❌ Benefits of Berberine - Everything You Need to Know About This Amazing Supplement
```

### ✅ Meta Description
- [ ] 长度 150-160 字符
- [ ] 包含主关键词
- [ ] 包含 CTA（如 "Learn more", "Try free"）
- [ ] 准确描述页面内容
- [ ] 有吸引点击的价值主张

**示例**：
```
✅ Discover 12 proven berberine benefits backed by science. From blood sugar control to weight loss, learn how this natural compound can improve your health. Read now →
❌ This page talks about berberine and its benefits for health.
```

### ✅ H1 标题
- [ ] 每页仅有 1 个 H1
- [ ] 包含主关键词
- [ ] 与 Title 意思一致但不完全相同
- [ ] 清晰表达页面主题

### ✅ URL 结构
- [ ] 使用小写字母
- [ ] 使用连字符分隔单词
- [ ] 包含主关键词
- [ ] 简短且描述性
- [ ] 避免无意义参数

**示例**：
```
✅ /knowledge/berberine-benefits
❌ /page.php?id=123&category=health
❌ /BERBERINE_Benefits
```

---

## 📝 内容优化检查

### 关键词布局
- [ ] 主关键词出现在前 100 字
- [ ] 全文自然分布关键词（不堆砌）
- [ ] H2/H3 中合理包含长尾关键词
- [ ] 关键词密度 1-2%（自然为主）

### 内容结构
- [ ] H2/H3 层级结构清晰
- [ ] 段落长度适中（3-4句为宜）
- [ ] 使用有序/无序列表
- [ ] 使用表格展示对比数据
- [ ] 有 FAQ 区块（针对长尾问题）

### 内容质量（E-E-A-T）
- [ ] 包含真实案例或截图
- [ ] 引用权威数据/研究
- [ ] 标注作者信息
- [ ] 显示发布/更新日期
- [ ] 披露利益相关（如适用）

---

## 🔗 链接优化检查

### 内链
- [ ] 每页 5-20 个合理内链
- [ ] 锚文本具有语义描述性
- [ ] 链接到支柱页
- [ ] 链接到相关集群页
- [ ] 禁止使用 "点击这里"、"了解更多" 等无意义锚文本

**示例**：
```html
✅ <a href="/guide/berberine-dosage">berberine dosage guidelines</a>
❌ <a href="/guide/berberine-dosage">click here</a>
```

### 外链
- [ ] 引用重要数据时链接到权威来源
- [ ] 外链使用 `target="_blank"` 和 `rel="noopener"`
- [ ] 定期检查外链有效性

---

## 🖼️ 图片优化检查

### Alt 文本
- [ ] 每张图片都有 Alt 文本
- [ ] Alt 文本具有描述性
- [ ] 合理包含相关关键词
- [ ] 长度 50-125 字符

**示例**：
```html
✅ <img alt="Berberine supplement capsules in amber glass bottle" />
❌ <img alt="image1" />
❌ <img alt="" />
```

### 文件规范
- [ ] 文件名使用英文小写+连字符
- [ ] 格式优先 WebP
- [ ] 文件已压缩（< 100KB）
- [ ] 非首屏图片使用 lazy load

**文件名示例**：
```
✅ berberine-capsules-dosage-guide.webp
❌ IMG_20231205_berberine.PNG
❌ 图片1.jpg
```

---

## 🎯 转化元素检查

### CTA 布局
- [ ] 首屏有清晰主 CTA
- [ ] 中部有辅助 CTA
- [ ] 底部有收尾 CTA
- [ ] CTA 文案明确行动指向

### 社交证明
- [ ] 展示用户评价/星级
- [ ] 展示客户 Logo（如适用）
- [ ] 展示数据指标（用户数、评分等）

### 表单优化
- [ ] 字段数量最小化
- [ ] 只要必要信息
- [ ] 有明确的提交按钮文案

---

## 📱 技术检查

### 移动端
- [ ] 页面通过移动端友好测试
- [ ] CTA 和按钮易点击（≥ 48x48px）
- [ ] 文字大小可读（≥ 16px）
- [ ] 无水平滚动

### 页面速度
- [ ] 图片已压缩
- [ ] 使用 lazy load
- [ ] 无阻塞渲染的 CSS/JS
- [ ] 开启浏览器缓存

### Schema 标记
- [ ] 已添加适当的 Schema 类型
  - Article/BlogPosting（文章页）
  - FAQPage（含 FAQ 的页面）
  - Product（产品页）
  - SoftwareApplication（应用页）
- [ ] Schema 通过验证工具检查

---

## 📊 检查工具

| 检查项 | 推荐工具 |
|--------|----------|
| Title/Meta | Yoast SEO、SERP Simulator |
| 移动端友好 | [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) |
| 页面速度 | [PageSpeed Insights](https://pagespeed.web.dev/) |
| Schema 验证 | [Rich Results Test](https://search.google.com/test/rich-results) |
| 链接检查 | Screaming Frog、Ahrefs |

---

## 📋 检查清单模板

复制以下模板用于每个页面的发布前检查：

```markdown
## 页面SEO检查：[页面URL]

### 基础元素
- [ ] Title: ___字符 | 含关键词: ✅/❌
- [ ] Meta Description: ___字符 | 含关键词: ✅/❌
- [ ] H1唯一: ✅/❌ | 含关键词: ✅/❌
- [ ] URL规范: ✅/❌

### 内容
- [ ] 关键词在前100字: ✅/❌
- [ ] 内链数量: ___个
- [ ] 图片Alt: 全部有 / 部分缺失
- [ ] FAQ区块: ✅/❌

### 技术
- [ ] 移动端友好: ✅/❌
- [ ] PageSpeed分数: ___
- [ ] Schema添加: ✅/❌

### 转化
- [ ] 首屏CTA: ✅/❌
- [ ] 社交证明: ✅/❌

检查人: ___
检查日期: ___
```

---

## ⚠️ 常见错误

| 错误 | 正确做法 |
|------|----------|
| Title 过长被截断 | 控制在 60 字符内 |
| 多个 H1 标签 | 每页只用 1 个 H1 |
| 图片无 Alt | 每张图都写描述性 Alt |
| 内链用 "点击这里" | 用语义化锚文本 |
| 关键词堆砌 | 自然融入 1-2% 密度 |
| 忘记移动端测试 | 发布前必测移动端 |
