# 🔧 品味不变式

> **基于 OpenAI Harness Engineering 的品味不变式定义**  
> 确保代码质量和一致性的强制规则和标准

---

## 概述

品味不变式（Taste Invariants）是本文档定义了项目的品味不变式，基于 OpenAI Harness Engineering 的最佳实践，它们定义了项目中不可妥协的质量标准和编码规范。这些不变式通过自动化工具强制执行，确保代码库的长期健康和一致性。

---

## 核心原则

### 不变式特点
### 📊 **不变式特点**
- **不可妥协**: 这些规则没有例外情况
- **自动执行**: 通过工具自动检查和强制
- **持续改进**: 基于反馈不断优化规则
- **团队共识**: 团队成员共同认可和遵守

### 🔄 **实施机制**
- **自定义 Lint 规则**: 通过 ESLint 强制执行
- **结构测试**: 通过自动化测试验证
- **CI/CD 集成**: 在构建流程中检查
- **代码审查**: 人工审查确认

---

## 📝 **结构化日志记录**

### 📋 **日志规范**
```typescript
// ✅ 正确的日志记录
import { logger } from '@/utils/logger';

class UserService {
  async createUser(userData: UserData): Promise<User> {
    logger.info('Creating new user', {
      userId: userData.id,
      email: userData.email,
      timestamp: new Date().toISOString()
    });
    
    try {
      const user = await this.userRepository.create(userData);
      
      logger.info('User created successfully', {
        userId: user.id,
        email: user.email,
        createdAt: user.createdAt
      });
      
      return user;
    } catch (error) {
      logger.error('Failed to create user', {
        error: error.message,
        userId: userData.id,
        timestamp: new Date().toISOString()
      });
      
      throw error;
    }
  }
}
```

### ❌ **禁止的日志记录**
```typescript
// ❌ 错误的日志记录
class BadUserService {
  async createUser(userData: UserData): Promise<User> {
    // ❌ 禁止使用 console.log
    console.log('Creating user:', userData);
    
    // ❌ 禁止使用 console.error
    console.error('Error:', error);
    
    // ❌ 禁止无结构的日志
    console.warn('Something went wrong');
    
    // ❌ 禁止敏感信息日志
    console.log('Password:', userData.password);
    
    return user;
  }
}
```

### 🔧 **日志工具**
```typescript
// utils/logger.ts
export interface LogContext {
  userId?: string;
  email?: string;
  timestamp: string;
  requestId?: string;
  sessionId?: string;
}

export interface LogLevel {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (message: string, error?: Error, context?: LogContext) => void;
}

export const logger: LogLevel = {
  debug: (message: string, context?: LogContext) => {
    // 结构化调试日志
  },
  info: (message: string, context?: LogContext) => {
    // 结构化信息日志
  },
  warn: (message: string, context?: LogContext) => {
    // 结构化警告日志
  },
  error: (message: string, error?: Error, context?: LogContext) => {
    // 结构化错误日志
  }
};
```

---

## 🏷️ **命名约定**

### 📋 **组件命名**
```typescript
// ✅ 正确的组件命名
export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return <div>{user.name}</div>;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  return <form onSubmit={onSubmit}>...</form>;
};

export const NavigationBar: React.FC<NavigationBarProps> = ({ items }) => {
  return <nav>{items.map(item => <NavItem key={item.id} item={item} />)}</nav>;
};
```

### 🔧 **Hook 命名**
```typescript
// ✅ 正确的 Hook 命名
export const useUserData = (): User => {
  const [user, setUser] = useState<User | null>(null);
  return user;
};

export const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return { isAuthenticated, setIsAuthenticated };
};

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  const setStoredValue = (value: T) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [value, setStoredValue];
};
```

### 🔧 **函数命名**
```typescript
// ✅ 正确的函数命名
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
```

### 📦 **常量命名**
```typescript
// ✅ 正确的常量命名
export const API_BASE_URL = 'https://api.example.com';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const DEFAULT_TIMEOUT = 30000; // 30 seconds
export const SUPPORTED_LOCALES = ['en', 'zh'] as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred',
  TIMEOUT_ERROR: 'Request timeout',
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Resource not found'
} as const;
```

### ❌ **禁止的命名**
```typescript
// ❌ 错误的命名
export const user_data = {}; // 应该使用 camelCase
export const GetUser = () => {}; // 应该使用 camelCase
export const data = []; // 应该使用描述性命名
export const temp = {}; // 应该使用描述性命名
export const x = {}; // 禁止单字母命名
```

---

## 📏 **文件大小限制**

### 📋 **文件大小标准**
```typescript
// 文件大小限制配置
export const FILE_SIZE_LIMITS = {
  components: {
    max: 500 * 1024, // 500KB
    warning: 400 * 1024, // 400KB
  },
  pages: {
    max: 300 * 1024, // 300KB
    warning: 250 * 1024, // 250KB
  },
  hooks: {
    max: 200 * 1024, // 200KB
    warning: 150 * 1024, // 150KB
  },
  utils: {
    max: 400 * 1024, // 400KB
    warning: 300 * 1024, // 300KB
  },
  services: {
    max: 600 * 1024, // 600KB
    warning: 500 * 1024, // 500KB
  },
  tests: {
    max: 800 * 1024, // 800KB
    warning: 700 * 1024, // 700KB
  },
  default: {
    max: 1000 * 1024, // 1MB
    warning: 800 * 1024, // 800KB
  }
} as const;
```

### 🔧 **文件大小检查工具**
```typescript
// scripts/utils/file-size-checker.ts
import * as fs from 'fs';
import * as path from 'path';

export interface FileSizeResult {
  file: string;
  size: number;
  sizeKB: number;
  limit: number;
  status: 'ok' | 'warning' | 'error';
}

export class FileSizeChecker {
  static checkFile(filePath: string): FileSizeResult {
    const stats = fs.statSync(filePath);
    const size = stats.size;
    const sizeKB = Math.round(size / 1024);
    
    const limit = this.getLimit(filePath);
    const status = this.getStatus(size, limit);
    
    return {
      file: path.relative(process.cwd(), filePath),
      size,
      sizeKB,
      limit: limit / 1024,
      status
    };
  }
  
  static checkDirectory(dir: string): FileSizeResult[] {
    const results: FileSizeResult[] = [];
    
    const files = this.getAllFiles(dir);
    files.forEach(file => {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(this.checkFile(file));
      }
    });
    
    return results;
  }
  
  private static getLimit(filePath: string): number {
    const dir = path.dirname(filePath);
    const filename = path.basename(filePath);
    
    if (dir.includes('components')) {
      return FILE_SIZE_LIMITS.components.max;
    } else if (dir.includes('pages')) {
      return FILE_SIZE_LIMITS.pages.max;
    } else if (dir.includes('hooks')) {
      return FILE_SIZE_LIMITS.hooks.max;
    } else if (dir.includes('utils')) {
      return FILE_SIZE_LIMITS.utils.max;
    } else if (dir.includes('services')) {
      return FILE_SIZE_LIMITS.services.max;
    } else if (dir.includes('tests')) {
      return FILE_SIZE_LIMITS.tests.max;
    } else {
      return FILE_SIZE_LIMITS.default.max;
    }
  }
  
  private static getStatus(size: number, limit: number): 'ok' | 'warning' | 'error' {
    if (size > limit) return 'error';
    if (size > limit * 0.8) return 'warning';
    return 'ok';
  }
  
  private static getAllFiles(dir: string): string[] {
    const files: string[] = [];
    
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...this.getAllFiles(fullPath));
      } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
        files.push(fullPath);
      }
    });
    
    return files;
  }
}
```

---

## 🔧 **代码质量标准**

### 📋 **函数复杂度**
```typescript
// ✅ 正确的函数复杂度
export const calculateTotal = (items: CartItem[]): number => {
  // 单一职责，逻辑简单
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const validateUser = (user: User): ValidationResult => {
  // 清晰的验证逻辑
  const errors: string[] = [];
  
  if (!user.email) errors.push('Email is required');
  if (!user.name) errors.push('Name is required');
  if (user.age < 18) errors.push('Age must be at least 18');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

### 📋 **类的复杂度**
```typescript
// ✅ 正确的类设计
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService,
    private logger: Logger
  ) {}
  
  async createUser(userData: UserData): Promise<User> {
    // 单一职责：创建用户
    this.logger.info('Creating new user', { email: userData.email });
    
    const user = await this.userRepository.create(userData);
    await this.emailService.sendWelcomeEmail(user.email);
    
    return user;
  }
  
  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    // 单一职责：更新用户
    this.logger.info('Updating user', { userId });
    
    return this.userRepository.update(userId, updates);
  }
  
  async deleteUser(userId: string): Promise<void> {
    // 单一职责：删除用户
    this.logger.info('Deleting user', { userId });
    
    await this.userRepository.delete(userId);
  }
}
```

### ❌ **禁止的复杂度**
```typescript
// ❌ 错误的复杂度
export class BadUserService {
  // ❌ 单一类承担太多职责
  async createUser(userData: UserData): Promise<User> {
    // ❌ 过长的函数
    if (!userData.email) {
      throw new Error('Email is required');
    }
    
    if (!userData.name) {
      throw new Error('Name is required');
    }
    
    if (userData.age < 18) {
      throw new Error('Age must be at least 18');
    }
    
    // ❌ 嵌套过深
    if (userData.email.includes('@')) {
      if (userData.email.endsWith('.com')) {
        if (userData.email.length > 10) {
          // 更多嵌套逻辑...
        }
      }
    }
    
    // ❌ 直接操作多个服务
    const user = await this.userRepository.create(userData);
    await this.emailService.sendWelcomeEmail(user.email);
    await this.notificationService.sendPush(user.id);
    await this.analyticsService.track('user_created', user);
    
    return user;
  }
}
```

---

## 🔍 **自定义 Lint 规则**

### 📋 **结构化日志规则**
```javascript
// scripts/lint/structured-logging.js
module.exports = {
  rules: {
    'no-console-log': {
      meta: {
        type: 'error',
        docs: {
          description: 'Disallow console.log statements'
        }
      },
      create(context) {
        return {
          CallExpression(node) {
            if (node.callee.type === 'MemberExpression' &&
                node.callee.object.name === 'console' &&
                node.callee.property.name === 'log') {
              context.report({
                node,
                message: 'Use structured logging instead of console.log',
                suggest: 'Replace with logger.info()'
              });
            }
          }
        };
      }
    },
    
    'require-structured-logging': {
      meta: {
        type: 'error',
        docs: {
          description: 'Require structured logging for error handling'
        }
      },
      create(context) {
        return {
          TryStatement(node) {
            const catchClause = node.handler;
            if (catchClause && !hasStructuredLogging(catchClause)) {
              context.report({
                node: catchClause,
                message: 'Use structured logging in catch blocks',
                suggest: 'Add logger.error() with context'
              });
            }
          }
        };
      }
    }
  }
};
```

### 📋 **命名约定规则**
```javascript
// scripts/lint/naming-conventions.js
module.exports = {
  rules: {
    'component-naming': {
      meta: {
        type: 'error',
        docs: {
          description: 'Require PascalCase for component names'
        }
      },
      create(context) {
        return {
          ExportNamedDeclaration(node) {
            const fileName = context.getFilename();
            if (fileName.includes('components/') && fileName.endsWith('.tsx')) {
              const componentName = node.id.name;
              if (!componentName.match(/^[A-Z]/)) {
                context.report({
                  node,
                  message: `Component name ${componentName} should use PascalCase`,
                  suggest: `Rename to ${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`
                });
              }
            }
          }
        };
      }
    },
    
    'hook-naming': {
      meta: {
        type: 'error',
        docs: {
          description: 'Require use prefix for hook names'
        }
      },
      create(context) {
        return {
          ExportNamedDeclaration(node) {
            const fileName = context.getFilename();
            if (fileName.includes('hooks/') && fileName.endsWith('.ts')) {
              const hookName = node.id.name;
              if (!hookName.startsWith('use')) {
                context.report({
                  node,
                  message: `Hook name ${hookName} should start with 'use'`,
                  suggest: `Rename to use${hookName.charAt(0).toUpperCase() + hookName.slice(1)}`
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

### 📋 **文件大小规则**
```javascript
// scripts/lint/file-size-limits.js
module.exports = {
  rules: {
    'file-size-limit': {
      meta: {
        type: 'error',
        docs: {
          description: 'Enforce file size limits'
        }
      },
      create(context) {
        const { getSourceCode, getFilename } = context;
        const filename = getFilename();
        const sourceCode = getSourceCode();
        
        const size = Buffer.byteLength(sourceCode, 'utf8');
        const limit = getFileSizeLimit(filename);
        
        if (size > limit) {
          context.report({
            node: null,
            message: `File size (${Math.round(size / 1024)}KB) exceeds limit (${Math.round(limit / 1024)}KB)`,
            suggest: 'Consider splitting the file into smaller modules'
          });
        }
      }
    }
  }
};
```

---

## 📊 **验证命令**

### 🔍 **质量检查命令**
```bash
# 运行所有品味不变式检查
npm run taste:check

# 检查结构化日志
npm run taste:logging

# 检查命名约定
npm run taste:naming

# 检查文件大小
npm run taste:file-size

# 检查代码复杂度
npm run taste:complexity
```

### 📋 **验证报告**
```json
{
  "timestamp": "2026-03-13T10:30:00Z",
  "status": "passed",
  "violations": [],
  "metrics": {
    "structuredLogging": {
      "total": 150,
      "compliant": 148,
      "violations": 2,
      "score": 98.7
    },
    "namingConventions": {
      "total": 85,
      "compliant": 83,
      "violations": 2,
      "score": 97.6
    },
    "fileSize": {
      "total": 45,
      "compliant": 44,
      "violations": 1,
      "score": 97.8
    },
    "complexity": {
      "total": 120,
      "compliant": 118,
      "violations": 2,
      "score": 98.3
    }
  },
  "overallScore": 98.1
}
```

---

## 🔄 **违规处理流程**

### 📋 **违规类型**
- **🔴 严重违规**: console.log 使用、命名约定错误、文件大小超限
- **🟡 中等违规**: 日志结构不规范、函数复杂度过高
- **🟢 轻微违规**: 代码组织、注释缺失

### 📝 **处理步骤**
1. **自动检测**: Lint 规则自动检测违规
2. **自动修复**: 部分违规可以自动修复
3. **手动修复**: 开发者手动修复复杂违规
4. **验证修复**: 重新检查确保修复成功
5. **持续监控**: 监控违规趋势和改进

---

## 📚 **相关文档**

- [HARNESS.md](../HARNESS.md) - 项目约束宪法
- [strict-architecture-boundaries.md](./strict-architecture-boundaries.md) - 严格架构边界
- [agent-specialization.md](./agent-specialization.md) - Agent 专业化策略
- [quality-gates.md](./quality-gates.md) - 质量门禁

---

## 🎊 **总结**

品味不变式是确保代码质量和一致性的关键要素。通过自动化工具和明确的标准，我们可以实现：

- **一致的代码风格**: 统一的命名约定和代码组织
- **高质量代码**: 强制的质量标准和复杂度控制
- **可维护性**: 合理的文件大小和函数复杂度
- **可观测性**: 结构化日志记录和错误处理

---

*最后更新: 2026-03-13*  
*验证状态: ⏳ 待验证*  
*下次审查: 2026-03-20*
