# 前缀式 URL i18n 优化项目规则

## 🎯 新增规则

### 规则 1: i18n 系统设计原则
- **URL 驱动**: 所有语言切换必须基于 URL 变化，不依赖 localStorage
- **类型安全**: 所有 locale 相关操作必须有 TypeScript 类型保护
- **性能优先**: 语言切换延迟必须控制在 100ms 以内
- **SEO 友好**: 所有页面必须包含正确的 lang 和 hreflang 标签

### 规则 2: 路由结构规范
- **前缀模式**: 使用 `{-$locale}` 前缀，不使用 `/$locale`
- **重定向策略**: 根路径必须根据 Accept-Language 头重定向
- **向后兼容**: 旧 URL 必须自动重定向到新格式
- **类型定义**: 路由参数必须使用 `Locale` 类型

### 规则 3: 组件开发规范
- **LocaleLink**: 所有内部链接必须使用 LocaleLink 组件
- **语言切换**: 必须提供明确的语言切换 UI
- **状态同步**: URL 和组件状态必须实时同步
- **错误处理**: 必须优雅处理 locale 加载失败

### 规则 4: 测试要求
- **单元测试**: 所有 i18n 工具函数必须有 100% 覆盖率
- **集成测试**: 语言切换流程必须有完整测试
- **E2E 测试**: 关键用户场景必须有端到端验证
- **性能测试**: 语言切换性能必须有基准测试

## 🚨 禁止模式

### 禁止 1: localStorage 依赖
```typescript
// ❌ 禁止
const locale = localStorage.getItem('locale');

// ✅ 推荐
const locale = getLocaleFromPath(window.location.pathname);
```

### 禁止 2: 硬编码 locale
```typescript
// ❌ 禁止
if (locale === 'zh') { // ... }

// ✅ 推荐
if (isChinese(locale)) { // ... }
```

### 禁止 3: 页面刷新
```typescript
// ❌ 禁止
window.location.reload();

// ✅ 推荐
navigate({ to: localizedPath });
```

### 禁止 4: 忽略 SEO
```typescript
// ❌ 禁止
<html> {/* 无 lang 属性 */}

// ✅ 推荐
<html lang={currentLocale}>
```

## 📋 质量标准

### 代码质量
- **TypeScript**: 严格模式，零 any 类型
- **ESLint**: 零警告，零错误
- **Prettier**: 统一代码格式
- **测试覆盖率**: 最低 80%，目标 100%

### 性能标准
- **语言切换延迟**: < 100ms
- **Bundle 大小增长**: < 10%
- **首次加载时间**: 不增加
- **内存使用**: 不增长

### 用户体验标准
- **切换成功率**: 100%
- **URL 准确性**: 100%
- **内容同步性**: 100%
- **错误率**: < 0.1%

## 🔍 审查清单

### 代码审查
- [ ] 是否遵循 URL 驱动原则？
- [ ] 是否使用正确的路由前缀？
- [ ] 是否有完整的类型保护？
- [ ] 是否包含必要的测试？

### 功能审查
- [ ] 语言切换是否无需刷新？
- [ ] URL 是否正确更新？
- [ ] 内容是否与语言同步？
- [ ] SEO 标签是否正确？

### 性能审查
- [ ] 切换延迟是否 < 100ms？
- [ ] Bundle 大小是否合理？
- [ ] 是否有内存泄漏？
- [ ] 是否有性能回归？

## 🔄 持续改进

### 监控指标
- **技术指标**: 错误率、性能、可用性
- **业务指标**: 用户满意度、任务完成率
- **SEO 指标**: 搜索排名、抓取成功率
- **用户行为**: 语言切换频率、页面停留时间

### 反馈循环
- **用户反馈**: 每周收集和分析
- **团队反馈**: 每日站会讨论
- **数据分析**: 每月性能报告
- **优化迭代**: 每季度功能增强

## 📚 学习资源

### 必读文档
- [TanStack Router i18n 指南](https://tanstack.com/router/v1/docs/guide/internationalization-i18n)
- [MDN Web 国际化](https://developer.mozilla.org/en-US/docs/Web/Internationalization)
- [Google 多语言 SEO](https://developers.google.com/search/docs/specialty/international/seamless)

### 推荐阅读
- [i18n 最佳实践](https://www.w3.org/International/)
- [Web 性能优化](https://web.dev/performance/)
- [可访问性指南](https://www.w3.org/WAI/WCAG21/quickref/)

### 工具文档
- **TanStack Router**: 官方文档和 API 参考
- **Paraglide JS**: 完整使用指南
- **TypeScript**: 高级类型系统
- **Playwright**: E2E 测试最佳实践

## 🚀 实施检查

### 开发前检查
- [ ] 是否理解业务需求？
- [ ] 是否评估技术风险？
- [ ] 是否制定实施计划？
- [ ] 是否准备测试策略？

### 开发中检查
- [ ] 是否遵循编码规范？
- [ ] 是否及时提交代码？
- [ ] 是否编写测试用例？
- [ ] 是否更新文档？

### 开发后检查
- [ ] 是否通过所有测试？
- [ ] 是否满足性能要求？
- [ ] 是否符合质量标准？
- [ ] 是否准备部署？

---

*创建时间: 2026-03-12*  
*适用范围: 前缀式 URL i18n 优化项目*  
*版本: 1.0*
