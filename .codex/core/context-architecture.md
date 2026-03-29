# 📊 上下文架构 (Context Architecture)

> **基于 OpenAI Harness Engineering 的上下文管理策略**  
> 实现 Smart Zone 优化和渐进式披露机制

---

## 📋 **概述**

本文档定义了项目的上下文架构，基于 OpenAI Harness Engineering 的最佳实践，确保 Agent 在大型和复杂任务中高效工作，避免上下文窗口利用率下降的问题。

---

## 🎯 **核心原则**

### 📊 **上下文窗口利用率**
```
Smart Zone (前 40%): 聚焦、准确的推理
├── Agent 拥有相关、精炼的信息
├── 上下文清晰，推理质量高

Dumb Zone (超过 40%): 幻觉、循环、格式错误
├── 上下文过多，推理质量下降
├── 更多 token 反而损害性能
```

### 🔍 **渐进式披露**
- **分层加载**: 根据需要逐步加载上下文
- **最小化噪音**: 避免无关信息干扰
- **按需加载**: 只加载任务相关的上下文
- **智能压缩**: 定期压缩和优化上下文

---

## 🏗️ **三层上下文体系**

### 📋 **Tier 1: 热记忆 (Hot Memory)**
```typescript
interface HotMemory {
  // 每次会话自动加载
  agents: {
    currentAgent: string;
    activeMode: 'quick' | 'bmm';
    permissions: AgentPermissions;
  }
  
  // 项目结构概览
  projectStructure: {
    root: string;
    directories: string[];
    keyFiles: string[];
  }
  
  // 当前任务状态
  currentTask: {
    id: string;
    type: string;
    status: 'active' | 'completed' | 'failed';
    context: TaskContext;
  }
}
```

### 📋 **Tier 2: 领域专家 (Domain Experts)**
```typescript
interface DomainExpert {
  // 专业化 Agent 上下文
  agentType: 'research' | 'planning' | 'execution' | 'review';
  
  // 领域知识
  domainKnowledge: {
    patterns: Pattern[];
    bestPractices: BestPractice[];
    commonPitfalls: Pitfall[];
  }
  
  // 工具权限
  tools: ToolPermissions;
  
  // 历史上下文
  recentWork: WorkItem[];
  lessons: Lesson[];
}
```

### 📋 **Tier 3: 冷记忆知识库 (Cold-Memory Knowledge)**
```typescript
interface ColdMemoryKnowledge {
  // 研究文档
  researchDocs: Documentation[];
  
  // 规格说明
  specifications: Specification[];
  
  // 历史会话
  historicalChats: ChatHistory[];
  
  // 架构文档
  architectureDocs: ArchitectureDocument[];
  
  // 最佳实践
  bestPractices: BestPractice[];
}
```

---

## 🔍 **上下文加载策略**

### 📋 **加载时机**
```typescript
interface ContextLoadingStrategy {
  // Tier 1: 会话开始时自动加载
  hotMemory: {
    timing: 'session_start';
    priority: 'high';
    size: 'minimal';
  }
  
  // Tier 2: 特定 Agent 被调用时
  domainExpert: {
    timing: 'agent_activation';
    priority: 'medium';
    size: 'focused';
  }
  
  // Tier 3: Agent 主动查询时
  coldMemory: {
    timing: 'on_demand';
    priority: 'low';
    size: 'as_needed';
  }
}
```

### 📝 **加载规则**
```typescript
class ContextManager {
  async loadContext(contextType: 'hot' | 'domain' | 'cold'): Promise<Context> {
    switch (contextType) {
      case 'hot':
        return this.loadHotMemory();
      case 'domain':
        return this.loadDomainExpert();
      case 'cold':
        return this.loadColdMemory();
    }
  }
  
  async loadHotMemory(): Promise<HotMemory> {
    // 加载最小化的热记忆
    return {
      agents: this.getCurrentAgentInfo(),
      projectStructure: this.getProjectStructure(),
      currentTask: this.getCurrentTask()
    };
  }
  
  async loadDomainExpert(): Promise<DomainExpert> {
    // 根据当前 Agent 类型加载领域专家上下文
    const agentType = this.getCurrentAgentType();
    return this.getDomainExpert(agentType);
  }
  
  async loadColdMemory(query: string): Promise<ColdMemoryKnowledge> {
    // 根据查询需求加载冷记忆知识库
    return this.searchColdMemory(query);
  }
}
```

---

## 🎯 **上下文优化机制**

### 📊 **上下文压缩**
```typescript
interface ContextCompactor {
  // 压缩策略
  compactContext: (context: Context) => Promise<CompactContext>;
  
  // 压缩规则
  compressionRules: {
    removeIrrelevant: boolean;
    mergeDuplicates: boolean;
    prioritizeRecent: boolean;
    limitSize: number;
  };
  
  // 智能压缩
  smartCompact: (context: Context) => Promise<CompactContext>;
}
```

### 🔄 **上下文刷新**
```typescript
class ContextRefresher {
  async refreshContext(reason: 'task_complete' | 'context_overflow' | 'periodic'): Promise<void> {
    switch (reason) {
      case 'task_complete':
        await this.compactContext();
        break;
      case 'context_overflow':
        await this.emergencyCompact();
        break;
      case 'periodic':
        await this.maintenanceCompact();
        break;
    }
  }
  
  private async compactContext(): Promise<void> {
    // 定期压缩上下文
    const context = this.getCurrentContext();
    const compacted = await this.compactor.compactContext(context);
    this.updateContext(compacted);
  }
}
```

### 📈 **上下文监控**
```typescript
interface ContextMonitor {
  // 上下文利用率监控
  monitorUtilization(): Promise<ContextMetrics>;
  
  // Smart Zone 检测
  detectSmartZone(context: Context): boolean;
  
  // Dumb Zone 警告
  warnDumbZone(): void;
  
  // 压缩建议
  suggestCompaction(): CompactionSuggestion[];
}
```

---

## 🤖 **Agent 上下文管理**

### 📋 **Agent 上下文接口**
```typescript
interface AgentContext {
  // 当前 Agent 信息
  agent: {
    id: string;
    type: AgentType;
    permissions: AgentPermissions;
    capabilities: AgentCapabilities;
  };
  
  // 当前任务信息
  task: {
    id: string;
    type: string;
    requirements: string[];
    constraints: string[];
    deliverables: string[];
  };
  
  // 项目上下文
  project: {
    structure: ProjectStructure;
    architecture: ArchitectureInfo;
    standards: ProjectStandards;
  };
  
  // 领域上下文
  domain: {
    knowledge: DomainKnowledge;
    patterns: Pattern[];
    bestPractices: BestPractice[];
  };
}
```

### 🔄 **上下文更新机制**
```typescript
class AgentContextManager {
  async updateContext(update: ContextUpdate): Promise<void> {
    switch (update.type) {
      case 'task_start':
        await this.updateTaskContext(update.taskInfo);
        break;
      case 'agent_activation':
        await this.updateAgentContext(update.agentInfo);
        break;
      case 'project_change':
        await this.updateProjectContext(update.projectInfo);
        break;
      case 'domain_knowledge':
        await this.updateDomainContext(update.domainInfo);
        break;
    }
  }
  
  async getContext(agentId: string): Promise<AgentContext> {
    const agent = await this.getAgent(agentId);
    const context = await this.buildContext(agent);
    return context;
  }
}
```

---

## 📊 **上下文验证**

### 🔍 **上下文质量检查**
```typescript
interface ContextValidator {
  // 上下文质量检查
  validateContext(context: Context): ValidationResult;
  
  // Smart Zone 检查
  checkSmartZone(context: Context): SmartZoneResult;
  
  // 上下文完整性检查
  checkCompleteness(context: Context): CompletenessResult;
  
  // 上下文一致性检查
  checkConsistency(context: Context): ConsistencyResult;
}
```

### 📋 **验证规则**
```typescript
class ContextValidationRules {
  // 上下文大小检查
  validateSize(context: Context): boolean {
    const size = this.calculateContextSize(context);
    return size <= this.getMaxContextSize();
  }
  
  // 上下文相关性检查
  validateRelevance(context: Context): boolean {
    const relevance = this.calculateRelevance(context);
    return relevance >= this.getMinRelevance();
  }
  
  // 上下文新鲜度检查
  validateFreshness(context: Context): boolean {
    const age = this.getContextAge(context);
    return age <= this.getMaxAge();
  }
}
```

---

## 🔧 **工具和实现**

### 📋 **上下文管理器**
```typescript
class ContextManager {
  private hotMemory: HotMemory;
  private domainExperts: Map<string, DomainExpert>;
  private coldMemory: ColdMemoryKnowledge;
  private compactor: ContextCompactor;
  private monitor: ContextMonitor;
  
  constructor() {
    this.hotMemory = new HotMemory();
    this.domainExperts = new Map();
    this.coldMemory = new ColdMemoryKnowledge();
    this.compactor = new ContextCompactor();
    this.monitor = new ContextMonitor();
  }
  
  async getContext(agentId: string, contextType?: string): Promise<Context> {
    // 根据需要获取上下文
    const type = contextType || this.determineContextType(agentId);
    return this.loadContext(type);
  }
  
  async updateContext(agentId: string, update: ContextUpdate): Promise<void> {
    // 更新上下文
    const context = await this.getContext(agentId);
    const updatedContext = this.applyUpdate(context, update);
    await this.saveContext(updatedContext);
  }
}
```

### 🔍 **上下文压缩器**
```typescript
class ContextCompactor {
  async compactContext(context: Context): Promise<CompactContext> {
    // 移除无关信息
    const relevant = this.removeIrrelevant(context);
    
    // 合并重复信息
    const deduplicated = this.mergeDuplicates(relevant);
    
    // 优先处理最近信息
    const prioritized = this.prioritizeRecent(deduplicated);
    
    // 限制大小
    const sized = this.limitSize(prioritized);
    
    return sized;
  }
  
  private removeIrrelevant(context: Context): Context {
    // 移除与当前任务无关的信息
    const currentTask = context.task;
    return {
      ...context,
      domain: this.filterDomainKnowledge(context.domain, currentTask),
      coldMemory: this.filterColdMemory(context.coldMemory, currentTask)
    };
  }
}
```

### 📈 **上下文监控器**
```typescript
class ContextMonitor {
  private metrics: ContextMetrics;
  
  monitorUtilization(): ContextMetrics {
    const currentContext = this.getCurrentContext();
    const utilization = this.calculateUtilization(currentContext);
    
    this.updateMetrics(utilization);
    
    // 检查是否进入 Dumb Zone
    if (utilization.utilizationRate > 0.4) {
      this.warnDumbZone();
    }
    
    return utilization;
  }
  
  detectSmartZone(context: boolean {
    const utilization = this.calculateUtilization(context);
    return utilization.utilizationRate <= 0.4;
  }
  
  warnDumbZone(): void {
    console.warn('⚠️ Context entering Dumb Zone - consider compacting');
    this.logContextMetrics();
  }
}
```

---

## 📚 **验证命令**

### 🔍 **上下文验证命令**
```bash
# 运行上下文架构验证
npm run context:validate

# 检查上下文利用率
npm run context:monitor

# 压缩上下文
npm run context:compact

# 检查 Smart Zone
npm run context:check-smart-zone
```

### 📋 **验证报告**
```json
{
  "timestamp": "2026-03-13T10:30:00Z",
  "status": "passed",
  "metrics": {
    "contextSize": {
      "total": 45000,
      "utilization": 0.35,
      "status": "smart-zone"
    },
    "layers": {
      "hotMemory": {
        "size": 5000,
        "utilization": 0.8,
        "status": "optimal"
      },
      "domainExpert": {
        "size": 15000,
        "utilization": 0.3,
        "status": "optimal"
      },
      "coldMemory": {
        "size": 25000,
        "utilization": 0.2,
        "status": "optimal"
      }
    },
    "quality": {
      "relevance": 0.85,
      "freshness": 0.92,
      "completeness": 0.88
    }
  }
}
```

---

## 🔄 **持续改进**

### 📋 **优化策略**
```typescript
interface OptimizationStrategy {
  // 定期压缩
  periodicCompaction: {
    interval: '1hour';
    trigger: 'size_threshold';
    targetSize: 0.8;
  };
  
  // 智能压缩
  smartCompaction: {
    trigger: 'utilization_threshold';
    targetUtilization: 0.4;
  };
  
  // 质量监控
  qualityMonitoring: {
    metrics: ['relevance', 'freshness', 'completeness'];
    thresholds: {
      relevance: 0.8,
      freshness: 0.9,
      completeness: 0.85
    };
  };
}
```

### 📊 **学习机制**
```typescript
class ContextOptimizer {
  private optimizationHistory: OptimizationHistory[];
  
  async optimizeContext(context: Context): Promise<OptimizationResult> {
    // 分析当前上下文
    const analysis = this.analyzeContext(context);
    
    // 生成优化建议
    const suggestions = this.generateSuggestions(analysis);
    
    // 应用优化
    const optimized = this.applyOptimizations(context, suggestions);
    
    // 记录优化历史
    this.recordOptimization(analysis, suggestions, optimized);
    
    return {
      original: context,
      optimized,
      improvements: suggestions,
      metrics: this.calculateImprovements(context, optimized)
    };
  }
}
```

---

## 📚 **相关文档**

- [HARNESS.md](../HARNESS.md) - 项目约束宪法
- [AGENTS.md](../AGENTS.md) - AI Agent 指南
- [strict-architecture-boundaries.md](./strict-architecture-boundaries.md) - 严格架构边界
- [agent-specialization.md](./agent-specialization.md) - Agent 专业化策略
- [taste-invariants.md](./taste-invariants.md) - 品味不变式

---

## 🎊 **总结**

上下文架构是 Harness Engineering 的关键要素，它通过智能的上下文管理和优化，确保 Agent 在大型和复杂任务中保持高效工作。通过三层上下文体系和渐进式披露机制，我们可以实现：

- **更高的推理质量**: 通过 Smart Zone 优化避免上下文噪音
- **更好的可扩展性**: 支持大型项目和复杂任务
- **更强的适应性**: 根据任务需求动态调整上下文
- **更高的效率**: 减少上下文加载时间和 token 使用

---

*最后更新: 2026-03-13*  
*验证状态: ⏳ 待验证*  
*下次审查: 2026-03-20*
