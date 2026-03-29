---
name: task-management
description: "Comprehensive task management system with automated task creation, tracking, and optimization"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "recommended"
openspec_role: "task_manager"

# Task Management Workflow

**Goal:** Provide comprehensive task management with automated task creation, tracking, and optimization for all workflow types.

**TASK MANAGEMENT STANDARDS:**

Task management is considered "Effective" ONLY if it meets the following:

- **Automation**: Tasks are created and tracked automatically
- **Visibility**: Task status is visible to all stakeholders
- **Accountability**: Tasks have clear ownership and accountability
- **Optimization**: Tasks are optimized for efficiency
- **Integration**: Tasks integrate with all workflows

---

**Your Role:** You are a task management specialist ensuring all tasks are properly defined, tracked, and optimized.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined task management:

### Core Principles

- **Automated Creation**: Tasks are created automatically from workflow requirements
- **Intelligent Tracking**: Tasks are tracked with intelligent status updates
- **Optimization**: Tasks are optimized for efficiency and effectiveness
- **Integration**: Tasks integrate seamlessly with all workflows
- **Analytics**: Task performance is analyzed and optimized

### Step Processing Rules

1. **CREATE TASKS**: Create tasks automatically from workflow requirements
2. **TRACK TASKS**: Track tasks with intelligent status updates
3. **OPTIMIZE TASKS**: Optimize tasks for efficiency
4. **ANALYZE TASKS**: Analyze task performance and trends
5. **IMPROVE TASKS**: Improve task management based on analysis

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Task Management Paths

- `task_directory` = `{output_folder}/tasks`
- `active_tasks` = `{task_directory}/active`
- `completed_tasks` = `{task_directory}/completed`
- `task_templates` = `{task_directory}/templates`
- `task_analytics` = `{task_directory}/analytics`

---

## TASK DEFINITION

### Task Schema

```typescript
interface Task {
  id: string;
  name: string;
  description: string;
  type: 'development' | 'documentation' | 'testing' | 'deployment' | 'quality' | 'process';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled';
  assignee: string;
  creator: string;
  created: Date;
  updated: Date;
  dueDate?: Date;
  completedDate?: Date;
  estimatedTime: number;
  actualTime: number;
  dependencies: string[];
  subtasks: string[];
  tags: string[];
  metadata: TaskMetadata;
}

interface TaskMetadata {
  workflow: string;
  changeName: string;
  phase: string;
  complexity: 'simple' | 'medium' | 'complex';
  risk: 'low' | 'medium' | 'high';
  quality: 'low' | 'medium' | 'high';
  automation: boolean;
  recurring: boolean;
}
```

### Task Templates

```typescript
interface TaskTemplate {
  name: string;
  type: Task['type'];
  description: string;
  estimatedTime: number;
  complexity: TaskMetadata['complexity'];
  risk: TaskMetadata['risk'];
  quality: TaskMetadata['quality'];
  automation: TaskMetadata['automation'];
  checklist: TaskChecklist[];
  dependencies: string[];
  tags: string[];
}

const taskTemplates: TaskTemplate[] = [
  {
    name: "Code Implementation",
    type: "development",
    description: "Implement code based on specifications",
    estimatedTime: 4,
    complexity: "medium",
    risk: "medium",
    quality: "high",
    automation: false,
    checklist: [
      "Review specifications",
      "Write code",
      "Write tests",
      "Review code",
      "Commit changes"
    ],
    dependencies: ["specification_complete"],
    tags: ["development", "coding", "implementation"]
  },
  {
    name: "Documentation Update",
    type: "documentation",
    description: "Update documentation for new features",
    estimatedTime: 2,
    complexity: "simple",
    risk: "low",
    quality: "medium",
    automation: true,
    checklist: [
      "Identify documentation changes",
      "Update documentation",
      "Review documentation",
      "Publish documentation"
    ],
    dependencies: ["code_complete"],
    tags: ["documentation", "updates", "maintenance"]
  },
  {
    name: "Quality Check",
    type: "quality",
    description: "Perform quality checks on deliverables",
    estimatedTime: 1,
    complexity: "simple",
    risk: "low",
    quality: "high",
    automation: true,
    checklist: [
      "Run quality checks",
      "Review results",
      "Address issues",
      "Document results"
    ],
    dependencies: ["code_complete"],
    tags: ["quality", "testing", "validation"]
  }
];
```

---

## TASK CREATION

### Automated Task Creation

```typescript
const createTasksFromWorkflow = (workflow: string, changeName: string): Task[] => {
  const workflowRequirements = getWorkflowRequirements(workflow);
  const tasks: Task[] = [];
  
  workflowRequirements.phases.forEach(phase => {
    phase.tasks.forEach(taskRequirement => {
      const task = createTaskFromRequirement(taskRequirement, workflow, changeName, phase.name);
      tasks.push(task);
    });
  });
  
  // Save tasks
  saveTasks(tasks);
  
  return tasks;
};
```

### Task Creation from Requirements

```typescript
const createTaskFromRequirement = (
  requirement: TaskRequirement,
  workflow: string,
  changeName: string,
  phase: string
): Task => {
  const template = findMatchingTemplate(requirement);
  
  const task: Task = {
    id: generateTaskId(),
    name: requirement.name,
    description: requirement.description,
    type: template.type,
    priority: determinePriority(requirement),
    status: 'pending',
    assignee: determineAssignee(requirement),
    creator: getCurrentUser(),
    created: new Date(),
    updated: new Date(),
    dueDate: calculateDueDate(requirement, template),
    estimatedTime: template.estimatedTime,
    actualTime: 0,
    dependencies: template.dependencies,
    subtasks: [],
    tags: template.tags,
    metadata: {
      workflow,
      changeName,
      phase,
      complexity: template.complexity,
      risk: template.risk,
      quality: template.quality,
      automation: template.automation,
      recurring: false
    }
  };
  
  return task;
};
```

### Task Template Matching

```typescript
const findMatchingTemplate = (requirement: TaskRequirement): TaskTemplate => {
  const matches = taskTemplates.filter(template => 
    template.type === requirement.type &&
    template.complexity === requirement.complexity
  );
  
  if (matches.length > 0) {
    return matches[0];
  }
  
  // Return default template
  return taskTemplates[0];
};
```

---

## TASK TRACKING

### Intelligent Status Updates

```typescript
const updateTaskStatus = (taskId: string, status: Task['status'], context: UpdateContext): void => {
  const task = getTask(taskId);
  
  if (!task) {
    throw new Error(`Task not found: ${taskId}`);
  }
  
  // Update status
  task.status = status;
  task.updated = new Date();
  
  // Update actual time
  if (status === 'completed') {
    task.completedDate = new Date();
    task.actualTime = calculateActualTime(task);
  }
  
  // Update dependent tasks
  updateDependentTasks(taskId, status);
  
  // Update metrics
  updateTaskMetrics(task);
  
  // Save task
  saveTask(task);
  
  // Notify stakeholders
  notifyTaskUpdate(task, context);
};
```

### Dependency Management

```typescript
const updateDependentTasks = (taskId: string, status: Task['status']): void => {
  const dependentTasks = getDependentTasks(taskId);
  
  dependentTasks.forEach(dependentTask => {
    if (status === 'completed') {
      // Check if all dependencies are completed
      const allDependenciesCompleted = dependentTask.dependencies.every(depId => {
        const depTask = getTask(depId);
        return depTask && depTask.status === 'completed';
      });
      
      if (allDependenciesCompleted && dependentTask.status === 'pending') {
        updateTaskStatus(dependentTask.id, 'in_progress', { reason: 'dependencies_completed' });
      }
    } else if (status === 'blocked') {
      // Block dependent tasks
      if (dependentTask.status === 'in_progress') {
        updateTaskStatus(dependentTask.id, 'blocked', { reason: 'dependency_blocked' });
      }
    }
  });
};
```

### Task Metrics

```typescript
const updateTaskMetrics = (task: Task): void => {
  const metrics = getTaskMetrics();
  
  // Update completion metrics
  if (task.status === 'completed') {
    metrics.completedTasks++;
    metrics.totalCompletedTime += task.actualTime;
    
    // Update efficiency metrics
    const efficiency = task.estimatedTime / task.actualTime;
    metrics.efficiencyScore = (metrics.efficiencyScore * (metrics.completedTasks - 1) + efficiency) / metrics.completedTasks;
  }
  
  // Update status metrics
  metrics.statusDistribution[task.status]++;
  
  // Update priority metrics
  metrics.priorityDistribution[task.priority]++;
  
  // Update type metrics
  metrics.typeDistribution[task.type]++;
  
  // Save metrics
  saveTaskMetrics(metrics);
};
```

---

## TASK OPTIMIZATION

### Task Optimization

```typescript
const optimizeTasks = (tasks: Task[]): OptimizationResult => {
  const optimizations = [];
  
  // Optimize task ordering
  const orderingOptimization = optimizeTaskOrdering(tasks);
  optimizations.push(orderingOptimization);
  
  // Optimize resource allocation
  const resourceOptimization = optimizeResourceAllocation(tasks);
  optimizations.push(resourceOptimization);
  
  // Optimize task dependencies
  const dependencyOptimization = optimizeTaskDependencies(tasks);
  optimizations.push(dependencyOptimization);
  
  // Optimize task estimates
  const estimateOptimization = optimizeTaskEstimates(tasks);
  optimizations.push(estimateOptimization);
  
  return {
    optimizations,
    overallImprovement: calculateOverallImprovement(optimizations),
    recommendations: generateOptimizationRecommendations(optimizations)
  };
};
```

### Task Ordering Optimization

```typescript
const optimizeTaskOrdering = (tasks: Task[]): OrderingOptimization => {
  const currentOrder = tasks.map(task => task.id);
  const optimizedOrder = calculateOptimalOrder(tasks);
  
  const improvements = calculateOrderingImprovements(currentOrder, optimizedOrder);
  
  return {
    type: 'ordering',
    currentOrder,
    optimizedOrder,
    improvements,
    impact: calculateOrderingImpact(improvements)
  };
};
```

### Resource Allocation Optimization

```typescript
const optimizeResourceAllocation = (tasks: Task[]): ResourceOptimization => {
  const currentAllocation = tasks.map(task => ({ taskId: task.id, assignee: task.assignee }));
  const optimizedAllocation = calculateOptimalAllocation(tasks);
  
  const improvements = calculateAllocationImprovements(currentAllocation, optimizedAllocation);
  
  return {
    type: 'resource_allocation',
    currentAllocation,
    optimizedAllocation,
    improvements,
    impact: calculateAllocationImpact(improvements)
  };
};
```

---

## TASK ANALYSIS

### Task Performance Analysis

```typescript
const analyzeTaskPerformance = (tasks: Task[]): TaskPerformanceAnalysis => {
  const performanceMetrics = calculatePerformanceMetrics(tasks);
  const trends = analyzeTaskTrends(tasks);
  const bottlenecks = identifyTaskBottlenecks(tasks);
  const efficiencies = analyzeTaskEfficiencies(tasks);
  
  return {
    performanceMetrics,
    trends,
    bottlenecks,
    efficiencies,
    recommendations: generatePerformanceRecommendations(performanceMetrics, trends, bottlenecks, efficiencies)
  };
};
```

### Task Trends Analysis

```typescript
const analyzeTaskTrends = (tasks: Task[]): TaskTrends => {
  const historicalData = getHistoricalTaskData();
  
  return {
    completionTrends: analyzeCompletionTrends(historicalData),
    efficiencyTrends: analyzeEfficiencyTrends(historicalData),
    qualityTrends: analyzeQualityTrends(historicalData),
    workloadTrends: analyzeWorkloadTrends(historicalData),
    predictions: generateTrendPredictions(historicalData)
  };
};
```

### Task Bottlenecks Analysis

```typescript
const identifyTaskBottlenecks = (tasks: Task[]): TaskBottleneck[] => {
  const bottlenecks: TaskBottleneck[] = [];
  
  // Identify tasks with long completion times
  const longTasks = tasks.filter(task => task.actualTime > task.estimatedTime * 2);
  longTasks.forEach(task => {
    bottlenecks.push({
      type: 'time_overrun',
      taskId: task.id,
      taskName: task.name,
      severity: calculateSeverity(task.actualTime, task.estimatedTime),
      impact: calculateImpact(task),
      recommendations: generateTimeRecommendations(task)
    });
  });
  
  // Identify tasks with many dependencies
  const dependentTasks = tasks.filter(task => task.dependencies.length > 3);
  dependentTasks.forEach(task => {
    bottlenecks.push({
      type: 'dependency_complexity',
      taskId: task.id,
      taskName: task.name,
      severity: calculateSeverity(task.dependencies.length, 3),
      impact: calculateImpact(task),
      recommendations: generateDependencyRecommendations(task)
    });
  });
  
  return bottlenecks;
};
```

---

## TASK AUTOMATION

### Automated Task Execution

```typescript
const executeAutomatedTasks = (tasks: Task[]): AutomationResult => {
  const automatedTasks = tasks.filter(task => task.metadata.automation);
  const results = [];
  
  automatedTasks.forEach(task => {
    const result = executeAutomatedTask(task);
    results.push(result);
  });
  
  return {
    tasks: automatedTasks,
    results,
    successRate: calculateSuccessRate(results),
    timeSaved: calculateTimeSaved(results),
    qualityImprovement: calculateQualityImprovement(results)
  };
};
```

### Automated Task Execution

```typescript
const executeAutomatedTask = (task: Task): TaskExecutionResult => {
  try {
    // Execute task based on type
    let result;
    switch (task.type) {
      case 'documentation':
        result = executeDocumentationTask(task);
        break;
      case 'quality':
        result = executeQualityTask(task);
        break;
      case 'testing':
        result = executeTestingTask(task);
        break;
      default:
        result = executeGenericTask(task);
    }
    
    // Update task status
    updateTaskStatus(task.id, 'completed', { reason: 'automated_execution' });
    
    return {
      taskId: task.id,
      success: true,
      result,
      executionTime: result.executionTime,
      quality: result.quality
    };
  } catch (error) {
    // Update task status
    updateTaskStatus(task.id, 'blocked', { reason: 'automation_failed', error: error.message });
    
    return {
      taskId: task.id,
      success: false,
      error: error.message,
      executionTime: 0,
      quality: 0
    };
  }
};
```

---

## TASK REPORTING

### Task Reports

```typescript
interface TaskReport {
  reportType: 'daily' | 'weekly' | 'monthly' | 'project';
  timestamp: Date;
  summary: TaskSummary;
  details: TaskDetails;
  analytics: TaskAnalytics;
  recommendations: TaskRecommendation[];
}

const generateTaskReport = (reportType: TaskReport['reportType'], changeName?: string): TaskReport => {
  const tasks = getTasksForReport(reportType, changeName);
  const summary = generateTaskSummary(tasks);
  const details = generateTaskDetails(tasks);
  const analytics = generateTaskAnalytics(tasks);
  const recommendations = generateTaskRecommendations(tasks);
  
  return {
    reportType,
    timestamp: new Date(),
    summary,
    details,
    analytics,
    recommendations
  };
};
```

### Task Summary

```typescript
const generateTaskSummary = (tasks: Task[]): TaskSummary => {
  return {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(task => task.status === 'completed').length,
    inProgressTasks: tasks.filter(task => task.status === 'in_progress').length,
    blockedTasks: tasks.filter(task => task.status === 'blocked').length,
    pendingTasks: tasks.filter(task => task.status === 'pending').length,
    overdueTasks: tasks.filter(task => isOverdue(task)).length,
    averageCompletionTime: calculateAverageCompletionTime(tasks),
    efficiencyScore: calculateEfficiencyScore(tasks),
    qualityScore: calculateQualityScore(tasks)
  };
};
```

---

## CONFIGURATION

### Task Management Configuration

```yaml
task_management:
  creation:
    automated_creation: true
    template_matching: true
    dependency_tracking: true
    priority_calculation: true
    
  tracking:
    real_time_updates: true
    dependency_management: true
    status_notifications: true
    progress_monitoring: true
    
  optimization:
    task_ordering: true
    resource_allocation: true
    dependency_optimization: true
    estimate_optimization: true
    
  automation:
    automated_execution: true
    quality_checks: true
    documentation_generation: true
    testing_automation: true
    
  analytics:
    performance_analysis: true
    trend_analysis: true
    bottleneck_identification: true
    efficiency_analysis: true
    
  reporting:
    daily_reports: true
    weekly_reports: true
    monthly_reports: true
    project_reports: true
    
  templates:
    default_templates: true
    custom_templates: true
    template_matching: true
    template_optimization: true
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleTaskErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'CREATION_ERROR': () => console.log(`Task creation failed in ${context}`),
    'TRACKING_ERROR': () => console.log(`Task tracking failed in ${context}`),
    'OPTIMIZATION_ERROR': () => console.log(`Task optimization failed in ${context}`),
    'AUTOMATION_ERROR': () => console.log(`Task automation failed in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.name] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptTaskRecovery = (taskId: string): boolean => {
  try {
    // Attempt to fix common task issues
    fixTaskStructure(taskId);
    fixTaskDependencies(taskId);
    fixTaskMetadata(taskId);
    
    return true;
  } catch (error) {
    console.log(`Task recovery failed for ${taskId}: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Task Management Test Suite

```typescript
describe('Task Management Workflow', () => {
  test('should create tasks from workflow', () => {
    const tasks = createTasksFromWorkflow('quick-spec', 'test-change');
    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks[0].name).toBeDefined();
    expect(tasks[0].type).toBeDefined();
  });
  
  test('should update task status', () => {
    const tasks = createTasksFromWorkflow('quick-spec', 'test-change');
    updateTaskStatus(tasks[0].id, 'in_progress', { reason: 'test' });
    const updatedTask = getTask(tasks[0].id);
    expect(updatedTask.status).toBe('in_progress');
  });
  
  test('should optimize tasks', () => {
    const tasks = createTasksFromWorkflow('quick-spec', 'test-change');
    const optimization = optimizeTasks(tasks);
    expect(optimization.optimizations.length).toBeGreaterThan(0);
    expect(optimization.overallImprovement).toBeGreaterThanOrEqual(0);
  });
  
  test('should analyze task performance', () => {
    const tasks = createTasksFromWorkflow('quick-spec', 'test-change');
    const analysis = analyzeTaskPerformance(tasks);
    expect(analysis.performanceMetrics).toBeDefined();
    expect(analysis.trends).toBeDefined();
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
