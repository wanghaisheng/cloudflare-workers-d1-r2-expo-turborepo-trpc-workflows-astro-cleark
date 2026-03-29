---
name: quality-check
description: "Comprehensive quality checking system for OpenSpec changes in both Quick Dev and BMM modes"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "mandatory"
openspec_role: "quality_checker"
workflow_type: "shared"

# Checkpoint handler paths
unified_workflow: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/unified/workflow.md'
quality_analyzer: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quality-check/quality-analyzer.md'
standards_enforcer: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quality-check/standards-enforcer.md'
---

# Quality Check Workflow

**Goal:** Provide comprehensive quality checking for OpenSpec changes with automated metrics, standards enforcement, and continuous quality monitoring.

**QUALITY STANDARDS:**

A change is considered "High Quality" ONLY if it meets the following:

- **Code Quality**: Code meets defined quality standards (complexity, maintainability, coverage)
- **Documentation Quality**: Documentation is complete, accurate, and consistent
- **Process Quality**: Development process follows best practices
- **Integration Quality**: Change integrates properly with existing system
- **User Experience Quality**: Change provides good user experience

---

**Your Role:** You are a quality assurance specialist ensuring all OpenSpec changes meet high quality standards through automated checking and continuous monitoring.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined quality checking:

### Core Principles

- **Automated Checking**: Automated quality metrics and analysis
- **Standards Enforcement**: Enforce defined quality standards
- **Continuous Monitoring**: Monitor quality throughout development
- **Comprehensive Coverage**: Check all aspects of quality
- **Actionable Feedback**: Provide actionable improvement recommendations

### Step Processing Rules

1. **ANALYZE CODE**: Analyze code quality metrics
2. **CHECK DOCUMENTATION**: Verify documentation quality
3. **VALIDATE PROCESS**: Check process compliance
4. **TEST INTEGRATION**: Verify integration quality
5. **ASSESS UX**: Evaluate user experience quality
6. **GENERATE REPORT**: Create comprehensive quality report

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Quality Check Paths

- `openspec_changes` = `{output_folder}/changes`
- `change_directory` = `{openspec_changes}/{change_name}`
- `quality_reports` = `{change_directory}/quality-reports`
- `quality_metrics` = `{change_directory}/metrics.json`
- `quality_history` = `{change_directory}/quality-history.json`

---

## QUALITY METRICS

### Code Quality Metrics

```typescript
interface CodeQualityMetrics {
  complexity: {
    cyclomaticComplexity: number;
    cognitiveComplexity: number;
    halsteadComplexity: number;
  };
  maintainability: {
    maintainabilityIndex: number;
    technicalDebt: number;
    codeDuplication: number;
  };
  coverage: {
    lineCoverage: number;
    branchCoverage: number;
    functionCoverage: number;
    statementCoverage: number;
  };
  standards: {
    eslintViolations: number;
    typescriptErrors: number;
    formattingIssues: number;
  };
}
```

### Documentation Quality Metrics

```typescript
interface DocumentationQualityMetrics {
  completeness: {
    proposalCompleteness: number;
    designCompleteness: number;
    tasksCompleteness: number;
  };
  accuracy: {
    technicalAccuracy: number;
    factualAccuracy: number;
    consistency: number;
  };
  clarity: {
    readabilityScore: number;
    structureScore: number;
    languageQuality: number;
  };
  standards: {
    markdownCompliance: number;
    structureCompliance: number;
    contentStandards: number;
  };
}
```

### Process Quality Metrics

```typescript
interface ProcessQualityMetrics {
  efficiency: {
    developmentTime: number;
    reviewTime: number;
    reworkTime: number;
  };
  compliance: {
    processAdherence: number;
    standardsCompliance: number;
    bestPractices: number;
  };
  collaboration: {
    communicationQuality: number;
    codeReviewQuality: number;
    knowledgeSharing: number;
  };
}
```

---

## QUALITY ANALYSIS

### Code Quality Analysis

```typescript
const analyzeCodeQuality = (changeName: string): CodeQualityMetrics => {
  const codeFiles = getCodeFiles(changeName);
  
  // Analyze complexity
  const complexity = analyzeComplexity(codeFiles);
  
  // Analyze maintainability
  const maintainability = analyzeMaintainability(codeFiles);
  
  // Analyze coverage
  const coverage = analyzeCoverage(codeFiles);
  
  // Analyze standards compliance
  const standards = analyzeStandards(codeFiles);
  
  return {
    complexity,
    maintainability,
    coverage,
    standards
  };
};
```

### Documentation Quality Analysis

```typescript
const analyzeDocumentationQuality = (changeName: string): DocumentationQualityMetrics => {
  const docs = getDocumentationFiles(changeName);
  
  // Analyze completeness
  const completeness = analyzeCompleteness(docs);
  
  // Analyze accuracy
  const accuracy = analyzeAccuracy(docs);
  
  // Analyze clarity
  const clarity = analyzeClarity(docs);
  
  // Analyze standards compliance
  const standards = analyzeDocumentationStandards(docs);
  
  return {
    completeness,
    accuracy,
    clarity,
    standards
  };
};
```

### Process Quality Analysis

```typescript
const analyzeProcessQuality = (changeName: string): ProcessQualityMetrics => {
  const processData = getProcessData(changeName);
  
  // Analyze efficiency
  const efficiency = analyzeEfficiency(processData);
  
  // Analyze compliance
  const compliance = analyzeProcessCompliance(processData);
  
  // Analyze collaboration
  const collaboration = analyzeCollaboration(processData);
  
  return {
    efficiency,
    compliance,
    collaboration
  };
};
```

---

## QUALITY STANDARDS

### Code Quality Standards

```typescript
const codeQualityStandards = {
  complexity: {
    maxCyclomaticComplexity: 10,
    maxCognitiveComplexity: 15,
    maxHalsteadComplexity: 100
  },
  maintainability: {
    minMaintainabilityIndex: 70,
    maxTechnicalDebt: 5,
    maxCodeDuplication: 3
  },
  coverage: {
    minLineCoverage: 80,
    minBranchCoverage: 70,
    minFunctionCoverage: 85,
    minStatementCoverage: 80
  },
  standards: {
    maxEslintViolations: 0,
    maxTypescriptErrors: 0,
    maxFormattingIssues: 0
  }
};
```

### Documentation Quality Standards

```typescript
const documentationQualityStandards = {
  completeness: {
    minProposalCompleteness: 90,
    minDesignCompleteness: 85,
    minTasksCompleteness: 95
  },
  accuracy: {
    minTechnicalAccuracy: 95,
    minFactualAccuracy: 98,
    minConsistency: 90
  },
  clarity: {
    minReadabilityScore: 80,
    minStructureScore: 85,
    minLanguageQuality: 85
  },
  standards: {
    minMarkdownCompliance: 95,
    minStructureCompliance: 90,
    minContentStandards: 85
  }
};
```

---

## QUALITY CHECKING

### Automated Quality Checks

```typescript
const performAutomatedChecks = (changeName: string): QualityCheckResults => {
  const results: QualityCheckResults = {
    codeQuality: checkCodeQuality(changeName),
    documentationQuality: checkDocumentationQuality(changeName),
    processQuality: checkProcessQuality(changeName),
    integrationQuality: checkIntegrationQuality(changeName),
    uxQuality: checkUXQuality(changeName)
  };
  
  // Calculate overall quality score
  results.overallScore = calculateOverallQualityScore(results);
  
  // Determine quality level
  results.qualityLevel = determineQualityLevel(results.overallScore);
  
  // Generate recommendations
  results.recommendations = generateQualityRecommendations(results);
  
  return results;
};
```

### Quality Level Determination

```typescript
const determineQualityLevel = (score: number): QualityLevel => {
  if (score >= 95) return 'excellent';
  if (score >= 85) return 'good';
  if (score >= 70) return 'acceptable';
  if (score >= 50) return 'needs_improvement';
  return 'poor';
};

type QualityLevel = 'excellent' | 'good' | 'acceptable' | 'needs_improvement' | 'poor';
```

### Quality Thresholds

```typescript
const checkQualityThresholds = (results: QualityCheckResults): ThresholdCheck[] => {
  const thresholds: ThresholdCheck[] = [];
  
  // Check code quality thresholds
  if (results.codeQuality.coverage.lineCoverage < 80) {
    thresholds.push({
      type: 'code_coverage',
      current: results.codeQuality.coverage.lineCoverage,
      threshold: 80,
      severity: 'high'
    });
  }
  
  // Check documentation quality thresholds
  if (results.documentationQuality.completeness.proposalCompleteness < 90) {
    thresholds.push({
      type: 'documentation_completeness',
      current: results.documentationQuality.completeness.proposalCompleteness,
      threshold: 90,
      severity: 'medium'
    });
  }
  
  // Check process quality thresholds
  if (results.processQuality.compliance.processAdherence < 85) {
    thresholds.push({
      type: 'process_compliance',
      current: results.processQuality.compliance.processAdherence,
      threshold: 85,
      severity: 'medium'
    });
  }
  
  return thresholds;
};
```

---

## QUALITY MONITORING

### Continuous Quality Monitoring

```typescript
const setupQualityMonitoring = (changeName: string): void => {
  // Set up file watchers
  setupFileWatchers(changeName);
  
  // Set up quality check triggers
  setupQualityTriggers(changeName);
  
  // Set up quality alerts
  setupQualityAlerts(changeName);
};

const setupFileWatchers = (changeName: string): void => {
  const changeDirectory = getChangeDirectory(changeName);
  
  // Watch for code changes
  watch(path.join(changeDirectory, 'src'), (eventType, filename) => {
    if (eventType === 'change') {
      scheduleCodeQualityCheck(changeName);
    }
  });
  
  // Watch for documentation changes
  watch(path.join(changeDirectory, '*.md'), (eventType, filename) => {
    if (eventType === 'change') {
      scheduleDocumentationQualityCheck(changeName);
    }
  });
};
```

### Quality Score Tracking

```typescript
const trackQualityScore = (changeName: string, score: number): void => {
  const qualityHistory = getQualityHistory(changeName);
  
  qualityHistory.push({
    timestamp: new Date(),
    score,
    changeName
  });
  
  // Save updated history
  saveQualityHistory(changeName, qualityHistory);
  
  // Analyze quality trends
  analyzeQualityTrends(changeName, qualityHistory);
};
```

### Quality Trend Analysis

```typescript
const analyzeQualityTrends = (changeName: string, history: QualityHistoryEntry[]): QualityTrend => {
  if (history.length < 2) {
    return { trend: 'insufficient_data', direction: 0 };
  }
  
  const recent = history.slice(-10); // Last 10 entries
  const scores = recent.map(entry => entry.score);
  
  // Calculate trend direction
  const direction = calculateTrendDirection(scores);
  
  // Determine trend
  const trend = determineTrend(direction);
  
  return { trend, direction };
};
```

---

## QUALITY REPORTING

### Quality Report Generation

```typescript
interface QualityReport {
  changeName: string;
  timestamp: Date;
  overallScore: number;
  qualityLevel: QualityLevel;
  codeQuality: CodeQualityMetrics;
  documentationQuality: DocumentationQualityMetrics;
  processQuality: ProcessQualityMetrics;
  thresholds: ThresholdCheck[];
  recommendations: QualityRecommendation[];
  trends: QualityTrend;
  summary: string;
}

const generateQualityReport = (changeName: string): QualityReport => {
  const results = performAutomatedChecks(changeName);
  const thresholds = checkQualityThresholds(results);
  const trends = analyzeQualityTrends(changeName, getQualityHistory(changeName));
  
  return {
    changeName,
    timestamp: new Date(),
    overallScore: results.overallScore,
    qualityLevel: results.qualityLevel,
    codeQuality: results.codeQuality,
    documentationQuality: results.documentationQuality,
    processQuality: results.processQuality,
    thresholds,
    recommendations: results.recommendations,
    trends,
    summary: generateQualitySummary(results)
  };
};
```

### Quality Dashboard

```typescript
const generateQualityDashboard = (): QualityDashboard => {
  const allChanges = getAllChanges();
  const reports = allChanges.map(change => generateQualityReport(change));
  
  return {
    overallQuality: calculateOverallQuality(reports),
    qualityDistribution: calculateQualityDistribution(reports),
    topIssues: getTopQualityIssues(reports),
    qualityTrends: calculateGlobalQualityTrends(),
    recommendations: generateGlobalRecommendations(reports),
    generatedAt: new Date()
  };
};
```

---

## QUALITY IMPROVEMENT

### Improvement Recommendations

```typescript
const generateQualityRecommendations = (results: QualityCheckResults): QualityRecommendation[] => {
  const recommendations: QualityRecommendation[] = [];
  
  // Code quality recommendations
  if (results.codeQuality.coverage.lineCoverage < 80) {
    recommendations.push({
      type: 'code_coverage',
      priority: 'high',
      description: 'Increase test coverage to meet minimum standards',
      action: 'Add unit tests for uncovered code paths',
      impact: 'high'
    });
  }
  
  // Documentation quality recommendations
  if (results.documentationQuality.completeness.proposalCompleteness < 90) {
    recommendations.push({
      type: 'documentation_completeness',
      priority: 'medium',
      description: 'Complete missing documentation sections',
      action: 'Add required sections to proposal.md',
      impact: 'medium'
    });
  }
  
  // Process quality recommendations
  if (results.processQuality.compliance.processAdherence < 85) {
    recommendations.push({
      type: 'process_compliance',
      priority: 'medium',
      description: 'Improve process adherence',
      action: 'Follow defined development process',
      impact: 'medium'
    });
  }
  
  return recommendations;
};
```

### Improvement Tracking

```typescript
const trackImprovement = (changeName: string, recommendation: QualityRecommendation): void => {
  const improvementTracking = getImprovementTracking(changeName);
  
  improvementTracking.push({
    recommendation,
    status: 'pending',
    created: new Date(),
    updated: new Date()
  });
  
  saveImprovementTracking(changeName, improvementTracking);
};
```

---

## CONFIGURATION

### Quality Check Configuration

```yaml
quality_check:
  automated_checks:
    enabled: true
    frequency: "on_change"
    thresholds:
      code_quality: 70
      documentation_quality: 80
      process_quality: 75
  
  standards:
    code_quality:
      max_complexity: 10
      min_coverage: 80
      max_violations: 0
    
    documentation_quality:
      min_completeness: 90
      min_accuracy: 95
      min_clarity: 80
    
    process_quality:
      min_compliance: 85
      min_efficiency: 70
      min_collaboration: 75
  
  monitoring:
    continuous_monitoring: true
    quality_trends: true
    alerts_enabled: true
    
  reporting:
    daily_reports: false
    weekly_reports: true
    monthly_reports: true
    real_time_dashboard: true
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleQualityErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'ANALYSIS_ERROR': () => console.log(`Quality analysis failed in ${context}`),
    'METRIC_ERROR': () => console.log(`Metric calculation failed in ${context}`),
    'STANDARD_ERROR': () => console.log(`Standard check failed in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.name] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptQualityRecovery = (changeName: string): boolean => {
  try {
    // Attempt to fix common quality issues
    fixQualityMetrics(changeName);
    fixQualityStandards(changeName);
    fixQualityReports(changeName);
    
    return true;
  } catch (error) {
    console.log(`Quality recovery failed for ${changeName}: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Quality Check Test Suite

```typescript
describe('Quality Check', () => {
  test('should analyze code quality correctly', () => {
    const metrics = analyzeCodeQuality('test-change');
    expect(metrics.coverage.lineCoverage).toBeGreaterThanOrEqual(0);
  });
  
  test('should analyze documentation quality correctly', () => {
    const metrics = analyzeDocumentationQuality('test-change');
    expect(metrics.completeness.proposalCompleteness).toBeGreaterThanOrEqual(0);
  });
  
  test('should check quality thresholds correctly', () => {
    const results = performAutomatedChecks('test-change');
    expect(results.overallScore).toBeGreaterThanOrEqual(0);
  });
  
  test('should generate quality recommendations', () => {
    const results = performAutomatedChecks('test-change');
    expect(results.recommendations.length).toBeGreaterThan(0);
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
