# TanStack 技术优化分析报告

## 项目当前 TanStack 栈

| 库 | 版本 | 用途 |
|---|------|------|
| `@tanstack/react-router` | 1.159.5 | 文件路由 + SSR |
| `@tanstack/react-query` | 5.56.2 | 服务端状态管理 |
| `@tanstack/react-router-ssr-query` | 1.159.5 | SSR hydration 集成 |
| `@tanstack/router-plugin` | 1.161.3 | Vite 路由自动生成 |

---

## 一、架构层面的优化建议

### 1.1 Router Context 注入优化

**当前实现** ([`router.create.tsx:27`](src/router.create.tsx:27)):
```tsx
context: { queryClient },
```

**建议**: 改为通过 `createRootRouteWithContext` 严格类型化：

```tsx
// src/routes/__root.tsx
import { createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: App,
});
```

**收益**: 
- 消除 `as { queryClient: ... }` 类型断言 ([`src/routes/index.tsx:15`](src/routes/index.tsx:15))
- 类型安全提升，减少运行时错误

---

### 1.2 QueryClient 配置优化

**当前配置** ([`router.create.tsx:14-23`](src/router.create.tsx:14-23)):
```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
```

**优化建议**:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000, // 替代 deprecated 的 cacheTime
      refetchOnMount: false,
      refetchOnReconnect: 'always', // 改为 always 保证数据新鲜
      retry: 1, // 减少默认重试次数
      throwOnError: false, // 允许错误被边界捕获
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});
```

---

## 二、数据加载模式优化

### 2.1 使用 queryOptions 工厂模式

**当前代码** ([`src/routes/index.tsx:17-21`](src/routes/index.tsx:17-21)):
```tsx
await queryClient.ensureQueryData({
  queryKey: ['stats', 'global', locale],
  queryFn: () => fetchStats(locale),
  staleTime: 5 * 60_000,
});
```

**建议**: 创建集中的 query options 文件

```tsx
// src/lib/query-options/stats.ts
import { queryOptions } from '@tanstack/react-query';
import { fetchStats } from '@/hooks/useStats';

export const statsQueryOptions = (locale: string) =>
  queryOptions({
    queryKey: ['stats', 'global', locale] as const,
    queryFn: () => fetchStats(locale),
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
  });
```

**使用方式**:
```tsx
// 路由中
await queryClient.ensureQueryData(statsQueryOptions(locale));

// 组件中
const { data } = useQuery(statsQueryOptions(locale));
const { data } = useSuspenseQuery(statsQueryOptions(locale));
```

**收益**:
- 单一数据源，避免 key 不一致
- 类型自动推导
- 便于统一修改 staleTime/gcTime

---

### 2.2 路由预加载与新鲜度设置

**当前配置** ([`router.create.tsx:28-30`](src/router.create.tsx:28-30)):
```tsx
defaultPreload: 'intent',
defaultPreloadDelay: 100,
defaultPreloadStaleTime: 0,
```

**评估**: 
- `defaultPreloadStaleTime: 0` ✅ 正确，允许预加载过期数据
- `defaultPreloadDelay: 100` ✅ 合理，避免误触发

**优化建议**: 考虑添加 hover 预加载选项
```tsx
defaultPreload: 'hover', // 改为 hover 更精确
defaultPreloadDelay: 150,
```

---

### 2.3 错误边界集成

**当前缺失**: 路由级别错误边界

**建议实现**:

```tsx
// src/components/RouteErrorBoundary.tsx
import { ErrorComponent, useRouter } from '@tanstack/react-router';

export function RouteErrorBoundary({ error }: { error: Error }) {
  const router = useRouter();
  
  return (
    <ErrorComponent
      error={error}
      reset={() => router.invalidate()}
    />
  );
}

// 路由中使用
export const Route = createFileRoute('/learn')({
  errorComponent: RouteErrorBoundary,
  // ...
});
```

---

## 三、SSR/Hydration 优化

### 3.1 流式 SSR 支持

**当前配置** ([`vite.config.ts:26`](vite.config.ts:26)):
```tsx
'process.env.STREAMING_SSR': JSON.stringify(process.env.STREAMING_SSR || '0'),
```

**建议**: 启用流式 SSR 提升 FCP/TTI

```tsx
// vite.config.ts
define: {
  'process.env.STREAMING_SSR': JSON.stringify(process.env.STREAMING_SSR || '1'), // 默认启用
},
```

**配合 Suspense**:
```tsx
// 路由组件使用
<Suspense fallback={<PageLoader />}>
  <Content />
</Suspense>
```

当前已正确使用 ([`src/routes/learn.tsx:24-27`](src/routes/learn.tsx:24-27))

---

### 3.2 i18n Hydration 简化

**当前实现** ([`router.create.tsx:32-47`](src/router.create.tsx:32-47)) 使用了手动 store 注入

**建议**: 使用官方推荐的 dehydrate/hydrate 模式

```tsx
import { dehydrate, hydrate } from '@tanstack/react-query';

const router = createRouter({
  // ...
  dehydrate: () => {
    return {
      queryClientState: dehydrate(queryClient),
      i18nState: i18n.store.data,
      lang: i18n.language,
    };
  },
  hydrate: (dehydrated) => {
    const state = dehydrated as any;
    // i18n
    if (state.i18nState) {
      i18n.store.data = state.i18nState;
    }
    // Query Cache
    if (state.queryClientState) {
      hydrate(queryClient, state.queryClientState);
    }
  },
});
```

---

## 四、代码分割优化

### 4.1 路由级别代码分割

**当前** ([`src/routes/index.tsx:10`](src/routes/index.tsx:10)):
```tsx
const Index = lazy(() => import('@/pages/Index'));
```

**检查**: Vite 配置已启用自动分割 ([`vite.config.ts:69`](vite.config.ts:69))

**收益**: 每个路由文件会自动生成独立 chunk

### 4.2 手动 Chunk 优化

**当前配置** ([`vite.config.ts:50-63`](vite.config.ts:50-63)):
```tsx
manualChunks: {
  react: ["react", "react-dom"],
  router: ["@tanstack/react-router"],
  supabase: ["@supabase/supabase-js"],
  charts: ["recharts"],
  radix: [
    "@radix-ui/react-dialog",
    // ...
  ]
}
```

**优化建议**: 添加 TanStack Query chunk
```tsx
manualChunks: {
  // 现有配置...
  'tanstack-query': ['@tanstack/react-query', '@tanstack/query-core'],
}
```

---

## 五、性能监控与调试

### 5.1 DevTools 集成

**建议添加** (开发环境):

```tsx
// src/router.create.tsx
if (import.meta.env.DEV) {
  const { ReactQueryDevtools } = await import('@tanstack/react-query-devtools');
  // 添加到 Wrap 或独立 Provider
}
```

---

### 5.2 路由变更日志

**建议**: 添加路由变更追踪

```tsx
router.subscribe(({ location }) => {
  analytics.pageview(location.pathname);
});
```

---

## 六、具体代码改进

### 6.1 修复类型断言

**文件**: [`src/routes/index.tsx:15`](src/routes/index.tsx:15)
```tsx
// 当前
const { queryClient } = context as { queryClient: import('@tanstack/react-query').QueryClient };

// 改进后 (配合 createRootRouteWithContext)
const { queryClient } = context;
```

### 6.2 Markdown Content Hook 优化

**文件**: [`src/hooks/useMarkdownContent.ts`](src/hooks/useMarkdownContent.ts)

```tsx
// 当前
export const useMarkdownContent = (category: string, slug: string, locale: string = 'en') => {
  const { data } = useSuspenseQuery({
    queryKey: ['markdown', category, slug, locale],
    queryFn: async () => markdownContentManager.getContent(category, slug, locale),
  });
  return { content: data as MarkdownContent | null, loading: false, error: null };
};

// 改进 - 使用 queryOptions
import { queryOptions } from '@tanstack/react-query';

export const markdownContentQueryOptions = (category: string, slug: string, locale: string) =>
  queryOptions({
    queryKey: ['markdown', category, slug, locale] as const,
    queryFn: () => markdownContentManager.getContent(category, slug, locale),
    staleTime: Infinity, // Markdown 内容通常不变
    gcTime: 60 * 60_000,
  });

export const useMarkdownContent = (category: string, slug: string, locale: string = 'en') => {
  return useSuspenseQuery(markdownContentQueryOptions(category, slug, locale));
};
```

---

## 七、测试建议

### 7.1 路由测试

```tsx
import { createMemoryHistory } from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';
import { Route, router } from './test-utils';

test('navigates to learn page', async () => {
  render(<RouterProvider router={router} />);
  
  await userEvent.click(screen.getByRole('link', { name: /learn/i }));
  
  await waitFor(() => {
    expect(screen.getByText(/learn/i)).toBeInTheDocument();
  });
});
```

---

## 八、依赖版本检查

| 库 | 当前 | 建议 | 备注 |
|----|------|------|------|
| `@tanstack/react-router` | 1.159.5 | 最新 1.86.x | 获得性能改进 |
| `@tanstack/react-query` | 5.56.2 | 最新 5.64.x | 更好的 SSR 支持 |
| `@tanstack/router-plugin` | 1.161.3 | 与 router 同步 | 自动代码分割改进 |

---

## 总结

1. **高优先级**: 实施 `queryOptions` 工厂模式、统一类型、添加错误边界
2. **中优先级**: 简化 i18n hydration、启用流式 SSR、添加 chunk 优化
3. **低优先级**: DevTools 集成、测试补全、依赖升级

当前项目 TanStack 集成已相当成熟，核心架构合理，上述优化可进一步提升类型安全、运行时性能和开发体验。
