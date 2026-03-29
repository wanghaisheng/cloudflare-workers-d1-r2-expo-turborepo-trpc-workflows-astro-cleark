---
name: unified
description: "Intelligent workflow router with OpenSpec integration for Quick Dev mode seamless workflow management"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "mandatory"
openspec_role: "router"
workflow_type: "quick_dev"
---

# Checkpoint handler paths
quick_spec_workflow: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-spec/workflow.md'
quick_dev_workflow: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-dev/workflow.md'
check_compliance_workflow: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/check-compliance/workflow.md'

# Unified Workflow Router

**Goal**: Provide a single entry point for all BMAD workflows with intelligent intent detection and automatic routing.

**INTELLIGENT ROUTING STANDARD:**

The unified workflow must:
- **Detect Intent**: Analyze user input to determine the appropriate workflow
- **Route Automatically**: Route to the correct workflow without user intervention
- **Provide Feedback**: Give clear feedback about the routing decision
- **Handle Errors**: Gracefully handle unknown intents or workflow failures

---

## WORKFLOW ARCHITECTURE

This uses **intelligent routing architecture** for smart workflow selection:

### Core Principles

- **Intent-First**: Analyze user intent before any action
- **Smart Routing**: Automatically route to the best workflow
- **User-Friendly**: Provide clear feedback and suggestions
- **Error-Resilient**: Handle unknown intents gracefully

### Routing Rules

1. **ANALYZE INPUT**: Always analyze user input first
2. **DETECT INTENT**: Use keyword matching and context analysis
3. **ROUTE WORKFLOW**: Route to the most appropriate workflow
4. **PROVIDE FEEDBACK**: Tell user what workflow was selected
5. **EXECUTE WORKFLOW**: Execute the routed workflow

### Critical Rules (NO EXCEPTIONS)

- **ALWAYS** analyze user input before routing
- **NEVER** assume user intent without analysis
- **ALWAYS** provide feedback about routing decisions
- **ALWAYS** handle unknown intents gracefully
- **NEVER** fail without providing guidance

---

## INITIALIZATION SEQUENCE

### 1. Configuration Loading

Load and read full config from `{main_config}` and resolve:
- `project_name`, `output_folder`, `planning_artifacts`, `implementation_artifacts`, `user_name`
- `communication_language`, `document_output_language`, `user_skill_level`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### 2. Intent Detection Setup

Initialize intent detection system:
```typescript
const intentPatterns = {
  create: ['创建', '新建', '增加', '添加', '生成', '分析', '调研', '研究', '评估'],
  implement: ['实施', '开发', '实现', '重构', '修改', '添加', '功能'],
  check: ['检查', '验证', '测试', '确认', '合规'],
  help: ['帮助', '指导', '教程', '说明', '如何']
};
```

### 3. First Step Execution

Load, read the full file, and then execute `steps/step-01-detect-intent.md` to begin the workflow.

---

## STEP FILES

### Step 1: Intent Detection
**File**: `steps/step-01-detect-intent.md`

**Purpose**: Analyze user input and determine the appropriate workflow

**Actions**:
1. Analyze user input for intent keywords
2. Match intent to workflow category
3. Determine target workflow
4. Provide routing feedback to user
5. Route to the appropriate workflow

### Step 2: Workflow Routing
**File**: `steps/step-02-route-workflow.md`

**Purpose**: Route to the selected workflow and execute it

**Actions**:
1. Load the target workflow
2. Execute the workflow with user input
3. Monitor workflow execution
4. Handle workflow completion or errors
5. Provide final feedback to user

---

## INTELLIGENT ROUTING LOGIC

### Intent Detection Algorithm

```typescript
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

### Workflow Mapping

```typescript
const workflowMapping = {
  create: 'quick-spec',
  implement: 'quick-dev',
  check: 'check-compliance',
  help: 'help-system'
};
```

### Routing Decision

```typescript
function routeToWorkflow(intent: IntentType): string {
  const workflow = workflowMapping[intent];
  
  if (!workflow) {
    throw new Error(`Unknown intent: ${intent}`);
  }
  
  return workflow;
}
```

---

## ERROR HANDLING

### Unknown Intent
```typescript
function handleUnknownIntent(userInput: string): string {
  return `无法识别意图："${userInput}"。请尝试：
- "创建..." 用于创建新变更
- "实施..." 用于开发功能
- "检查..." 用于验证合规
- "帮助..." 获取使用指导`;
}
```

### Workflow Not Found
```typescript
function handleWorkflowNotFound(workflow: string): string {
  return `工作流 "${workflow}" 未找到。可用工作流：quick-spec, quick-dev, check-compliance`;
}
```

### Workflow Execution Error
```typescript
function handleWorkflowError(error: Error, workflow: string): string {
  return `工作流 "${workflow}" 执行失败：${error.message}。请检查输入并重试。`;
}
```

---

## USER FEEDBACK

### Routing Feedback
```typescript
function provideRoutingFeedback(intent: IntentType, workflow: string): string {
  return `检测到${intent}意图，路由到 ${workflow} 工作流。`;
}
```

### Completion Feedback
```typescript
function provideCompletionFeedback(workflow: string, success: boolean): string {
  if (success) {
    return `工作流 ${workflow} 执行完成。`;
  } else {
    return `工作流 ${workflow} 执行失败。`;
  }
}
```

---

## INTEGRATION WITH EXISTING WORKFLOWS

### Quick Spec Integration
```typescript
function executeQuickSpec(userInput: string): Promise<WorkflowResult> {
  // Load and execute quick-spec workflow
  const workflowPath = quick_spec_workflow;
  return executeWorkflow(workflowPath, userInput);
}
```

### Quick Dev Integration
```typescript
function executeQuickDev(userInput: string): Promise<WorkflowResult> {
  // Load and execute quick-dev workflow
  const workflowPath = quick_dev_workflow;
  return executeWorkflow(workflowPath, userInput);
}
```

### Check Compliance Integration
```typescript
function executeCheckCompliance(userInput: string): Promise<WorkflowResult> {
  // Load and execute check-compliance workflow
  const workflowPath = check_compliance_workflow;
  return executeWorkflow(workflowPath, userInput);
}
```

---

## MONITORING AND ANALYTICS

### Usage Tracking
```typescript
interface UsageEvent {
  timestamp: Date;
  userInput: string;
  detectedIntent: IntentType;
  routedWorkflow: string;
  executionTime: number;
  success: boolean;
  error?: string;
}
```

### Performance Metrics
```typescript
interface PerformanceMetrics {
  intentDetectionTime: number;
  routingTime: number;
  workflowExecutionTime: number;
  totalTime: number;
}
```

---

## CONFIGURATION

### Default Settings
```yaml
unified_workflow:
  default_intent: create
  default_workflow: quick-spec
  enable_smart_suggestions: true
  enable_auto_routing: true
  enable_usage_tracking: true
```

### Project-Specific Settings
```yaml
project:
  name: Balance-X
  type: health-information
  complexity: medium
  preferred_mode: quick-dev
  enable_bmm_mode: false
```

---

## FUTURE ENHANCEMENTS

### Machine Learning Integration
- Learn from user patterns
- Improve intent detection accuracy
- Personalized routing suggestions

### Natural Language Processing
- Advanced NLP for better intent understanding
- Context-aware routing
- Multilingual support

### GUI Integration
- Visual workflow selection
- Drag-and-drop workflow builder
- Real-time workflow status

---

## TESTING

### Intent Detection Tests
```typescript
describe('Intent Detection', () => {
  test('should detect create intent', () => {
    expect(detectIntent('创建组件组织变更')).toBe('create');
  });
  
  test('should detect implement intent', () => {
    expect(detectIntent('实施用户认证功能')).toBe('implement');
  });
  
  test('should detect check intent', () => {
    expect(detectIntent('检查变更合规性')).toBe('check');
  });
});
```

### Routing Tests
```typescript
describe('Workflow Routing', () => {
  test('should route create intent to quick-spec', () => {
    expect(routeToWorkflow('create')).toBe('quick-spec');
  });
  
  test('should route implement intent to quick-dev', () => {
    expect(routeToWorkflow('implement')).toBe('quick-dev');
  });
});
```

---

## DOCUMENTATION

### User Guide
- Quick start guide
- Intent examples
- Workflow descriptions
- Troubleshooting guide

### Developer Guide
- Intent detection algorithm
- Workflow integration
- Error handling
- Performance optimization

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
