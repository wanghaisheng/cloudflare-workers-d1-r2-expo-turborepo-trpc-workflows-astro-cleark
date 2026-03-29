
基于 TanStack Router 官方文档，我来总结带前缀 URL 的 i18n 最佳实践：

## 📚 **TanStack Router 前缀式 URL i18n 最佳实践**

### 🎯 **核心原则**

#### 1. **使用 `{-$locale}` 参数**
```typescript
// ✅ 推荐方式
export const Route = createFileRoute('/{-$locale}/about')({
  component: AboutComponent,
});

function AboutComponent() {
  const { locale } = Route.useParams();
  const currentLocale = locale || 'en';
  
  // 使用当前 locale 获取翻译
  const content = translations[currentLocale];
}
```

#### 2. **URL 重写策略**
```typescript
// ✅ 使用 Paraglide 的 URL 本地化
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime';

const router = createRouter({
  routeTree,
  rewrite: {
    input: ({ url }) => deLocalizeUrl(url),
    output: ({ url }) => localizeUrl(url),
  },
});
```

#### 3. **类型安全的 Locale 定义**
```typescript
// ✅ 定义支持的 locale 类型
type Locale = 'en' | 'zh' | 'fr' | 'de';

function isLocale(value?: string): value is Locale {
  return ['en', 'zh', 'fr', 'de'].includes(value as Locale);
}
```

### 🔧 **实现模式**

#### **模式 1: 基础前缀路由**
```typescript
// 路由定义
export const Route = createFileRoute('/{-$locale}/about')({
  component: AboutComponent,
});

// 组件实现
function AboutComponent() {
  const { locale } = Route.useParams();
  const currentLocale = locale || 'en';
  
  return (
    <div>
      <h1>{content[currentLocale].title}</h1>
      <Link to="/{-$locale}/contact">Contact</Link>
    </div>
  );
}
```

#### **模式 2: 带库集成的 URL 重写**
```typescript
// 使用 Paraglide 的 URL 本地化
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime';

const router = createRouter({
  routeTree,
  rewrite: {
    input: ({ url }) => deLocalizeUrl(url),
    output: ({ url }) => localizeUrl(url),
  },
});

// 链接组件
function LocaleLink({ to, children, ...props }) {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
```

#### **模式 3: 服务端渲染 (SSR)**
```typescript
// 中间件
import { paraglideMiddleware } from './paraglide/server';

export default {
  fetch(req: Request) {
    return paraglideMiddleware(req, () => handler.fetch(req));
  },
};

// HTML 语言属性
import { getLocale } from '../paraglide/runtime';

function App() {
  return (
    <html lang={getLocale()}>
      <head>
        <title>My App</title>
      </head>
      <body>
        <RouterProvider router={router} />
      </body>
    </html>
  );
}
```

### 🚨 **常见陷阱和解决方案**

#### **陷阱 1: Locale 同步问题**
```typescript
// ❌ 问题：currentLocale 不同步
const currentLocale = ((params as any).locale || 'en') as Locale;

// ✅ 解决：从 URL 路径实时获取
const pathLocale = getLocaleFromPath(window.location.pathname);
const currentLocale = pathLocale || ((params as any).locale || 'en') as Locale;
```

#### **陷阱 2: 客户端导航时的 locale 更新**
```typescript
// ❌ 问题：导航后 locale 没有更新

// ✅ 解决：监听 URL 变化
useEffect(() => {
  const handleUrlChange = () => {
    const pathLocale = getLocaleFromPath(window.location.pathname);
    if (pathLocale && pathLocale !== currentLocale) {
      setCurrentLocale(pathLocale);
      loadTranslations(pathLocale);
    }
  };

  window.addEventListener('popstate', handleUrlChange);
  
  // 重写 history API 以监听 push/replace
  const originalPush = history.pushState;
  history.pushState = function(...args) {
    originalPush.apply(history, args);
    setTimeout(handleUrlChange, 0);
  };
}, [currentLocale]);
```

#### **陷阱 3: SEO 和可访问性**
```typescript
// ✅ 正确的 hreflang 实现
export function HeadComponent({ locale }) {
  return (
    <head>
      <html lang={locale} />
      <link rel="alternate" hrefLang="en" href="https://example.com/en/about" />
      <link rel="alternate" hrefLang="zh" href="https://example.com/zh/about" />
    </head>
  );
}
```

### 📋 **推荐的项目结构**

```
src/
├── i18n/
│   ├── locales/
│   │   ├── en.json
│   │   └── zh.json
│   └── index.ts          # 导出和类型定义
├── paraglide/
│   ├── runtime.ts       # Paraglide 运行时
│   └── server.ts        # 服务端中间件
├── routes/
│   └── $locale/
│       ├── about.tsx
│       └── blog.$slug.tsx
└── components/
    └── LocaleLink.tsx    # 语言感知链接组件
```

### 🎯 **针对您当前问题的建议**

基于最佳实践，建议您：

1. **使用 Paraglide**：它提供了完整的 i18n 解决方案
2. **实现 URL 重写**：自动处理 locale 前缀的添加/移除
3. **添加 URL 变化监听**：确保客户端导航时 locale 同步更新
4. **服务端渲染优化**：使用 Paraglide 中间件处理 SSR

这样可以确保：
- ✅ URL 和内容完全同步
- ✅ SEO 友好的语言切换
- ✅ 类型安全的 locale 处理
- ✅ 服务端渲染的正确语言属性

