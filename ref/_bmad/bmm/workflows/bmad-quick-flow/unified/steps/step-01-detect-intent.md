# Step 1: Intent Detection

## Purpose

Analyze user input to determine the appropriate workflow and provide routing feedback.

## Actions

### 1. Analyze User Input

First, analyze the user's input to determine their intent:

```typescript
// Intent detection patterns
const intentPatterns = {
  create: ['创建', '新建', '增加', '添加', '生成', '分析', '调研', '研究', '评估'],
  implement: ['实施', '开发', '实现', '重构', '修改', '添加', '功能'],
  check: ['检查', '验证', '测试', '确认', '合规'],
  help: ['帮助', '指导', '教程', '说明', '如何']
};

function detectIntent(userInput: string): IntentType {
  const input = userInput.toLowerCase();
  
  // Check for create intent
  if (containsAny(input, intentPatterns.create)) {
    return 'create';
  }
  
  // Check for implement intent
  if (containsAny(input, intentPatterns.implement)) {
    return 'implement';
  }
  
  // Check for check intent
  if (containsAny(input, intentPatterns.check)) {
    return 'check';
  }
  
  // Check for help intent
  if (containsAny(input, intentPatterns.help)) {
    return 'help';
  }
  
  // Default to create for unknown intent
  return 'create';
}
```

### 2. Determine Target Workflow

Map the detected intent to the appropriate workflow:

```typescript
const workflowMapping = {
  create: 'quick-spec',
  implement: 'quick-dev',
  check: 'check-compliance',
  help: 'help-system'
};

function routeToWorkflow(intent: IntentType): string {
  const workflow = workflowMapping[intent];
  
  if (!workflow) {
    throw new Error(`Unknown intent: ${intent}`);
  }
  
  return workflow;
}
```

### 3. Provide Routing Feedback

Inform the user about the routing decision:

```typescript
function provideRoutingFeedback(intent: IntentType, workflow: string): string {
  const intentNames = {
    create: '创建/分析',
    implement: '实施/开发',
    check: '检查/验证',
    help: '帮助/指导'
  };
  
  return `检测到${intentNames[intent]}意图，自动路由到 ${workflow} 工作流。`;
}
```

### 4. Handle Unknown Intent

If intent cannot be determined, provide helpful guidance:

```typescript
function handleUnknownIntent(userInput: string): string {
  return `无法识别意图："${userInput}"。请尝试：
- "创建..." 用于创建新变更
- "实施..." 用于开发功能
- "检查..." 用于验证合规
- "帮助..." 获取使用指导`;
}
```

### 5. Update Progress

Update the workflow progress in the output file:

```typescript
function updateProgress(stepsCompleted: string[]): void {
  // Update frontmatter with completed steps
  const frontmatter = {
    stepsCompleted: [...stepsCompleted, 'detect-intent'],
    currentStep: 'route-workflow',
    lastUpdated: new Date().toISOString()
  };
  
  // Save progress to output file
  saveProgress(frontmatter);
}
```

## Implementation

### Execute Intent Detection

1. **Read User Input**: Get the user's input from the context
2. **Detect Intent**: Use the intent detection algorithm
3. **Route Workflow**: Map intent to the appropriate workflow
4. **Provide Feedback**: Inform the user about the routing decision
5. **Update Progress**: Record the completion of this step

### Error Handling

- **Invalid Input**: Handle empty or invalid user input
- **Unknown Intent**: Provide helpful guidance for unknown intents
- **System Errors**: Gracefully handle system errors during detection

### Success Criteria

- ✅ Intent detected successfully
- ✅ Workflow routed correctly
- ✅ User feedback provided
- ✅ Progress updated
- ✅ Ready for next step

## Next Step

After intent detection is complete, proceed to **Step 2: Route Workflow** to execute the selected workflow.

---

*Step created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
