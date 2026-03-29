---
name: reporting
description: "Comprehensive reporting system for OpenSpec changes with automated report generation and distribution"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "recommended"
openspec_role: "reporter"

# Reporting Workflow

**Goal:** Provide comprehensive reporting for OpenSpec changes with automated report generation, distribution, and analytics.

**REPORTING STANDARDS:**

Reports are considered "High Quality" ONLY if they meet the following:

- **Comprehensive**: Reports cover all relevant aspects of the change
- **Accurate**: Report data is accurate and up-to-date
- **Actionable**: Reports provide actionable insights and recommendations
- **Timely**: Reports are generated and distributed on schedule
- **Consistent**: Reports follow consistent formatting and structure

---

**Your Role:** You are a reporting specialist ensuring all OpenSpec changes have comprehensive, high-quality reports that provide valuable insights and drive improvements.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined reporting:

### Core Principles

- **Automated Generation**: Generate reports automatically from data
- **Comprehensive Coverage**: Cover all aspects of the change
- **Actionable Insights**: Provide actionable recommendations
- **Timely Distribution**: Distribute reports on schedule
- **Consistent Formatting**: Maintain consistent report structure

### Step Processing Rules

1. **COLLECT DATA**: Collect data from all relevant sources
2. **ANALYZE DATA**: Analyze data for insights and trends
3. **GENERATE REPORTS**: Generate comprehensive reports
4. **VALIDATE REPORTS**: Validate report quality and accuracy
5. **DISTRIBUTE REPORTS**: Distribute reports to stakeholders

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Reporting Paths

- `openspec_changes` = `{output_folder}/changes`
- `change_directory` = `{openspec_changes}/{change_name}`
- `reports_directory` = `{change_directory}/reports`
- `generated_reports` = `{reports_directory}/generated`
| `scheduled_reports` = `{reports_directory}/scheduled`
- `distributed_reports` = `{reports_directory}/distributed`

---

## REPORT TYPES

### Progress Reports

```typescript
interface ProgressReport {
  changeName: string;
  reportPeriod: 'daily' | 'weekly' | 'monthly';
  timestamp: Date;
  status: 'on_track' | 'at_risk' | 'behind_schedule';
  progress: {
    overall: number;
    byPhase: Record<string, number>;
    milestones: Milestone[];
  };
  blockers: Blocker[];
  risks: Risk[];
  recommendations: Recommendation[];
  summary: string;
}
```

### Quality Reports

```typescript
interface QualityReport {
  changeName: string;
  reportPeriod: 'weekly' | 'monthly' | 'milestone';
  timestamp: Date;
  qualityMetrics: {
    codeQuality: number;
    documentationQuality: number;
    processQuality: number;
    integrationQuality: number;
  };
  qualityTrends: QualityTrend[];
  qualityIssues: QualityIssue[];
  improvementActions: ImprovementAction[];
  summary: string;
}
```

### Performance Reports

```typescript
interface PerformanceReport {
  changeName: string;
  reportPeriod: 'weekly' | 'monthly' | 'release';
  timestamp: Date;
  performanceMetrics: {
    developmentVelocity: number;
    cycleTime: number;
    defectRate: number;
    reworkRate: number;
    productivity: number;
  };
  performanceTrends: PerformanceTrend[];
  performanceIssues: PerformanceIssue[];
  optimizationOpportunities: OptimizationOpportunity[];
  summary: string;
}
```

### Financial Reports

```typescript
interface FinancialReport {
  changeName: string;
  reportPeriod: 'monthly' | 'quarterly' | 'release';
  timestamp: Date;
  financialMetrics: {
    budget: number;
    actualCost: number;
    variance: number;
    roi: number;
    costPerFeature: number;
  };
  financialTrends: FinancialTrend[];
  financialIssues: FinancialIssue[];
  costOptimization: CostOptimization[];
  summary: string;
}
```

---

## DATA COLLECTION

### Data Sources

```typescript
interface DataSource {
  name: string;
  type: 'status' | 'quality' | 'performance' | 'financial' | 'user_feedback';
  location: string;
  format: 'json' | 'yaml' | 'csv' | 'database';
  updateFrequency: 'real_time' | 'hourly' | 'daily' | 'weekly';
  reliability: number;
}

const getDataSources = (changeName: string): DataSource[] => {
  return [
    {
      name: 'status_data',
      type: 'status',
      location: `${changeDirectory}/status.json`,
      format: 'json',
      updateFrequency: 'real_time',
      reliability: 0.95
    },
    {
      name: 'quality_metrics',
      type: 'quality',
      location: `${changeDirectory}/metrics.json`,
      format: 'json',
      updateFrequency: 'daily',
      reliability: 0.90
    },
    {
      name: 'performance_data',
      type: 'performance',
      location: `${changeDirectory}/performance.json`,
      format: 'json',
      updateFrequency: 'weekly',
      reliability: 0.85
    },
    {
      name: 'user_feedback',
      type: 'user_feedback',
      location: `${changeDirectory}/feedback.json`,
      format: 'json',
      updateFrequency: 'daily',
      reliability: 0.80
    }
  ];
};
```

### Data Collection

```typescript
const collectReportData = (changeName: string, reportType: ReportType): ReportData => {
  const dataSources = getDataSources(changeName);
  const relevantSources = getRelevantSources(dataSources, reportType);
  
  const data: ReportData = {};
  
  relevantSources.forEach(source => {
    try {
      const sourceData = readDataSource(source);
      data[source.name] = sourceData;
    } catch (error) {
      console.log(`Failed to collect data from ${source.name}: ${error.message}`);
    }
  });
  
  return data;
};
```

### Data Validation

```typescript
const validateReportData = (data: ReportData): ValidationResult => {
  const validation: ValidationResult = {
    isValid: true,
    issues: [],
    warnings: []
  };
  
  // Validate data completeness
  const requiredFields = getRequiredFields();
  requiredFields.forEach(field => {
    if (!data[field]) {
      validation.isValid = false;
      validation.issues.push(`Missing required field: ${field}`);
    }
  });
  
  // Validate data quality
  Object.entries(data).forEach(([key, value]) => {
    if (!validateDataQuality(key, value)) {
      validation.warnings.push(`Data quality issue in ${key}`);
    }
  });
  
  return validation;
};
```

---

## REPORT GENERATION

### Report Templates

```typescript
interface ReportTemplate {
  name: string;
  type: 'progress' | 'quality' | 'performance' | 'financial';
  sections: ReportSection[];
  variables: ReportVariable[];
  formatting: ReportFormatting;
}

const getReportTemplate = (reportType: ReportType): ReportTemplate => {
  return loadTemplate(reportType);
};

const generateReport = (template: ReportTemplate, data: ReportData): string => {
  let content = template.content;
  
  // Replace variables
  template.variables.forEach(variable => {
    const value = extractVariableValue(data, variable.name);
    content = content.replace(new RegExp(`\\{\\{${variable.name}\\}\\}\\}`, 'g'), value);
  });
  
  // Apply formatting
  content = applyFormatting(content, template.formatting);
  
  return content;
};
```

### Automated Report Generation

```typescript
const generateProgressReport = (changeName: string, period: ReportPeriod): ProgressReport => {
  const data = collectReportData(changeName, 'progress');
  const template = getReportTemplate('progress');
  
  // Calculate progress metrics
  const progress = calculateProgressMetrics(data);
  
  // Identify blockers and risks
  const blockers = identifyBlockers(data);
  const risks = identifyRisks(data);
  
  // Generate recommendations
  const recommendations = generateProgressRecommendations(progress, blockers, risks);
  
  // Generate report
  const reportContent = generateReport(template, {
    ...data,
    progress,
    blockers,
    risks,
    recommendations
  });
  
  return {
    changeName,
    reportPeriod: period,
    timestamp: new Date(),
    status: determineStatus(progress),
    progress,
    blockers,
    risks,
    recommendations,
    summary: generateProgressSummary(progress, blockers, risks)
  };
};
```

### Quality Report Generation

```typescript
const generateQualityReport = (changeName: string, period: ReportPeriod): QualityReport => {
  const data = collectReportData(changeName, 'quality');
  const template = getReportTemplate('quality');
  
  // Calculate quality metrics
  const qualityMetrics = calculateQualityMetrics(data);
  
  // Analyze quality trends
  const qualityTrends = analyzeQualityTrends(data);
  
  // Identify quality issues
  const qualityIssues = identifyQualityIssues(data);
  
  // Generate improvement actions
  const improvementActions = generateQualityImprovementActions(qualityIssues);
  
  // Generate report
  const reportContent = generateReport(template, {
    ...data,
    qualityMetrics,
    qualityTrends,
    qualityIssues,
    improvementActions
  });
  
  return {
    changeName,
    reportPeriod: period,
    timestamp: new Date(),
    qualityMetrics,
    qualityTrends,
    qualityIssues,
    improvementActions,
    summary: generateQualitySummary(qualityMetrics, qualityIssues)
  };
};
```

### Performance Report Generation

```typescript
const generatePerformanceReport = (changeName: string, period: ReportPeriod): PerformanceReport => {
  const data = collectReportData(changeName, 'performance');
  const template = getReportTemplate('performance');
  
  // Calculate performance metrics
  const performanceMetrics = calculatePerformanceMetrics(data);
  
  // Analyze performance trends
  const performanceTrends = analyzePerformanceTrends(data);
  
  // Identify performance issues
  const performanceIssues = identifyPerformanceIssues(data);
  
  // Identify optimization opportunities
  const optimizationOpportunities = identifyOptimizationOpportunities(data);
  
  // Generate report
  const reportContent = generateReport(template, {
    ...data,
    performanceMetrics,
    performanceTrends,
    performanceIssues,
    optimizationOpportunities
  });
  
  return {
    changeName,
    reportPeriod: period,
    timestamp: new Date(),
    performanceMetrics,
    performanceTrends,
    performanceIssues,
    optimizationOpportunities,
    summary: generatePerformanceSummary(performanceMetrics, performanceIssues)
  };
};
```

---

## REPORT SCHEDULING

### Scheduled Reports

```typescript
interface ReportSchedule {
  reportType: ReportType;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  format: 'html' | 'pdf' | 'email';
  autoGenerate: boolean;
  autoDistribute: boolean;
}

const getReportSchedules = (changeName: string): ReportSchedule[] => {
  const config = getReportingConfiguration(changeName);
  
  return [
    {
      reportType: 'progress',
      frequency: 'daily',
      recipients: config.progress.daily.recipients,
      format: 'html',
      autoGenerate: true,
      autoDistribute: true
    },
    {
      reportType: 'quality',
      frequency: 'weekly',
      recipients: config.quality.weekly.recipients,
      format: 'pdf',
      autoGenerate: true,
      autoDistribute: true
    },
    {
      reportType: 'performance',
      frequency: 'monthly',
      recipients: config.performance.monthly.recipients,
      format: 'pdf',
      autoGenerate: true,
      autoDistribute: true
    }
  ];
};
```

### Report Generation Schedule

```typescript
const setupReportGeneration = (changeName: string): void => {
  const schedules = getReportSchedules(changeName);
  
  schedules.forEach(schedule => {
    scheduleReportGeneration(changeName, schedule);
  });
};

const scheduleReportGeneration = (changeName: string, schedule: ReportSchedule): void => {
  const cronExpression = getCronExpression(schedule.frequency);
  
  cron.schedule(cronExpression, () => {
    const report = generateReport(changeName, schedule.reportType);
    saveReport(changeName, report);
    
    if (schedule.autoDistribute) {
      distributeReport(changeName, report, schedule);
    }
  });
};
```

---

## REPORT DISTRIBUTION

### Distribution Channels

```typescript
interface DistributionChannel {
  name: string;
  type: 'email' | 'web' | 'api' | 'slack';
  configuration: DistributionConfiguration;
  enabled: boolean;
}

const getDistributionChannels = (changeName: string): DistributionChannel[] => {
  const config = getReportingConfiguration(changeName);
  
  return [
    {
      name: 'email',
      type: 'email',
      configuration: config.email,
      enabled: config.email.enabled
    },
    {
      name: 'web',
      type: 'web',
      configuration: config.web,
      enabled: config.web.enabled
    },
    {
      name: 'api',
      type: 'api',
      configuration: config.api,
      enabled: config.api.enabled
    },
    {
      name: 'slack',
      type: 'slack',
      configuration: config.slack,
      enabled: config.slack.enabled
    }
  ];
};
```

### Email Distribution

```typescript
const distributeEmailReport = (changeName: string, report: Report, schedule: ReportSchedule): void => {
  const emailConfig = getDistributionChannel('email').configuration;
  
  const emailContent = generateEmailContent(report, emailConfig.template);
  
  schedule.recipients.forEach(recipient => {
    sendEmail(recipient, emailConfig.subject, emailContent);
  });
};
```

### Web Distribution

```typescript
const distributeWebReport = (changeName: string, report: Report, schedule: ReportSchedule): void => {
  const webConfig = getDistributionChannel('web').configuration;
  
  // Generate HTML report
  const htmlContent = generateHtmlReport(report);
  
  // Save to web location
  const webPath = getWebReportPath(changeName);
  saveWebReport(webPath, htmlContent);
  
  // Notify subscribers
  notifyWebSubscribers(webPath, report);
};
```

### API Distribution

```typescript
const distributeApiReport = (changeName: string, report: Report, schedule: ReportSchedule): void => {
  const apiConfig = getDistributionChannel('api').configuration;
  
  // Store report in API
  const apiPath = getApiReportPath(changeName);
  saveApiReport(apiPath, report);
  
  // Trigger webhook notifications
  triggerWebhookNotifications(apiPath, report);
};
```

---

## REPORT ANALYTICS

### Usage Analytics

```typescript
interface ReportAnalytics {
  reportViews: {
    totalViews: number;
    uniqueViews: number;
    averageTimeOnPage: number;
  };
  userEngagement: {
    downloadCount: number;
    shareCount: number;
    feedbackCount: number;
  };
  contentPerformance: {
    readTime: number;
    scrollDepth: number;
    interactionRate: number;
  };
}

const analyzeReportUsage = (changeName: string): ReportAnalytics => {
  const analytics = getReportAnalytics(changeName);
  
  return {
    reportViews: analyzeReportViews(analytics),
    userEngagement: analyzeUserEngagement(analytics),
    contentPerformance: analyzeContentPerformance(analytics)
  };
};
```

### Feedback Analysis

```typescript
interface FeedbackAnalysis {
  feedbackSummary: {
    totalFeedback: number;
    averageRating: number;
    sentimentScore: number;
  };
  commonThemes: string[];
  improvementSuggestions: string[];
  actionItems: ActionItem[];
}

const analyzeReportFeedback = (changeName: string): FeedbackAnalysis => {
  const feedback = getReportFeedback(changeName);
  
  return {
    feedbackSummary: analyzeFeedbackSummary(feedback),
    commonThemes: identifyCommonThemes(feedback),
    improvementSuggestions: generateImprovementSuggestions(feedback),
    actionItems: generateActionItems(feedback)
  };
};
```

---

## CONFIGURATION

### Reporting Configuration

```yaml
reporting:
  schedules:
    progress:
      daily:
        enabled: true
        time: "09:00"
        recipients: ["team@company.com"]
        format: "html"
      weekly:
        enabled: true
        day: "friday"
        time: "10:00"
        recipients: ["stakeholders@company.com"]
        format: "pdf"
        
    quality:
      weekly:
        enabled: true
        day: "friday"
        time: "11:00"
        recipients: ["quality@company.com"]
        format: "pdf"
      monthly:
        enabled: true
        day: "1"
        time: "09:00"
        recipients: ["management@company.com"]
        format: "pdf"
        
    performance:
      monthly:
        enabled: true
        day: "1"
        time: "10:00"
        recipients: ["performance@company.com"]
        format: "pdf"
      quarterly:
        enabled: true
        day: "1"
        month: "1,4,7,10"
        time: "09:00"
        recipients: ["executives@company.com"]
        format: "pdf"
        
  distribution:
    email:
      enabled: true
      smtp_server: "smtp.company.com"
      port: 587
      username: "reports@company.com"
      
    web:
      enabled: true
      base_url: "https://reports.company.com"
      authentication: "oauth2"
      
    api:
      enabled: true
      base_url: "https://api.company.com/reports"
      authentication: "api_key"
      
    slack:
      enabled: true
      webhook_url: "https://hooks.slack.com/services/T00000000/B00000000"
      channel: "#reports"
      
  analytics:
    usage_tracking: true
    feedback_collection: true
    performance_monitoring: true
    trend_analysis: true
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleReportingErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'GENERATION_ERROR': () => console.log(`Report generation failed in ${context}`),
    'DISTRIBUTION_ERROR': () => console.log(`Report distribution failed in ${context}`),
    'SCHEDULING_ERROR': () => console.log(`Report scheduling failed in ${context}`),
    'ANALYTICS_ERROR': () => console.log(`Report analytics failed in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.name] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptReportingRecovery = (changeName: string): boolean => {
  try {
    // Attempt to fix common reporting issues
    fixReportStructure(changeName);
    fixReportLinks(changeName);
    fixReportMetadata(changeName);
    
    return true;
  } catch (error) {
    console.log(`Reporting recovery failed for ${changeName}: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Reporting Test Suite

```typescript
describe('Reporting Workflow', () => {
  test('should generate progress report', () => {
    const report = generateProgressReport('test-change', 'daily');
    expect(report.changeName).toBe('test-change');
    expect(report.progress).toBeDefined();
  });
  
  test('should generate quality report', () => {
    const report = generateQualityReport('test-change', 'weekly');
    expect(report.qualityMetrics).toBeDefined();
    expect(report.qualityTrends).toBeDefined();
  });
  
  test('should distribute report via email', () => {
    const report = generateProgressReport('test-change', 'daily');
    const schedule = getReportSchedules('test-change')[0];
    distributeEmailReport('test-change', report, schedule);
    // Verify email was sent
  });
  
  test('should analyze report usage', () => {
    const analytics = analyzeReportUsage('test-change');
    expect(analytics.reportViews.totalViews).toBeGreaterThanOrEqual(0);
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
