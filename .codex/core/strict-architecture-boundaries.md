# 🏗️ 严格架构边界

> **OpenAI Harness Engineering 严格架构边界定义**  
> 基于 OpenAI 官方实践的分层领域架构和横切关注点管理

---

## 📋 **概述**

本文档定义了项目的严格架构边界，基于 OpenAI Harness Engineering 的最佳实践，确保代码库的长期健康和可维护性。

---

## 🏗️ **分层领域架构**

### 📦 **严格分层模型**
```
Types Layer (类型层)
├── Domain Types (领域类型)
├── DTOs (数据传输对象)
├── API Types (API 类型)
└── Event Types (事件类型)
        ↓ (依赖方向)
Config Layer (配置层)
├── Environment Config (环境配置)
├── Feature Flags (功能标志)
├── App Settings (应用设置)
└── Runtime Config (运行时配置)
        ↓ (依赖方向)
Repository Layer (仓储层)
├── Data Repositories (数据仓储)
├── Cache Repositories (缓存仓储)
├── External API Repositories (外部 API 仓储)
└── File Repositories (文件仓储)
        ↓ (依赖方向)
Service Layer (服务层)
├── Domain Services (领域服务)
├── Application Services (应用服务)
├── Integration Services (集成服务)
└── Utility Services (工具服务)
        ↓ (依赖方向)
Runtime Layer (运行时层)
├── Controllers (控制器)
├── Handlers (处理器)
├── Middleware (中间件)
└── Event Handlers (事件处理器)
        ↓ (依赖方向)
UI Layer (界面层)
├── Components (组件)
├── Pages (页面)
├── Layouts (布局)
└── Hooks (钩子)
```

### 🔒 **依赖方向规则**

#### ✅ **允许的依赖**
- **UI Layer** → **Runtime Layer** ✅
- **Runtime Layer** → **Service Layer** ✅
- **Service Layer** → **Repository Layer** ✅
- **Repository Layer** → **Config Layer** ✅
- **Config Layer** → **Types Layer** ✅

#### ❌ **禁止的依赖**
- **UI Layer** → **Service Layer** ❌ (必须通过 Runtime Layer)
- **Runtime Layer** → **Repository Layer** ❌ (必须通过 Service Layer)
- **Service Layer** → **Config Layer** ❌ (必须通过 Repository Layer)
- **Repository Layer** → **Types Layer** ❌ (必须通过 Config Layer)
- **任何反向依赖** ❌ (禁止循环依赖)

---

## 🎯 **横切关注点管理**

### 🔐 **Providers 接口定义**

#### **认证 Provider**
```typescript
interface AuthProvider {
  // 状态管理
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // 认证操作
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<User>;
  
  // 会话管理
  refreshToken: () => Promise<string>;
  validateSession: () => Promise<boolean>;
}
```

#### **国际化 Provider**
```typescript
interface I18nProvider {
  // 语言管理
  locale: string;
  supportedLocales: readonly string[];
  
  // 翻译功能
  t: (key: string, options?: TranslationOptions) => string;
  changeLanguage: (locale: string) => Promise<void>;
  
  // 格式化
  formatDate: (date: Date, options?: FormatOptions) => string;
  formatNumber: (number: number, options?: NumberFormatOptions) => string;
}
```

#### **主题 Provider**
```typescript
interface ThemeProvider {
  // 主题状态
  theme: Theme;
  systemTheme: Theme;
  
  // 主题切换
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  
  // 系统主题
  getSystemTheme: () => Theme;
  watchSystemTheme: () => void;
}
```

#### **状态管理 Provider**
```typescript
interface StateProvider {
  // 状态访问
  getState: () => AppState;
  subscribe: (listener: StateListener) => () => void;
  
  // 状态更新
  setState: (state: Partial<AppState>) => void;
  dispatch: (action: Action) => void;
  
  // 选择器
  useSelector: <T>(selector: (state: AppState) => T) => T;
}
```

### 🔗 **Provider 使用规则**

#### ✅ **正确的使用方式**
```typescript
// 在组件中使用 Provider
function UserProfile() {
  const { user, login, logout } = useAuth();
  const { t } = useI18n();
  const { theme } = useTheme();
  
  // 业务逻辑
  return <div>{t('welcome')}, {user.name}</div>;
}

// 在服务中使用 Provider
class UserService {
  constructor(
    private authProvider: AuthProvider,
    private i18nProvider: I18nProvider
  ) {}
  
  async createUser(userData: UserData) {
    // 通过 Provider 处理
    const user = await this.authProvider.register(userData);
    return user;
  }
}
```

#### ❌ **禁止的使用方式**
```typescript
// 禁止直接访问 Provider 内部实现
class BadService {
  async doSomething() {
    // ❌ 禁止直接操作全局状态
    globalState.user = newUser;
    
    // ❌ 禁止绕过 Provider
    localStorage.setItem('theme', 'dark');
    
    // ❌ 禁止直接访问外部 API
    fetch('/api/auth', { method: 'POST' });
  }
}
```

---

## 🔧 **边界验证机制**

### 📋 **自定义 Lint 规则**

#### **依赖方向检查**
```javascript
// scripts/lint/dependency-boundaries.js
module.exports = {
  rules: {
    'no-cross-layer-imports': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Prevent cross-layer imports that violate architectural boundaries'
        }
      },
      create(context) {
        const layerMappings = {
          'components/': 'ui',
          'pages/': 'ui',
          'hooks/': 'ui',
          'controllers/': 'runtime',
          'services/': 'service',
          'repositories/': 'repository',
          'config/': 'config',
          'types/': 'types'
        };
        
        const prohibitedImports = [
          { from: 'ui', to: ['service', 'repository', 'config', 'types'] },
          { from: 'runtime', to: ['repository', 'config', 'types'] },
          { from: 'service', to: ['config', 'types'] },
          { from: 'repository', to: ['types'] }
        ];
        
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;
            
            if (importPath.startsWith('.')) {
              const fromLayer = getCurrentLayer(context.getFilename());
              const toLayer = getTargetLayer(importPath);
              
              if (isProhibited(fromLayer, toLayer)) {
                context.report({
                  node,
                  message: `Import from ${toLayer} layer not allowed in ${fromLayer} layer`
                });
              }
            }
          }
        };
      }
    }
  }
};
```

#### **Provider 使用检查**
```javascript
// scripts/lint/provider-usage.js
module.exports = {
  rules: {
    'require-provider-usage': {
      meta: {
        type: 'error',
        docs: {
          description: 'Require using Providers for cross-cutting concerns'
        }
      },
      create(context) {
        return {
          CallExpression(node) {
            if (node.callee.type === 'MemberExpression') {
              const objectName = node.callee.object.name;
              const propertyName = node.callee.property.name;
              
              // 检查是否直接访问全局状态
              if (objectName === 'localStorage' || objectName === 'sessionStorage') {
                context.report({
                  node,
                  message: 'Use Provider instead of direct localStorage/sessionStorage access'
                });
              }
              
              // 检查是否直接访问 fetch
              if (objectName === 'fetch' && propertyName === 'call') {
                context.report({
                  node,
                  message: 'Use Repository layer instead of direct fetch calls'
                });
              }
            }
          }
        };
      }
    }
  }
};
```

### 🧪 **结构测试**

#### **架构边界测试**
```typescript
// tests/architecture/boundary-validation.test.ts
describe('Architecture Boundary Validation', () => {
  test('should not have cross-layer dependencies', () => {
    const violations = validateDependencyBoundaries();
    expect(violations).toHaveLength(0);
  });
  
  test('should respect dependency direction', () => {
    const violations = validateDependencyDirection();
    expect(violations).toHaveLength(0);
  });
  
  test('should not have circular dependencies', () => {
    const cycles = detectCircularDependencies();
    expect(cycles).toHaveLength(0);
  });
});
```

---

## 📊 **验证命令**

### 🔍 **架构验证**
```bash
# 运行架构边界检查
npm run architecture:validate

# 检查依赖方向
npm run architecture:check-dependencies

# 检查 Provider 使用
npm run architecture:check-providers

# 完整架构验证
npm run architecture:full-check
```

### 📋 **验证报告**
```json
{
  "timestamp": "2026-03-13T10:30:00Z",
  "status": "passed",
  "violations": [],
  "layers": {
    "types": { "files": 12, "violations": 0 },
    "config": { "files": 8, "violations": 0 },
    "repository": { "files": 15, "violations": 0 },
    "service": { "files": 10, "violations": 0 },
    "runtime": { "files": 20, "violations": 0 },
    "ui": { "files": 45, "violations": 0 }
  },
  "providers": {
    "auth": { "usage": "compliant", "violations": 0 },
    "i18n": { "usage": "compliant", "violations": 0 },
    "theme": { "usage": "compliant", "violations": 0 },
    "state": { "usage": "compliant", "violations": 0 }
  }
}
```

---

## 🔄 **违规处理流程**

### 🚨 **违规类型**
- **🔴 严重违规**: 跨层依赖、循环依赖、直接全局访问
- **🟡 中等违规**: Provider 使用不当、依赖方向错误
- **🟢 轻微违规**: 命名约定、代码组织

### 📋 **处理步骤**
1. **识别违规**: 自动检测和报告
2. **分析原因**: 确定违规的根本原因
3. **提供方案**: 给出具体的修复建议
4. **实施修复**: 开发者实施修复
5. **验证修复**: 重新检查确保修复成功

---

## 🎯 **最佳实践**

### ✅ **推荐的实现方式**

#### **组件开发**
```typescript
// ✅ 正确的组件实现
function UserProfile() {
  // 使用 Provider 获取状态
  const { user } = useAuth();
  const { t } = useI18n();
  const { theme } = useTheme();
  
  // 使用 Hook 处理业务逻辑
  const { updateUser } = useUserUpdate();
  
  return (
    <div className="user-profile">
      <h1>{t('profile.title')}</h1>
      <p>{user.name}</p>
      <button onClick={() => updateUser({ name: 'New Name' })}>
        {t('profile.update')}
      </button>
    </div>
  );
}
```

#### **服务开发**
```typescript
// ✅ 正确的服务实现
class UserService {
  constructor(
    private userRepository: UserRepository,
    private authProvider: AuthProvider
  ) {}
  
  async updateUser(userId: string, updates: Partial<User>) {
    // 通过 Repository 操作数据
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser = await this.userRepository.update(userId, updates);
    
    // 通过 Provider 更新状态
    await this.authProvider.updateUser(updatedUser);
    
    return updatedUser;
  }
}
```

### ❌ **避免的反模式**

#### **直接全局访问**
```typescript
// ❌ 错误的实现方式
function BadComponent() {
  // 直接访问全局状态
  const user = globalState.user;
  
  // 直接操作 localStorage
  localStorage.setItem('theme', 'dark');
  
  // 直接调用 fetch
  useEffect(() => {
    fetch('/api/user').then(res => res.json());
  }, []);
  
  return <div>{user.name}</div>;
}
```

#### **跨层依赖**
```typescript
// ❌ 错误的服务实现
class BadService {
  // 直接从 UI 层导入
  import { UserProfile } from '../components/UserProfile';
  
  // 直接操作数据库
  async doSomething() {
    const db = new Database();
    return db.query('SELECT * FROM users');
  }
}
```

---

## 📚 **相关文档**

- [HARNESS.md](../HARNESS.md) - 项目约束宪法
- [AGENTS.md](../AGENTS.md) - AI Agent 指南
- [architecture-validation.cjs](../../scripts/utility/architecture-validation.cjs) - 架构验证工具
- [dependency-boundaries.js](../../scripts/lint/dependency-boundaries.js) - 依赖边界 Lint 规则

---

## 🎊 **总结**

严格的架构边界是 Harness Engineering 的核心要素，它确保了代码库的长期健康和可维护性。通过明确的分层架构、横切关注点管理和自动化验证机制，我们可以实现：

- **清晰的依赖关系**: 避免循环依赖和混乱的架构
- **更好的可测试性**: 每层都可以独立测试
- **更高的可维护性**: 代码结构清晰，易于理解和修改
- **更强的可扩展性**: 新功能可以安全地添加到合适的层级

---

*最后更新: 2026-03-13*  
*验证状态: ⏳ 待验证*  
*下次审查: 2026-03-20*
