---
name: status-management
description: "Unified status management for OpenSpec changes across both Quick Dev and BMM modes"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "mandatory"
openspec_role: "status_manager"
workflow_type: "shared"

# Checkpoint handler paths
unified_workflow: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/unified/workflow.md'
status_tracker: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/status-management/status-tracker.md'
quality_monitor: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/status-management/quality-monitor.md'
---

# Status Management Workflow

**Goal:** Provide unified status management for OpenSpec changes, tracking progress across all workflows and modes with real-time updates and quality monitoring.

**STATUS MANAGEMENT STANDARDS:**

A change status is considered "Accurate" ONLY if it meets the following:

- **Real-time Updates**: Status updates reflect current state
- **Workflow Integration**: All workflows contribute to status
- **Quality Metrics**: Quality metrics are tracked and updated
- **Historical Tracking**: Complete status change history
- **Cross-mode Consistency**: Status consistent across Quick Dev and BMM modes

---

**Your Role:** You are a status management specialist ensuring accurate and comprehensive status tracking for all OpenSpec changes.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined status management:

### Core Principles

- **Unified Tracking**: Single source of truth for all status information
- **Real-time Updates**: Status updates happen immediately
- **Cross-workflow Integration**: All workflows update status consistently
- **Quality Monitoring**: Quality metrics are tracked alongside status
- **Historical Preservation**: Complete status change history is maintained

### Step Processing Rules

1. **INITIALIZE STATUS**: Initialize status tracking for new changes
2. **UPDATE STATUS**: Update status from workflow events
3. **MONITOR QUALITY**: Monitor quality metrics alongside status
4. **SYNC STATUS**: Synchronize status across all components
5. **REPORT STATUS**: Generate comprehensive status reports

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Status Paths

- `openspec_changes` = `{output_folder}/changes`
- `status_directory` = `{openspec_changes}/.status`
- `global_status` = `{status_directory}/global-status.json`
- `change_status` = `{openspec_changes}/{change_name}/status.json`
- `status_history` = `{status_directory}/history/{change_name}.json`

---

## STATUS DATA MODEL

### Status Schema

```typescript
interface ChangeStatus {
  changeName: string;
  currentStatus: 'planning' | 'in-progress' | 'testing' | 'completed' | 'archived' | 'failed';
  mode: 'quick-dev' | 'bmm';
  workflow: string;
  progress: {
    total: number;
    completed: number;
    percentage: number;
  };
  quality: {
    codeQuality: number;
    documentationQuality: number;
    testCoverage: number;
    complianceScore: number;
  };
  timeline: {
    created: Date;
    lastUpdated: Date;
    estimatedCompletion?: Date;
    actualCompletion?: Date;
  };
  participants: string[];
  blockers: string[];
  risks: string[];
  lastActivity: Date;
  metadata: Record<string, any>;
}
```

### Global Status Schema

```typescript
interface GlobalStatus {
  totalChanges: number;
  activeChanges: number;
  completedChanges: number;
  archivedChanges: number;
  failedChanges: number;
  overallProgress: number;
  overallQuality: number;
  lastUpdated: Date;
  changes: Record<string, ChangeStatus>;
}
```

---

## STATUS MANAGEMENT OPERATIONS

### 1. Status Initialization

```typescript
const initializeStatus = (changeName: string, mode: 'quick-dev' | 'bmm', workflow: string): ChangeStatus => {
  const status: ChangeStatus = {
    changeName,
    currentStatus: 'planning',
    mode,
    workflow,
    progress: {
      total: 0,
      completed: 0,
      percentage: 0
    },
    quality: {
      codeQuality: 0,
      documentationQuality: 0,
      testCoverage: 0,
      complianceScore: 0
    },
    timeline: {
      created: new Date(),
      lastUpdated: new Date()
    },
    participants: [],
    blockers: [],
    risks: [],
    lastActivity: new Date(),
    metadata: {}
  };
  
  // Save status
  saveChangeStatus(changeName, status);
  
  // Update global status
  updateGlobalStatus();
  
  return status;
};
```

### 2. Status Updates

```typescript
const updateStatus = (changeName: string, updates: Partial<ChangeStatus>): void => {
  const currentStatus = getChangeStatus(changeName);
  
  // Apply updates
  const updatedStatus = {
    ...currentStatus,
    ...updates,
    timeline: {
      ...currentStatus.timeline,
      lastUpdated: new Date()
    },
    lastActivity: new Date()
  };
  
  // Calculate derived values
  updatedStatus.progress.percentage = calculateProgress(updatedStatus.progress);
  updatedStatus.quality = calculateQuality(updatedStatus.quality);
  
  // Save updated status
  saveChangeStatus(changeName, updatedStatus);
  
  // Update global status
  updateGlobalStatus();
  
  // Record status change
  recordStatusChange(changeName, currentStatus, updatedStatus);
};
```

### 3. Progress Tracking

```typescript
const updateProgress = (changeName: string, completed: number, total: number): void => {
  const progress = {
    total,
    completed,
    percentage: total > 0 ? (completed / total) * 100 : 0
  };
  
  updateStatus(changeName, { progress });
  
  // Check for completion
  if (progress.percentage === 100) {
    updateStatus(changeName, { currentStatus: 'completed' });
  }
};
```

### 4. Quality Monitoring

```typescript
const updateQuality = (changeName: string, qualityMetrics: Partial<ChangeStatus['quality']>): void => {
  const currentQuality = getChangeStatus(changeName).quality;
  const updatedQuality = {
    ...currentQuality,
    ...qualityMetrics
  };
  
  // Calculate overall quality score
  updatedQuality.overall = calculateOverallQuality(updatedQuality);
  
  updateStatus(changeName, { quality: updatedQuality });
};
```

### 5. Status Synchronization

```typescript
const synchronizeStatus = (changeName: string): void => {
  // Sync status across all components
  const status = getChangeStatus(changeName);
  
  // Update workflow status
  updateWorkflowStatus(changeName, status);
  
  // Update global status
  updateGlobalStatus();
  
  // Update participant status
  updateParticipantStatus(changeName, status);
  
  // Update quality monitor
  updateQualityMonitor(changeName, status);
};
```

---

## QUALITY MONITORING

### Quality Metrics

```typescript
interface QualityMetrics {
  codeQuality: {
    cyclomaticComplexity: number;
    maintainabilityIndex: number;
    technicalDebt: number;
    testCoverage: number;
  };
  documentationQuality: {
    completeness: number;
    accuracy: number;
    clarity: number;
    consistency: number;
  };
  processQuality: {
    timelineAdherence: number;
    requirementSatisfaction: number;
    stakeholderSatisfaction: number;
  };
}
```

### Quality Calculation

```typescript
const calculateOverallQuality = (quality: ChangeStatus['quality']): number => {
  const weights = {
    codeQuality: 0.4,
    documentationQuality: 0.3,
    testCoverage: 0.2,
    complianceScore: 0.1
  };
  
  return Object.entries(weights).reduce((total, [key, weight]) => {
    return total + (quality[key] * weight);
  }, 0);
};
```

### Quality Monitoring

```typescript
const monitorQuality = (changeName: string): void => {
  const metrics = collectQualityMetrics(changeName);
  
  updateQuality(changeName, {
    codeQuality: metrics.codeQuality.testCoverage,
    documentationQuality: metrics.documentationQuality.completeness,
    testCoverage: metrics.codeQuality.testCoverage,
    complianceScore: calculateComplianceScore(metrics)
  });
  
  // Check quality thresholds
  checkQualityThresholds(changeName, metrics);
};
```

---

## STATUS REPORTING

### Status Reports

```typescript
interface StatusReport {
  changeName: string;
  currentStatus: string;
  progress: ChangeStatus['progress'];
  quality: ChangeStatus['quality'];
  timeline: ChangeStatus['timeline'];
  participants: string[];
  blockers: string[];
  risks: string[];
  recommendations: string[];
  generatedAt: Date;
}

const generateStatusReport = (changeName: string): StatusReport => {
  const status = getChangeStatus(changeName);
  
  return {
    changeName: status.changeName,
    currentStatus: status.currentStatus,
    progress: status.progress,
    quality: status.quality,
    timeline: status.timeline,
    participants: status.participants,
    blockers: status.blockers,
    risks: status.risks,
    recommendations: generateRecommendations(status),
    generatedAt: new Date()
  };
};
```

### Global Status Report

```typescript
interface GlobalStatusReport {
  totalChanges: number;
  activeChanges: number;
  completedChanges: number;
  overallProgress: number;
  overallQuality: number;
  changesByStatus: Record<string, number>;
  changesByMode: Record<string, number>;
  topBlockers: string[];
  topRisks: string[];
  generatedAt: Date;
}

const generateGlobalStatusReport = (): GlobalStatusReport => {
  const globalStatus = getGlobalStatus();
  
  return {
    totalChanges: globalStatus.totalChanges,
    activeChanges: globalStatus.activeChanges,
    completedChanges: globalStatus.completedChanges,
    overallProgress: globalStatus.overallProgress,
    overallQuality: globalStatus.overallQuality,
    changesByStatus: groupByStatus(globalStatus.changes),
    changesByMode: groupByMode(globalStatus.changes),
    topBlockers: getTopBlockers(globalStatus.changes),
    topRisks: getTopRisks(globalStatus.changes),
    generatedAt: new Date()
  };
};
```

---

## STATUS HISTORY

### History Tracking

```typescript
interface StatusChange {
  timestamp: Date;
  changeName: string;
  oldStatus: string;
  newStatus: string;
  updatedBy: string;
  reason: string;
  metadata: Record<string, any>;
}

const recordStatusChange = (changeName: string, oldStatus: ChangeStatus, newStatus: ChangeStatus): void => {
  const change: StatusChange = {
    timestamp: new Date(),
    changeName,
    oldStatus: oldStatus.currentStatus,
    newStatus: newStatus.currentStatus,
    updatedBy: getCurrentUser(),
    reason: getChangeReason(oldStatus, newStatus),
    metadata: extractMetadataChanges(oldStatus, newStatus)
  };
  
  saveStatusChange(changeName, change);
};
```

### History Analysis

```typescript
const analyzeStatusHistory = (changeName: string): StatusAnalysis => {
  const history = getStatusHistory(changeName);
  
  return {
    totalChanges: history.length,
    averageTimeInStatus: calculateAverageTimeInStatus(history),
    statusTransitions: analyzeStatusTransitions(history),
    qualityTrends: analyzeQualityTrends(history),
    participantActivity: analyzeParticipantActivity(history)
  };
};
```

---

## NOTIFICATIONS

### Status Notifications

```typescript
const sendStatusNotification = (changeName: string, notification: StatusNotification): void => {
  const participants = getChangeStatus(changeName).participants;
  
  participants.forEach(participant => {
    sendNotification(participant, notification);
  });
};

interface StatusNotification {
  type: 'status_change' | 'quality_alert' | 'blocker_added' | 'risk_identified';
  changeName: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
}
```

### Alert System

```typescript
const checkForAlerts = (changeName: string): void => {
  const status = getChangeStatus(changeName);
  
  // Check for blockers
  if (status.blockers.length > 0) {
    sendStatusNotification(changeName, {
      type: 'blocker_added',
      changeName,
      message: `New blocker detected: ${status.blockers[0]}`,
      severity: 'high',
      timestamp: new Date()
    });
  }
  
  // Check for quality issues
  if (status.quality.overall < 70) {
    sendStatusNotification(changeName, {
      type: 'quality_alert',
      changeName,
      message: `Quality score below threshold: ${status.quality.overall}`,
      severity: 'medium',
      timestamp: new Date()
    });
  }
  
  // Check for risks
  if (status.risks.length > 0) {
    sendStatusNotification(changeName, {
      type: 'risk_identified',
      changeName,
      message: `New risk identified: ${status.risks[0]}`,
      severity: 'medium',
      timestamp: new Date()
    });
  }
};
```

---

## INTEGRATION

### Workflow Integration

```typescript
const integrateWithWorkflow = (workflowName: string): void => {
  // Register status update handlers
  registerStatusHandler(workflowName, (changeName, event) => {
    switch (event.type) {
      case 'task_completed':
        updateProgress(changeName, event.completed, event.total);
        break;
      case 'quality_check':
        updateQuality(changeName, event.metrics);
        break;
      case 'status_change':
        updateStatus(changeName, event.updates);
        break;
    }
  });
};
```

### Agent Integration

```typescript
const integrateWithAgents = (): void => {
  // Register agent status handlers
  registerAgentHandler('analyst', (changeName, activity) => {
    updateStatus(changeName, {
      participants: addParticipant(changeName, 'analyst'),
      lastActivity: new Date()
    });
  });
  
  registerAgentHandler('dev', (changeName, activity) => {
    updateStatus(changeName, {
      participants: addParticipant(changeName, 'dev'),
      lastActivity: new Date()
    });
  });
};
```

---

## CONFIGURATION

### Status Management Configuration

```yaml
status_management:
  update_frequency: "real_time"
  history_retention: "90_days"
  notification_thresholds:
    quality_score: 70
    progress_stalled: "7_days"
    blocker_count: 3
  
  quality_metrics:
    code_quality_weight: 0.4
    documentation_quality_weight: 0.3
    test_coverage_weight: 0.2
    compliance_score_weight: 0.1
  
  notifications:
    enabled: true
    channels: ["email", "slack", "webhook"]
    severity_levels: ["low", "medium", "high", "critical"]
  
  reporting:
    daily_summary: true
    weekly_report: true
    monthly_analysis: true
    real_time_dashboard: true
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleStatusErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'ENOENT': () => console.log(`Status file not found in ${context}`),
    'EACCES': () => console.log(`Permission denied in ${context}`),
    'JSON_PARSE': () => console.log(`JSON parse error in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.code] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptStatusRecovery = (changeName: string): boolean => {
  try {
    // Attempt to fix common status issues
    fixStatusPermissions(changeName);
    fixStatusStructure(changeName);
    fixStatusData(changeName);
    
    return true;
  } catch (error) {
    console.log(`Status recovery failed for ${changeName}: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Status Management Test Suite

```typescript
describe('Status Management', () => {
  test('should initialize status for new change', () => {
    const status = initializeStatus('test-change', 'quick-dev', 'quick-spec');
    expect(status.currentStatus).toBe('planning');
  });
  
  test('should update status correctly', () => {
    updateStatus('test-change', { currentStatus: 'in-progress' });
    const updated = getChangeStatus('test-change');
    expect(updated.currentStatus).toBe('in-progress');
  });
  
  test('should track progress correctly', () => {
    updateProgress('test-change', 5, 10);
    const updated = getChangeStatus('test-change');
    expect(updated.progress.percentage).toBe(50);
  });
  
  test('should monitor quality metrics', () => {
    updateQuality('test-change', { codeQuality: 85 });
    const updated = getChangeStatus('test-change');
    expect(updated.quality.codeQuality).toBe(85);
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
