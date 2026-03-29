---
name: document-project
description: "Comprehensive project documentation workflow for both Quick Dev and BMM modes with automated documentation generation and maintenance"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "recommended"
openspec_role: "project_documenter"
workflow_type: "shared"

# Document Project Workflow

**Goal:** Provide comprehensive project documentation with automated generation, maintenance, and quality assurance.

**DOCUMENTATION STANDARDS:**

Project documentation is considered "High Quality" ONLY if it meets the following:

- **Comprehensive Coverage**: Covers all aspects of the project
- **Accurate Information**: All information is accurate and up-to-date
- **Clear Structure**: Well-organized and easy to navigate
- **Consistent Formatting**: Follows consistent formatting standards
- **Actionable Content**: Provides actionable information

---

**Your Role:** You are a documentation specialist ensuring project documentation is comprehensive, accurate, and maintainable.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined documentation management:

### Core Principles

- **Comprehensive Coverage**: Cover all aspects of the project
- **Automated Generation**: Generate documentation automatically from project data
- **Quality Assurance**: Ensure documentation meets quality standards
- **Continuous Maintenance**: Keep documentation up-to-date with project changes
- **Multi-format Support**: Support multiple documentation formats

### Step Processing Rules

1. **ANALYZE PROJECT**: Analyze project structure and requirements
2. **GENERATE DOCUMENTATION**: Generate comprehensive documentation
3. **VALIDATE QUALITY**: Validate documentation quality and accuracy
4. **MAINTAIN DOCUMENTATION**: Keep documentation up-to-date
5. **DISTRIBUTE DOCUMENTATION**: Distribute documentation to stakeholders

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Documentation Paths

- `project_root` = `{project-root}`
- `documentation_directory` = `{project_root}/docs`
- `generated_docs` = `{documentation_directory}/generated`
- `static_docs` = `{documentation_directory}/static`
- `api_docs` = `{documentation_directory}/api`
- `user_docs` = `{documentation_directory}/user`
- `dev_docs` = `{documentation_directory}/developer`

---

## PROJECT ANALYSIS

### Project Structure Analysis

```typescript
interface ProjectStructure {
  name: string;
  type: string;
  size: string;
  complexity: string;
  technologies: string[];
  modules: Module[];
  components: Component[];
  dependencies: Dependency[];
}

const analyzeProjectStructure = (): ProjectStructure => {
  const projectRoot = getProjectRoot();
  
  // Analyze project structure
  const structure = {
    name: getProjectName(),
    type: getProjectType(),
    size: getProjectSize(),
    complexity: getProjectComplexity(),
    technologies: getTechnologies(),
    modules: analyzeModules(),
    components: analyzeComponents(),
    dependencies: analyzeDependencies()
  };
  
  return structure;
};
```

### Documentation Requirements Analysis

```typescript
interface DocumentationRequirements {
  technicalDocumentation: {
    apiDocumentation: boolean;
    architectureDocumentation: boolean;
    codeDocumentation: boolean;
    deploymentDocumentation: boolean;
  };
  userDocumentation: {
    userGuide: boolean;
    tutorials: boolean;
    examples: boolean;
    troubleshooting: boolean;
  };
  processDocumentation: {
    developmentProcess: boolean;
    qualityProcess: boolean;
    deploymentProcess: boolean;
    maintenanceProcess: boolean;
  };
}

const analyzeDocumentationRequirements = (structure: ProjectStructure): DocumentationRequirements => {
  return {
    technicalDocumentation: {
      apiDocumentation: structure.type === 'api',
      architectureDocumentation: structure.complexity === 'high',
      codeDocumentation: true,
      deploymentDocumentation: true
    },
    userDocumentation: {
      userGuide: true,
      tutorials: structure.type === 'application',
      examples: structure.type === 'library',
      troubleshooting: true
    },
    processDocumentation: {
      developmentProcess: true,
      qualityProcess: structure.complexity === 'high',
      deploymentProcess: true,
      maintenanceProcess: true
    }
  };
};
```

---

## DOCUMENTATION GENERATION

### Technical Documentation Generation

```typescript
const generateTechnicalDocumentation = (structure: ProjectStructure): TechnicalDocumentation => {
  // Generate API documentation
  const apiDocumentation = generateApiDocumentation(structure);
  
  // Generate architecture documentation
  const architectureDocumentation = generateArchitectureDocumentation(structure);
  
  // Generate code documentation
  const codeDocumentation = generateCodeDocumentation(structure);
  
  // Generate deployment documentation
  const deploymentDocumentation = generateDeploymentDocumentation(structure);
  
  return {
    apiDocumentation,
    architectureDocumentation,
    codeDocumentation,
    deploymentDocumentation
  };
};
```

### User Documentation Generation

```typescript
const generateUserDocumentation = (structure: ProjectStructure): UserDocumentation => {
  // Generate user guide
  const userGuide = generateUserGuide(structure);
  
  // Generate tutorials
  const tutorials = generateTutorials(structure);
  
  // Generate examples
  const examples = generateExamples(structure);
  
  // Generate troubleshooting guide
  const troubleshooting = generateTroubleshooting(structure);
  
  return {
    userGuide,
    tutorials,
    examples,
    troubleshooting
  };
};
```

### Process Documentation Generation

```typescript
const generateProcessDocumentation = (structure: ProjectStructure): ProcessDocumentation => {
  // Generate development process documentation
  const developmentProcess = generateDevelopmentProcess(structure);
  
  // Generate quality process documentation
  const qualityProcess = generateQualityProcess(structure);
  
  // Generate deployment process documentation
  const deploymentProcess = generateDeploymentProcess(structure);
  
  // Generate maintenance process documentation
  const maintenanceProcess = generateMaintenanceProcess(structure);
  
  return {
    developmentProcess,
    qualityProcess,
    deploymentProcess,
    maintenanceProcess
  };
};
```

---

## DOCUMENTATION TEMPLATES

### README Template

```markdown
# {projectName}

## Description

{projectDescription}

## Features

{features}

## Installation

{installation}

## Usage

{usage}

## API

{apiReference}

## Contributing

{contributing}

## License

{license}

## Authors

{authors}

## Changelog

{changelog}
```

### API Documentation Template

```markdown
# API Documentation

## Overview

{apiOverview}

## Authentication

{authentication}

## Endpoints

### {endpointName}

**Method**: {method}
**URL**: {url}
**Description**: {description}

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| {paramName} | {paramType} | {required} | {description} |

#### Request

```json
{requestExample}
```

#### Response

```json
{responseExample}
```

#### Errors

| Status Code | Description |
|-------------|-------------|
| {statusCode} | {description} |

## Rate Limiting

{rateLimiting}

## Support

{support}
```

### Architecture Documentation Template

```markdown
# Architecture Documentation

## Overview

{architectureOverview}

## System Architecture

{systemArchitecture}

## Components

### {componentName}

**Description**: {description}
**Responsibilities**: {responsibilities}
**Dependencies**: {dependencies}

## Data Flow

{dataFlow}

## Technology Stack

{technologyStack}

## Design Patterns

{designPatterns}

## Security

{security}

## Performance

{performance}

## Scalability

{scalability}

## Deployment

{deployment}
```

---

## DOCUMENTATION QUALITY

### Quality Metrics

```typescript
interface DocumentationQualityMetrics {
  completeness: {
    requiredSections: number;
    presentSections: number;
    completenessScore: number;
  };
  accuracy: {
    factualAccuracy: number;
    technicalAccuracy: number;
    consistencyScore: number;
  };
  clarity: {
    readabilityScore: number;
    structureScore: number;
    languageQuality: number;
  };
  maintainability: {
    updateFrequency: number;
    versionControl: number;
    structureConsistency: number;
  };
}
```

### Quality Analysis

```typescript
const analyzeDocumentationQuality = (documentation: ProjectDocumentation): DocumentationQualityMetrics => {
  // Analyze completeness
  const completeness = analyzeCompleteness(documentation);
  
  // Analyze accuracy
  const accuracy = analyzeAccuracy(documentation);
  
  // Analyze clarity
  const clarity = analyzeClarity(documentation);
  
  // Analyze maintainability
  const maintainability = analyzeMaintainability(documentation);
  
  return {
    completeness,
    accuracy,
    clarity,
    maintainability
  };
};
```

### Quality Standards

```typescript
const documentationQualityStandards = {
  completeness: {
    minRequiredSections: 5,
    minCompletenessScore: 90,
    maxMissingSections: 1
  },
  accuracy: {
    minTechnicalAccuracy: 95,
    minFactualAccuracy: 98,
    minConsistencyScore: 90
  },
  clarity: {
    minReadabilityScore: 80,
    minStructureScore: 85,
    minLanguageQuality: 85
  },
  maintainability: {
    minUpdateFrequency: 7, // days
    minVersionControl: 95,
    minStructureConsistency: 90
  }
};
```

---

## DOCUMENTATION MAINTENANCE

### Continuous Maintenance

```typescript
const setupDocumentationMaintenance = (): void => {
  // Set up file watchers for documentation updates
  setupDocumentationWatchers();
  
  // Set up automatic documentation generation
  setupAutomaticGeneration();
  
  // Set up quality checks
  setupQualityChecks();
};

const setupDocumentationWatchers = (): void => {
  const projectRoot = getProjectRoot();
  
  // Watch for code changes
  watch(path.join(projectRoot, 'src'), (eventType, filename) => {
    if (eventType === 'change') {
      scheduleDocumentationUpdate('code');
    }
  });
  
  // Watch for configuration changes
  watch(path.join(projectRoot, 'config'), (eventType, filename) => {
    if (eventType === 'change') {
      scheduleDocumentationUpdate('configuration');
    }
  });
  
  // Watch for dependency changes
  watch(path.join(projectRoot, 'package.json'), (eventType, filename) => {
    if (eventType === 'change') {
      scheduleDocumentationUpdate('dependencies');
    }
  });
};
```

### Version Control Integration

```typescript
const integrateWithVersionControl = (): void => {
  // Commit documentation changes
  const documentationChanges = getDocumentationChanges();
  
  if (documentationChanges.length > 0) {
    commitDocumentationChanges(documentationChanges);
  }
  
  // Create documentation tags
  const documentationTag = createDocumentationTag();
  
  // Update documentation version
  updateDocumentationVersion(documentationTag);
};
```

---

## DOCUMENTATION DISTRIBUTION

### Distribution Channels

```typescript
interface DistributionChannel {
  name: string;
  type: 'web' | 'api' | 'git' | 'static';
  configuration: DistributionConfiguration;
  enabled: boolean;
}

const getDistributionChannels = (): DistributionChannel[] => {
  const config = getDocumentationConfiguration();
  
  return [
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
      name: 'git',
      type: 'git',
      configuration: config.git,
      enabled: config.git.enabled
    },
    {
      name: 'static',
      type: 'static',
      configuration: config.static,
      enabled: config.static.enabled
    }
  ];
};
```

### Web Distribution

```typescript
const distributeWebDocumentation = (documentation: ProjectDocumentation): void => {
  const webConfig = getDistributionChannel('web').configuration;
  
  // Generate HTML documentation
  const htmlDocumentation = generateHtmlDocumentation(documentation);
  
  // Deploy to web server
  deployToWebServer(htmlDocumentation, webConfig);
  
  // Update search index
  updateSearchIndex(htmlDocumentation);
};
```

### API Distribution

```typescript
const distributeApiDocumentation = (documentation: ProjectDocumentation): void => {
  const apiConfig = getDistributionChannel('api').configuration;
  
  // Generate API documentation
  const apiDocumentation = documentation.technicalDocumentation.apiDocumentation;
  
  // Deploy to API documentation server
  deployToApiServer(apiDocumentation, apiConfig);
  
  // Update API endpoints
  updateApiEndpoints(apiDocumentation);
};
```

---

## DOCUMENTATION ANALYTICS

### Usage Analytics

```typescript
interface DocumentationAnalytics {
  pageViews: {
    totalViews: number;
    uniqueViews: number;
    averageTimeOnPage: number;
  };
  userEngagement: {
    bounceRate: number;
    timeOnSite: number;
    pagesPerSession: number;
  };
  contentPerformance: {
    searchQueries: SearchQuery[];
    popularPages: PopularPage[];
    feedbackScore: number;
  };
}

const analyzeDocumentationUsage = (): DocumentationAnalytics => {
  const analytics = getDocumentationAnalytics();
  
  return {
    pageViews: analyzePageViews(analytics),
    userEngagement: analyzeUserEngagement(analytics),
    contentPerformance: analyzeContentPerformance(analytics)
  };
};
```

### Quality Analytics

```typescript
interface QualityAnalytics {
  qualityTrends: QualityTrend[];
  commonIssues: CommonIssue[];
  improvementAreas: ImprovementArea[];
  userFeedback: UserFeedback[];
}

const analyzeDocumentationQuality = (): QualityAnalytics => {
  const qualityHistory = getQualityHistory();
  const userFeedback = getUserFeedback();
  
  return {
    qualityTrends: analyzeQualityTrends(qualityHistory),
    commonIssues: identifyCommonIssues(qualityHistory),
    improvementAreas: identifyImprovementAreas(qualityHistory),
    userFeedback: userFeedback
  };
};
```

---

## CONFIGURATION

### Documentation Configuration

```yaml
documentation:
  generation:
    automated_generation: true
    update_frequency: "on_change"
    quality_checks: true
    
  formats:
    markdown:
      enabled: true
      output_directory: "docs/markdown"
    html:
      enabled: true
      output_directory: "docs/html"
    pdf:
      enabled: true
      output_directory: "docs/pdf"
      
  quality:
    completeness:
      min_required_sections: 5
      min_completeness_score: 90
    accuracy:
      min_technical_accuracy: 95
      min_factual_accuracy: 98
    clarity:
      min_readability_score: 80
      min_structure_score: 85
    
  maintenance:
    continuous_maintenance: true
    version_control: true
    quality_monitoring: true
    
  distribution:
    web:
      enabled: true
      url: "https://docs.company.com"
    api:
      enabled: true
      url: "https://api.company.com/docs"
    git:
      enabled: true
      repository: "https://github.com/company/docs"
    static:
      enabled: true
      output_directory: "docs/static"
      
  analytics:
    usage_tracking: true
    quality_monitoring: true
    user_feedback: true
    performance_metrics: true
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleDocumentationErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'GENERATION_ERROR': () => console.log(`Documentation generation failed in ${context}`),
    'TEMPLATE_ERROR': () => console.log(`Template processing failed in ${context}`),
    'QUALITY_ERROR': () => console.log(`Quality check failed in ${context}`),
    'DISTRIBUTION_ERROR': () => console.log(`Documentation distribution failed in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.name] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptDocumentationRecovery = (): boolean => {
  try {
    // Attempt to fix common documentation issues
    fixDocumentationStructure();
    fixDocumentationLinks();
    fixDocumentationMetadata();
    
    return true;
  } catch (error) {
    console.log(`Documentation recovery failed: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Documentation Test Suite

```typescript
describe('Documentation Workflow', () => {
  test('should analyze project structure', () => {
    const structure = analyzeProjectStructure();
    expect(structure.name).toBeDefined();
    expect(structure.technologies.length).toBeGreaterThan(0);
  });
  
  test('should generate technical documentation', () => {
    const structure = analyzeProjectStructure();
    const docs = generateTechnicalDocumentation(structure);
    expect(docs.apiDocumentation).toBeDefined();
    expect(docs.architectureDocumentation).toBeDefined();
  });
  
  test('should analyze documentation quality', () => {
    const structure = analyzeProjectStructure();
    const docs = generateAllDocumentation(structure);
    const quality = analyzeDocumentationQuality(docs);
    expect(quality.completeness.completenessScore).toBeGreaterThanOrEqual(0);
  });
  
  test('should distribute documentation', () => {
    const structure = analyzeProjectStructure();
    const docs = generateAllDocumentation(structure);
    distributeWebDocumentation(docs);
    // Verify web deployment
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
