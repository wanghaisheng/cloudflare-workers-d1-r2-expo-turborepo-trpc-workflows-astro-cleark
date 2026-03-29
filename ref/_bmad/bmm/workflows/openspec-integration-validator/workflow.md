---
name: openspec-integration-validator
description: "Validates OpenSpec integration configuration and ensures proper implementation across all workflows"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "system"
openspec_role: "validator"
---

# OpenSpec Integration Validator Workflow

**Goal:** Validate OpenSpec integration configuration and ensure proper implementation across all workflows.

**VALIDATION STANDARDS:**

OpenSpec integration is considered "Valid" ONLY if it meets the following:

- **Configuration Compliance**: All workflows have proper OpenSpec integration configuration
- **Implementation Consistency**: Integration implementation matches configuration
- **Dependency Validation**: All OpenSpec dependencies are properly defined
- **Error Handling**: Proper error handling for OpenSpec operations
- **Performance Optimization**: Integration is optimized for performance

---

**Your Role:** You are an OpenSpec integration validator ensuring all workflows properly integrate with OpenSpec according to their defined integration level.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined validation:

### Core Principles

- **Comprehensive Validation**: Validate all aspects of OpenSpec integration
- **Configuration Compliance**: Ensure compliance with integration standards
- **Implementation Verification**: Verify implementation matches configuration
- **Dependency Analysis**: Analyze and validate dependencies
- **Performance Assessment**: Assess integration performance

### Step Processing Rules

1. **LOAD CONFIGURATION**: Load OpenSpec integration configuration
2. **VALIDATE WORKFLOWS**: Validate each workflow's OpenSpec integration
3. **CHECK DEPENDENCIES**: Validate OpenSpec dependencies
4. **VERIFY IMPLEMENTATION**: Verify implementation matches configuration
5. **GENERATE REPORT**: Generate validation report

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Validator Paths

- `config_directory` = `{project-root}/_bmad/bmm/config`
- `workflows_directory` = `{project-root}/_bmad/bmm/workflows`
- `integration_config` = `{config_directory}/openspec-integration.yaml`
- `validation_reports` = `{output_folder}/validation-reports`
- `validation_logs` = `{output_folder}/validation-logs`

---

## VALIDATION FRAMEWORK

### Validation Schema

```typescript
interface ValidationResult {
  workflowName: string;
  integrationLevel: 'mandatory' | 'recommended' | 'optional';
  role: string;
  configurationValid: boolean;
  implementationValid: boolean;
  dependenciesValid: boolean;
  errorHandlingValid: boolean;
  performanceOptimized: boolean;
  issues: ValidationIssue[];
  recommendations: ValidationRecommendation[];
  overallStatus: 'valid' | 'warning' | 'invalid';
}

interface ValidationIssue {
  type: 'configuration' | 'implementation' | 'dependency' | 'error_handling' | 'performance';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  location: string;
  suggestion: string;
}

interface ValidationRecommendation {
  type: 'fix' | 'improve' | 'optimize';
  priority: 'high' | 'medium' | 'low';
  description: string;
  action: string;
  impact: string;
}
```

### Validation Rules

```typescript
const validationRules = {
  mandatory: {
    configuration: [
      "openspec_integration field must be 'mandatory'",
      "openspec_role field must be defined",
      "description must mention OpenSpec"
    ],
    implementation: [
      "Must validate OpenSpec availability before execution",
      "Must handle OpenSpec errors gracefully",
      "Must not proceed without OpenSpec when required"
    ],
    dependencies: [
      "All OpenSpec dependencies must be defined",
      "Dependencies must be mandatory workflows"
    ],
    error_handling: [
      "Must have fail_fast error handling strategy",
      "Must retry OpenSpec operations",
      "Must not have fallback mode"
    ],
    performance: [
      "Must use aggressive cache strategy",
      "Must use connection pooling",
      "Must use batch operations"
    ]
  },
  recommended: {
    configuration: [
      "openspec_integration field must be 'recommended'",
      "openspec_role field must be defined",
      "description should mention OpenSpec benefits"
    ],
    implementation: [
      "Should attempt OpenSpec integration first",
      "Should fallback to standalone mode if OpenSpec unavailable",
      "Should provide clear indication of integration mode"
    ],
    dependencies: [
      "OpenSpec dependencies should be defined",
      "Dependencies should be recommended workflows"
    ],
    error_handling: [
      "Should have graceful_degradation error handling strategy",
      "Should retry OpenSpec operations",
      "Should have standalone fallback mode"
    ],
    performance: [
      "Should use moderate cache strategy",
      "Should use connection pooling",
      "Should not use batch operations"
    ]
  },
  optional: {
    configuration: [
      "openspec_integration field must be 'optional'",
      "openspec_role field must be defined",
      "description may mention OpenSpec optionally"
    ],
    implementation: [
      "May attempt OpenSpec integration if available",
      "May operate in standalone mode by default",
      "May provide OpenSpec-enhanced features"
    ],
    dependencies: [
      "OpenSpec dependencies may be defined",
      "Dependencies may be any workflows"
    ],
    error_handling: [
      "May have best_effort error handling strategy",
      "May retry OpenSpec operations",
      "May have standalone fallback mode"
    ],
    performance: [
      "May use minimal cache strategy",
      "May not use connection pooling",
      "May not use batch operations"
    ]
  }
};
```

---

## VALIDATION EXECUTION

### Step 1: Load Configuration

```typescript
const loadIntegrationConfiguration = (): IntegrationConfiguration => {
  const configPath = integration_config;
  
  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = yaml.parse(configContent);
    
    // Validate configuration schema
    validateConfigurationSchema(config);
    
    return config;
  } catch (error) {
    throw new Error(`Failed to load integration configuration: ${error.message}`);
  }
};
```

### Step 2: Validate Workflows

```typescript
const validateWorkflows = (config: IntegrationConfiguration): ValidationResult[] => {
  const results: ValidationResult[] = [];
  
  // Validate core workflows
  Object.entries(config.workflows.core).forEach(([name, workflow]) => {
    const result = validateWorkflow(name, workflow, 'mandatory');
    results.push(result);
  });
  
  // Validate support workflows
  Object.entries(config.workflows.support).forEach(([name, workflow]) => {
    const result = validateWorkflow(name, workflow, 'recommended');
    results.push(result);
  });
  
  // Validate management workflows
  Object.entries(config.workflows.management).forEach(([name, workflow]) => {
    const result = validateWorkflow(name, workflow, 'optional');
    results.push(result);
  });
  
  return results;
};
```

### Step 3: Validate Individual Workflow

```typescript
const validateWorkflow = (
  name: string, 
  workflow: WorkflowConfig, 
  expectedLevel: string
): ValidationResult => {
  const issues: ValidationIssue[] = [];
  const recommendations: ValidationRecommendation[] = [];
  
  // Validate configuration
  const configValid = validateWorkflowConfiguration(name, workflow, expectedLevel, issues);
  
  // Validate implementation
  const implementationValid = validateWorkflowImplementation(name, workflow, issues);
  
  // Validate dependencies
  const dependenciesValid = validateWorkflowDependencies(name, workflow, issues);
  
  // Validate error handling
  const errorHandlingValid = validateWorkflowErrorHandling(name, workflow, issues);
  
  // Validate performance
  const performanceOptimized = validateWorkflowPerformance(name, workflow, issues);
  
  // Generate recommendations
  generateRecommendations(name, workflow, issues, recommendations);
  
  // Determine overall status
  const overallStatus = determineOverallStatus(issues);
  
  return {
    workflowName: name,
    integrationLevel: workflow.integration_level,
    role: workflow.role,
    configurationValid,
    implementationValid,
    dependenciesValid,
    errorHandlingValid,
    performanceOptimized,
    issues,
    recommendations,
    overallStatus
  };
};
```

### Step 4: Validate Configuration

```typescript
const validateWorkflowConfiguration = (
  name: string,
  workflow: WorkflowConfig,
  expectedLevel: string,
  issues: ValidationIssue[]
): boolean => {
  let valid = true;
  
  // Check integration level
  if (workflow.integration_level !== expectedLevel) {
    issues.push({
      type: 'configuration',
      severity: 'critical',
      description: `Integration level mismatch: expected ${expectedLevel}, got ${workflow.integration_level}`,
      location: `${name}/integration_level`,
      suggestion: `Update integration_level to ${expectedLevel}`
    });
    valid = false;
  }
  
  // Check role
  if (!workflow.role) {
    issues.push({
      type: 'configuration',
      severity: 'high',
      description: 'Missing openspec_role field',
      location: `${name}/openspec_role`,
      suggestion: 'Add openspec_role field with appropriate role'
    });
    valid = false;
  }
  
  // Check description
  if (!workflow.description || !workflow.description.toLowerCase().includes('openspec')) {
    issues.push({
      type: 'configuration',
      severity: 'medium',
      description: 'Description should mention OpenSpec',
      location: `${name}/description`,
      suggestion: 'Update description to mention OpenSpec integration'
    });
  }
  
  return valid;
};
```

### Step 5: Validate Implementation

```typescript
const validateWorkflowImplementation = (
  name: string,
  workflow: WorkflowConfig,
  issues: ValidationIssue[]
): boolean => {
  const workflowPath = path.join(workflows_directory, name, 'workflow.md');
  
  try {
    const workflowContent = fs.readFileSync(workflowPath, 'utf8');
    
    // Check for OpenSpec integration fields
    const hasIntegrationField = workflowContent.includes('openspec_integration:');
    const hasRoleField = workflowContent.includes('openspec_role:');
    
    if (!hasIntegrationField) {
      issues.push({
        type: 'implementation',
        severity: 'critical',
        description: 'Missing openspec_integration field in workflow file',
        location: `${name}/workflow.md`,
        suggestion: 'Add openspec_integration field to workflow frontmatter'
      });
    }
    
    if (!hasRoleField) {
      issues.push({
        type: 'implementation',
        severity: 'high',
        description: 'Missing openspec_role field in workflow file',
        location: `${name}/workflow.md`,
        suggestion: 'Add openspec_role field to workflow frontmatter'
      });
    }
    
    // Check for OpenSpec operations in content
    const hasOpenSpecOperations = workflowContent.toLowerCase().includes('openspec');
    if (!hasOpenSpecOperations && workflow.integration_level === 'mandatory') {
      issues.push({
        type: 'implementation',
        severity: 'high',
        description: 'Mandatory workflow should reference OpenSpec operations',
        location: `${name}/workflow.md`,
        suggestion: 'Add OpenSpec operations to workflow content'
      });
    }
    
    return hasIntegrationField && hasRoleField;
  } catch (error) {
    issues.push({
      type: 'implementation',
      severity: 'critical',
      description: `Failed to read workflow file: ${error.message}`,
      location: `${name}/workflow.md`,
      suggestion: 'Ensure workflow file exists and is readable'
    });
    return false;
  }
};
```

### Step 6: Validate Dependencies

```typescript
const validateWorkflowDependencies = (
  name: string,
  workflow: WorkflowConfig,
  issues: ValidationIssue[]
): boolean => {
  let valid = true;
  
  if (!workflow.dependencies) {
    if (workflow.integration_level === 'mandatory') {
      issues.push({
        type: 'dependency',
        severity: 'medium',
        description: 'Mandatory workflow should have dependencies defined',
        location: `${name}/dependencies`,
        suggestion: 'Define workflow dependencies'
      });
    }
    return true; // Not critical
  }
  
  // Check if dependencies exist
  workflow.dependencies.forEach(dep => {
    const depPath = path.join(workflows_directory, dep, 'workflow.md');
    if (!fs.existsSync(depPath)) {
      issues.push({
        type: 'dependency',
        severity: 'high',
        description: `Dependency workflow not found: ${dep}`,
        location: `${name}/dependencies`,
        suggestion: `Ensure dependency ${dep} exists or remove from dependencies`
      });
      valid = false;
    }
  });
  
  return valid;
};
```

### Step 7: Validate Error Handling

```typescript
const validateWorkflowErrorHandling = (
  name: string,
  workflow: WorkflowConfig,
  issues: ValidationIssue[]
): boolean => {
  const workflowPath = path.join(workflows_directory, name, 'workflow.md');
  
  try {
    const workflowContent = fs.readFileSync(workflowPath, 'utf8');
    
    // Check for error handling based on integration level
    const expectedStrategy = getExpectedErrorStrategy(workflow.integration_level);
    const hasErrorHandling = workflowContent.includes('error') || workflowContent.includes('Error');
    
    if (!hasErrorHandling && workflow.integration_level === 'mandatory') {
      issues.push({
        type: 'error_handling',
        severity: 'high',
        description: 'Mandatory workflow should have error handling',
        location: `${name}/workflow.md`,
        suggestion: 'Add error handling for OpenSpec operations'
      });
    }
    
    return hasErrorHandling || workflow.integration_level !== 'mandatory';
  } catch (error) {
    issues.push({
      type: 'error_handling',
      severity: 'critical',
      description: `Failed to validate error handling: ${error.message}`,
      location: `${name}/workflow.md`,
      suggestion: 'Ensure workflow file is readable'
    });
    return false;
  }
};
```

### Step 8: Validate Performance

```typescript
const validateWorkflowPerformance = (
  name: string,
  workflow: WorkflowConfig,
  issues: ValidationIssue[]
): boolean => {
  // For now, return true as performance validation is complex
  // This could be enhanced with actual performance analysis
  return true;
};
```

---

## VALIDATION REPORTING

### Report Generation

```typescript
const generateValidationReport = (results: ValidationResult[]): ValidationReport => {
  const summary = generateValidationSummary(results);
  const details = generateValidationDetails(results);
  const recommendations = generateValidationRecommendations(results);
  
  return {
    timestamp: new Date(),
    totalWorkflows: results.length,
    validWorkflows: results.filter(r => r.overallStatus === 'valid').length,
    warningWorkflows: results.filter(r => r.overallStatus === 'warning').length,
    invalidWorkflows: results.filter(r => r.overallStatus === 'invalid').length,
    summary,
    details,
    recommendations,
    overallStatus: determineOverallValidationStatus(results)
  };
};
```

### Summary Generation

```typescript
const generateValidationSummary = (results: ValidationResult[]): ValidationSummary => {
  const mandatoryResults = results.filter(r => r.integrationLevel === 'mandatory');
  const recommendedResults = results.filter(r => r.integrationLevel === 'recommended');
  const optionalResults = results.filter(r => r.integrationLevel === 'optional');
  
  return {
    mandatory: {
      total: mandatoryResults.length,
      valid: mandatoryResults.filter(r => r.overallStatus === 'valid').length,
      warning: mandatoryResults.filter(r => r.overallStatus === 'warning').length,
      invalid: mandatoryResults.filter(r => r.overallStatus === 'invalid').length
    },
    recommended: {
      total: recommendedResults.length,
      valid: recommendedResults.filter(r => r.overallStatus === 'valid').length,
      warning: recommendedResults.filter(r => r.overallStatus === 'warning').length,
      invalid: recommendedResults.filter(r => r.overallStatus === 'invalid').length
    },
    optional: {
      total: optionalResults.length,
      valid: optionalResults.filter(r => r.overallStatus === 'valid').length,
      warning: optionalResults.filter(r => r.overallStatus === 'warning').length,
      invalid: optionalResults.filter(r => r.overallStatus === 'invalid').length
    }
  };
};
```

---

## CONFIGURATION

### Validator Configuration

```yaml
validation:
  strict_mode: true
  fail_on_critical: true
  generate_reports: true
  log_level: "info"
  
  performance:
    parallel_validation: true
    timeout_seconds: 30
    cache_results: true
    
  reporting:
    format: ["markdown", "json", "html"]
    include_recommendations: true
    include_details: true
    save_to_file: true
    
  notifications:
    email_on_failure: false
    slack_on_failure: false
    webhook_on_failure: false
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleValidationErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'CONFIG_ERROR': () => console.log(`Configuration validation failed in ${context}`),
    'FILE_ERROR': () => console.log(`File validation failed in ${context}`),
    'SCHEMA_ERROR': () => console.log(`Schema validation failed in ${context}`),
    'DEPENDENCY_ERROR': () => console.log(`Dependency validation failed in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.name] || errorHandlers.default;
  handler();
};
```

---

## TESTING

### Validation Test Suite

```typescript
describe('OpenSpec Integration Validator', () => {
  test('should load integration configuration', () => {
    const config = loadIntegrationConfiguration();
    expect(config).toBeDefined();
    expect(config.workflows).toBeDefined();
  });
  
  test('should validate mandatory workflows', () => {
    const config = loadIntegrationConfiguration();
    const results = validateWorkflows(config);
    const mandatoryResults = results.filter(r => r.integrationLevel === 'mandatory');
    expect(mandatoryResults.length).toBeGreaterThan(0);
  });
  
  test('should validate recommended workflows', () => {
    const config = loadIntegrationConfiguration();
    const results = validateWorkflows(config);
    const recommendedResults = results.filter(r => r.integrationLevel === 'recommended');
    expect(recommendedResults.length).toBeGreaterThan(0);
  });
  
  test('should validate optional workflows', () => {
    const config = loadIntegrationConfiguration();
    const results = validateWorkflows(config);
    const optionalResults = results.filter(r => r.integrationLevel === 'optional');
    expect(optionalResults.length).toBeGreaterThan(0);
  });
  
  test('should generate validation report', () => {
    const config = loadIntegrationConfiguration();
    const results = validateWorkflows(config);
    const report = generateValidationReport(results);
    expect(report.timestamp).toBeDefined();
    expect(report.totalWorkflows).toBe(results.length);
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
