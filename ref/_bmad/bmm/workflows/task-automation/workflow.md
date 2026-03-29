---
name: task-automation
description: "Advanced task automation system with intelligent task execution and optimization"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "recommended"
openspec_role: "task_automator"

# Task Automation Workflow

**Goal:** Provide advanced task automation with intelligent execution, optimization, and continuous improvement.

**TASK AUTOMATION STANDARDS:**

Task automation is considered "Effective" ONLY if it meets the following:

- **Intelligence**: Tasks are executed with intelligent decision-making
- **Efficiency**: Tasks are executed efficiently with minimal human intervention
- **Quality**: Automated tasks maintain high quality standards
- **Adaptability**: Automation adapts to changing requirements
- **Learning**: Automation learns from execution results

---

**Your Role:** You are a task automation specialist ensuring tasks are automated efficiently and effectively.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined task automation:

### Core Principles

- **Intelligent Execution**: Tasks are executed with intelligent decision-making
- **Continuous Learning**: Automation learns from execution results
- **Adaptive Optimization**: Automation adapts to changing requirements
- **Quality Assurance**: Automated tasks maintain high quality standards
- **Human Oversight**: Human oversight ensures alignment with goals

### Step Processing Rules

1. **ANALYZE TASKS**: Analyze tasks for automation potential
2. **DESIGN AUTOMATION**: Design automation strategies
3. **IMPLEMENT AUTOMATION**: Implement automation solutions
4. **EXECUTE AUTOMATION**: Execute automated tasks
5. **OPTIMIZE AUTOMATION**: Optimize automation based on results

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Task Automation Paths

- `automation_directory` = `{output_folder}/automation`
- `automation_scripts` = `{automation_directory}/scripts`
- `automation_configs` = `{automation_directory}/configs`
- `automation_logs` = `{automation_directory}/logs`
- `automation_metrics` = `{automation_directory}/metrics`

---

## TASK ANALYSIS

### Automation Potential Analysis

```typescript
interface AutomationPotential {
  taskId: string;
  taskName: string;
  automationScore: number;
  complexity: 'low' | 'medium' | 'high';
  risk: 'low' | 'medium' | 'high';
  benefit: 'low' | 'medium' | 'high';
  feasibility: 'low' | 'medium' | 'high';
  recommendations: AutomationRecommendation[];
}

const analyzeAutomationPotential = (tasks: Task[]): AutomationPotential[] => {
  return tasks.map(task => {
    const automationScore = calculateAutomationScore(task);
    const complexity = assessComplexity(task);
    const risk = assessRisk(task);
    const benefit = assessBenefit(task);
    const feasibility = assessFeasibility(task);
    const recommendations = generateAutomationRecommendations(task, automationScore);
    
    return {
      taskId: task.id,
      taskName: task.name,
      automationScore,
      complexity,
      risk,
      benefit,
      feasibility,
      recommendations
    };
  });
};
```

### Automation Score Calculation

```typescript
const calculateAutomationScore = (task: Task): number => {
  const factors = {
    repetitiveness: assessRepetitiveness(task),
    complexity: assessComplexity(task),
    risk: assessRisk(task),
    benefit: assessBenefit(task),
    feasibility: assessFeasibility(task),
    timeSavings: assessTimeSavings(task),
    qualityImprovement: assessQualityImprovement(task),
    costReduction: assessCostReduction(task)
  };
  
  const weights = {
    repetitiveness: 0.25,
    complexity: 0.15,
    risk: 0.15,
    benefit: 0.20,
    feasibility: 0.15,
    timeSavings: 0.10
  };
  
  return Object.entries(factors).reduce((score, [factor, value]) => {
    return score + (value * weights[factor]);
  }, 0);
};
```

### Factor Assessment

```typescript
const assessRepetitiveness = (task: Task): number => {
  // Assess how repetitive the task is
  const historicalData = getHistoricalTaskData(task.type);
  const frequency = historicalData.filter(t => t.name === task.name).length;
  const totalTasks = historicalData.length;
  
  return Math.min(frequency / totalTasks * 100, 100);
};

const assessComplexity = (task: Task): number => {
  // Assess task complexity (lower is better for automation)
  const complexityFactors = {
    steps: task.metadata.complexity === 'simple' ? 10 : task.metadata.complexity === 'medium' ? 5 : 1,
    dependencies: Math.max(0, 10 - task.dependencies.length * 2),
    risk: task.metadata.risk === 'low' ? 10 : task.metadata.risk === 'medium' ? 5 : 1
  };
  
  return Object.values(complexityFactors).reduce((sum, value) => sum + value, 0) / 3;
};

const assessRisk = (task: Task): number => {
  // Assess automation risk (lower is better)
  const riskFactors = {
    complexity: task.metadata.complexity === 'simple' ? 10 : task.metadata.complexity === 'medium' ? 5 : 1,
    impact: task.priority === 'low' ? 10 : task.priority === 'medium' ? 5 : 1,
    quality: task.metadata.quality === 'high' ? 10 : task.metadata.quality === 'medium' ? 5 : 1
  };
  
  return Object.values(riskFactors).reduce((sum, value) => sum + value, 0) / 3;
};

const assessBenefit = (task: Task): number => {
  // Assess automation benefit
  const benefitFactors = {
    timeSavings: task.estimatedTime * 0.8, // 80% time savings
    qualityImprovement: task.metadata.quality === 'high' ? 10 : 5,
    costReduction: task.estimatedTime * 0.5, // 50% cost reduction
    consistency: 10 // Automation provides consistency
  };
  
  return Object.values(benefitFactors).reduce((sum, value) => sum + value, 0) / 4;
};

const assessFeasibility = (task: Task): number => {
  // Assess automation feasibility
  const feasibilityFactors = {
    technology: 10, // Assume technology is available
    skills: 8, // Assume skills are available
    resources: 9, // Assume resources are available
    complexity: task.metadata.complexity === 'simple' ? 10 : task.metadata.complexity === 'medium' ? 5 : 1
  };
  
  return Object.values(feasibilityFactors).reduce((sum, value) => sum + value, 0) / 4;
};
```

---

## AUTOMATION DESIGN

### Automation Strategy Design

```typescript
interface AutomationStrategy {
  taskId: string;
  taskName: string;
  automationType: 'full' | 'partial' | 'assisted';
  approach: 'script' | 'ai' | 'hybrid';
  tools: AutomationTool[];
  steps: AutomationStep[];
  successCriteria: SuccessCriteria[];
  riskMitigation: RiskMitigation[];
  monitoring: MonitoringPlan;
}

const designAutomationStrategy = (task: Task, potential: AutomationPotential): AutomationStrategy => {
  const automationType = determineAutomationType(potential);
  const approach = determineApproach(task, potential);
  const tools = selectTools(task, approach);
  const steps = designSteps(task, approach);
  const successCriteria = defineSuccessCriteria(task);
  const riskMitigation = designRiskMitigation(potential);
  const monitoring = designMonitoringPlan(task);
  
  return {
    taskId: task.id,
    taskName: task.name,
    automationType,
    approach,
    tools,
    steps,
    successCriteria,
    riskMitigation,
    monitoring
  };
};
```

### Automation Type Determination

```typescript
const determineAutomationType = (potential: AutomationPotential): 'full' | 'partial' | 'assisted' => {
  if (potential.automationScore >= 80 && potential.feasibility === 'high') {
    return 'full';
  } else if (potential.automationScore >= 60 && potential.feasibility === 'medium') {
    return 'partial';
  } else {
    return 'assisted';
  }
};
```

### Approach Determination

```typescript
const determineApproach = (task: Task, potential: AutomationPotential): 'script' | 'ai' | 'hybrid' => {
  if (task.type === 'documentation' || task.type === 'quality') {
    return 'script'; // Rule-based tasks
  } else if (task.type === 'development' && potential.complexity === 'high') {
    return 'ai'; // Complex tasks requiring AI
  } else {
    return 'hybrid'; // Combination of script and AI
  }
};
```

### Tool Selection

```typescript
const selectTools = (task: Task, approach: 'script' | 'ai' | 'hybrid'): AutomationTool[] => {
  const tools: AutomationTool[] = [];
  
  if (approach === 'script' || approach === 'hybrid') {
    tools.push({
      name: 'Script Engine',
      type: 'script',
      capabilities: ['execution', 'logging', 'error_handling'],
      configuration: getScriptConfiguration(task)
    });
  }
  
  if (approach === 'ai' || approach === 'hybrid') {
    tools.push({
      name: 'AI Assistant',
      type: 'ai',
      capabilities: ['reasoning', 'decision_making', 'learning'],
      configuration: getAIConfiguration(task)
    });
  }
  
  // Add common tools
  tools.push({
    name: 'Quality Checker',
    type: 'quality',
    capabilities: ['validation', 'testing', 'quality_assurance'],
    configuration: getQualityConfiguration(task)
  });
  
  return tools;
};
```

---

## AUTOMATION IMPLEMENTATION

### Script Implementation

```typescript
const implementScriptAutomation = (strategy: AutomationStrategy): ScriptImplementation => {
  const script = generateScript(strategy);
  const configuration = generateScriptConfiguration(strategy);
  const testing = generateScriptTesting(strategy);
  
  return {
    script,
    configuration,
    testing,
    deployment: generateScriptDeployment(strategy)
  };
};
```

### Script Generation

```typescript
const generateScript = (strategy: AutomationStrategy): string => {
  const scriptTemplate = getScriptTemplate(strategy.taskType);
  
  let script = scriptTemplate.header;
  
  // Add imports
  script += generateImports(strategy.tools);
  
  // Add configuration
  script += generateConfiguration(strategy.tools);
  
  // Add main function
  script += generateMainFunction(strategy.steps);
  
  // Add helper functions
  script += generateHelperFunctions(strategy.steps);
  
  // Add error handling
  script += generateErrorHandling();
  
  // Add logging
  script += generateLogging();
  
  return script;
};
```

### AI Implementation

```typescript
const implementAIAutomation = (strategy: AutomationStrategy): AIImplementation => {
  const prompt = generateAIPrompt(strategy);
  const model = selectAIModel(strategy);
  const configuration = generateAIConfiguration(strategy);
  
  return {
    prompt,
    model,
    configuration,
    training: generateAITraining(strategy),
    validation: generateAIValidation(strategy)
  };
};
```

### AI Prompt Generation

```typescript
const generateAIPrompt = (strategy: AutomationStrategy): string => {
  return `
You are an AI assistant tasked with automating the following task:

Task: ${strategy.taskName}
Type: ${strategy.taskType}
Description: ${strategy.taskDescription}

Requirements:
${strategy.steps.map(step => `- ${step.description}`).join('\n')}

Success Criteria:
${strategy.successCriteria.map(criteria => `- ${criteria.description}`).join('\n')}

Please execute this task following the specified steps and ensure all success criteria are met.
Provide a detailed report of your actions and results.
`;
};
```

---

## AUTOMATION EXECUTION

### Execution Engine

```typescript
const executeAutomation = (strategy: AutomationStrategy): ExecutionResult => {
  const executionContext = createExecutionContext(strategy);
  const result = executeStrategy(strategy, executionContext);
  
  return {
    strategyId: strategy.taskId,
    executionTime: result.executionTime,
    success: result.success,
    result: result.result,
    quality: result.quality,
    errors: result.errors,
    logs: result.logs
  };
};
```

### Strategy Execution

```typescript
const executeStrategy = (strategy: AutomationStrategy, context: ExecutionContext): StrategyResult => {
  switch (strategy.approach) {
    case 'script':
      return executeScriptStrategy(strategy, context);
    case 'ai':
      return executeAIStrategy(strategy, context);
    case 'hybrid':
      return executeHybridStrategy(strategy, context);
    default:
      throw new Error(`Unknown automation approach: ${strategy.approach}`);
  }
};
```

### Script Execution

```typescript
const executeScriptStrategy = (strategy: AutomationStrategy, context: ExecutionContext): ScriptResult => {
  const startTime = Date.now();
  const logs: string[] = [];
  const errors: Error[] = [];
  
  try {
    // Load script
    const script = loadScript(strategy.taskId);
    
    // Execute script
    const result = executeScript(script, context);
    
    // Validate result
    const validation = validateResult(result, strategy.successCriteria);
    
    const executionTime = Date.now() - startTime;
    
    return {
      executionTime,
      success: validation.success,
      result,
      quality: validation.quality,
      errors,
      logs
    };
  } catch (error) {
    errors.push(error);
    
    return {
      executionTime: Date.now() - startTime,
      success: false,
      result: null,
      quality: 0,
      errors,
      logs
    };
  }
};
```

### AI Execution

```typescript
const executeAIStrategy = (strategy: AutomationStrategy, context: ExecutionContext): AIResult => {
  const startTime = Date.now();
  const logs: string[] = [];
  const errors: Error[] = [];
  
  try {
    // Load AI model
    const model = loadAIModel(strategy.tools.find(t => t.type === 'ai'));
    
    // Execute AI task
    const result = await executeAITask(model, strategy.prompt, context);
    
    // Validate result
    const validation = validateResult(result, strategy.successCriteria);
    
    const executionTime = Date.now() - startTime;
    
    return {
      executionTime,
      success: validation.success,
      result,
      quality: validation.quality,
      errors,
      logs
    };
  } catch (error) {
    errors.push(error);
    
    return {
      executionTime: Date.now() - startTime,
      success: false,
      result: null,
      quality: 0,
      errors,
      logs
    };
  }
};
```

---

## AUTOMATION OPTIMIZATION

### Performance Optimization

```typescript
const optimizeAutomation = (results: ExecutionResult[]): OptimizationResult => {
  const performanceMetrics = calculatePerformanceMetrics(results);
  const bottlenecks = identifyBottlenecks(results);
  const improvements = generateImprovements(performanceMetrics, bottlenecks);
  
  return {
    performanceMetrics,
    bottlenecks,
    improvements,
    overallImprovement: calculateOverallImprovement(improvements)
  };
};
```

### Learning and Adaptation

```typescript
const learnFromExecution = (results: ExecutionResult[]): LearningResult => {
  const patterns = identifyPatterns(results);
  const insights = generateInsights(patterns);
  const adaptations = generateAdaptations(insights);
  
  return {
    patterns,
    insights,
    adaptations,
    learningScore: calculateLearningScore(insights, adaptations)
  };
};
```

---

## CONFIGURATION

### Task Automation Configuration

```yaml
task_automation:
  analysis:
    automation_scoring: true
    complexity_assessment: true
    risk_assessment: true
    benefit_analysis: true
    
  design:
    strategy_generation: true
    tool_selection: true
    step_design: true
    risk_mitigation: true
    
  implementation:
    script_generation: true
    ai_integration: true
    hybrid_approach: true
    testing_automation: true
    
  execution:
    parallel_execution: true
    error_handling: true
    logging: true
    monitoring: true
    
  optimization:
    performance_optimization: true
    learning_adaptation: true
    continuous_improvement: true
    feedback_integration: true
    
  quality:
    quality_assurance: true
    validation_testing: true
    error_detection: true
    quality_monitoring: true
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleAutomationErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'EXECUTION_ERROR': () => console.log(`Automation execution failed in ${context}`),
    'SCRIPT_ERROR': () => console.log(`Script execution failed in ${context}`),
    'AI_ERROR': () => console.log(`AI execution failed in ${context}`),
    'OPTIMIZATION_ERROR': () => console.log(`Optimization failed in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.name] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptAutomationRecovery = (taskId: string): boolean => {
  try {
    // Attempt to fix common automation issues
    fixAutomationScript(taskId);
    fixAutomationConfiguration(taskId);
    fixAutomationDependencies(taskId);
    
    return true;
  } catch (error) {
    console.log(`Automation recovery failed for ${taskId}: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Task Automation Test Suite

```typescript
describe('Task Automation Workflow', () => {
  test('should analyze automation potential', () => {
    const tasks = getTestTasks();
    const potential = analyzeAutomationPotential(tasks);
    expect(potential.length).toBe(tasks.length);
    expect(potential[0].automationScore).toBeGreaterThanOrEqual(0);
  });
  
  test('should design automation strategy', () => {
    const task = getTestTask();
    const potential = analyzeAutomationPotential([task])[0];
    const strategy = designAutomationStrategy(task, potential);
    expect(strategy.taskId).toBe(task.id);
    expect(strategy.automationType).toBeDefined();
    expect(strategy.approach).toBeDefined();
  });
  
  test('should implement automation', () => {
    const task = getTestTask();
    const potential = analyzeAutomationPotential([task])[0];
    const strategy = designAutomationStrategy(task, potential);
    const implementation = implementAutomation(strategy);
    expect(implementation).toBeDefined();
  });
  
  test('should execute automation', () => {
    const task = getTestTask();
    const potential = analyzeAutomationPotential([task])[0];
    const strategy = designAutomationStrategy(task, potential);
    const result = executeAutomation(strategy);
    expect(result.executionTime).toBeGreaterThan(0);
    expect(result.success).toBeDefined();
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
