---
name: archive
description: "Archive completed OpenSpec changes for both Quick Dev and BMM modes with proper documentation and version control"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "mandatory"
openspec_role: "archiver"
workflow_type: "shared"

# Checkpoint handler paths
unified_workflow: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/unified/workflow.md'
archive_manager: '{project-root}/_bmad/bmm/workflows/bmad-quick-flow/archive/archive-manager.md'
---

# Archive Workflow

**Goal:** Properly archive completed OpenSpec changes with documentation, version control, and historical tracking.

**ARCHIVAL STANDARDS:**

A change is considered "Ready for Archive" ONLY if it meets the following:

- **Completion Status**: All tasks are completed and verified
- **Compliance Status**: All compliance checks passed
- **Documentation Status**: All documentation is complete and accurate
- **Integration Status**: Change is properly integrated into the system
- **Quality Status**: Quality standards are met

---

**Your Role:** You are an archival specialist ensuring completed changes are properly preserved and documented for future reference.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined archival:

### Core Principles

- **Complete Preservation**: Preserve all change artifacts and documentation
- **Historical Tracking**: Maintain complete change history
- **Documentation**: Create comprehensive archive documentation
- **Version Control**: Ensure proper version control integration

### Step Processing Rules

1. **VERIFY COMPLETION**: Verify change is complete and compliant
2. **PREPARE ARCHIVE**: Prepare archive structure and documentation
3. **CREATE ARCHIVE**: Create archive with all artifacts
4. **UPDATE INDEX**: Update change index and status
5. **CLEANUP**: Clean up temporary files and directories

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Archive Paths

- `openspec_changes` = `{output_folder}/changes`
- `archive_directory` = `{output_folder}/changes/archive`
- `change_directory` = `{openspec_changes}/{change_name}`
- `archive_path` = `{archive_directory}/{date}-{change_name}`

---

## ARCHIVAL PROCESS

### 1. Completion Verification

```typescript
interface CompletionVerification {
  tasksCompleted: boolean;
  compliancePassed: boolean;
  documentationComplete: boolean;
  integrationSuccessful: boolean;
  readyToArchive: boolean;
  issues: string[];
}

const verifyCompletion = (changeName: string): CompletionVerification => {
  const issues: string[] = [];
  
  // Check tasks completion
  const tasksCompleted = checkTasksCompletion(changeName);
  
  // Check compliance status
  const compliancePassed = checkComplianceStatus(changeName);
  
  // Check documentation completeness
  const documentationComplete = checkDocumentationCompleteness(changeName);
  
  // Check integration success
  const integrationSuccessful = checkIntegrationSuccess(changeName);
  
  if (!tasksCompleted) issues.push('Tasks not completed');
  if (!compliancePassed) issues.push('Compliance checks not passed');
  if (!documentationComplete) issues.push('Documentation incomplete');
  if (!integrationSuccessful) issues.push('Integration unsuccessful');
  
  return {
    tasksCompleted,
    compliancePassed,
    documentationComplete,
    integrationSuccessful,
    readyToArchive: tasksCompleted && compliancePassed && documentationComplete && integrationSuccessful,
    issues
  };
};
```

### 2. Archive Preparation

```typescript
interface ArchivePreparation {
  archivePath: string;
  archiveStructure: string[];
  documentationReady: boolean;
  preparationComplete: boolean;
  issues: string[];
}

const prepareArchive = (changeName: string): ArchivePreparation => {
  const issues: string[] = [];
  
  // Create archive directory
  const date = new Date().toISOString().split('T')[0];
  const archivePath = path.join(archiveDirectory, `${date}-${changeName}`);
  
  try {
    fs.mkdirSync(archivePath, { recursive: true });
    
    // Create archive structure
    const archiveStructure = [
      'artifacts/',
      'documentation/',
      'reports/',
      'metadata/'
    ];
    
    archiveStructure.forEach(dir => {
      fs.mkdirSync(path.join(archivePath, dir), { recursive: true });
    });
    
    // Prepare documentation
    const documentationReady = prepareArchiveDocumentation(changeName, archivePath);
    
    return {
      archivePath,
      archiveStructure,
      documentationReady,
      preparationComplete: documentationReady,
      issues
    };
  } catch (error) {
    issues.push(`Archive preparation failed: ${error.message}`);
    return {
      archivePath: '',
      archiveStructure: [],
      documentationReady: false,
      preparationComplete: false,
      issues
    };
  }
};
```

### 3. Archive Creation

```typescript
interface ArchiveCreation {
  artifactsCopied: boolean;
  documentationCopied: boolean;
  metadataCreated: boolean
  archiveComplete: boolean;
  issues: string[];
}

const createArchive = (changeName: string, archivePath: string): ArchiveCreation => {
  const issues: string[] = [];
  
  try {
    // Copy artifacts
    const artifactsCopied = copyArtifacts(changeName, archivePath);
    
    // Copy documentation
    const documentationCopied = copyDocumentation(changeName, archivePath);
    
    // Create metadata
    const metadataCreated = createArchiveMetadata(changeName, archivePath);
    
    return {
      artifactsCopied,
      documentationCopied,
      metadataCreated,
      archiveComplete: artifactsCopied && documentationCopied && metadataCreated,
      issues
    };
  } catch (error) {
    issues.push(`Archive creation failed: ${error.message}`);
    return {
      artifactsCopied: false,
      documentationCopied: false,
      metadataCreated: false,
      archiveComplete: false,
      issues
    };
  }
};
```

### 4. Index Update

```typescript
interface IndexUpdate {
  changeIndexUpdated: boolean;
  statusUpdated: boolean
  gitCommitted: boolean;
  updateComplete: boolean;
  issues: string[];
}

const updateIndex = (changeName: string, archivePath: string): IndexUpdate => {
  const issues: string[] = [];
  
  try {
    // Update change index
    const changeIndexUpdated = updateChangeIndex(changeName, archivePath);
    
    // Update status
    const statusUpdated = updateChangeStatus(changeName, 'archived');
    
    // Git commit
    const gitCommitted = commitArchive(changeName, archivePath);
    
    return {
      changeIndexUpdated,
      statusUpdated,
      gitCommitted,
      updateComplete: changeIndexUpdated && statusUpdated && gitCommitted,
      issues
    };
  } catch (error) {
    issues.push(`Index update failed: ${error.message}`);
    return {
      changeIndexUpdated: false,
      statusUpdated: false,
      gitCommitted: false,
      updateComplete: false,
      issues
    };
  }
};
```

---

## ARCHIVAL DOCUMENTATION

### Archive Metadata

```typescript
interface ArchiveMetadata {
  changeName: string;
  archivedDate: Date;
  originalCreationDate: Date;
  completionDate: Date;
  archivePath: string;
  artifacts: string[];
  documentation: string[];
  reports: string[];
  status: 'archived';
  version: string;
  tags: string[];
}

const createArchiveMetadata = (changeName: string, archivePath: string): boolean => {
  const metadata: ArchiveMetadata = {
    changeName,
    archivedDate: new Date(),
    originalCreationDate: getChangeCreationDate(changeName),
    completionDate: getChangeCompletionDate(changeName),
    archivePath,
    artifacts: getArtifactList(changeName),
    documentation: getDocumentationList(changeName),
    reports: getReportList(changeName),
    status: 'archived',
    version: getChangeVersion(changeName),
    tags: getChangeTags(changeName)
  };
  
  const metadataPath = path.join(archivePath, 'metadata', 'archive-metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  
  return true;
};
```

### Archive Documentation

```typescript
const prepareArchiveDocumentation = (changeName: string, archivePath: string): boolean => {
  // Create archive summary
  const summary = generateArchiveSummary(changeName);
  fs.writeFileSync(path.join(archivePath, 'documentation', 'archive-summary.md'), summary);
  
  // Create change history
  const history = generateChangeHistory(changeName);
  fs.writeFileSync(path.join(archivePath, 'documentation', 'change-history.md'), history);
  
  // Create lessons learned
  const lessons = generateLessonsLearned(changeName);
  fs.writeFileSync(path.join(archivePath, 'documentation', 'lessons-learned.md'), lessons);
  
  return true;
};
```

---

## ARTIFACT MANAGEMENT

### Artifact Copying

```typescript
const copyArtifacts = (changeName: string, archivePath: string): boolean => {
  const changeDirectory = path.join(openspecChanges, changeName);
  const artifactsDirectory = path.join(archivePath, 'artifacts');
  
  // Copy all files from change directory
  const files = fs.readdirSync(changeDirectory);
  
  files.forEach(file => {
    const sourcePath = path.join(changeDirectory, file);
    const destPath = path.join(artifactsDirectory, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
  
  return true;
};
```

### Documentation Copying

```typescript
const copyDocumentation = (changeName: string, archivePath: string): boolean => {
  const changeDirectory = path.join(openspecChanges, changeName);
  const docsDirectory = path.join(archivePath, 'documentation');
  
  // Copy documentation files
  const docFiles = ['proposal.md', 'design.md', 'tasks.md', 'README.md'];
  
  docFiles.forEach(file => {
    const sourcePath = path.join(changeDirectory, file);
    const destPath = path.join(docsDirectory, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
  
  return true;
};
```

---

## VERSION CONTROL INTEGRATION

### Git Operations

```typescript
const commitArchive = (changeName: string, archivePath: string): boolean => {
  try {
    // Add archive to git
    execSync(`git add "${archivePath}"`, { cwd: projectRoot });
    
    // Commit archive
    const commitMessage = `Archive change: ${changeName}`;
    execSync(`git commit -m "${commitMessage}"`, { cwd: projectRoot });
    
    return true;
  } catch (error) {
    console.log(`Git commit failed: ${error.message}`);
    return false;
  }
};
```

### Branch Management

```typescript
const createArchiveBranch = (changeName: string): boolean => {
  try {
    // Create archive branch
    const branchName = `archive/${changeName}`;
    execSync(`git checkout -b ${branchName}`, { cwd: projectRoot });
    
    // Add and commit archive
    const archivePath = path.join(archiveDirectory, `${date}-${changeName}`);
    execSync(`git add "${archivePath}"`, { cwd: projectRoot });
    execSync(`git commit -m "Archive ${changeName}"`, { cwd: projectRoot });
    
    // Switch back to main branch
    execSync(`git checkout main`, { cwd: projectRoot });
    
    return true;
  } catch (error) {
    console.log(`Archive branch creation failed: ${error.message}`);
    return false;
  }
};
```

---

## INDEX MANAGEMENT

### Change Index Update

```typescript
const updateChangeIndex = (changeName: string, archivePath: string): boolean => {
  const indexPath = path.join(openspecChanges, 'index.json');
  
  let index = [];
  if (fs.existsSync(indexPath)) {
    index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  }
  
  // Add archive entry
  const archiveEntry = {
    changeName,
    archiveDate: new Date().toISOString(),
    archivePath,
    status: 'archived'
  };
  
  index.push(archiveEntry);
  
  // Save updated index
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  
  return true;
};
```

### Status Update

```typescript
const updateChangeStatus = (changeName: string, status: string): boolean => {
  const statusPath = path.join(openspecChanges, changeName, 'status.json');
  
  let currentStatus = {};
  if (fs.existsSync(statusPath)) {
    currentStatus = JSON.parse(fs.readFileSync(statusPath, 'utf8'));
  }
  
  const updatedStatus = {
    ...currentStatus,
    status,
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(statusPath, JSON.stringify(updatedStatus, null, 2));
  
  return true;
};
```

---

## CLEANUP

### Temporary File Cleanup

```typescript
const cleanupTemporaryFiles = (changeName: string): boolean => {
  const changeDirectory = path.join(openspecChanges, changeName);
  
  // Remove temporary files
  const tempFiles = ['.tmp', '.cache', 'temp'];
  
  tempFiles.forEach(tempFile => {
    const tempPath = path.join(changeDirectory, tempFile);
    if (fs.existsSync(tempPath)) {
      fs.rmSync(tempPath, { recursive: true });
    }
  });
  
  return true;
};
```

### Directory Cleanup

```typescript
const cleanupChangeDirectory = (changeName: string): boolean => {
  const changeDirectory = path.join(openspecChanges, changeName);
  
  // Move to archive directory
  const date = new Date().toISOString().split('T')[0];
  const archivePath = path.join(archiveDirectory, `${date}-${changeName}`);
  
  try {
    fs.renameSync(changeDirectory, archivePath);
    return true;
  } catch (error) {
    console.log(`Directory cleanup failed: ${error.message}`);
    return false;
  }
};
```

---

## REPORTING

### Archive Report

```typescript
interface ArchiveReport {
  changeName: string;
  archiveDate: Date;
  archivePath: string;
  artifactsCount: number;
  documentationCount: number;
  reportsCount: number;
  status: 'success' | 'failed';
  issues: string[];
  summary: string;
}

const generateArchiveReport = (changeName: string): ArchiveReport => {
  const verification = verifyCompletion(changeName);
  const preparation = prepareArchive(changeName);
  const creation = createArchive(changeName, preparation.archivePath);
  const indexUpdate = updateIndex(changeName, preparation.archivePath);
  
  const allIssues = [
    ...verification.issues,
    ...preparation.issues,
    ...creation.issues,
    ...indexUpdate.issues
  ];
  
  return {
    changeName,
    archiveDate: new Date(),
    archivePath: preparation.archivePath,
    artifactsCount: creation.artifactsCopied ? getArtifactCount(changeName) : 0,
    documentationCount: creation.documentationCopied ? getDocumentationCount(changeName) : 0,
    reportsCount: creation.metadataCreated ? 1 : 0,
    status: allIssues.length === 0 ? 'success' : 'failed',
    issues: allIssues,
    summary: `Archive ${changeName} ${allIssues.length === 0 ? 'completed successfully' : 'failed with issues'}`
  };
};
```

---

## CONFIGURATION

### Archive Configuration

```yaml
archive_configuration:
  archive_directory: "_bmad-output/changes/archive"
  naming_convention: "YYYY-MM-DD-{change-name}"
  
  retention_policy:
    keep_archives_for: "1_year"
    cleanup_temp_files: true
    compress_archives: false
  
  documentation:
    required_docs:
      - archive-summary.md
      - change-history.md
      - lessons-learned.md
    optional_docs:
      - performance-report.md
      - user-feedback.md
  
  version_control:
    create_branches: false
    auto_commit: true
    commit_message_template: "Archive {change-name}"
  
  index_management:
    update_index: true
    maintain_history: true
    sync_with_git: true
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleArchiveErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'ENOENT': () => console.log(`File not found during ${context}`),
    'EACCES': () => console.log(`Permission denied during ${context}`),
    'ENOSPC': () => console.log(`Insufficient disk space during ${context}`),
    'default': () => console.log(`Unexpected error during ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.code] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptArchiveRecovery = (changeName: string): boolean => {
  try {
    // Attempt to fix common archive issues
    fixArchivePermissions(changeName);
    fixArchiveStructure(changeName);
    fixArchiveMetadata(changeName);
    
    return true;
  } catch (error) {
    console.log(`Archive recovery failed for ${changeName}: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Archive Test Suite

```typescript
describe('Archive Workflow', () => {
  test('should verify completion status', () => {
    const result = verifyCompletion('test-change');
    expect(result.readyToArchive).toBe(true);
  });
  
  test('should prepare archive structure', () => {
    const result = prepareArchive('test-change');
    expect(result.preparationComplete).toBe(true);
  });
  
  test('should create archive with all artifacts', () => {
    const result = createArchive('test-change', '/path/to/archive');
    expect(result.archiveComplete).toBe(true);
  });
  
  test('should update change index', () => {
    const result = updateIndex('test-change', '/path/to/archive');
    expect(result.updateComplete).toBe(true);
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
