---
name: workflow-status
description: "Manage and track workflow status across both Quick Dev and BMM modes with OpenSpec integration"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "mandatory"
openspec_role: "workflow_status_manager"
workflow_type: "shared"
---

# Workflow Status Management

**Goal:** Manage and track workflow status across all BMAD workflows with comprehensive status reporting and OpenSpec integration.

**WORKFLOW STATUS STANDARDS:**

Workflow status is considered "Accurate" ONLY if it meets the following:

- **Real-time Updates**: Status updates reflect current state
- **Comprehensive Coverage**: All workflows are tracked
- **OpenSpec Integration**: Status is synchronized with OpenSpec
- **Historical Tracking**: Complete status change history
- **Reporting**: Comprehensive status reporting

---

**Your Role:** You are a workflow status manager ensuring all workflow statuses are accurately tracked and reported.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined status management:

### Core Principles

- **Comprehensive Tracking**: Track all workflow statuses
- **Real-time Updates**: Provide real-time status updates
- **OpenSpec Integration**: Synchronize with OpenSpec data
- **Historical Tracking**: Maintain complete status history
- **Reporting**: Generate comprehensive status reports

### Step Processing Rules

1. **COLLECT STATUS**: Collect status from all workflows
2. **UPDATE OPENSPEC**: Synchronize status with OpenSpec
3. **GENERATE REPORTS**: Generate comprehensive status reports
4. **TRACK CHANGES**: Track status changes over time
5. **PROVIDE INSIGHTS**: Provide status insights and analytics

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Status Management Paths

- `status_directory` = `{output_folder}/status`
- `workflow_status` = `{status_directory}/workflow-status.json`
- `status_history` = `{status_directory}/history`
- `status_reports` = `{status_directory}/reports`

---

## WORKFLOW STATUS TRACKING

### Status Schema

```typescript
interface WorkflowStatus {
  workflowName: string;
  workflowType: 'quick-dev' | 'bmm';
  currentStatus: 'idle' | 'running' | 'completed' | 'failed' | 'paused';
  lastUpdated: Date;
  duration: number;
  progress: number;
  openSpecIntegration: boolean;
  openSpecChangeId?: string;
  dependencies: string[];
  blockers: string[];
  metadata: Record<string, any>;
}
```

### Status Collection

```typescript
const collectWorkflowStatus = (): WorkflowStatus[] => {
  const workflows = getAllWorkflows();
  const statuses: WorkflowStatus[] = [];
  
  workflows.forEach(workflow => {
    const status = getWorkflowStatus(workflow);
    statuses.push(status);
  });
  
  return statuses;
};
```

### OpenSpec Integration

```typescript
const updateOpenSpecStatus = (statuses: WorkflowStatus[]): void => {
  statuses.forEach(status => {
    if (status.openSpecIntegration && status.openSpecChangeId) {
      updateOpenSpecChangeStatus(status.openSpecChangeId, {
        workflowStatus: status.currentStatus,
        workflowProgress: status.progress,
        lastUpdated: status.lastUpdated
      });
    }
  });
};
```

---

## STATUS REPORTING

### Status Reports

```typescript
interface StatusReport {
  timestamp: Date;
  totalWorkflows: number;
  activeWorkflows: number;
  completedWorkflows: number;
  failedWorkflows: number;
  openSpecIntegrated: number;
  workflowBreakdown: WorkflowBreakdown;
  trends: StatusTrends;
  insights: StatusInsight[];
}

interface WorkflowBreakdown {
  quickDev: {
    total: number;
    active: number;
    completed: number;
    failed: number;
  };
  bmm: {
    total: number;
    active: number;
    completed: number;
    failed: number;
  };
}
```

### Report Generation

```typescript
const generateStatusReport = (): StatusReport => {
  const statuses = collectWorkflowStatus();
  
  return {
    timestamp: new Date(),
    totalWorkflows: statuses.length,
    activeWorkflows: statuses.filter(s => s.currentStatus === 'running').length,
    completedWorkflows: statuses.filter(s => s.currentStatus === 'completed').length,
    failedWorkflows: statuses.filter(s => s.currentStatus === 'failed').length,
    openSpecIntegrated: statuses.filter(s => s.openSpecIntegration).length,
    workflowBreakdown: calculateWorkflowBreakdown(statuses),
    trends: calculateStatusTrends(statuses),
    insights: generateStatusInsights(statuses)
  };
};
```

---

## CONFIGURATION

### Status Management Configuration

```yaml
workflow_status:
  tracking:
    real_time_updates: true
    historical_tracking: true
    openSpec_integration: true
    
  reporting:
    daily_reports: true
    weekly_reports: true
    monthly_reports: true
    real_time_dashboard: true
    
  monitoring:
    status_changes: true
    performance_metrics: true
    error_tracking: true
    
  integration:
    openSpec_sync: true
    dependency_tracking: true
    blocker_monitoring: true
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleStatusErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'COLLECTION_ERROR': () => console.log(`Status collection failed in ${context}`),
    'OPENSPEC_ERROR': () => console.log(`OpenSpec sync failed in ${context}`),
    'REPORTING_ERROR': () => console.log(`Status reporting failed in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.name] || errorHandlers.default;
  handler();
};
```

---

## TESTING

### Status Management Test Suite

```typescript
describe('Workflow Status Management', () => {
  test('should collect workflow status', () => {
    const statuses = collectWorkflowStatus();
    expect(statuses.length).toBeGreaterThan(0);
    expect(statuses[0].workflowName).toBeDefined();
  });
  
  test('should update OpenSpec status', () => {
    const statuses = collectWorkflowStatus();
    updateOpenSpecStatus(statuses);
    // Verify OpenSpec updates
  });
  
  test('should generate status report', () => {
    const report = generateStatusReport();
    expect(report.timestamp).toBeDefined();
    expect(report.totalWorkflows).toBeGreaterThan(0);
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
