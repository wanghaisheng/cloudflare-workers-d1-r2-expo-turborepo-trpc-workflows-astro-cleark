# 📁 归档管理系统

> **变更记录归档系统**  
*归档的是变更记录，而不是任何文档或技能*

---

## 📋 **概述**

本文档定义了项目的归档管理系统，实现变更记录完成后的自动归档机制。当使用 `@spec` 或 `@bmm` 创建的变更记录完成后，系统会自动将整个变更记录目录归档到 `openspec/changes/archive/YYYY-MM-DD/` 下，确保变更历史的版本控制和追踪。

---

## 🎯 **归档原则**

### 📊 **变更记录归档**
- **变更记录**: 当使用 `@spec` 或 `@bmm` 创建的变更记录完成时
- **里程碑完成**: 当变更记录中的里程碑完成时
- **项目完成**: 当整个项目或重大变更完成时
- **版本发布**: 当版本发布前的完整归档

### 🔄 **归档策略**
```
变更记录完成 → 自动检测 → 归档变更记录 → 版本标记 → 更新索引
```

---

## 📁 **变更记录结构**

### 📋 **变更记录目录结构**
```
openspec/changes/{change-name}/
├── README.md           # 变更记录概要
├── proposal.md         # 变更提案
├── design.md           # 设计文档
├── tasks.md            # 任务列表
└── durable-spec.md     # 持久化规格
```

### 📁 **归档目录结构**
```
openspec/changes/archive/YYYY-MM-DD/
├── {change-name-1}/    # 完整的变更记录
│   ├── README.md
│   ├── proposal.md
│   ├── design.md
│   ├── tasks.md
│   └── durable-spec.md
├── {change-name-2}/    # 完整的变更记录
│   ├── README.md
│   ├── proposal.md
│   ├── design.md
│   ├── tasks.md
│   └── durable-spec.md
└── metadata/
    ├── archive-manifest.json
    ├── change-summary.md
    └── version-info.json
```

---

## 🤖 **自动归档系统**

### 📋 **归档触发器**
```typescript
interface ArchiveTrigger {
  // 变更检测
  changeDetection: {
    fileModified: boolean;
    contentChanged: boolean;
    significantChange: boolean;
  };
  
  // 版本控制
  versionControl: {
    autoIncrement: boolean;
    semanticVersioning: boolean;
    changeLog: boolean;
  };
  
  // 归档条件
  archiveConditions: {
    minChangeThreshold: number;
    timeSinceLastArchive: number;
    milestoneCompletion: boolean;
  };
}

class ArchiveTrigger {
  async shouldArchive(filePath: string): Promise<boolean> {
    const changeInfo = await this.analyzeChanges(filePath);
    
    return (
      changeInfo.significantChange ||
      changeInfo.contentChanged ||
      this.isMilestoneCompletion(filePath) ||
      this.timeToArchive(filePath)
    );
  }
  
  private async analyzeChanges(filePath: string): Promise<ChangeInfo> {
    const currentContent = await this.readFile(filePath);
    const lastArchive = await this.getLastArchive(filePath);
    
    if (!lastArchive) {
      return { significantChange: true, contentChanged: true };
    }
    
    const changes = this.calculateChanges(lastArchive.content, currentContent);
    
    return {
      significantChange: changes.additions + changes.deletions > 50,
      contentChanged: changes.additions + changes.deletions > 0
    };
  }
}
```

### 🔄 **归档执行器**
```typescript
interface ArchiveExecutor {
  // 创建归档
  createArchive: (changes: ChangeDetection) => Promise<ArchiveResult>;
  
  // 版本管理
  manageVersion: (filePath: string) => Promise<VersionInfo>;
  
  // 复制文件
  copyFiles: (changes: ChangeDetection, archiveDir: string) => Promise<void>;
  
  // 更新索引
  updateIndex: (archiveInfo: ArchiveInfo) => Promise<void>;
}

class ArchiveExecutorImpl implements ArchiveExecutor {
  async createArchive(changes: ChangeDetection): Promise<ArchiveResult> {
    // 1. 创建归档目录
    const archiveDir = this.createArchiveDirectory();
    
    // 2. 复制变更内容（保持原结构）
    await this.copyChangedContent(changes, archiveDir);
    
    // 3. 生成元数据
    await this.generateMetadata(archiveDir, changes);
    
    // 4. 更新索引
    await this.updateArchiveIndex(archiveDir, changes);
    
    return {
      archivePath: archiveDir,
      timestamp: new Date().toISOString(),
      version: await this.getCurrentVersion(),
      success: true
    };
  }
  
  private async copyChangedContent(changes: ChangeDetection, archiveDir: string): Promise<void> {
    // 复制变更的文件（保持原路径）
    for (const file of changes.changedFiles) {
      const sourcePath = path.join(process.cwd(), file);
      const targetPath = path.join(archiveDir, file);
      
      // 确保目标目录存在
      await this.ensureDirectoryExists(path.dirname(targetPath));
      
      // 复制文件
      await this.copyFile(sourcePath, targetPath);
    }
    
    // 复制变更的目录（保持原结构）
    for (const dir of changes.changedDirectories) {
      const sourcePath = path.join(process.cwd(), dir);
      const targetPath = path.join(archiveDir, dir);
      
      // 递归复制目录
      await this.copyDirectory(sourcePath, targetPath);
    }
  }
  
  private createArchiveDirectory(): string {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const archiveDir = path.join(process.cwd(), 'openspec', 'changes', 'archive', dateStr);
    
    if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true });
    }
    
    return archiveDir;
  }
}
```

---

## 📊 **归档元数据**

### 📋 **元数据结构**
```typescript
interface ArchiveMetadata {
  // 基本信息
  basic: {
    archiveDate: string;
    archivePath: string;
    timestamp: string;
    version: string;
  };
  
  // 变更信息
  changes: {
    changedFiles: string[];
    changedDirectories: string[];
    changeTypes: {
      added: string[];
      modified: string[];
      deleted: string[];
    };
    totalChanges: number;
  };
  
  // 项目信息
  project: {
    rootPath: string;
    structure: DirectoryStructure;
    dependencies: ProjectDependencies;
    configuration: ProjectConfiguration;
  };
  
  // 质量信息
  quality: {
    testResults: TestResults;
    lintResults: LintResults;
    buildResults: BuildResults;
    complianceResults: ComplianceResults;
  };
}
```

---

## 🔧 **归档管理命令**

### 📋 **归档命令**
```bash
# 创建归档（保持原结构）
npm run archive:create

# 检查需要归档的变更
npm run archive:check

# 查看归档状态
npm run archive:status

# 搜索归档
npm run archive:search --query "HARNESS.md"

# 恢复归档
npm run archive:restore --date "2026-03-13" --target "HARNESS.md"

# 查看归档内容
npm run archive:list --date "2026-03-13"

# 比较归档版本
npm run archive:compare --from "2026-03-13" --to "2026-03-14"
```

---

## 📚 **归档使用指南**

### 📋 **手动归档**
```typescript
// 当完成重要变更时
const archiveResult = await archiveManager.createArchive(changes);
console.log(`归档完成: ${archiveResult.archivePath}`);
```

### 🔄 **批量归档**
```typescript
// 项目里程碑完成时
const milestoneArchives = await archiveManager.batchArchive();
console.log(`批量归档完成: ${milestoneArchives.length} 个文件`);
```

### 🔍 **归档搜索**
```typescript
// 查找特定版本的归档
const archives = await archiveManager.searchArchives({
  query: 'HARNESS.md',
  dateRange: {
    start: '2026-03-01',
    end: '2026-03-31'
  }
});

console.log(`找到 ${archives.length} 个归档文件`);
```

---

## 📚 **相关文档**

- [HARNESS.md](../HARNESS.md) - 项目约束宪法
- [AGENTS.md](../AGENTS.md) - AI Agent 指南
- [workflows/router.md](../workflows/router.md) - 工作流程路由
- [agent-discovery-system.md](./agent-discovery-system.md) - Agent 发现系统

---

## 🎊 **总结**

归档管理系统提供了完整的自动化归档和版本控制能力，确保：

- **📁 保持结构**: 完全保持原有的目录结构
- **🔄 归档变更**: 归档的是变更内容，不是文件类型
- **📊 版本控制**: 按日期和版本进行版本控制
- **🔍 易于恢复**: 可以轻松恢复到任何历史版本

这个系统使得项目的所有变更都能够得到妥善的版本控制和历史追踪，确保项目的可追溯性和可维护性。

---

*最后更新: 2026-03-13*  
*验证状态: ⏳ 待验证*  
*下次审查: 2026-03-20*

---

## 🤖 **自动归档系统**

### 📋 **归档触发器**
```typescript
interface ArchiveTrigger {
  // 变更检测
  changeDetection: {
    fileModified: boolean;
    contentChanged: boolean;
    significantChange: boolean;
  };
  
  // 版本控制
  versionControl: {
    autoIncrement: boolean;
    semanticVersioning: boolean;
    changeLog: boolean;
  };
  
  // 归档条件
  archiveConditions: {
    minChangeThreshold: number;
    timeSinceLastArchive: number;
    milestoneCompletion: boolean;
  };
}

class ArchiveTrigger {
  async shouldArchive(filePath: string): Promise<boolean> {
    const changeInfo = await this.analyzeChanges(filePath);
    
    return (
      changeInfo.significantChange ||
      changeInfo.contentChanged ||
      this.isMilestoneCompletion(filePath) ||
      this.timeToArchive(filePath)
    );
  }
  
  private async analyzeChanges(filePath: string): Promise<ChangeInfo> {
    const currentContent = await this.readFile(filePath);
    const lastArchive = await this.getLastArchive(filePath);
    
    if (!lastArchive) {
      return { significantChange: true, contentChanged: true };
    }
    
    const changes = this.calculateChanges(lastArchive.content, currentContent);
    
    return {
      significantChange: changes.additions + changes.deletions > 50,
      contentChanged: changes.additions + changes.deletions > 0
    };
  }
}
```

### 🔄 **归档执行器**
```typescript
interface ArchiveExecutor {
  // 创建归档
  createArchive: (filePath: string, metadata: ArchiveMetadata) => Promise<ArchiveResult>;
  
  // 版本管理
  manageVersion: (filePath: string) => Promise<VersionInfo>;
  
  // 移动文件
  moveFiles: (source: string, destination: string) => Promise<void>;
  
  // 更新索引
  updateIndex: (archiveInfo: ArchiveInfo) => Promise<void>;
}

class ArchiveExecutorImpl implements ArchiveExecutor {
  async createArchive(filePath: string, metadata: ArchiveMetadata): Promise<ArchiveResult> {
    // 1. 创建归档目录
    const archiveDir = this.createArchiveDirectory();
    
    // 2. 生成归档文件名
    const archiveFileName = this.generateArchiveFileName(filePath);
    
    // 3. 复制文件到归档目录
    const archivePath = path.join(archiveDir, this.getCategory(filePath), archiveFileName);
    await this.copyFile(filePath, archivePath);
    
    // 4. 创建元数据
    await this.createMetadata(archivePath, metadata);
    
    // 5. 更新索引
    await this.updateArchiveIndex(archivePath, metadata);
    
    return {
      archivePath,
      timestamp: new Date().toISOString(),
      version: metadata.version,
      success: true
    };
  }
  
  private createArchiveDirectory(): string {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const archiveDir = path.join(process.cwd(), 'openspec', 'changes', 'archive', dateStr);
    
    if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true });
      
      // 创建子目录
      fs.mkdirSync(path.join(archiveDir, 'documents'));
      fs.mkdirSync(path.join(archiveDir, 'skills'));
      fs.mkdirSync(path.join(archiveDir, 'workflows'));
      fs.mkdirSync(path.join(archiveDir, 'implementations'));
      fs.mkdirSync(path.join(archiveDir, 'metadata'));
    }
    
    return archiveDir;
  }
  
  private generateArchiveFileName(filePath: string): string {
    const originalName = path.basename(filePath, path.extname(filePath));
    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').split('.')[0];
    const version = this.getCurrentVersion(filePath);
    
    return `${originalName}-v${version}-${timestamp}.md`;
  }
  
  private getCategory(filePath: string): string {
    if (filePath.includes('.codex/')) {
      if (filePath.includes('skills/')) return 'skills';
      if (filePath.includes('workflows/')) return 'workflows';
      if (filePath.includes('core/')) return 'implementations';
      return 'documents';
    }
    
    return 'other';
  }
}
```

---

## 📊 **归档元数据**

### 📋 **元数据结构**
```typescript
interface ArchiveMetadata {
  // 基本信息
  basic: {
    originalPath: string;
    archivePath: string;
    timestamp: string;
    version: string;
    author: string;
  };
  
  // 变更信息
  changes: {
    changeType: 'major' | 'minor' | 'patch';
    changeDescription: string;
    addedLines: number;
    deletedLines: number;
    modifiedLines: number;
  };
  
  // 上下文信息
  context: {
    relatedFiles: string[];
    dependencies: string[];
    milestones: string[];
    tags: string[];
  };
  
  // 质量信息
  quality: {
    testCoverage: number;
    lintScore: number;
    documentationScore: number;
    complianceScore: number;
  };
}

interface ArchiveManifest {
  manifest: {
    version: string;
    createdAt: string;
    totalArchives: number;
    categories: string[];
  };
  
  archives: ArchiveEntry[];
  
  index: {
    byDate: Record<string, ArchiveEntry[]>;
    byCategory: Record<string, ArchiveEntry[]>;
   ByVersion: Record<string, ArchiveEntry[]>;
    byAuthor: Record<string, ArchiveEntry[]>;
  };
}
```

### 🔄 **元数据生成器**
```typescript
class MetadataGenerator {
  async generateMetadata(filePath: string, changes: ChangeInfo): Promise<ArchiveMetadata> {
    return {
      basic: {
        originalPath: filePath,
        archivePath: '', // 将在归档执行时填充
        timestamp: new Date().toISOString(),
        version: await this.getNextVersion(filePath),
        author: await this.getCurrentAuthor()
      },
      changes: {
        changeType: this.determineChangeType(changes),
        changeDescription: this.generateChangeDescription(changes),
        addedLines: changes.additions,
        deletedLines: changes.deletions,
        modifiedLines: changes.modifications
      },
      context: {
        relatedFiles: await this.findRelatedFiles(filePath),
        dependencies: await this.findDependencies(filePath),
        milestones: await this.findMilestones(filePath),
        tags: await this.extractTags(filePath)
      },
      quality: {
        testCoverage: await this.calculateTestCoverage(filePath),
        lintScore: await this.calculateLintScore(filePath),
        documentationScore: await this.calculateDocumentationScore(filePath),
        complianceScore: await this.calculateComplianceScore(filePath)
      }
    };
  }
  
  private determineChangeType(changes: ChangeInfo): 'major' | 'minor' | 'patch' {
    const totalChanges = changes.additions + changes.deletions + changes.modifications;
    
    if (totalChanges > 100) return 'major';
    if (totalChanges > 20) return 'minor';
    return 'patch';
  }
  
  private generateChangeDescription(changes: ChangeInfo): string {
    const actions = [];
    if (changes.additions > 0) actions.push(`added ${changes.additions} lines`);
    if (changes.deletions > 0) actions.push(`deleted ${changes.deletions} lines`);
    if (changes.modifications > 0) actions.push(`modified ${changes.modifications} lines`);
    
    return `Changes: ${actions.join(', ')}`;
  }
}
```

---

## 🔧 **归档管理命令**

### 📋 **归档命令**
```bash
# 手动触发归档
npm run archive:create --file "path/to/file.md"

# 批量归档
npm run archive:batch --directory ".codex/"

# 查看归档状态
npm run archive:status

# 搜索归档
npm run archive:search --query "HARNESS.md"

# 恢复归档
npm run archive:restore --archive "path/to/archive.md" --target "path/to/target.md"

# 清理旧归档
npm run archive:cleanup --older-than "30days"
```

### 📊 **归档报告**
```json
{
  "timestamp": "2026-03-13T14:30:22Z",
  "status": "completed",
  "archives": [
    {
      "originalPath": ".codex/HARNESS.md",
      "archivePath": "openspec/changes/archive/2026-03-13/documents/HARNESS.md-v2.1-20260313143022.md",
      "version": "2.1",
      "changeType": "minor",
      "changes": {
        "addedLines": 25,
        "deletedLines": 8,
        "modifiedLines": 12
      },
      "quality": {
        "testCoverage": 85,
        "lintScore": 92,
        "documentationScore": 88,
        "complianceScore": 95
      }
    }
  ],
  "summary": {
    "totalArchived": 1,
    "categories": ["documents"],
    "averageQuality": 90
  }
}
```

---

## 🔄 **自动化集成**

### 📋 **Git Hook 集成**
```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🔍 检查是否需要归档..."

# 检查变更的文件
changed_files=$(git diff --cached --name-only)

for file in $changed_files; do
  if [[ $file == .codex/** ]]; then
    echo "📁 检测到 .codex 文件变更: $file"
    
    # 触发归档检查
    npm run archive:check --file "$file"
    
    if [ $? -eq 0 ]; then
      echo "📦 创建归档..."
      npm run archive:create --file "$file"
    fi
  fi
done

echo "✅ 归档检查完成"
```

### 📊 **CI/CD 集成**
```yaml
# .github/workflows/archive.yml
name: Auto Archive

on:
  push:
    paths:
      - '.codex/**'
  pull_request:
    paths:
      - '.codex/**'

jobs:
  archive:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Check for archive needs
        run: npm run archive:check-all
        
      - name: Create archives
        run: npm run archive:batch --directory ".codex/"
        
      - name: Update archive index
        run: npm run archive:update-index
```

---

## 📚 **归档使用指南**

### 📋 **手动归档**
```typescript
// 当完成重要变更时
const archiveResult = await archiveManager.createArchive('.codex/HARNESS.md', {
  changeType: 'major',
  changeDescription: 'Added strict architecture boundaries',
  milestones: ['architecture-v2-complete'],
  tags: ['architecture', 'harness', 'boundaries']
});

console.log(`归档完成: ${archiveResult.archivePath}`);
```

### 🔄 **批量归档**
```typescript
// 项目里程碑完成时
const milestoneArchives = await archiveManager.batchArchive('.codex/', {
  milestone: 'harness-engineering-v2-complete',
  description: 'Complete implementation of Harness Engineering v2',
  version: '2.0.0'
});

console.log(`批量归档完成: ${milestoneArchives.length} 个文件`);
```

### 🔍 **归档搜索**
```typescript
// 查找特定版本的归档
const archives = await archiveManager.searchArchives({
  query: 'HARNESS.md',
  version: '2.1',
  dateRange: {
    start: '2026-03-01',
    end: '2026-03-31'
  }
});

console.log(`找到 ${archives.length} 个归档文件`);
```

---

## 📚 **相关文档**

- [HARNESS.md](../HARNESS.md) - 项目约束宪法
- [AGENTS.md](../AGENTS.md) - AI Agent 指南
- [workflows/router.md](../workflows/router.md) - 工作流程路由
- [agent-discovery-system.md](./agent-discovery-system.md) - Agent 发现系统

---

## 🎊 **总结**

归档管理系统提供了完整的自动化归档和版本控制能力，确保：

- **📁 自动归档**: 变更完成后的自动归档机制
- **🔄 版本控制**: 完整的版本追踪和历史管理
- **📊 元数据管理**: 丰富的归档元数据和上下文信息
- **🔍 智能搜索**: 强大的归档搜索和检索能力
- **🚀 自动化集成**: Git Hook 和 CI/CD 集成

这个系统使得 `.codex` 的所有变更都能够得到妥善的版本控制和历史追踪，确保项目的可追溯性和可维护性。

---

*最后更新: 2026-03-13*  
*验证状态: ⏳ 待验证*  
*下次审查: 2026-03-20*
