# 🔬 深度可观测性

> **基于 OpenAI Harness Engineering 的深度可观测性实现**  
> Chrome DevTools 集成、临时实例管理和查询语言支持

---

## 📋 **概述**

本文档定义了项目的深度可观测性实现，基于 OpenAI Harness Engineering 的最佳实践，为 Agent 提供完整的可观测性堆栈，包括 Chrome DevTools 集成、临时实例管理和 LogQL/PromQL 查询支持。

---

## 🎯 **核心原则**

### 📊 **可观测性目标**
- **Agent 可读性**: 应用程序的 UI、日志和指标对 Agent 直接可读
- **实时监控**: 实时监控应用程序状态和性能
- **故障诊断**: 快速诊断和修复问题
- **性能优化**: 基于数据驱动的性能优化

### 🔍 **可观测性堆栈**
```
应用程序 → Vector → 可观测性堆栈
├── Victoria Logs (日志)
├── Victoria Metrics (指标)
├── Victoria Traces (追踪)
└── LogQL/PromQL/TraceQL API
```

---

## 🌐 **Chrome DevTools 集成**

### 📋 **集成架构**
```typescript
interface ChromeDevToolsIntegration {
  // DevTools 协议
  devToolsProtocol: {
    target: Target;
    client: CDPSession;
    commands: DevToolsCommands;
  };
  
  // UI 驱动能力
  uiCapabilities: {
    screenshot: boolean;
    navigation: boolean;
    domAccess: boolean;
    eventListening: boolean;
  };
  
  // 验证能力
  validationCapabilities: {
    visualRegression: boolean;
    functionalTesting: boolean;
    performanceTesting: boolean;
  };
}
```

### 🔧 **DevTools 连接器**
```typescript
class ChromeDevToolsConnector {
  private target: Target;
  private client: CDPSession;
  private capabilities: DevToolsCapabilities;
  
  constructor() {
    this.target = new Target();
    this.client = new CDPSession(this.target);
    this.capabilities = new DevToolsCapabilities();
  }
  
  async connect(): Promise<void> {
    await this.target.connect();
    await this.client.attach();
    await this.enableDomains();
  }
  
  async enableDomains(): Promise<void> {
    await Promise.all([
      this.client.send('Page.enable'),
      this.client.send('Runtime.enable'),
      this.client.send('Network.enable'),
      this.client.send('DOM.enable'),
      this.client.send('Log.enable')
    ]);
  }
}
```

### 📸 **截图和快照**
```typescript
interface ScreenshotCapabilities {
  // 截图功能
  takeScreenshot: (options?: ScreenshotOptions) => Promise<Screenshot>;
  
  // DOM 快照
  takeDOMSnapshot: () => Promise<DOMSnapshot>;
  
  // 状态快照
  takeStateSnapshot: () => Promise<StateSnapshot>;
  
  // 性能快照
  takePerformanceSnapshot: () => Promise<PerformanceSnapshot>;
}

class ScreenshotManager {
  async takeScreenshot(options?: ScreenshotOptions): Promise<Screenshot> {
    const screenshot = await this.devTools.send('Page.captureScreenshot', {
      format: options?.format || 'png',
      quality: options?.quality || 80,
      clip: options?.clip
    });
    
    return {
      data: screenshot.data,
      timestamp: new Date().toISOString(),
      metadata: {
        width: screenshot.width,
        height: screenshot.height,
        devicePixelRatio: screenshot.devicePixelRatio
      }
    };
  }
  
  async takeDOMSnapshot(): Promise<DOMSnapshot> {
    const document = await this.devTools.send('DOM.getDocument');
    const snapshot = await this.devTools.send('DOM.getOuterHTML', {
      nodeId: document.root.nodeId
    });
    
    return {
      html: snapshot.outerHTML,
      timestamp: new Date().toISOString(),
      structure: this.parseDOMStructure(document)
    };
  }
}
```

### 🧭 **导航和交互**
```typescript
interface NavigationCapabilities {
  // 页面导航
  navigateTo: (url: string) => Promise<NavigationResult>;
  
  // 元素交互
  clickElement: (selector: string) => Promise<void>;
  typeText: (selector: string, text: string) => Promise<void>;
  
  // 表单交互
  fillForm: (formData: FormData) => Promise<void>;
  
  // 等待条件
  waitForElement: (selector: string, timeout?: number) => Promise<void>;
  waitForNavigation: (timeout?: number) => Promise<void>;
}

class NavigationManager {
  async navigateTo(url: string): Promise<NavigationResult> {
    const result = await this.devTools.send('Page.navigate', { url });
    
    return {
      success: result.success,
      errorText: result.errorText,
      timestamp: new Date().toISOString()
    };
  }
  
  async clickElement(selector: string): Promise<void> {
    const nodeId = await this.findNode(selector);
    await this.devTools.send('DOM.setAttributeValue', {
      nodeId,
      name: 'data-test-clicked',
      value: 'true'
    });
    
    await this.devTools.send('DOM.resolveNode', { nodeId });
    await this.devTools.send('Runtime.evaluate', {
      expression: `document.querySelector('${selector}').click()`
    });
  }
  
  async waitForElement(selector: string, timeout = 5000): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const element = await this.devTools.send('Runtime.evaluate', {
        expression: `document.querySelector('${selector}')`
      });
      
      if (element.result.value) {
        return;
      }
      
      await this.sleep(100);
    }
    
    throw new Error(`Element ${selector} not found within ${timeout}ms`);
  }
}
```

---

## 🔄 **临时实例管理**

### 📋 **Git Worktree 管理**
```typescript
interface TempInstanceManager {
  // 实例创建
  createInstance: (baseBranch: string, taskName: string) => Promise<TempInstance>;
  
  // 实例管理
  startInstance: (instance: TempInstance) => Promise<void>;
  stopInstance: (instance: TempInstance) => Promise<void>;
  
  // 清理管理
  cleanupInstance: (instance: TempInstance) => Promise<void>;
  
  // 实例状态
  getInstanceStatus: (instance: TempInstance) => Promise<InstanceStatus>;
}

class GitWorktreeManager implements TempInstanceManager {
  async createInstance(baseBranch: string, taskName: string): Promise<TempInstance> {
    const worktreeName = `temp-${taskName}-${Date.now()}`;
    const worktreePath = path.join(process.cwd(), worktreeName);
    
    // 创建 git worktree
    await this.execCommand(`git worktree add ${worktreePath} ${baseBranch}`);
    
    // 安装依赖
    await this.installDependencies(worktreePath);
    
    // 启动应用
    await this.startApplication(worktreePath);
    
    return {
      id: worktreeName,
      path: worktreePath,
      baseBranch,
      taskName,
      createdAt: new Date().toISOString(),
      status: 'running'
    };
  }
  
  async stopInstance(instance: TempInstance): Promise<void> {
    // 停止应用
    await this.stopApplication(instance.path);
    
    // 清理端口
    await this.cleanupPorts(instance.path);
    
    instance.status = 'stopped';
  }
  
  async cleanupInstance(instance: TempInstance): Promise<void> {
    // 确保实例已停止
    if (instance.status === 'running') {
      await this.stopInstance(instance);
    }
    
    // 删除 worktree
    await this.execCommand(`git worktree remove ${instance.path}`);
    
    // 删除目录
    await this.removeDirectory(instance.path);
  }
}
```

### 🚀 **应用启动管理**
```typescript
interface ApplicationManager {
  // 启动应用
  startApplication: (instancePath: string) => Promise<ApplicationInstance>;
  
  // 停止应用
  stopApplication: (instance: ApplicationInstance) => Promise<void>;
  
  // 健康检查
  healthCheck: (instance: ApplicationInstance) => Promise<HealthStatus>;
  
  // 端口管理
  allocatePort: (instance: ApplicationInstance) => Promise<number>;
  releasePort: (port: number) => Promise<void>;
}

class ApplicationManagerImpl implements ApplicationManager {
  async startApplication(instancePath: string): Promise<ApplicationInstance> {
    const port = await this.allocatePort();
    const instance: ApplicationInstance = {
      path: instancePath,
      port,
      pid: null,
      status: 'starting',
      startTime: new Date().toISOString()
    };
    
    // 启动开发服务器
    const { pid } = spawn('npm', ['run', 'dev', '--', '--port', port.toString()], {
      cwd: instancePath,
      detached: true
    });
    
    instance.pid = pid;
    instance.status = 'running';
    
    // 等待应用启动
    await this.waitForApplication(instance);
    
    return instance;
  }
  
  async stopApplication(instance: ApplicationInstance): Promise<void> {
    if (instance.pid) {
      process.kill(instance.pid, 'SIGTERM');
      instance.status = 'stopped';
    }
    
    await this.releasePort(instance.port);
  }
  
  async healthCheck(instance: ApplicationInstance): Promise<HealthStatus> {
    try {
      const response = await fetch(`http://localhost:${instance.port}/health`);
      const health = await response.json();
      
      return {
        status: 'healthy',
        uptime: health.uptime,
        memory: health.memory,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}
```

---

## 📊 **日志和指标管理**

### 📋 **日志收集**
```typescript
interface LogCollector {
  // 日志收集
  collectLogs: (instance: ApplicationInstance) => Promise<LogEntry[]>;
  
  // 日志查询
  queryLogs: (query: LogQuery) => Promise<LogEntry[]>;
  
  // 日志过滤
  filterLogs: (filters: LogFilters) => Promise<LogEntry[]>;
  
  // 日志聚合
  aggregateLogs: (aggregation: LogAggregation) => Promise<LogAggregationResult>;
}

class VectorLogCollector implements LogCollector {
  async collectLogs(instance: ApplicationInstance): Promise<LogEntry[]> {
    // 从 Vector 收集日志
    const logs = await this.queryVectorLogs({
      instance: instance.id,
      timeRange: {
        start: instance.startTime,
        end: new Date().toISOString()
      }
    });
    
    return logs.map(log => ({
      timestamp: log.timestamp,
      level: log.level,
      message: log.message,
      metadata: log.metadata,
      instance: instance.id
    }));
  }
  
  async queryLogs(query: LogQuery): Promise<LogEntry[]> {
    const vectorQuery = this.convertToVectorQuery(query);
    const response = await this.vectorClient.query(vectorQuery);
    
    return response.records.map(record => this.parseLogRecord(record));
  }
}
```

### 📈 **指标收集**
```typescript
interface MetricsCollector {
  // 指标收集
  collectMetrics: (instance: ApplicationInstance) => Promise<MetricEntry[]>;
  
  // 指标查询
  queryMetrics: (query: MetricsQuery) => Promise<MetricEntry[]>;
  
  // 指标聚合
  aggregateMetrics: (aggregation: MetricsAggregation) => Promise<MetricsAggregationResult>;
  
  // 指标告警
  checkAlerts: (rules: AlertRule[]) => Promise<Alert[]>;
}

class VictoriaMetricsCollector implements MetricsCollector {
  async collectMetrics(instance: ApplicationInstance): Promise<MetricEntry[]> {
    // 从 Victoria Metrics 收集指标
    const metrics = await this.queryVictoriaMetrics({
      instance: instance.id,
      timeRange: {
        start: instance.startTime,
        end: new Date().toISOString()
      }
    });
    
    return metrics.map(metric => ({
      timestamp: metric.timestamp,
      name: metric.name,
      value: metric.value,
      labels: metric.labels,
      instance: instance.id
    }));
  }
  
  async queryMetrics(query: MetricsQuery): Promise<MetricEntry[]> {
    const promqlQuery = this.convertToPromQL(query);
    const response = await this.victoriaClient.query(promqlQuery);
    
    return response.data.result.map(result => this.parseMetricResult(result));
  }
}
```

### 🔍 **追踪收集**
```typescript
interface TraceCollector {
  // 追踪收集
  collectTraces: (instance: ApplicationInstance) => Promise<TraceEntry[]>;
  
  // 追踪查询
  queryTraces: (query: TraceQuery) => Promise<TraceEntry[]>;
  
  // 追踪分析
  analyzeTraces: (traces: TraceEntry[]) => Promise<TraceAnalysis>;
  
  // 性能分析
  analyzePerformance: (traces: TraceEntry[]) => Promise<PerformanceAnalysis>;
}

class VictoriaTraceCollector implements TraceCollector {
  async collectTraces(instance: ApplicationInstance): Promise<TraceEntry[]> {
    // 从 Victoria Traces 收集追踪
    const traces = await this.queryVictoriaTraces({
      instance: instance.id,
      timeRange: {
        start: instance.startTime,
        end: new Date().toISOString()
      }
    });
    
    return traces.map(trace => ({
      traceId: trace.traceID,
      spanId: trace.spanID,
      operationName: trace.operationName,
      startTime: trace.startTime,
      duration: trace.duration,
      tags: trace.tags,
      instance: instance.id
    }));
  }
  
  async queryTraces(query: TraceQuery): Promise<TraceEntry[]> {
    const traceqlQuery = this.convertToTraceQL(query);
    const response = await this.victoriaClient.query(traceqlQuery);
    
    return response.traces.map(trace => this.parseTraceResult(trace));
  }
}
```

---

## 🔍 **查询语言支持**

### 📋 **LogQL 查询**
```typescript
interface LogQLQuery {
  // 基础查询
  basicQuery: (filter: string) => string;
  
  // 聚合查询
  aggregationQuery: (aggregation: LogAggregation) => string;
  
  // 时间范围查询
  timeRangeQuery: (timeRange: TimeRange) => string;
  
  // 实例查询
  instanceQuery: (instanceId: string) => string;
}

class LogQLQueryBuilder implements LogQLQuery {
  basicQuery(filter: string): string {
    return `{${filter}}`;
  }
  
  aggregationQuery(aggregation: LogAggregation): string {
    const { operation, field, filter } = aggregation;
    return `${operation} by (${field}) ({${filter}})`;
  }
  
  timeRangeQuery(timeRange: TimeRange): string {
    const { start, end } = timeRange;
    return `_time >= ${start} and _time <= ${end}`;
  }
  
  instanceQuery(instanceId: string): string {
    return `{instance="${instanceId}"}`;
  }
}
```

### 📈 **PromQL 查询**
```typescript
interface PromQLQuery {
  // 基础查询
  basicQuery: (metric: string, labels?: Record<string, string>) => string;
  
  // 聚合查询
  aggregationQuery: (aggregation: MetricsAggregation) => string;
  
  // 范围查询
  rangeQuery: (metric: string, timeRange: TimeRange) => string;
  
  // 实例查询
  instanceQuery: (instanceId: string) => string;
}

class PromQLQueryBuilder implements PromQLQuery {
  basicQuery(metric: string, labels?: Record<string, string>): string {
    if (!labels) return metric;
    
    const labelPairs = Object.entries(labels)
      .map(([key, value]) => `${key}="${value}"`)
      .join(',');
    
    return `${metric}{${labelPairs}}`;
  }
  
  aggregationQuery(aggregation: MetricsAggregation): string {
    const { operation, metric, by, filter } = aggregation;
    let query = `${operation}(${metric}`;
    
    if (by) {
      query += ` by (${by.join(',')})`;
    }
    
    if (filter) {
      query += `{${filter}}`;
    }
    
    return query;
  }
  
  rangeQuery(metric: string, timeRange: TimeRange): string {
    const { start, end, step } = timeRange;
    return `${metric}[${start}:${end}:${step ? step : '1m'}]`;
  }
  
  instanceQuery(instanceId: string): string {
    return `{instance="${instanceId}"}`;
  }
}
```

### 🔍 **TraceQL 查询**
```typescript
interface TraceQLQuery {
  // 基础查询
  basicQuery: (filter: string) => string;
  
  // 操作查询
  operationQuery: (operation: string) => string;
  
  // 时间范围查询
  timeRangeQuery: (timeRange: TimeRange) => string;
  
  // 实例查询
  instanceQuery: (instanceId: string) => string;
}

class TraceQLQueryBuilder implements TraceQLQuery {
  basicQuery(filter: string): string {
    return `{${filter}}`;
  }
  
  operationQuery(operation: string): string {
    return `{operation="${operation}"}`;
  }
  
  timeRangeQuery(timeRange: TimeRange): string {
    const { start, end } = timeRange;
    return `_start >= ${start} and _end <= ${end}`;
  }
  
  instanceQuery(instanceId: string): string {
    return `{instance="${instanceId}"`;
  }
}
```

---

## 🔧 **验证和测试**

### 📋 **可观测性验证**
```typescript
interface ObservabilityValidator {
  // 基础验证
  validateBasicSetup: () => Promise<ValidationResult>;
  
  // 集成验证
  validateIntegration: () => Promise<ValidationResult>;
  
  // 性能验证
  validatePerformance: () => Promise<PerformanceValidationResult>;
  
  // 功能验证
  validateFunctionality: () => Promise<FunctionalityValidationResult>;
}

class ObservabilityValidatorImpl implements ObservabilityValidator {
  async validateBasicSetup(): Promise<ValidationResult> {
    const results = await Promise.all([
      this.validateVector(),
      this.validateVictoriaMetrics(),
      this.validateVictoriaTraces(),
      this.validateChromeDevTools()
    ]);
    
    return {
      overall: results.every(r => r.success),
      results,
      timestamp: new Date().toISOString()
    };
  }
  
  async validateIntegration(): Promise<ValidationResult> {
    // 创建临时实例
    const instance = await this.createTempInstance();
    
    try {
      // 启动应用
      await this.startApplication(instance);
      
      // 验证日志收集
      const logs = await this.collectLogs(instance);
      
      // 验证指标收集
      const metrics = await this.collectMetrics(instance);
      
      // 验证追踪收集
      const traces = await this.collectTraces(instance);
      
      return {
        overall: logs.length > 0 && metrics.length > 0 && traces.length > 0,
        results: {
          logs: logs.length,
          metrics: metrics.length,
          traces: traces.length
        },
        timestamp: new Date().toISOString()
      };
    } finally {
      await this.cleanupInstance(instance);
    }
  }
}
```

---

## 📚 **验证命令**

### 🔍 **可观测性验证命令**
```bash
# 运行可观测性验证
npm run observability:validate

# 验证 Chrome DevTools 集成
npm run observability:devtools

# 验证临时实例管理
npm run observability:temp-instances

# 验证日志收集
npm run observability:logs

# 验证指标收集
npm run observability:metrics

# 验证追踪收集
npm run observability:traces
```

### 📋 **验证报告**
```json
{
  "timestamp": "2026-03-13T10:30:00Z",
  "status": "passed",
  "components": {
    "chromeDevTools": {
      "status": "passed",
      "capabilities": ["screenshot", "navigation", "domAccess", "eventListening"]
    },
    "tempInstances": {
      "status": "passed",
      "instances": 2,
      "health": "healthy"
    },
    "logCollection": {
      "status": "passed",
      "logsCollected": 1250,
      "logSources": ["application", "system", "network"]
    },
    "metricsCollection": {
      "status": "passed",
      "metricsCollected": 850,
      "metricTypes": ["performance", "memory", "cpu", "network"]
    },
    "traceCollection": {
      "status": "passed",
      "tracesCollected": 320,
      "traceTypes": ["http", "database", "ui", "background"]
    }
  },
  "overallScore": 95.2
}
```

---

## 🔄 **持续监控**

### 📊 **监控仪表板**
```typescript
interface ObservabilityDashboard {
  // 实时监控
  realTimeMonitoring: () => Promise<MonitoringData>;
  
  // 性能监控
  performanceMonitoring: () => Promise<PerformanceData>;
  
  // 错误监控
  errorMonitoring: () => Promise<ErrorData>;
  
  // 资源监控
  resourceMonitoring: () => Promise<ResourceData>;
}

class ObservabilityDashboardImpl implements ObservabilityDashboard {
  async realTimeMonitoring(): Promise<MonitoringData> {
    const [logs, metrics, traces] = await Promise.all([
      this.getRecentLogs(),
      this.getRecentMetrics(),
      this.getRecentTraces()
    ]);
    
    return {
      logs: logs.slice(-100),
      metrics: metrics.slice(-50),
      traces: traces.slice(-50),
      timestamp: new Date().toISOString()
    };
  }
  
  async performanceMonitoring(): Promise<PerformanceData> {
    const performanceMetrics = await this.queryMetrics({
      query: 'avg_over_time(request_duration_seconds[5m])',
      timeRange: { start: '5m ago', end: 'now' }
    });
    
    return {
      averageResponseTime: performanceMetrics[0]?.value || 0,
      p95ResponseTime: await this.getP95ResponseTime(),
      errorRate: await this.getErrorRate(),
      throughput: await this.getThroughput(),
      timestamp: new Date().toISOString()
    };
  }
}
```

---

## 📚 **相关文档**

- [HARNESS.md](../HARNESS.md) - 项目约束宪法
- [AGENTS.md](../AGENTS.md) - AI Agent 指南
- [context-architecture.md](./context-architecture.md) - 上下文架构
- [failure-modes.md](./failure-modes.md) - 失败模式处理
- [taste-invariants.md](./taste-invariants.md) - 品味不变式

---

## 🎊 **总结**

深度可观测性是 Harness Engineering 的高级特性，它通过完整的可观测性堆栈为 Agent 提供了强大的监控和诊断能力。通过 Chrome DevTools 集成、临时实例管理和查询语言支持，我们可以实现：

- **完全的可观测性**: 应用程序的 UI、日志和指标对 Agent 完全可读
- **实时监控**: 实时监控应用程序状态和性能
- **快速故障诊断**: 快速诊断和修复问题
- **数据驱动优化**: 基于数据驱动的性能优化

---

*最后更新: 2026-03-13*  
*验证状态: ⏳ 待验证*  
*下次审查: 2026-03-20*
