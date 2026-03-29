---
name: retrospective
description: "Comprehensive retrospective workflow for completed changes with lessons learned and improvement recommendations"
author: "BMAD"
main_config: '{project-root}/_bmad/bmm/config.yaml'
web_bundle: true
openspec_integration: "optional"
openspec_role: "retrospective_analyzer"

# Retrospective Workflow

**Goal:** Conduct comprehensive retrospectives for completed changes with lessons learned and improvement recommendations for future projects.

**RETROSPECTIVE STANDARDS:**

A retrospective is considered "High Quality" ONLY if it meets the following:

- **Comprehensive Coverage**: Covers all aspects of the change
- **Actionable Insights**: Provides actionable improvement recommendations
- **Lessons Learned**: Documents key lessons learned
- **Future Planning**: Provides recommendations for future projects
- **Team Reflection**: Includes team reflection and feedback

---

**Your Role:** You are a retrospective facilitator ensuring completed changes are properly reviewed and lessons learned are captured for future improvement.

---

## WORKFLOW ARCHITRODUCTION

This uses **step-file architecture** for disciplined retrospective execution:

### Core Principles

- **Comprehensive Review**: Review all aspects of the completed change
- **Actionable Insights**: Generate actionable improvement recommendations
- **Lessons Learned**: Document key lessons learned
- **Future Planning**: Provide recommendations for future projects
- **Team Reflection**: Include team reflection and feedback

### Step Processing Rules

1. **PREPARE RETROSPECTIVE**: Set up retrospective framework and gather data
2. **CONDUCT REVIEW**: Review all aspects of the completed change
3. **IDENTIFY LESSONS**: Document key lessons learned
4. **GENERATE RECOMMENDATIONS**: Generate actionable improvement recommendations
5. **CREATE REPORT**: Create comprehensive retrospective report

---

## INITIALIZATION

### Configuration Loading

Load config from `{main_config}` and resolve:
- `user_name`, `communication_language`, `user_skill_level`
- `output_folder`, `planning_artifacts`, `implementation_artifacts`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

### Retrospective Paths

- `change_directory` = `{implementation_artifacts}/{change_name}`
- `retrospective_directory` = `{change_directory}/retrospective`
- `data_sources` = `{change_directory}/data`
- `reports_directory` = `{change_directory}/reports`
- `lessons_directory` = `{change_directory}/lessons`

---

## RETROSPECTIVE FRAMEWORK

### Retrospective Data Collection

```typescript
interface RetrospectiveData {
  changeName: string;
  changeType: string;
  participants: string[];
  timeline: {
    started: Date;
    completed: Date;
    duration: number;
  };
  metrics: {
    budget: number;
    actualCost: number;
    timeSpent: number;
    qualityScore: number;
    userSatisfaction: number;
  };
  artifacts: {
    codeFiles: string[];
    documentation: string[];
    testResults: string[];
    reports: string[];
  };
  feedback: {
    teamFeedback: TeamFeedback[];
    userFeedback: UserFeedback[];
    stakeholderFeedback: StakeholderFeedback[];
  };
}
```

### Retrospective Categories

```typescript
interface RetrospectiveCategories {
  whatWentWell: string[];
  whatCouldBeImproved: string[];
  whatSurprised: string[];
  whatLearned: string[];
  actionItems: ActionItem[];
}
```

### Retrospective Questions

```typescript
const retrospectiveQuestions = {
  process: [
    "How did our planning process work?",
    "Did we follow our defined processes?",
    "Where did we deviate from our plan?",
    "What process improvements can we make?"
  ],
  people: [
    "How well did we work together as a team?",
    "How well did we communicate?",
    "How well did we handle conflicts?",
    "How well did we support each other?"
  ],
  technology: [
    "Did our technology choices work well?",
    "Did we encounter any technical challenges?",
    "How well did our architecture decisions hold up?",
    "What technical debt did we accumulate?"
  ],
  business: [
    "Did we meet business objectives?",
    "Did we deliver value to stakeholders?",
    "Did we stay within budget?",
    "Did we meet timeline expectations?"
  ],
  quality: [
    "How is the quality of our deliverables?",
    "Did we meet quality standards?",
    "How well did our testing work?",
    "How well did our documentation work?"
  ]
};
```

---

## RETROSPECTIVE EXECUTION

### Step 1: Prepare Retrospective

```typescript
const prepareRetrospective = (changeName: string): RetrospectivePreparation => {
  const changeData = getChangeData(changeName);
  const participants = getParticipants(changeName);
  
  // Collect retrospective data
  const data = collectRetrospectiveData(changeName);
  
  // Prepare retrospective framework
  const framework = prepareRetrospectiveFramework(changeName);
  
  // Schedule retrospective session
  const session = scheduleRetrospectiveSession(changeName, participants);
  
  return {
    changeName,
    changeData,
    participants,
    data,
    framework,
    session
  };
};
```

### Step 2: Conduct Review

```typescript
const conductReview = (preparation: Retrospective): RetrospectiveReview => {
  const categories = retrospectiveQuestions;
  
  // Conduct review by category
  const reviewResults = {};
  
  Object.entries(categories).forEach(([category, questions]) => {
    reviewResults[category] = conductCategoryReview(preparation, questions);
  });
  
  return {
    changeName: preparation.changeName,
    reviewResults,
    insights: generateReviewInsights(reviewResults),
    issues: identifyReviewIssues(reviewResults)
  };
};
```

### Step 3: Identify Lessons Learned

```typescript
const identifyLessonsLearned = (review: RetrospectiveReview): LessonsLearned => {
  const lessons = [];
  
  // Analyze what went well
  review.reviewResults.whatWentWell.forEach(item => {
    lessons.push({
      category: 'success',
      lesson: item,
      impact: 'high',
      applicability: 'high'
    });
  });
  
  // Analyze what could be improved
  review.reviewResults.whatCouldBeImproved.forEach(item => {
    lessons.push({
      category: 'improvement',
      lesson: item,
      impact: 'medium',
      applicability: 'high'
    });
  });
  
  // Analyze what surprised us
  review.reviewResults.whatSurprised.forEach(item => {
    lessons.push({
      category: 'surprise',
      lesson: item,
      impact: 'medium',
      applicability: 'medium'
    });
  });
  
  // Analyze what we learned
  review.reviewResults.whatLearned.forEach(item => {
    lessons.push({
      type: 'learning',
      lesson: item,
      impact: 'high',
      applicability: 'high'
    });
  });
  
  return {
    lessons,
    themes: identifyCommonThemes(lessons),
    recommendations: generateLearningRecommendations(lessons)
  };
};
```

### Step 4: Generate Recommendations

```typescript
const generateRecommendations = (review: RetrospectiveReview, lessons: LessonsLearned): ActionItem[] => {
  const recommendations = [];
  
  // Generate process recommendations
  const processRecommendations = generateProcessRecommendations(review, lessons);
  recommendations.push(...processRecommendations);
  
  // Generate people recommendations
  const peopleRecommendations = generatePeopleRecommendations(review, lessons);
  recommendations.push(...peopleRecommendations);
  
  // Generate technology recommendations
  const technologyRecommendations = generateTechnologyRecommendations(review, lessons);
  recommendations.push(...technologyRecommendations);
  
  // Generate business recommendations
  const businessRecommendations = generateBusinessRecommendations(review, lessons);
  recommendations.push(...businessRecommendations);
  
  // Generate quality recommendations
  const qualityRecommendations = generateQualityRecommendations(review, lessons);
  recommendations.push(...qualityRecommendations);
  
  return recommendations;
};
```

### Step 5: Create Report

```typescript
const createRetrospectiveReport = (changeName: string, review: RetrospectiveReview, lessons: LessonsLearned, recommendations: ActionItem[]): RetrospectiveReport => {
  const report = {
    changeName,
    timestamp: new Date(),
    participants: review.participants,
    timeline: review.timeline,
    metrics: review.metrics,
    categories: review.reviewResults,
    lessons,
    recommendations,
    summary: generateRetrospectiveSummary(review, lessons, recommendations),
    nextSteps: generateNextSteps(recommendations)
  };
  
  // Save report
  saveRetrospectiveReport(changeName, report);
  
  // Distribute report
  distributeRetrospectiveReport(changeName, report);
  
  return report;
};
```

---

## RETROSPECTIVE ANALYSIS

### Data Analysis

```typescript
const analyzeRetrospectiveData = (data: RetrospectiveData): RetrospectiveAnalysis => {
  // Analyze performance metrics
  const performanceAnalysis = analyzePerformanceMetrics(data.metrics);
  
  // Analyze team dynamics
  const teamDynamics = analyzeTeamDynamics(data.participants, data.feedback);
  
  // Analyze quality trends
  const qualityTrends = analyzeQualityTrends(data.artifacts, data.metrics);
  
  // Analyze stakeholder satisfaction
  const stakeholderSatisfaction = analyzeStakeholderSatisfaction(data.feedback);
  
  return {
    performanceAnalysis,
    teamDynamics,
    qualityTrends,
    stakeholderSatisfaction,
    overallAssessment: assessOverallPerformance(data)
  };
};
```

### Trend Analysis

```typescript
const analyzeTrends = (historicalData: RetrospectiveData[]): TrendAnalysis => {
  const trends = {
    performance: analyzePerformanceTrends(historicalData),
    quality: analyzeQualityTrends(historicalData),
    efficiency: analyzeEfficiencyTrends(historicalData),
    satisfaction: analyzeSatisfactionTrends(historicalData)
  };
  
  return {
    trends,
    insights: generateTrendInsights(trends),
    recommendations: generateTrendRecommendations(trends)
  };
};
```

---

## RETROSPECTIVE TEMPLATES

### Retrospective Template

```markdown
# Retrospective Report: {changeName}

## Overview

**Change Type**: {changeType}
**Date**: {date}
**Participants**: {participants}
**Duration**: {duration}

## Timeline

### Started
- **Date**: {startDate}
- **Participants**: {startParticipants}

### Completed
- **Date**: {completionDate}
- **Participants**: {completionParticipants}
- **Duration**: {totalDuration}

## Metrics

### Performance Metrics
- **Budget**: ${budget}
- **Actual Cost**: ${actualCost}
- **Time Spent**: ${timeSpent}
- **Quality Score**: ${qualityScore}
- **User Satisfaction**: ${userSatisfaction}

### Quality Metrics
- **Code Quality**: ${codeQuality}
- **Documentation Quality**: ${documentationQuality}
- **Test Coverage**: ${testCoverage}
- **Integration Quality**: ${integrationQuality}

## What Went Well

{whatWentWell}

## What Could Be Improved

{whatCouldBeImproved}

## What Surprised Us

{whatSurprisedUs}

## What We Learned

{whatWeLearned}

## Action Items

{actionItems}

## Recommendations

{recommendations}

## Next Steps

{nextSteps}

## Appendix

### Data Sources

{dataSources}

### Feedback Summary

{feedbackSummary}
```

### Template Variables

```typescript
const retrospectiveTemplate = {
  changeName: string,
  changeType: string,
  participants: string[],
  timeline: {
    started: Date,
    completed: Date,
    duration: number
  },
  metrics: {
    budget: number,
    actualCost: number,
    timeSpent: number,
    qualityScore: number,
    userSatisfaction: number
  },
  categories: {
    whatWentWell: string[],
    whatCouldBeImproved: string[],
    whatSurprisedUs: string[],
    whatLearned: string[]
  },
  lessons: Lesson[],
  recommendations: ActionItem[],
  summary: string,
  nextSteps: string[]
};
```

---

## CONFIGURATION

### Retrospective Configuration

```yaml
retrospective:
  scheduling:
    enabled: true
    trigger: "on_change_completion"
    reminder: "3_days_after_completion"
    
  participants:
  required_roles: ["developer", "designer", "stakeholder"]
  optional_roles: ["qa", "support", "management"]
  
  data_sources:
    status_data: true
    quality_metrics: true
    feedback_data: true
    performance_data: true
    git_history: true
    
  analysis:
    trend_analysis: true
    comparative_analysis: true
    predictive_analysis: false
    
  reporting:
    auto_generate: true
    distribution: true
    formats: ["markdown", "pdf", "html"]
    recipients: ["team@company.com", "stakeholders@company.com"]
    
  improvement_tracking:
    action_items: true
    follow_up: true
    effectiveness_tracking: true
```

---

## ERROR HANDLING

### Common Errors

```typescript
const handleRetrospectiveErrors = (error: Error, context: string): void => {
  const errorHandlers = {
    'DATA_COLLECTION_ERROR': () => console.log(`Data collection failed in ${context}`),
    'ANALYSIS_ERROR': () => console.log(`Analysis failed in ${context}`),
    'TEMPLATE_ERROR': () => console.log(`Template processing failed in ${context}`),
    'DISTRIBUTION_ERROR': () => console.log(`Report distribution failed in ${context}`),
    'default': () => console.log(`Unexpected error in ${context}: ${error.message}`)
  };
  
  const handler = errorHandlers[error.name] || errorHandlers.default;
  handler();
};
```

### Recovery Mechanisms

```typescript
const attemptRetrospectiveRecovery = (changeName: string): boolean => {
  try {
    // Attempt to fix common retrospective issues
    fixRetrospectiveStructure(changeName);
    fixRetrospectiveData(changeName);
    fixRetrospectiveTemplate(changeName);
    
    return true;
  } catch (error) {
    console.log(`Retrospective recovery failed for ${changeName}: ${error.message}`);
    return false;
  }
};
```

---

## TESTING

### Retrospective Test Suite

```typescript
describe('Retrospective Workflow', () => {
  test('should prepare retrospective data', () => {
    const preparation = prepareRetrospective('test-change');
    expect(preparation.changeName).toBe('test-change');
    expect(preparation.data).toBeDefined();
  });
  
  test('should conduct comprehensive review', () => {
    const preparation = prepareRetrospective('test-change');
    const review = conductReview(preparation);
    expect(review.reviewResults).toBeDefined();
    expect(review.insights.length).toBeGreaterThan(0);
  });
  
  test('should identify lessons learned', () => {
    const preparation = prepareRetrospective('test-change');
    const review = conductReview(preparation);
    const lessons = identifyLessonsLearned(review);
    expect(lessons.lessons.length).toBeGreaterThan(0);
  });
  
  test('should generate actionable recommendations', () => {
    const preparation = prepareRetrospective('test-change');
    const review = conductReview(preparation);
    const lessons = identifyLessonsLearned(review);
    const recommendations = generateRecommendations(review, lessons);
    expect(recommendations.length).toBeGreaterThan(0);
  });
  
  test('should create comprehensive report', () => {
    const preparation = prepareRetrospective('test-change');
    const review = conductReview(preparation);
    const lessons = identifyLessonsLearned(review);
    const recommendations = generateRecommendations(review, lessons);
    const report = createRetrospectiveReport('test-change', review, lessons, recommendations);
    expect(report.changeName).toBe('test-change');
    expect(report.summary).toBeDefined();
  });
});
```

---

*Created: 2026-02-28*
*Author: BMAD Team*
*Version: 1.0.0*
