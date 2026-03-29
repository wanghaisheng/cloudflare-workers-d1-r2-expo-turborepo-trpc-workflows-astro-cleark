---
name: process-standards
description: "Process standards definition and enforcement for consistent workflow execution across all modes"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "optional"
openspec_role: "standards_manager"

# Process Standards Workflow

**Goal:** Define and enforce process standards for consistent workflow execution across Quick Dev and BMM modes.

**PROCESS STANDARDS:**

Process standards are considered "Effective" ONLY if they meet the following:

- **Consistency**: Standards are applied consistently across all workflows
- **Clarity**: Standards are clear and unambiguous
- **Measurability**: Standards can be measured and verified
- **Enforceability**: Standards can be enforced and monitored
- **Improvement**: Standards support continuous improvement

---

**Your Role:** You are a process standards specialist ensuring all workflows follow consistent, high-quality standards.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined standards management:

### Core Principles

- **Standardization**: Establish consistent standards across all workflows
- **Monitoring**: Monitor compliance with standards
- **Enforcement**: Enforce standards compliance
- **Improvement**: Continuously improve standards based on feedback
- **Documentation**: Document all standards clearly

### Step Processing Rules

1. **DEFINE STANDARDS**: Define comprehensive process standards
2. **VALIDATE STANDARDS**: Validate standards for effectiveness
3. **IMPLEMENT STANDARDS**: Implement standards across workflows
4. **MONITOR COMPLIANCE**: Monitor compliance with standards
5. **IMPROVE STANDARDS**: Improve standards based on feedback

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Standards Paths

- `standards_directory` = `{output_folder}/standards`
- `process_standards` = `{standards_directory}/process`
- `quality_standards` = `{standards_directory}/quality`
- `documentation_standards` = `{standards_directory}/documentation`
- `compliance_reports` = `{standards_directory}/reports`

---

## PROCESS STANDARDS DEFINITION

### Workflow Standards

```typescript
interface WorkflowStandards {
  initiation: {
    requirementsDefinition: Standard;
    stakeholderIdentification: Standard;
    scopeDefinition: Standard;
    timelineDefinition: Standard;
  };
  execution: {
    taskDefinition: Standard;
    qualityChecks: Standard;
    progressTracking: Standard;
    communication: Standard;
  };
  completion: {
    deliverableValidation: Standard;
    stakeholderApproval: Standard;
    documentation: Standard;
    lessonsLearned: Standard;
  };
}
```

### Quality Standards

```typescript
interface QualityStandards {
  codeQuality: {
    coverage: Standard;
    complexity: Standard;
    maintainability: Standard;
    security: Standard;
  };
  documentationQuality: {
    completeness: Standard;
    accuracy: Standard;
    clarity: Standard;
    consistency: Standard;
  };
  processQuality: {
    adherence: Standard;
    efficiency: Standard;
    collaboration: Standard;
    communication: Standard;
  };
}
```

### Documentation Standards

```typescript
interface DocumentationStandards {
  structure: {
    sections: Standard;
    formatting: Standard;
    versioning: Standard;
    archiving: Standard;
  };
  content: {
    accuracy: Standard;
    completeness: Standard;
    clarity: Standard;
    relevance: Standard;
  };
  maintenance: {
    updateFrequency: Standard;
    reviewProcess: Standard;
    approvalProcess: Standard;
    distribution: Standard;
  };
}
```

---

## STANDARDS DEFINITION

### Workflow Standards Definition

```typescript
const defineWorkflowStandards = (): WorkflowStandards => {
  return {
    initiation: {
      requirementsDefinition: {
        name: "Requirements Definition Standard",
        description: "Standard for defining clear, actionable requirements",
        criteria: [
          "Requirements must be specific and measurable",
          "Requirements must have clear acceptance criteria",
          "Requirements must be prioritized",
          "Requirements must be traceable"
        ],
        metrics: ["requirements_completeness", "requirements_clarity"],
        threshold: 90
      },
      stakeholderIdentification: {
        name: "Stakeholder Identification Standard",
        description: "Standard for identifying and engaging stakeholders",
        criteria: [
          "All relevant stakeholders must be identified",
          "Stakeholder roles must be defined",
          "Communication channels must be established",
          "Feedback mechanisms must be defined"
        ],
        metrics: ["stakeholder_coverage", "engagement_quality"],
        threshold: 85
      },
      scopeDefinition: {
        name: "Scope Definition Standard",
        description: "Standard for defining clear project scope",
        criteria: [
          "Scope boundaries must be clearly defined",
          "Inclusions and exclusions must be specified",
          "Dependencies must be identified",
          "Assumptions must be documented"
        ],
        metrics: ["scope_clarity", "boundary_definition"],
        threshold: 90
      },
      timelineDefinition: {
        name: "Timeline Definition Standard",
        description: "Standard for defining realistic timelines",
        criteria: [
          "Timeline must be realistic and achievable",
          "Key milestones must be identified",
          "Dependencies must be considered",
          "Buffer time must be included"
        ],
        metrics: ["timeline_accuracy", "milestone_completion"],
        threshold: 85
      }
    },
    execution: {
      taskDefinition: {
        name: "Task Definition Standard",
        description: "Standard for defining clear, actionable tasks",
        criteria: [
          "Tasks must be specific and measurable",
          "Tasks must have clear deliverables",
          "Tasks must have clear dependencies",
          "Tasks must have clear time estimates"
        ],
        metrics: ["task_clarity", "task_completeness"],
        threshold: 90
      },
      qualityChecks: {
        name: "Quality Check Standard",
        description: "Standard for quality assurance checks",
        criteria: [
          "Quality checks must be defined",
          "Quality metrics must be established",
          "Quality gates must be defined",
          "Quality reviews must be scheduled"
        ],
        metrics: ["quality_coverage", "defect_detection"],
        threshold: 85
      },
      progressTracking: {
        name: "Progress Tracking Standard",
        description: "Standard for tracking project progress",
        criteria: [
          "Progress must be tracked regularly",
          "Progress metrics must be defined",
          "Progress reports must be generated",
          "Progress issues must be addressed"
        ],
        metrics: ["progress_accuracy", "reporting_frequency"],
        threshold: 90
      },
      communication: {
        name: "Communication Standard",
        description: "Standard for project communication",
        criteria: [
          "Communication plan must be defined",
          "Communication channels must be established",
          "Communication frequency must be defined",
          "Communication effectiveness must be measured"
        ],
        metrics: ["communication_frequency", "stakeholder_satisfaction"],
        threshold: 85
      }
    },
    completion: {
      deliverableValidation: {
        name: "Deliverable Validation Standard",
        description: "Standard for validating project deliverables",
        criteria: [
          "Deliverables must meet requirements",
          "Deliverables must be tested",
          "Deliverables must be documented",
          "Deliverables must be approved"
        ],
        metrics: ["deliverable_quality", "acceptance_rate"],
        threshold: 90
      },
      stakeholderApproval: {
        name: "Stakeholder Approval Standard",
        description: "Standard for obtaining stakeholder approval",
        criteria: [
          "Approval process must be defined",
          "Approval criteria must be clear",
          "Approval documentation must be complete",
          "Approval feedback must be addressed"
        ],
        metrics: ["approval_rate", "feedback_resolution"],
        threshold: 85
      },
      documentation: {
        name: "Documentation Standard",
        description: "Standard for project documentation",
        criteria: [
          "Documentation must be complete",
          "Documentation must be accurate",
          "Documentation must be accessible",
          "Documentation must be maintained"
        ],
        metrics: ["documentation_completeness", "documentation_accuracy"],
        threshold: 90
      },
      lessonsLearned: {
        name: "Lessons Learned Standard",
        description: "Standard for capturing lessons learned",
        criteria: [
          "Lessons learned must be documented",
          "Lessons learned must be analyzed",
          "Lessons learned must be shared",
          "Lessons learned must be applied"
        ],
        metrics: ["lessons_documented", "lessons_applied"],
        threshold: 80
      }
    }
  };
};
```

### Quality Standards Definition

```typescript
const defineQualityStandards = (): QualityStandards => {
  return {
    codeQuality: {
      coverage: {
        name: "Code Coverage Standard",
        description: "Standard for code test coverage",
        criteria: [
          "Unit test coverage must be >= 80%",
          "Integration test coverage must be >= 70%",
          "Critical code must have 100% coverage",
          "Coverage must be measured and reported"
        ],
        metrics: ["line_coverage", "branch_coverage", "function_coverage"],
        threshold: 80
      },
      complexity: {
        name: "Code Complexity Standard",
        description: "Standard for code complexity",
        criteria: [
          "Cyclomatic complexity must be <= 10",
          "Cognitive complexity must be <= 15",
          "Code duplication must be <= 3%",
          "Technical debt must be minimized"
        ],
        metrics: ["cyclomatic_complexity", "cognitive_complexity", "duplication"],
        threshold: 90
      },
      maintainability: {
        name: "Code Maintainability Standard",
        description: "Standard for code maintainability",
        criteria: [
          "Maintainability index must be >= 70",
          "Code must be well-documented",
          "Code must follow coding standards",
          "Code must be easily modifiable"
        ],
        metrics: ["maintainability_index", "documentation_coverage"],
        threshold: 70
      },
      security: {
        name: "Code Security Standard",
        description: "Standard for code security",
        criteria: [
          "Security vulnerabilities must be addressed",
          "Security best practices must be followed",
          "Security testing must be performed",
          "Security reviews must be conducted"
        ],
        metrics: ["vulnerability_count", "security_score"],
        threshold: 95
      }
    },
    documentationQuality: {
      completeness: {
        name: "Documentation Completeness Standard",
        description: "Standard for documentation completeness",
        criteria: [
          "All required sections must be present",
          "All sections must be complete",
          "All examples must be functional",
          "All links must be valid"
        ],
        metrics: ["section_completeness", "content_completeness"],
        threshold: 90
      },
      accuracy: {
        name: "Documentation Accuracy Standard",
        description: "Standard for documentation accuracy",
        criteria: [
          "Technical information must be accurate",
          "Code examples must be current",
          "API documentation must match implementation",
          "Configuration examples must work"
        ],
        metrics: ["technical_accuracy", "example_accuracy"],
        threshold: 95
      },
      clarity: {
        name: "Documentation Clarity Standard",
        description: "Standard for documentation clarity",
        criteria: [
          "Language must be clear and concise",
          "Structure must be logical",
          "Examples must be easy to understand",
          "Instructions must be easy to follow"
        ],
        metrics: ["readability_score", "structure_score"],
        threshold: 85
      },
      consistency: {
        name: "Documentation Consistency Standard",
        description: "Standard for documentation consistency",
        criteria: [
          "Formatting must be consistent",
          "Terminology must be consistent",
          "Style must be consistent",
          "Versioning must be consistent"
        ],
        metrics: ["formatting_consistency", "terminology_consistency"],
        threshold: 90
      }
    },
    processQuality: {
      adherence: {
        name: "Process Adherence Standard",
        description: "Standard for process adherence",
        criteria: [
          "Defined processes must be followed",
          "Process deviations must be documented",
          "Process improvements must be tracked",
          "Process compliance must be measured"
        ],
        metrics: ["process_compliance", "deviation_rate"],
        threshold: 90
      },
      efficiency: {
        name: "Process Efficiency Standard",
        description: "Standard for process efficiency",
        criteria: [
          "Processes must be efficient",
          "Bottlenecks must be identified",
          "Waste must be minimized",
          "Cycle time must be optimized"
        ],
        metrics: ["cycle_time", "throughput", "efficiency_score"],
        threshold: 80
      },
      collaboration: {
        name: "Collaboration Standard",
        description: "Standard for team collaboration",
        criteria: [
          "Collaboration tools must be used",
          "Communication must be effective",
          "Knowledge sharing must be encouraged",
          "Conflict resolution must be effective"
        ],
        metrics: ["collaboration_score", "communication_effectiveness"],
        threshold: 85
      },
      communication: {
        name: "Communication Standard",
        description: "Standard for project communication",
        criteria: [
          "Communication must be timely",
          "Communication must be clear",
          "Communication must be appropriate",
          "Communication must be documented"
        ],
        metrics: ["communication_timeliness", "communication_clarity"],
        threshold: 85
      }
    }
  };
};
```

---

## STANDARDS VALIDATION

### Validation Framework

```typescript
interface ValidationFramework {
  standards: Standard[];
  validationMethods: ValidationMethod[];
  complianceMetrics: ComplianceMetric[];
  improvementActions: ImprovementAction[];
}

const validateStandards = (standards: Standard[]): ValidationFramework => {
  const validationMethods = defineValidationMethods();
  const complianceMetrics = defineComplianceMetrics();
  const improvementActions = defineImprovementActions();
  
  return {
    standards,
    validationMethods,
    complianceMetrics,
    improvementActions
  };
};
```

### Validation Methods

```typescript
const defineValidationMethods = (): ValidationMethod[] => {
  return [
    {
      name: "Automated Validation",
      description: "Automated validation of standards compliance",
      type: "automated",
      frequency: "continuous",
      tools: ["linters", "static_analysis", "test_coverage"]
    },
    {
      name: "Manual Review",
      description: "Manual review of standards compliance",
      type: "manual",
      frequency: "milestone",
      tools: ["code_review", "documentation_review", "process_review"]
    },
    {
      name: "Peer Review",
      description: "Peer review of standards compliance",
      type: "peer",
      frequency: "milestone",
      tools: ["peer_review", "pair_programming", "knowledge_sharing"]
    },
    {
      name: "Stakeholder Review",
      description: "Stakeholder review of standards compliance",
      type: "stakeholder",
      frequency: "milestone",
      tools: ["stakeholder_review", "feedback_collection", "satisfaction_survey"]
    }
  ];
};
```

---

## STANDARDS IMPLEMENTATION

### Implementation Strategy

```typescript
const implementStandards = (standards: Standard[]): ImplementationResult => {
  const implementationPlan = createImplementationPlan(standards);
  const implementationResults = [];
  
  implementationPlan.phases.forEach(phase => {
    const result = implementPhase(phase);
    implementationResults.push(result);
  });
  
  return {
    plan: implementationPlan,
    results: implementationResults,
    overallSuccess: calculateOverallSuccess(implementationResults),
    recommendations: generateImplementationRecommendations(implementationResults)
  };
};
```

### Implementation Plan

```typescript
const createImplementationPlan = (standards: Standard[]): ImplementationPlan => {
  return {
    phases: [
      {
        name: "Preparation Phase",
        description: "Prepare for standards implementation",
        duration: "1 week",
        activities: [
          "Review and finalize standards",
          "Create implementation tools",
          "Train team members",
          "Set up monitoring systems"
        ]
      },
      {
        name: "Pilot Phase",
        description: "Pilot standards implementation",
        duration: "2 weeks",
        activities: [
          "Implement standards in pilot project",
          "Monitor compliance",
          "Collect feedback",
          "Refine standards"
        ]
      },
      {
        name: "Rollout Phase",
        description: "Roll out standards to all projects",
        duration: "4 weeks",
        activities: [
          "Implement standards in all projects",
          "Monitor compliance",
          "Provide support",
          "Address issues"
        ]
      },
      {
        name: "Optimization Phase",
        description: "Optimize standards implementation",
        duration: "2 weeks",
        activities: [
          "Analyze implementation results",
          "Identify improvement opportunities",
          "Update standards",
          "Plan continuous improvement"
        ]
      }
    ],
    timeline: generateTimeline(standards),
    resources: identifyResources(standards),
    risks: identifyRisks(standards)
  };
};
```

---

## STANDARDS MONITORING

### Monitoring Framework

```typescript
interface MonitoringFramework {
  complianceMetrics: ComplianceMetric[];
  monitoringTools: MonitoringTool[];
  reportingSystem: ReportingSystem;
  alertSystem: AlertSystem;
}

const setupStandardsMonitoring = (): MonitoringFramework => {
  const complianceMetrics = defineComplianceMetrics();
  const monitoringTools = setupMonitoringTools();
  const reportingSystem = setupReportingSystem();
  const alertSystem = setupAlertSystem();
  
  return {
    complianceMetrics,
    monitoringTools,
    reportingSystem,
    alertSystem
  };
};
```

### Compliance Metrics

```typescript
const defineComplianceMetrics = (): ComplianceMetric[] => {
  return [
    {
      name: "Standards Compliance Rate",
      description: "Percentage of standards that are compliant",
      type: "percentage",
      target: 95,
      measurement: "automated"
    },
    {
      name: "Process Adherence Rate",
      description: "Percentage of processes that follow standards",
      type: "percentage",
      target: 90,
      measurement: "manual"
    },
    {
      name: "Quality Score",
      description: "Overall quality score based on standards",
      type: "score",
      target: 85,
      measurement: "automated"
    },
    {
      name: "Documentation Quality",
      description: "Quality of documentation based on standards",
      type: "score",
      target: 90,
      measurement: "automated"
    }
  ];
};
```

---

## STANDARDS IMPROVEMENT

### Improvement Framework

```typescript
interface ImprovementFramework {
  feedbackCollection: FeedbackCollection;
  analysisMethods: AnalysisMethod[];
  improvementActions: ImprovementAction[];
  trackingSystem: TrackingSystem;
}

const setupStandardsImprovement = (): ImprovementFramework => {
  const feedbackCollection = setupFeedbackCollection();
  const analysisMethods = defineAnalysisMethods();
  const improvementActions = defineImprovementActions();
  const trackingSystem = setupTrackingSystem();
  
  return {
    feedbackCollection,
    analysisMethods,
    improvementActions,
    trackingSystem
  };
};
```

### Feedback Collection

```typescript
const setupFeedbackCollection = (): FeedbackCollection => {
  return {
    methods: [
      {
        name: "Surveys",
        description: "Collect feedback through surveys",
        frequency: "quarterly",
        participants: ["team_members", "stakeholders"]
      },
      {
        name: "Interviews",
        description: "Collect feedback through interviews",
        frequency: "monthly",
        participants: ["team_members", "stakeholders"]
      },
      {
        name: "Metrics Analysis",
        description: "Collect feedback through metrics analysis",
        frequency: "continuous",
        participants: ["data_analysts", "quality_team"]
      }
    ],
    analysis: {
      sentimentAnalysis: true,
      trendAnalysis: true,
      correlationAnalysis: true
    }
  };
};
```

---

## CONFIGURATION

### Standards Configuration

```yaml
process_standards:
  workflow_standards:
    initiation:
      requirements_definition:
        enabled: true
        threshold: 90
        validation_method: "automated"
      stakeholder_identification:
        enabled: true
        threshold: 85
        validation_method: "manual"
      scope_definition:
        enabled: true
        threshold: 90
        validation_method: "automated"
      timeline_definition:
        enabled: true
        threshold: 85
        validation_method: "manual"
        
    execution:
      task_definition:
        enabled: true
        threshold: 90
        validation_method: "automated"
      quality_checks:
        enabled: true
        threshold: 85
        validation_method: "automated"
      progress_tracking:
        enabled: true
        threshold: 90
        validation_method: "automated"
      communication:
        enabled: true
        threshold: 85
        validation_method: "manual"
        
    completion:
      deliverable_validation:
        enabled: true
        threshold: 90
        validation_method: "automated"
      stakeholder_approval:
        enabled: true
        threshold: 85
        validation_method: "manual"
      documentation:
        enabled: true
        threshold: 90
        validation_method: "automated"
      lessons_learned:
        enabled: true
        threshold: 80
        validation_method: "manual"
        
  quality_standards:
    code_quality:
      coverage:
        enabled: true
        threshold: 80
        tools: ["vitest", "coverage"]
      complexity:
        enabled: true
        threshold: 90
        tools: ["sonarqube", "complexity"]
      maintainability:
        enabled: true
        threshold: 70
        tools: ["sonarqube", "maintainability"]
      security:
        enabled: true
        threshold: 95
        tools: ["security_scan", "vulnerability_scan"]
        
  monitoring:
    compliance_tracking: true
    quality_monitoring: true
    performance_monitoring: true
    alert_system: true
    
  improvement:
    feedback_collection: true
    continuous_improvement: true
    standards_evolution: true
    best_practice_sharing: true
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleStandardsErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'DEFINITION_ERROR': () => console.log(`Standards definition failed in ${context}`),
    'VALIDATION_ERROR': () => console.log(`Standards validation failed in ${context}`),
    'IMPLEMENTATION_ERROR': () => console.log(`Standards implementation failed in ${context}`),
    'MONITORING_ERROR': () => console.log(`Standards monitoring failed in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.name] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptStandardsRecovery = (): boolean => {
  try {
    // Attempt to fix common standards issues
    fixStandardsDefinition();
    fixStandardsValidation();
    fixStandardsImplementation();
    
    return true;
  } catch (error) {
    console.log(`Standards recovery failed: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Standards Test Suite

```typescript
describe('Process Standards Workflow', () => {
  test('should define workflow standards', () => {
    const standards = defineWorkflowStandards();
    expect(standards.initiation).toBeDefined();
    expect(standards.execution).toBeDefined();
    expect(standards.completion).toBeDefined();
  });
  
  test('should define quality standards', () => {
    const standards = defineQualityStandards();
    expect(standards.codeQuality).toBeDefined();
    expect(standards.documentationQuality).toBeDefined();
    expect(standards.processQuality).toBeDefined();
  });
  
  test('should validate standards', () => {
    const standards = defineWorkflowStandards();
    const validation = validateStandards([standards.initiation.requirementsDefinition]);
    expect(validation.standards.length).toBeGreaterThan(0);
  });
  
  test('should implement standards', () => {
    const standards = defineWorkflowStandards();
    const implementation = implementStandards([standards.initiation.requirementsDefinition]);
    expect(implementation.plan).toBeDefined();
    expect(implementation.results.length).toBeGreaterThan(0);
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
