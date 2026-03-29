# 🚨 失败模式处理

> **基于 OpenAI Harness Engineering 的失败模式识别和预防**  
> 防止 Agent 常见失败模式和提供恢复策略

---

## 📋 **概述**

本文档定义了项目的常见失败模式，基于 OpenAI 和 Anthropic 的实践经验，提供识别、预防和恢复策略，确保 Agent 的可靠性和稳定性。

---

## 🎯 **失败模式分类**

### 📊 **四大失败模式**
根据 Anthropic 的实践经验，Agent 常见的失败模式包括：

1. **One-shotting** - 试图一步到位完成所有事情
2. **过早胜利** - 在项目后期过早宣布任务完成
3. **过早标记完成** - 写完代码就标记为完成，不做端到端测试
4. **环境启动困难** - 每次新会话启动时需要大量时间弄清楚环境

---

## 🚨 **失败模式 1: One-shotting**

### 📋 **问题描述**
Agent 倾向于一次做完所有事情，结果在实现进行到一半时上下文窗口就耗尽了。下一个会话启动时看到的是半成品、没有文档的代码，只能花大量时间猜测之前发生了什么并试图恢复工作状态。

### 🔍 **识别特征**
- **单次任务过大**: 一次性尝试实现整个功能模块
- **上下文窗口耗尽**: 在任务进行中上下文窗口用完
- **半成品代码**: 留下未完成的代码和缺失的文档
- **状态丢失**: 无法准确恢复之前的工作状态

### 🛡️ **预防策略**
```typescript
interface OneShottingPrevention {
  // 任务分解
  taskDecomposition: {
    maxLinesPerTask: 800;
    maxFilesPerTask: 12;
    maxComplexityScore: 50;
  };
  
  // 上下文管理
  contextManagement: {
    checkpointInterval: 'every_200_lines';
    contextCompression: true;
    stateSaving: true;
  };
  
  // 进度跟踪
  progressTracking: {
    milestones: true;
    statusUpdates: true;
    rollbackPoints: true;
  };
}
```

### 🔄 **恢复策略**
```typescript
class OneShottingRecovery {
  async recoverFromOneShotting(sessionId: string): Promise<RecoveryPlan> {
    // 分析当前状态
    const currentState = await this.analyzeCurrentState(sessionId);
    
    // 识别未完成的部分
    const incompleteParts = this.identifyIncompleteParts(currentState);
    
    // 创建恢复计划
    const recoveryPlan = this.createRecoveryPlan(incompleteParts);
    
    return recoveryPlan;
  }
  
  private async analyzeCurrentState(sessionId: string): Promise<CurrentState> {
    return {
      completedFiles: this.getCompletedFiles(sessionId),
      incompleteFiles: this.getIncompleteFiles(sessionId),
      missingDocumentation: this.getMissingDocumentation(sessionId),
      currentState: this.getCurrentTaskState(sessionId)
    };
  }
}
```

---

## 🚨 **失败模式 2: 过早胜利**

### 📋 **问题描述**
在项目后期，当部分功能已经完成后，Agent 会环顾四周，看到已有进展就直接宣布任务完成——即使还有大量功能未实现。

### 🔍 **识别特征**
- **功能不完整**: 只实现了部分功能就宣布完成
- **测试缺失**: 没有完整的测试覆盖
- **文档缺失**: 缺少必要的文档和说明
- **质量检查缺失**: 没有进行完整的质量检查

### 🛡️ **预防策略**
```typescript
interface PrematureVictoryPrevention {
  // 完成度检查
  completionCheck: {
    requirementsChecklist: true;
    functionalityVerification: true;
    testCoverageVerification: true;
    documentationVerification: true;
  };
  
  // 质量门禁
  qualityGates: {
    codeQuality: true;
    testCoverage: true;
    documentation: true;
    performance: true;
  };
  
  // 验证流程
  validationProcess: {
    endToEndTesting: true;
    userStoryVerification: true;
    acceptanceCriteriaCheck: true;
  };
}
```

### 🔄 **恢复策略**
```typescript
class PrematureVictoryRecovery {
  async recoverFromPrematureVictory(taskId: string): Promise<RecoveryAction> {
    // 验证实际完成度
    const actualCompletion = await this.verifyActualCompletion(taskId);
    
    // 识别缺失的部分
    const missingParts = this.identifyMissingParts(actualCompletion);
    
    // 创建完成计划
    const completionPlan = this.createCompletionPlan(missingParts);
    
    return completionPlan;
  }
  
  private async verifyActualCompletion(taskId: string): Promise<CompletionStatus> {
    const requirements = await this.getRequirements(taskId);
    const implementation = await this.getImplementation(taskId);
    
    return {
      requirementsMet: this.checkRequirements(requirements, implementation),
      functionalityComplete: this.checkFunctionality(implementation),
      testsComplete: this.checkTests(implementation),
      documentationComplete: this.checkDocumentation(implementation)
    };
  }
}
```

---

## 🚨 **失败模式 3: 过早标记完成**

### 📋 **问题描述**
在没有明确提示的情况下，Agent 写完代码就标记为"完成"，却没有做端到端测试。单元测试或 curl 命令通过了不代表功能真正可用。

### 🔍 **识别特征**
- **测试不完整**: 只有单元测试，没有集成测试
- **端到端测试缺失**: 没有进行完整的端到端测试
- **用户场景测试缺失**: 没有测试实际用户使用场景
- **边界条件测试缺失**: 没有测试边界条件和错误情况

### 🛡️ **预防策略**
```typescript
interface PrematureCompletionPrevention {
  // 测试要求
  testingRequirements: {
    unitTests: true;
    integrationTests: true;
    endToEndTests: true;
    userScenarioTests: true;
  };
  
  // 验证流程
  validationProcess: {
    automatedTesting: true;
    manualTesting: true;
    userAcceptanceTesting: true;
  };
  
  // 完成标准
  completionCriteria: {
    allTestsPass: true;
    functionalityVerified: true;
    performanceVerified: true;
    securityVerified: true;
  };
}
```

### 🔄 **恢复策略**
```typescript
class PrematureCompletionRecovery {
  async recoverFromPrematureCompletion(taskId: string): Promise<TestingPlan> {
    // 分析当前测试状态
    const testStatus = await this.analyzeTestStatus(taskId);
    
    // 识别缺失的测试
    const missingTests = this.identifyMissingTests(testStatus);
    
    // 创建测试计划
    const testingPlan = this.createTestingPlan(missingTests);
    
    return testingPlan;
  }
  
  private async analyzeTestStatus(taskId: string): Promise<TestStatus> {
    return {
      unitTests: this.getUnitTestStatus(taskId),
      integrationTests: this.getIntegrationTestStatus(taskId),
      endToEndTests: this.getEndToEndTestStatus(taskId),
      userScenarioTests: this.getUserScenarioTestStatus(taskId)
    };
  }
}
```

---

## 🚨 **失败模式 4: 环境启动困难**

### 📋 **问题描述**
每次新会话启动时，Agent 需要花费大量 token 弄清楚如何运行应用、如何启动开发服务器，而不是把时间花在实际开发上。

### 🔍 **识别特征**
- **启动时间长**: 每次会话启动需要大量时间
- **环境配置复杂**: 需要弄清楚复杂的环境配置
- **依赖关系不明确**: 不清楚项目依赖和启动顺序
- **开发流程不清晰**: 不清楚标准的开发流程

### 🛡️ **预防策略**
```typescript
interface EnvironmentStartupPrevention {
  // 环境配置
  environmentConfig: {
    startupScripts: true;
    environmentVariables: true;
    dependencyManagement: true;
    configurationFiles: true;
  };
  
  // 开发流程
  developmentWorkflow: {
    quickStartGuide: true;
    commonCommands: true;
    troubleshooting: true;
    bestPractices: true;
  };
  
  // 自动化工具
  automationTools: {
    setupScripts: true;
    healthChecks: true;
    monitoring: true;
  };
}
```

### 🔄 **恢复策略**
```typescript
class EnvironmentStartupRecovery {
  async recoverFromStartupDifficulty(sessionId: string): Promise<StartupPlan> {
    // 分析环境状态
    const environmentStatus = await this.analyzeEnvironmentStatus();
    
    // 识别启动问题
    const startupIssues = this.identifyStartupIssues(environmentStatus);
    
    // 创建启动计划
    const startupPlan = this.createStartupPlan(startupIssues);
    
    return startupPlan;
  }
  
  private async analyzeEnvironmentStatus(): Promise<EnvironmentStatus> {
    return {
      dependenciesInstalled: this.checkDependencies(),
      configurationValid: this.checkConfiguration(),
      servicesRunning: this.checkServices(),
      portsAvailable: this.checkPorts()
    };
  }
}
```

---

## 🔧 **失败模式检测系统**

### 📋 **检测架构**
```typescript
interface FailureModeDetector {
  // 检测器
  detectors: {
    oneShottingDetector: OneShottingDetector;
    prematureVictoryDetector: PrematureVictoryDetector;
    prematureCompletionDetector: PrematureCompletionDetector;
    environmentStartupDetector: EnvironmentStartupDetector;
  };
  
  // 检测方法
  detect: (context: AgentContext) => Promise<FailureModeDetection>;
  
  // 预警系统
  alertSystem: AlertSystem;
}
```

### 📊 **检测实现**
```typescript
class FailureModeDetectorImpl implements FailureModeDetector {
  async detect(context: AgentContext): Promise<FailureModeDetection> {
    const detections: FailureMode[] = [];
    
    // 检测 One-shotting
    if (this.oneShottingDetector.detect(context)) {
      detections.push('one-shotting');
    }
    
    // 检测过早胜利
    if (this.prematureVictoryDetector.detect(context)) {
      detections.push('premature-victory');
    }
    
    // 检测过早完成
    if (this.prematureCompletionDetector.detect(context)) {
      detections.push('premature-completion');
    }
    
    // 检测环境启动困难
    if (this.environmentStartupDetector.detect(context)) {
      detections.push('environment-startup');
    }
    
    return {
      detected: detections,
      severity: this.calculateSeverity(detections),
      recommendations: this.getRecommendations(detections)
    };
  }
}
```

---

## 🔄 **恢复策略框架**

### 📋 **恢复架构**
```typescript
interface RecoveryFramework {
  // 恢复策略
  recoveryStrategies: {
    oneShotting: OneShottingRecovery;
    prematureVictory: PrematureVictoryRecovery;
    prematureCompletion: PrematureCompletionRecovery;
    environmentStartup: EnvironmentStartupRecovery;
  };
  
  // 恢复流程
  recoveryProcess: (failureMode: FailureMode, context: AgentContext) => Promise<RecoveryPlan>;
  
  // 恢复验证
  recoveryValidation: (recoveryPlan: RecoveryPlan) => Promise<ValidationResult>;
}
```

### 📊 **恢复实现**
```typescript
class RecoveryFrameworkImpl implements RecoveryFramework {
  async recoveryProcess(failureMode: FailureMode, context: AgentContext): Promise<RecoveryPlan> {
    switch (failureMode) {
      case 'one-shotting':
        return this.oneShotting.recoverFromOneShotting(context.sessionId);
      case 'premature-victory':
        return this.prematureVictory.recoverFromPrematureVictory(context.taskId);
      case 'premature-completion':
        return this.prematureCompletion.recoverFromPrematureCompletion(context.taskId);
      case 'environment-startup':
        return this.environmentStartup.recoverFromStartupDifficulty(context.sessionId);
      default:
        throw new Error(`Unknown failure mode: ${failureMode}`);
    }
  }
}
```

---

## 📚 **验证命令**

### 🔍 **失败模式检测命令**
```bash
# 运行失败模式检测
npm run failure-modes:detect

# 检查 One-shotting 风险
npm run failure-modes:check-one-shotting

# 检查过早胜利风险
npm run failure-modes:check-premature-victory

# 检查过早完成风险
npm run failure-modes:check-premature-completion

# 检查环境启动困难
npm run failure-modes:check-startup
```

### 📋 **检测报告**
```json
{
  "timestamp": "2026-03-13T10:30:00Z",
  "status": "passed",
  "failureModes": {
    "oneShotting": {
      "risk": "low",
      "indicators": [],
      "recommendations": []
    },
    "prematureVictory": {
      "risk": "medium",
      "indicators": ["missing_integration_tests"],
      "recommendations": ["add_end_to_end_tests", "verify_completion_criteria"]
    },
    "prematureCompletion": {
      "risk": "low",
      "indicators": [],
      "recommendations": []
    },
    "environmentStartup": {
      "risk": "low",
      "indicators": [],
      "recommendations": []
    }
  },
  "overallRisk": "medium"
}
```

---

## 🔄 **持续改进**

### 📋 **学习机制**
```typescript
interface FailureModeLearning {
  // 失败模式收集
  failureCollection: {
    collectFailures: boolean;
    analyzePatterns: boolean;
    updateDetectionRules: boolean;
  };
  
  // 预防改进
  preventionImprovement: {
    updatePreventionStrategies: boolean;
    improveDetectionAccuracy: boolean;
    enhanceRecoveryPlans: boolean;
  };
  
  // 知识库更新
  knowledgeBaseUpdate: {
    updateBestPractices: boolean;
    shareLessons: boolean;
    updateDocumentation: boolean;
  };
}
```

### 📊 **改进实现**
```typescript
class FailureModeLearningImpl implements FailureModeLearning {
  async learnFromFailure(failure: FailureInstance): Promise<void> {
    // 分析失败模式
    const analysis = await this.analyzeFailure(failure);
    
    // 更新检测规则
    await this.updateDetectionRules(analysis);
    
    // 改进预防策略
    await this.improvePreventionStrategies(analysis);
    
    // 更新知识库
    await this.updateKnowledgeBase(analysis);
  }
  
  private async analyzeFailure(failure: FailureInstance): Promise<FailureAnalysis> {
    return {
      pattern: this.identifyPattern(failure),
      rootCause: this.identifyRootCause(failure),
      context: this.extractContext(failure),
      lessons: this.extractLessons(failure)
    };
  }
}
```

---

## 📚 **相关文档**

- [HARNESS.md](../HARNESS.md) - 项目约束宪法
- [AGENTS.md](../AGENTS.md) - AI Agent 指南
- [context-architecture.md](./context-architecture.md) - 上下文架构
- [agent-specialization.md](./agent-specialization.md) - Agent 专业化策略
- [taste-invariants.md](./taste-invariants.md) - 品味不变式

---

## 🎊 **总结**

失败模式处理是 Harness Engineering 的重要组成部分，它通过识别、预防和恢复策略，确保 Agent 的可靠性和稳定性。通过系统化的失败模式管理，我们可以实现：

- **更高的可靠性**: 预防常见失败模式
- **更快的恢复**: 快速从失败中恢复
- **更好的学习**: 从失败中学习和改进
- **更强的适应性**: 适应不同的失败场景

---

*最后更新: 2026-03-13*  
*验证状态: ⏳ 待验证*  
*下次审查: 2026-03-20*
