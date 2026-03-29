---
name: documentation
description: "Comprehensive documentation generation and management for OpenSpec changes with automated documentation quality checks"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "recommended"
openspec_role: "documenter"

# Documentation Workflow

**Goal:** Provide comprehensive documentation generation and management for OpenSpec changes with automated quality checks and continuous documentation maintenance.

**DOCUMENTATION STANDARDS:**

Documentation is considered "High Quality" ONLY if it meets the following:

- **Completeness**: All required sections are present and complete
- **Accuracy**: Technical information is accurate and up-to-date
- **Clarity**: Content is clear, readable, and well-structured
- **Consistency**: Documentation follows consistent formatting and style
- **Maintainability**: Documentation is easy to maintain and update

---

**Your Role:** You are a documentation specialist ensuring all OpenSpec changes have comprehensive, high-quality documentation that meets defined standards.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined documentation management:

### Core Principles

- **Automated Generation**: Generate documentation automatically from code and specifications
- **Quality Assurance**: Ensure documentation meets quality standards
- **Continuous Maintenance**: Keep documentation up-to-date with changes
- **Multi-format Support**: Support multiple documentation formats
- **Version Integration**: Integrate with version control systems

### Step Processing Rules

1. **ANALYZE REQUIREMENTS**: Analyze documentation requirements for the change
2. **GENERATE DOCUMENTATION**: Generate documentation from code and specifications
3. **VALIDATE QUALITY**: Validate documentation against quality standards
4. **UPDATE MAINTENANCE**: Update documentation with changes
5. **PUBLISH DOCUMENTATION**: Publish documentation to appropriate channels

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Documentation Paths

- `openspec_changes` = `{output_folder}/changes`
- `change_directory` = `{openspec_changes}/{change_name}`
- `documentation_directory` = `{change_directory}/docs`
- `generated_docs` = `{documentation_directory}/generated`
- `static_docs` = `{documentation_directory}/static`
- `published_docs` = `{output_folder}/docs/{change_name}`

---

## DOCUMENTATION TYPES

### Technical Documentation

```typescript
interface TechnicalDocumentation {
  apiDocumentation: {
    endpoints: ApiEndpoint[];
    schemas: ApiSchema[];
    examples: ApiExample[];
  };
  architectureDocumentation: {
    diagrams: ArchitectureDiagram[];
    components: ArchitectureComponent[];
    patterns: ArchitecturePattern[];
  };
  codeDocumentation: {
    modules: CodeModule[];
    functions: CodeFunction[];
    classes: CodeClass[];
  };
}
```

### User Documentation

```typescript
interface UserDocumentation {
  userGuides: {
    gettingStarted: UserGuide;
    tutorials: Tutorial[];
    examples: Example[];
  };
  referenceDocumentation: {
    apiReference: ApiReference;
    configuration: ConfigurationGuide;
    troubleshooting: TroubleshootingGuide;
  };
  conceptualDocumentation: {
    concepts: Concept[];
    architecture: ConceptArchitecture[];
    bestPractices: BestPractice[];
  };
}
```

### Process Documentation

```typescript
interface ProcessDocumentation {
  developmentProcess: {
    workflow: ProcessWorkflow;
    guidelines: ProcessGuideline[];
    standards: ProcessStandard[];
  };
  qualityProcess: {
    qualityAssurance: QualityAssuranceProcess;
    testingProcess: TestingProcess;
    reviewProcess: ReviewProcess;
  };
  deploymentProcess: {
    deploymentGuide: DeploymentGuide;
    monitoringProcess: MonitoringProcess;
    maintenanceProcess: MaintenanceProcess;
  };
}
```

---

## DOCUMENTATION GENERATION

### Automatic Documentation Generation

```typescript
const generateTechnicalDocumentation = (changeName: string): TechnicalDocumentation => {
  const codeFiles = getCodeFiles(changeName);
  const specifications = getSpecifications(changeName);
  
  // Generate API documentation
  const apiDocumentation = generateApiDocumentation(codeFiles, specifications);
  
  // Generate architecture documentation
  const architectureDocumentation = generateArchitectureDocumentation(codeFiles, specifications);
  
  // Generate code documentation
  const codeDocumentation = generateCodeDocumentation(codeFiles);
  
  return {
    apiDocumentation,
    architectureDocumentation,
    codeDocumentation
  };
};
```

### User Documentation Generation

```typescript
const generateUserDocumentation = (changeName: string): UserDocumentation => {
  const features = getFeatures(changeName);
  const userStories = getUserStories(changeName);
  
  // Generate user guides
  const userGuides = generateUserGuides(features, userStories);
  
  // Generate tutorials
  const tutorials = generateTutorials(features, userStories);
  
  // Generate examples
  const examples = generateExamples(features, userStories);
  
  return {
    userGuides,
    referenceDocumentation: generateReferenceDocumentation(changeName),
    conceptualDocumentation: generateConceptualDocumentation(changeName)
  };
};
```

### Process Documentation Generation

```typescript
const generateProcessDocumentation = (changeName: string): ProcessDocumentation => {
  const workflow = getWorkflow(changeName);
  const qualityStandards = getQualityStandards(changeName);
  
  // Generate development process documentation
  const developmentProcess = generateDevelopmentProcess(workflow);
  
  // Generate quality process documentation
  const qualityProcess = generateQualityProcess(qualityStandards);
  
  // Generate deployment process documentation
  const deploymentProcess = generateDeploymentProcess(changeName);
  
  return {
    developmentProcess,
    qualityProcess,
    deploymentProcess
  };
};
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
    technicalAccuracy: number;
    factualAccuracy: number;
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
const analyzeDocumentationQuality = (changeName: string): DocumentationQualityMetrics => {
  const documentation = getAllDocumentation(changeName);
  
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

## DOCUMENTATION FORMATS

### Markdown Documentation

```typescript
const generateMarkdownDocumentation = (changeName: string): MarkdownDocumentation => {
  const docs = generateAllDocumentation(changeName);
  
  return {
    readme: generateReadme(docs),
    api: generateApiMarkdown(docs.apiDocumentation),
    architecture: generateArchitectureMarkdown(docs.architectureDocumentation),
    userGuide: generateUserGuideMarkdown(docs.userGuides),
    changelog: generateChangelogMarkdown(changeName)
  };
};
```

### HTML Documentation

```typescript
const generateHtmlDocumentation = (changeName: string): HtmlDocumentation => {
  const docs = generateAllDocumentation(changeName);
  
  return {
    index: generateIndexHtml(docs),
    api: generateApiHtml(docs.apiDocumentation),
    architecture: generateArchitectureHtml(docs.architectureDocumentation),
    userGuide: generateUserGuideHtml(docs.userGuides),
    search: generateSearchHtml(docs)
  };
};
```

### PDF Documentation

```typescript
const generatePdfDocumentation = (changeName: string): PdfDocumentation => {
  const docs = generateAllDocumentation(changeName);
  
  return {
    userGuide: generateUserGuidePdf(docs.userGuides),
    apiReference: generateApiReferencePdf(docs.apiDocumentation),
    architectureGuide: generateArchitectureGuidePdf(docs.architectureDocumentation),
    processGuide: generateProcessGuidePdf(docs.processDocumentation)
  };
};
```

---

## DOCUMENTATION MAINTENANCE

### Continuous Documentation Updates

```typescript
const setupDocumentationMaintenance = (changeName: string): void => {
  // Set up file watchers for documentation updates
  setupDocumentationWatchers(changeName);
  
  // Set up automatic documentation generation
  setupAutomaticGeneration(changeName);
  
  // Set up quality checks
  setupDocumentationQualityChecks(changeName);
};

const setupDocumentationWatchers = (changeName: string): void => {
  const changeDirectory = getChangeDirectory(changeName);
  
  // Watch for code changes
  watch(path.join(changeDirectory, 'src'), (eventType, filename) => {
    if (eventType === 'change') {
      scheduleDocumentationUpdate(changeName);
    }
  });
  
  // Watch for specification changes
  watch(path.join(changeDirectory, '*.md'), (eventType, filename) => {
    if (eventType === 'change') {
      scheduleDocumentationUpdate(changeName);
    }
  });
};
```

### Version Control Integration

```typescript
const integrateWithVersionControl = (changeName: string): void => {
  // Commit documentation changes
  const documentationChanges = getDocumentationChanges(changeName);
  
  if (documentationChanges.length > 0) {
    commitDocumentationChanges(changeName, documentationChanges);
  }
  
  // Create documentation tags
  const documentationTag = createDocumentationTag(changeName);
  
  // Update documentation version
  updateDocumentationVersion(changeName, documentationTag);
};
```

### Documentation Synchronization

```typescript
const synchronizeDocumentation = (changeName: string): void => {
  // Synchronize with code changes
  synchronizeWithCode(changeName);
  
  // Synchronize with specifications
  synchronizeWithSpecifications(changeName);
  
  // Synchronize with quality metrics
  synchronizeWithQualityMetrics(changeName);
  
  // Synchronize with user feedback
  synchronizeWithUserFeedback(changeName);
};
```

---

## DOCUMENTATION PUBLISHING

### Multi-Channel Publishing

```typescript
const publishDocumentation = (changeName: string): void => {
  const docs = generateAllDocumentation(changeName);
  
  // Publish to internal documentation site
  publishToInternalSite(docs);
  
  // Publish to external documentation site
  publishToExternalSite(docs);
  
  // Publish to API documentation
  publishToApiDocumentation(docs);
  
  // Publish to user guides
  publishToUserGuides(docs);
};
```

### Documentation Deployment

```typescript
const deployDocumentation = (changeName: string): void => {
  // Deploy to staging environment
  deployToStaging(changeName);
  
  // Validate staging deployment
  validateStagingDeployment(changeName);
  
  // Deploy to production environment
  deployToProduction(changeName);
  
  // Validate production deployment
  validateProductionDeployment(changeName);
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

const analyzeDocumentationUsage = (changeName: string): DocumentationAnalytics => {
  const analytics = getDocumentationAnalytics(changeName);
  
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

const analyzeDocumentationQuality = (changeName: string): QualityAnalytics => {
  const qualityHistory = getQualityHistory(changeName);
  const userFeedback = getUserFeedback(changeName);
  
  return {
    qualityTrends: analyzeQualityTrends(qualityHistory),
    commonIssues: identifyCommonIssues(qualityHistory),
    improvementAreas: identifyImprovementAreas(qualityHistory),
    userFeedback: userFeedback
  };
};
```

---

## DOCUMENTATION TEMPLATES

### Template Management

```typescript
interface DocumentationTemplate {
  name: string;
  type: 'technical' | 'user' | 'process';
  sections: TemplateSection[];
  variables: TemplateVariable[];
  metadata: TemplateMetadata;
}

const getDocumentationTemplate = (templateName: string): DocumentationTemplate => {
  return loadTemplate(templateName);
};

const applyTemplate = (template: DocumentationTemplate, data: any): string => {
  let content = template.content;
  
  // Replace variables
  template.variables.forEach(variable => {
    content = content.replace(new RegExp(`\\{\\{${variable.name}\\}\\}\\}`, 'g'), data[variable.name]);
  });
  
  return content;
};
```

### Template Customization

```typescript
const customizeTemplate = (template: DocumentationTemplate, customizations: TemplateCustomization[]): DocumentationTemplate => {
  return {
    ...template,
    sections: customizeSections(template.sections, customizations),
    variables: customizeVariables(template.variables, customizations),
    metadata: customizeMetadata(template.metadata, customizations)
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
    
  publishing:
    internal_site:
      enabled: true
      url: "https://docs.internal.company.com"
    external_site:
      enabled: true
      url: "https://docs.company.com"
    api_documentation:
      enabled: true
      url: "https://api.company.com/docs"
    
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
    'PUBLISHING_ERROR': () => console.log(`Documentation publishing failed in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.name] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptDocumentationRecovery = (changeName: string): boolean => {
  try {
    // Attempt to fix common documentation issues
    fixDocumentationStructure(changeName);
    fixDocumentationLinks(changeName);
    fixDocumentationMetadata(changeName);
    
    return true;
  } catch (error) {
    console.log(`Documentation recovery failed for ${changeName}: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Documentation Test Suite

```typescript
describe('Documentation Workflow', () => {
  test('should generate technical documentation', () => {
    const docs = generateTechnicalDocumentation('test-change');
    expect(docs.apiDocumentation.endpoints).toBeDefined();
  });
  
  test('should generate user documentation', () => {
    const docs = generateUserDocumentation('test-change');
    expect(docs.userGuides.gettingStarted).toBeDefined();
  });
  
  test('should analyze documentation quality', () => {
    const metrics = analyzeDocumentationQuality('test-change');
    expect(metrics.completeness.completenessScore).toBeGreaterThanOrEqual(0);
  });
  
  test('should generate documentation in multiple formats', () => {
    const markdown = generateMarkdownDocumentation('test-change');
    const html = generateHtmlDocumentation('test-change');
    expect(markdown.readme).toBeDefined();
    expect(html.index).toBeDefined();
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
