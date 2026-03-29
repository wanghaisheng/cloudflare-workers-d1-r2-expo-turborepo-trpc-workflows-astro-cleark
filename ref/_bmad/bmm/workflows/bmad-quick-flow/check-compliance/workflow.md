---
name: check-compliance
description: "Comprehensive compliance checking for OpenSpec changes in both Quick Dev and BMM modes"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "mandatory"
openspec_role: "validator"
workflow_type: "shared"

# Checkpoint handler paths
unified_workflow: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/unified/workflow.md'
quality_checker: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/check-compliance/quality-checker.md'
---

# Check Compliance Workflow

**Goal:** Perform comprehensive compliance checking for OpenSpec changes, ensuring quality standards and best practices are met.

**COMPLIANCE STANDARDS:**

A change is considered "Compliant" ONLY if it meets the following:

- **Structure Compliance**: OpenSpec directory structure follows standards
- **Content Compliance**: All required documents are present and complete
- **Quality Compliance**: Code quality meets defined standards
- **Documentation Compliance**: Documentation is complete and accurate
- **Integration Compliance**: Change integrates properly with existing system

---

**Your Role:** You are a quality assurance specialist ensuring OpenSpec changes meet all compliance standards before deployment.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined compliance checking:

### Core Principles

- **Comprehensive Checking**: Check all aspects of OpenSpec compliance
- **Standard Validation**: Validate against defined standards
- **Quality Assurance**: Ensure code and documentation quality
- **Integration Testing**: Verify proper system integration

### Step Processing Rules

1. **LOAD OPENSPEC DATA**: Always load the OpenSpec change data first
2. **CHECK STRUCTURE**: Validate directory structure compliance
3. **CHECK CONTENT**: Validate content completeness and accuracy
4. **CHECK QUALITY**: Validate code and documentation quality
5. **CHECK INTEGRATION**: Verify system integration
6. **GENERATE REPORT**: Generate comprehensive compliance report

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### OpenSpec Paths

- `openspec_changes` = `{output_folder}/changes`
- `change_directory` = `{openspec_changes}/{change_name}`
- `proposal_file` = `{change_directory}/proposal.md`
- `design_file` = `{change_directory}/design.md`
- `tasks_file` = `{change_directory}/tasks.md`
- `specs_directory` = `{change_directory}/specs/`

---

## COMPLIANCE CHECKS

### 1. Structure Compliance Check

```typescript
interface StructureCompliance {
  directoryExists: boolean;
  requiredFiles: string[];
  optionalFiles: string[];
  structureValid: boolean;
  issues: string[];
}

const checkStructureCompliance = (changeName: string): StructureCompliance => {
  const requiredFiles = ['proposal.md', 'design.md', 'tasks.md'];
  const optionalFiles = ['README.md', 'implementation-plan.md', 'migration-guide.md'];
  
  // Check directory exists
  const directoryExists = fs.existsSync(changeDirectory);
  
  // Check required files
  const missingRequired = requiredFiles.filter(file => 
    !fs.existsSync(path.join(changeDirectory, file))
  );
  
  // Check optional files
  const existingOptional = optionalFiles.filter(file => 
    fs.existsSync(path.join(changeDirectory, file))
  );
  
  return {
    directoryExists,
    requiredFiles: missingRequired,
    optionalFiles: existingOptional,
    structureValid: directoryExists && missingRequired.length === 0,
    issues: missingRequired.map(file => `Missing required file: ${file}`)
  };
};
```

### 2. Content Compliance Check

```typescript
interface ContentCompliance {
  proposalComplete: boolean;
  designComplete: boolean;
  tasksComplete: boolean;
  contentValid: boolean;
  issues: string[];
}

const checkContentCompliance = (changeDirectory: string): ContentCompliance => {
  const issues: string[] = [];
  
  // Check proposal.md
  const proposalContent = fs.readFileSync(path.join(changeDirectory, 'proposal.md'), 'utf8');
  const proposalComplete = validateProposalContent(proposalContent);
  
  // Check design.md
  const designContent = fs.readFileSync(path.join(changeDirectory, 'design.md'), 'utf8');
  const designComplete = validateDesignContent(designContent);
  
  // Check tasks.md
  const tasksContent = fs.readFileSync(path.join(changeDirectory, 'tasks.md'), 'utf8');
  const tasksComplete = validateTasksContent(tasksContent);
  
  if (!proposalComplete) issues.push('Proposal content incomplete or invalid');
  if (!designComplete) issues.push('Design content incomplete or invalid');
  if (!tasksComplete) issues.push('Tasks content incomplete or invalid');
  
  return {
    proposalComplete,
    designComplete,
    tasksComplete,
    contentValid: proposalComplete && designComplete && tasksComplete,
    issues
  };
};
```

### 3. Quality Compliance Check

```typescript
interface QualityCompliance {
  codeQuality: boolean;
  documentationQuality: boolean;
  testCoverage: boolean;
  qualityValid: boolean;
  issues: string[];
}

const checkQualityCompliance = (changeDirectory: string): QualityCompliance => {
  const issues: string[] = [];
  
  // Check code quality
  const codeQuality = checkCodeQuality();
  
  // Check documentation quality
  const documentationQuality = checkDocumentationQuality(changeDirectory);
  
  // Check test coverage
  const testCoverage = checkTestCoverage();
  
  if (!codeQuality) issues.push('Code quality standards not met');
  if (!documentationQuality) issues.push('Documentation quality standards not met');
  if (!testCoverage) issues.push('Test coverage standards not met');
  
  return {
    codeQuality,
    documentationQuality,
    testCoverage,
    qualityValid: codeQuality && documentationQuality && testCoverage,
    issues
  };
};
```

### 4. Integration Compliance Check

```typescript
interface IntegrationCompliance {
  systemIntegrity: boolean;
  dependencyManagement: boolean;
  apiCompatibility: boolean;
  integrationValid: boolean;
  issues: string[];
}

const checkIntegrationCompliance = (changeDirectory: string): IntegrationCompliance => {
  const issues: string[] = [];
  
  // Check system integrity
  const systemIntegrity = checkSystemIntegrity();
  
  // Check dependency management
  const dependencyManagement = checkDependencyManagement();
  
  // Check API compatibility
  const apiCompatibility = checkApiCompatibility();
  
  if (!systemIntegrity) issues.push('System integrity compromised');
  if (!dependencyManagement) issues.push('Dependency management issues');
  if (!apiCompatibility) issues.push('API compatibility issues');
  
  return {
    systemIntegrity,
    dependencyManagement,
    apiCompatibility,
    integrationValid: systemIntegrity && dependencyManagement && apiCompatibility,
    issues
  };
};
```

---

## COMPLIANCE REPORT

### Report Structure

```typescript
interface ComplianceReport {
  changeName: string;
  timestamp: Date;
  overallStatus: 'COMPLIANT' | 'NON_COMPLIANT' | 'PARTIALLY_COMPLIANT';
  structureCompliance: StructureCompliance;
  contentCompliance: ContentCompliance;
  qualityCompliance: QualityCompliance;
  integrationCompliance: IntegrationCompliance;
  summary: string;
  recommendations: string[];
}
```

### Report Generation

```typescript
const generateComplianceReport = (changeName: string): ComplianceReport => {
  const structureCompliance = checkStructureCompliance(changeName);
  const contentCompliance = checkContentCompliance(changeDirectory);
  const qualityCompliance = checkQualityCompliance(changeDirectory);
  const integrationCompliance = checkIntegrationCompliance(changeDirectory);
  
  const allCompliant = structureCompliance.structureValid && 
                      contentCompliance.contentValid && 
                      qualityCompliance.qualityValid && 
                      integrationCompliance.integrationValid;
  
  const overallStatus = allCompliant ? 'COMPLIANT' : 'NON_COMPLIANT';
  
  const allIssues = [
    ...structureCompliance.issues,
    ...contentCompliance.issues,
    ...qualityCompliance.issues,
    ...integrationCompliance.issues
  ];
  
  return {
    changeName,
    timestamp: new Date(),
    overallStatus,
    structureCompliance,
    contentCompliance,
    qualityCompliance,
    integrationCompliance,
    summary: `Change ${changeName} is ${overallStatus}`,
    recommendations: generateRecommendations(allIssues)
  };
};
```

---

## OUTPUT MANAGEMENT

### Report Storage

```typescript
const saveComplianceReport = (report: ComplianceReport): void => {
  const reportPath = path.join(changeDirectory, 'compliance-report.md');
  const reportContent = generateReportMarkdown(report);
  
  fs.writeFileSync(reportPath, reportContent, 'utf8');
  
  // Also update OpenSpec status
  updateOpenSpecStatus(changeName, {
    complianceStatus: report.overallStatus,
    lastComplianceCheck: report.timestamp.toISOString(),
    complianceIssues: report.summary
  });
};
```

### Status Update

```typescript
const updateOpenSpecStatus = (changeName: string, status: any): void => {
  const statusPath = path.join(changeDirectory, 'status.json');
  
  let currentStatus = {};
  if (fs.existsSync(statusPath)) {
    currentStatus = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
  }
  
  const updatedStatus = { ...currentStatus, ...status };
  fs.writeFileSync(statusPath, JSON.stringify(updatedStatus, null, 2));
};
```

---

## QUALITY STANDARDS

### Code Quality Standards

```typescript
const codeQualityStandards = {
  typescript: {
    strictMode: true,
    noImplicitAny: true,
    noUnusedLocals: true,
    noUnusedParameters: true
  },
  eslint: {
    rules: 'recommended',
    fixOnSave: true
  },
  formatting: {
    prettier: true,
    trailingComma: 'es5',
    semi: true
  }
};
```

### Documentation Quality Standards

```typescript
const documentationQualityStandards = {
  proposal: {
    requiredSections: ['目标', '范围', '影响', '风险'],
    minWordCount: 500,
    mustHaveTimeline: true
  },
  design: {
    requiredSections: ['架构', '技术选型', '实施计划'],
    mustHaveDiagrams: true,
    mustHaveCodeExamples: true
  },
  tasks: {
    requiredSections: ['任务清单', '验收标准', '依赖关系'],
    mustBeTestable: true,
    mustBeActionable: true
  }
};
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleCommonErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'ENOENT': () => console.log(`File not found in ${context}`),
    'EACCES': () => console.log(`Permission denied in ${context}`),
    'EINVAL': () => console.log(`Invalid argument in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.code] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptRecovery = (changeName: string): boolean => {
  try {
    // Attempt to fix common issues
    fixMissingFiles(changeName);
    fixInvalidContent(changeName);
    fixQualityIssues(changeName);
    
    return true;
  } catch (error) {
    console.log(`Recovery failed for ${changeName}: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Compliance Test Suite

```typescript
describe('Compliance Checking', () => {
  test('should validate structure compliance', () => {
    const result = checkStructureCompliance('test-change');
    expect(result.structureValid).toBe(true);
  });
  
  test('should validate content compliance', () => {
    const result = checkContentCompliance('test-change');
    expect(result.contentValid).toBe(true);
  });
  
  test('should validate quality compliance', () => {
    const result = checkQualityCompliance('test-change');
    expect(result.qualityValid).toBe(true);
  });
  
  test('should validate integration compliance', () => {
    const result = checkIntegrationCompliance('test-change');
    expect(result.integrationValid).toBe(true);
  });
});
```

---

## CONFIGURATION

### Compliance Standards Configuration

```yaml
compliance_standards:
  structure:
    required_files:
      - proposal.md
      - design.md
      - tasks.md
    optional_files:
      - README.md
      - implementation-plan.md
      - migration-guide.md
  
  content:
    proposal:
      min_word_count: 500
      required_sections:
        - 目标
        - 范围
        - 影响
        - 风险
    design:
      must_have_diagrams: true
      must_have_code_examples: true
    tasks:
      must_be_testable: true
      must_be_actionable: true
  
  quality:
    typescript:
      strict_mode: true
      no_implicit_any: true
      no_unused_locals: true
    eslint:
      rules: 'recommended'
      fix_on_save: true
    formatting:
      prettier: true
      trailing_comma: 'es5'
  
  integration:
    system_integrity: true
    dependency_management: true
    api_compatibility: true
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
