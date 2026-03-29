# Core Web Vitals 优化指南

> CWV 是 Google 排名因素之一，目标：LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1

---

## 📊 指标详解

### 三大核心指标

| 指标 | 全称 | 含义 | 目标值 | 权重 |
|------|------|------|--------|------|
| LCP | Largest Contentful Paint | 最大内容渲染时间 | ≤ 2.5s | 高 |
| INP | Interaction to Next Paint | 交互响应时间 | ≤ 200ms | 中 |
| CLS | Cumulative Layout Shift | 累计布局偏移 | ≤ 0.1 | 中 |

### 指标评级标准

| 指标 | 良好 | 需改进 | 差 |
|------|------|--------|-----|
| LCP | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| INP | ≤ 200ms | 200ms - 500ms | > 500ms |
| CLS | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |

---

## ⚡ LCP 优化（Largest Contentful Paint）

### 什么影响 LCP
- 服务器响应时间
- 资源加载时间（CSS、JS、图片）
- 客户端渲染时间
- 关键资源阻塞

### 优化清单

#### 1. 服务器优化
- [ ] 使用 CDN 分发静态资源
- [ ] 开启服务端压缩（Gzip/Brotli）
- [ ] 优化服务器响应时间 < 200ms
- [ ] 使用缓存策略

```nginx
# Nginx 配置示例
gzip on;
gzip_types text/plain text/css application/json application/javascript;

location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### 2. 图片优化
- [ ] 使用 WebP 格式
- [ ] 图片压缩至合理大小（< 100KB）
- [ ] 为图片指定宽高属性
- [ ] 使用响应式图片

```html
<!-- 响应式图片 -->
<img 
  src="hero-800.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Hero image"
  width="1200"
  height="630"
/>
```

#### 3. 关键 CSS 内联
- [ ] 提取首屏关键 CSS 内联到 `<head>`
- [ ] 延迟加载非关键 CSS

```html
<head>
  <!-- 关键 CSS 内联 -->
  <style>
    /* 首屏必需样式 */
    .hero { ... }
    .header { ... }
  </style>
  
  <!-- 非关键 CSS 延迟加载 -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>
```

#### 4. 资源预加载
- [ ] 预加载 LCP 元素资源
- [ ] 预连接关键域名

```html
<head>
  <!-- 预加载 LCP 图片 -->
  <link rel="preload" as="image" href="hero.webp" />
  
  <!-- 预连接 CDN -->
  <link rel="preconnect" href="https://cdn.yoursite.com" />
  <link rel="dns-prefetch" href="https://cdn.yoursite.com" />
</head>
```

---

## 🖱️ INP 优化（Interaction to Next Paint）

### 什么影响 INP
- JavaScript 执行时间
- 主线程阻塞
- 事件处理器复杂度
- 第三方脚本

### 优化清单

#### 1. JavaScript 优化
- [ ] 代码分割（Code Splitting）
- [ ] 延迟加载非关键 JS
- [ ] 移除未使用的 JS
- [ ] 使用 Tree Shaking

```javascript
// React 代码分割
const ProductDetail = React.lazy(() => import('./ProductDetail'));

// 动态导入
if (condition) {
  import('./heavyModule').then(module => {
    module.doSomething();
  });
}
```

#### 2. 减少主线程工作
- [ ] 使用 Web Workers 处理繁重计算
- [ ] 将长任务拆分为小任务
- [ ] 使用 `requestIdleCallback` 执行非关键任务

```javascript
// 拆分长任务
function processData(items) {
  const chunk = items.splice(0, 100);
  chunk.forEach(process);
  
  if (items.length > 0) {
    requestAnimationFrame(() => processData(items));
  }
}

// 使用 requestIdleCallback
requestIdleCallback(() => {
  // 非关键任务
  analytics.track('page_view');
});
```

#### 3. 优化事件处理
- [ ] 使用事件委托
- [ ] 避免在事件处理中进行复杂计算
- [ ] 使用 `passive` 监听器

```javascript
// 使用 passive 监听器
document.addEventListener('scroll', handleScroll, { passive: true });

// 事件委托
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    handleItemClick(e.target);
  }
});
```

#### 4. 第三方脚本优化
- [ ] 审计第三方脚本数量
- [ ] 延迟加载非关键第三方脚本
- [ ] 使用 Partytown 等方案

```html
<!-- 延迟加载分析脚本 -->
<script>
  window.addEventListener('load', () => {
    const script = document.createElement('script');
    script.src = 'https://analytics.com/script.js';
    document.body.appendChild(script);
  });
</script>
```

---

## 📐 CLS 优化（Cumulative Layout Shift）

### 什么导致 CLS
- 无尺寸的图片/视频
- 动态注入的内容
- 网页字体加载（FOIT/FOUT）
- 广告/iframe 无预留空间

### 优化清单

#### 1. 图片和视频
- [ ] 始终指定宽高属性
- [ ] 使用 `aspect-ratio` CSS
- [ ] 使用骨架屏占位

```html
<!-- 指定尺寸 -->
<img src="image.webp" width="800" height="600" alt="..." />

<!-- 使用 aspect-ratio -->
<style>
  .video-container {
    aspect-ratio: 16 / 9;
    width: 100%;
  }
</style>
```

#### 2. 字体优化
- [ ] 使用 `font-display: swap` 或 `optional`
- [ ] 预加载关键字体
- [ ] 使用系统字体回退

```css
@font-face {
  font-family: 'Custom Font';
  src: url('font.woff2') format('woff2');
  font-display: swap;
}

body {
  font-family: 'Custom Font', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

```html
<!-- 预加载字体 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin />
```

#### 3. 动态内容
- [ ] 为动态内容预留空间
- [ ] 使用 CSS `min-height`
- [ ] 避免在现有内容上方插入内容

```css
/* 为广告预留空间 */
.ad-container {
  min-height: 250px;
}

/* 为动态列表预留空间 */
.product-list {
  min-height: 500px;
}
```

#### 4. 动画优化
- [ ] 使用 `transform` 而非改变布局属性
- [ ] 避免动画影响布局

```css
/* ❌ 不好 - 会导致布局偏移 */
.element {
  animation: slide 0.3s;
}
@keyframes slide {
  from { margin-left: 0; }
  to { margin-left: 100px; }
}

/* ✅ 好 - 使用 transform */
.element {
  animation: slide 0.3s;
}
@keyframes slide {
  from { transform: translateX(0); }
  to { transform: translateX(100px); }
}
```

---

## 🛠️ 测试工具

### 实验室数据（Lab Data）
| 工具 | 用途 | 链接 |
|------|------|------|
| PageSpeed Insights | 综合测试 | pagespeed.web.dev |
| Lighthouse | Chrome DevTools | 内置 |
| WebPageTest | 详细瀑布图 | webpagetest.org |

### 现场数据（Field Data）
| 工具 | 用途 |
|------|------|
| GSC Core Web Vitals 报告 | 全站监控 |
| Chrome UX Report (CrUX) | 真实用户数据 |
| web-vitals 库 | 自定义监控 |

### 使用 web-vitals 库监控
```javascript
import { onLCP, onINP, onCLS } from 'web-vitals';

function sendToAnalytics(metric) {
  // 发送到分析平台
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_id: metric.id,
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
```

---

## 📋 优化检查清单

```markdown
## Core Web Vitals 优化检查

### LCP 优化
- [ ] 图片使用 WebP 格式
- [ ] 图片已压缩（< 100KB）
- [ ] LCP 元素已预加载
- [ ] 使用 CDN
- [ ] 关键 CSS 已内联
- [ ] 服务器响应 < 200ms

### INP 优化
- [ ] 代码已分割
- [ ] 非关键 JS 延迟加载
- [ ] 无阻塞主线程的长任务
- [ ] 第三方脚本已优化
- [ ] 使用 passive 事件监听

### CLS 优化
- [ ] 所有图片有宽高
- [ ] 使用 font-display: swap
- [ ] 动态内容有预留空间
- [ ] 无布局偏移的动画

### 测试验证
- [ ] PageSpeed 移动端 ≥ 90
- [ ] PageSpeed 桌面端 ≥ 90
- [ ] GSC 报告无 CWV 问题
```

---

## 📊 月度报告模板

```markdown
## Core Web Vitals 月报 - [月份]

### 整体表现
| 指标 | 移动端 | 桌面端 | 状态 | 月环比 |
|------|--------|--------|------|--------|
| LCP | 2.1s | 1.5s | ✅ 良好 | -0.3s |
| INP | 180ms | 120ms | ✅ 良好 | -20ms |
| CLS | 0.05 | 0.02 | ✅ 良好 | -0.01 |

### 问题页面
| 页面 | 问题指标 | 当前值 | 优化建议 |
|------|----------|--------|----------|
| /products | LCP | 3.2s | 优化产品图片 |

### 本月优化措施
1. [措施1]
2. [措施2]

### 下月计划
1. [计划1]
2. [计划2]

---
报告人: ___
报告日期: ___
```
