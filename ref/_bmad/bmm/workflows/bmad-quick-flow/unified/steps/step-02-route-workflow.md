# Step 2: Route Workflow

## Purpose

Execute the selected workflow and handle the execution results.

## Actions

### 1. Load Target Workflow

Load the appropriate workflow based on the detected intent:

```typescript
function loadWorkflow(workflowName: string): Workflow {
  const workflowPaths = {
    'quick-spec': quick_spec_workflow,
    'quick-dev': quick_dev_workflow,
    'check-compliance': check_compliance_workflow,
    'help-system': help_system_workflow
  };
  
  const workflowPath = workflowPaths[workflowName];
  
  if (!workflowPath) {
    throw new Error(`Workflow not found: ${workflowName}`);
  }
  
  return loadWorkflowFromFile(workflowPath);
}
```

### 2. Execute Workflow

Execute the loaded workflow with the user's input:

```typescript
function executeWorkflow(workflow: Workflow, userInput: string): Promise<WorkflowResult> {
  try {
    // Initialize workflow execution
    const executionContext = {
      userInput,
      startTime: Date.now(),
      workflowName: workflow.name,
      config: loadConfig()
    };
    
    // Execute workflow steps
    const result = await workflow.execute(executionContext);
    
    return {
      success: true,
      result,
      executionTime: Date.now() - executionContext.startTime
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      executionTime: Date.now() - executionContext.startTime
    };
  }
}
```

### 3. Monitor Execution

Monitor the workflow execution and provide progress updates:

```typescript
function monitorExecution(execution: Promise<WorkflowResult>): void {
  execution.then(result => {
    if (result.success) {
      console.log(`✅ 工作流执行成功: ${result.result}`);
    } else {
      console.log(`❌ 工作流执行失败: ${result.error}`);
    }
  }).catch(error => {
    console.log(`🚨 工作流执行异常: ${error.message}`);
  });
}
```

### 4. Handle Results

Process the workflow execution results:

```typescript
function handleResults(result: WorkflowResult): string {
  if (result.success) {
    return `工作流执行完成。结果：${result.result}`;
  } else {
    return `工作流执行失败。错误：${result.error}`;
  }
}
```

### 5. Provide Completion Feedback

Inform the user about the workflow completion:

```typescript
function provideCompletionFeedback(result: WorkflowResult): string {
  const status = result.success ? '✅ 成功' : '❌ 失败';
  const time = ` (${result.executionTime}ms)`;
  
  return `工作流执行${status}${time}\n${handleResults(result)}`;
}
```

### 6. Update Progress

Update the workflow progress in the output file:

```typescript
function updateProgress(stepsCompleted: string[], result: WorkflowResult): void {
  const frontmatter = {
    stepsCompleted: [...stepsCompleted, 'route-workflow'],
    currentStep: 'completed',
    lastUpdated: new Date().toISOString(),
    executionResult: result
  };
  
  // Save progress to output file
  saveProgress(frontmatter);
}
```

## Implementation

### Execute Workflow Routing

1. **Load Workflow**: Load the target workflow file
2. **Execute Workflow**: Run the workflow with user input
3. **Monitor Execution**: Track execution progress
4. **Handle Results**: Process execution results
5. **Provide Feedback**: Inform user about completion
6. **Update Progress**: Record completion status

### Error Handling

- **Workflow Not Found**: Handle missing workflow files
- **Execution Errors**: Handle workflow execution failures
- **System Errors**: Handle system-level errors

### Success Criteria

- ✅ Workflow loaded successfully
- ✅ Workflow executed successfully
- ✅ Results processed correctly
- ✅ User feedback provided
- ✅ Progress updated
- ✅ Workflow completed

## Workflow Integration

### Quick Spec Integration
```typescript
function executeQuickSpec(userInput: string): Promise<WorkflowResult> {
  const workflow = loadWorkflow('quick-spec');
  return executeWorkflow(workflow, userInput);
}
```

### Quick Dev Integration
```typescript
function executeQuickDev(userInput: string): Promise<WorkflowResult> {
  const workflow = loadWorkflow('quick-dev');
  return executeWorkflow(workflow, userInput);
}
```

### Check Compliance Integration
```typescript
function executeCheckCompliance(userInput: string): Promise<WorkflowResult> {
  const workflow = loadWorkflow('check-compliance');
  return executeWorkflow(workflow, userInput);
}
```

### Help System Integration
```typescript
function executeHelpSystem(userInput: string): Promise<WorkflowResult> {
  const workflow = loadWorkflow('help-system');
  return executeWorkflow(workflow, userInput);
}
```

## Performance Monitoring

### Execution Metrics
```typescript
interface ExecutionMetrics {
  workflowName: string;
  executionTime: number;
  success: boolean;
  errorCount: number;
  userSatisfaction: number;
}
```

### Usage Analytics
```typescript
function trackUsage(metrics: ExecutionMetrics): void {
  // Send metrics to analytics system
  analytics.track('workflow_execution', metrics);
}
```

## Error Recovery

### Retry Logic
```typescript
async function executeWithRetry(workflow: Workflow, userInput: string, maxRetries: number = 3): Promise<WorkflowResult> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await executeWorkflow(workflow, userInput);
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### Fallback Options
```typescript
function getFallbackWorkflow(originalWorkflow: string): string {
  const fallbacks = {
    'quick-spec': 'help-system',
    'quick-dev': 'help-system',
    'check-compliance': 'help-system',
    'help-system': 'help-system'
  };
  
  return fallbacks[originalWorkflow] || 'help-system';
}
```

## Completion

### Workflow Completion
- ✅ All steps completed successfully
- ✅ Results processed and provided
- ✅ User feedback delivered
- ✅ Progress updated
- ✅ Workflow marked as completed

### Next Steps
- Return to user with results
- Provide suggestions for next actions
- Update usage metrics
- Clean up resources

---

*Step created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
