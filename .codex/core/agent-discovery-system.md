# 🔍 Agent 发现与匹配系统

> **智能 Agent 资源发现、匹配和调度系统**  
*支持产品开发全生命周期的智能 Agent 协作*

---

## 📋 **概述**

本文档定义了项目的 Agent 发现与匹配系统，能够智能地搜索和匹配最适合的 agent，支持产品开发的全生命周期，包括但不限于代码实现阶段。系统可以自由搜索整个 `ref` 文件夹下的所有相关 agent 资源，并根据任务类型、技能要求、项目阶段等因素进行智能匹配。

---

## 🎯 **系统架构**

### 📊 **Agent 资源分类**
```
Agent 资源库 (ref/)
├── _bmad/ (基础 BMAD Agent)
├── agency-agents-main/ (专业 Agent 库)
│   ├── engineering/ (工程类 Agent)
│   ├── marketing/ (营销类 Agent)
│   ├── product/ (产品类 Agent)
│   ├── strategy/ (策略类 Agent)
│   ├── specialized/ (专业化 Agent)
│   └── support/ (支持类 Agent)
├── content/ (内容类 Agent)
├── ai-coding-agent-seo-skills-main/ (AI 编程 SEO Agent)
├── ui-ux-pro-max-skill-main/ (UI/UX Agent)
├── platform-design-skills-main/ (平台设计 Agent)
└── others/ (其他 Agent 资源)
```

### 🔍 **智能匹配引擎**
```typescript
interface AgentDiscoveryEngine {
  // 资源发现
  discoverAgents: (query: AgentQuery) => Promise<AgentResource[]>;
  
  // 智能匹配
  matchAgents: (task: Task) => Promise<AgentMatch[]>;
  
  // 技能分析
  analyzeSkills: (agent: AgentResource) => Promise<SkillAnalysis>;
  
  // 能力评估
  assessCapabilities: (agent: AgentResource) => Promise<CapabilityAssessment>;
}
```

---

## 🎭 **产品开发全生命周期 Agent 匹配**

### 📊 **阶段分类**

#### 🚀 **1. 概念与规划阶段**
```typescript
interface ConceptPhaseAgents {
  // 市场研究
  marketResearch: {
    agent: "product-trend-researcher",
    skills: ["市场分析", "趋势研究", "竞品分析"],
    source: "agency-agents-main/product/"
  };
  
  // 用户研究
  userResearch: {
    agent: "product-feedback-synthesizer",
    skills: ["用户反馈", "需求分析", "用户研究"],
    source: "agency-agents-main/product/"
  };
  
  // 策略规划
  strategyPlanning: {
    agent: "nexus-strategy",
    skills: ["战略规划", "商业分析", "市场定位"],
    source: "agency-agents-main/strategy/"
  };
  
  // 产品设计
  productDesign: {
    agent: "platform-design-specialist",
    skills: ["产品设计", "平台设计", "用户体验"],
    source: "platform-design-skills-main/"
  };
}
```

#### 📝 **2. 内容与营销阶段**
```typescript
interface ContentMarketingPhaseAgents {
  // 内容策略
  contentStrategy: {
    agent: "content-calendar-template",
    skills: ["内容规划", "内容策略", "内容日历"],
    source: "content/"
  };
  
  // SEO 优化
  seoOptimization: {
    agent: "marketing-seo-specialist",
    skills: ["SEO优化", "搜索引擎优化", "内容SEO"],
    source: "agency-agents-main/marketing/"
  };
  
  // 社交媒体
  socialMedia: {
    agent: "marketing-social-media-strategist",
    skills: ["社交媒体", "内容营销", "社群运营"],
    source: "agency-agents-main/marketing/"
  };
  
  // 内容创作
  contentCreation: {
    agent: "marketing-content-creator",
    skills: ["内容创作", "文案写作", "品牌内容"],
    source: "agency-agents-main/marketing/"
  };
  
  // 平台特定
  platformSpecific: {
    tiktok: "marketing-tiktok-strategist",
    instagram: "marketing-instagram-curator",
    linkedin: "marketing-linkedin-content-creator",
    wechat: "marketing-wechat-official-account",
    zhihu: "marketing-zhihu-strategist"
  };
}
```

#### 🛠️ **3. 工程开发阶段**
```typescript
interface EngineeringPhaseAgents {
  // 前端开发
  frontend: {
    agent: "ui-ux-pro-max-skill",
    skills: ["前端开发", "UI/UX设计", "React开发"],
    source: "ui-ux-pro-max-skill-main/"
  };
  
  // 后端开发
  backend: {
    agent: "full-stack-developer",
    skills: ["后端开发", "API开发", "数据库设计"],
    source: "ai-coding-agent-seo-skills-main/"
  };
  
  // 移动开发
  mobile: {
    agent: "ios-developer",
    skills: ["iOS开发", "Android开发", "移动应用"],
    source: "iosdev-main/"
  };
  
  // 测试工程
  testing: {
    agent: "qa-test-engineer",
    skills: ["测试工程", "质量保证", "自动化测试"],
    source: "agency-agents-main/testing/"
  };
  
  // DevOps
  devops: {
    agent: "devops-engineer",
    skills: ["DevOps", "CI/CD", "基础设施"],
    source: "agency-agents-main/engineering/"
  };
}
```

#### 📊 **4. 增长与优化阶段**
```typescript
interface GrowthOptimizationPhaseAgents {
  // 增长黑客
  growthHacking: {
    agent: "marketing-growth-hacker",
    skills: ["增长黑客", "A/B测试", "转化优化"],
    source: "agency-agents-main/marketing/"
  };
  
  // 数据分析
  dataAnalysis: {
    agent: "product-behavioral-nudge-engine",
    skills: ["数据分析", "用户行为", "增长优化"],
    source: "agency-agents-main/product/"
  };
  
  // 应用商店优化
  appStoreOptimization: {
    agent: "marketing-app-store-optimizer",
    skills: ["ASO优化", "应用商店", "移动应用"],
    source: "agency-agents-main/marketing/"
  };
  
  // 性能优化
  performanceOptimization: {
    agent: "performance-specialist",
    skills: ["性能优化", "速度优化", "用户体验"],
    source: "agency-agents-main/engineering/"
  };
}
```

---

## 🔍 **智能发现机制**

### 📋 **Agent 资源扫描器**
```typescript
class AgentResourceScanner {
  async scanAllAgents(): Promise<AgentResource[]> {
    const agentPaths = [
      'ref/_bmad/**/*',
      'ref/agency-agents-main/**/*',
      'ref/content/**/*',
      'ref/ai-coding-agent-seo-skills-main/**/*',
      'ref/ui-ux-pro-max-skill-main/**/*',
      'ref/platform-design-skills-main/**/*'
    ];
    
    const allAgents: AgentResource[] = [];
    
    for (const path of agentPaths) {
      const agents = await this.scanPath(path);
      allAgents.push(...agents);
    }
    
    return this.deduplicateAndIndex(allAgents);
  }
  
  private async scanPath(pathPattern: string): Promise<AgentResource[]> {
    const files = await this.findFiles(pathPattern);
    const agents: AgentResource[] = [];
    
    for (const file of files) {
      if (this.isAgentFile(file)) {
        const agent = await this.parseAgentFile(file);
        agents.push(agent);
      }
    }
    
    return agents;
  }
  
  private isAgentFile(filePath: string): boolean {
    return filePath.includes('agent') || 
           filePath.includes('skill') || 
           filePath.includes('specialist') ||
           filePath.includes('strategist') ||
           filePath.includes('developer');
  }
}
```

### 🧠 **智能匹配算法**
```typescript
class AgentMatcher {
  async matchAgents(task: Task): Promise<AgentMatch[]> {
    const allAgents = await this.agentScanner.scanAllAgents();
    const candidateAgents = this.filterCandidates(allAgents, task);
    const scoredMatches = await this.scoreMatches(candidateAgents, task);
    
    return scoredMatches.sort((a, b) => b.score - a.score);
  }
  
  private filterCandidates(agents: AgentResource[], task: Task): AgentResource[] {
    return agents.filter(agent => {
      // 技能匹配
      const skillMatch = this.checkSkillMatch(agent, task);
      
      // 阶段匹配
      const phaseMatch = this.checkPhaseMatch(agent, task);
      
      // 复杂度匹配
      const complexityMatch = this.checkComplexityMatch(agent, task);
      
      return skillMatch && phaseMatch && complexityMatch;
    });
  }
  
  private async scoreMatches(agents: AgentResource[], task: Task): Promise<AgentMatch[]> {
    const matches: AgentMatch[] = [];
    
    for (const agent of agents) {
      const score = await this.calculateMatchScore(agent, task);
      const confidence = await this.calculateConfidence(agent, task);
      
      matches.push({
        agent,
        score,
        confidence,
        reasons: this.generateMatchReasons(agent, task, score)
      });
    }
    
    return matches;
  }
  
  private calculateMatchScore(agent: AgentResource, task: Task): number {
    let score = 0;
    
    // 技能匹配度 (40%)
    const skillScore = this.calculateSkillScore(agent, task);
    score += skillScore * 0.4;
    
    // 经验匹配度 (30%)
    const experienceScore = this.calculateExperienceScore(agent, task);
    score += experienceScore * 0.3;
    
    // 阶段匹配度 (20%)
    const phaseScore = this.calculatePhaseScore(agent, task);
    score += phaseScore * 0.2;
    
    // 复杂度匹配度 (10%)
    const complexityScore = this.calculateComplexityScore(agent, task);
    score += complexityScore * 0.1;
    
    return score;
  }
}
```

---

## 🎯 **任务类型映射**

### 📋 **任务类型定义**
```typescript
interface TaskTypes {
  // 概念规划类
  marketResearch: {
    category: 'concept',
    priority: 'high',
    requiredSkills: ['市场分析', '趋势研究', '竞品分析'];
    recommendedAgents: ['product-trend-researcher'];
  };
  
  userResearch: {
    category: 'concept',
    priority: 'high',
    requiredSkills: ['用户研究', '需求分析', '用户反馈'];
    recommendedAgents: ['product-feedback-synthesizer'];
  };
  
  strategyPlanning: {
    category: 'concept',
    priority: 'high',
    requiredSkills: ['战略规划', '商业分析', '市场定位'];
    recommendedAgents: ['nexus-strategy'];
  };
  
  // 内容营销类
  contentStrategy: {
    category: 'marketing',
    priority: 'medium',
    requiredSkills: ['内容规划', '内容策略', 'SEO优化'];
    recommendedAgents: ['content-calendar-template', 'marketing-seo-specialist'];
  };
  
  socialMediaMarketing: {
    category: 'marketing',
    priority: 'medium',
    requiredSkills: ['社交媒体', '内容营销', '社群运营'];
    recommendedAgents: ['marketing-social-media-strategist'];
  };
  
  // 工程开发类
  frontendDevelopment: {
    category: 'engineering',
    priority: 'high',
    requiredSkills: ['前端开发', 'React开发', 'UI/UX'];
    recommendedAgents: ['ui-ux-pro-max-skill'];
  };
  
  backendDevelopment: {
    category: 'engineering',
    priority: 'high',
    requiredSkills: ['后端开发', 'API开发', '数据库'];
    recommendedAgents: ['full-stack-developer'];
  };
  
  // 增长优化类
  growthHacking: {
    category: 'growth',
    priority: 'medium',
    requiredSkills: ['增长黑客', 'A/B测试', '转化优化'];
    recommendedAgents: ['marketing-growth-hacker'];
  };
  
  performanceOptimization: {
    category: 'growth',
    priority: 'medium',
    requiredSkills: ['性能优化', '用户体验', '数据分析'];
    recommendedAgents: ['performance-specialist'];
  };
}
```

---

## 🔄 **动态 Agent 调度**

### 📋 **调度策略**
```typescript
interface AgentScheduler {
  // 单 Agent 任务
  scheduleSingleAgent: (task: Task) => Promise<AgentAssignment>;
  
  // 多 Agent 协作
  scheduleMultiAgent: (task: Task) => Promise<AgentTeam>;
  
  // 动态调整
  adjustAssignment: (assignment: AgentAssignment, feedback: Feedback) => Promise<void>;
  
  // 性能监控
  monitorPerformance: (agent: AgentResource) => Promise<PerformanceMetrics>;
}

class AgentSchedulerImpl implements AgentScheduler {
  async scheduleSingleAgent(task: Task): Promise<AgentAssignment> {
    // 1. 发现匹配的 Agent
    const matches = await this.agentMatcher.matchAgents(task);
    
    // 2. 选择最佳匹配
    const bestMatch = this.selectBestMatch(matches);
    
    // 3. 检查可用性
    const availability = await this.checkAvailability(bestMatch.agent);
    
    // 4. 创建分配
    const assignment: AgentAssignment = {
      agent: bestMatch.agent,
      task,
      confidence: bestMatch.confidence,
      estimatedDuration: this.estimateDuration(task, bestMatch.agent),
      startTime: new Date(),
      status: 'assigned'
    };
    
    // 5. 记录分配
    await this.recordAssignment(assignment);
    
    return assignment;
  }
  
  async scheduleMultiAgent(task: Task): Promise<AgentTeam> {
    // 1. 分析任务复杂度
    const complexity = await this.analyzeTaskComplexity(task);
    
    // 2. 确定 Agent 团队配置
    const teamConfig = this.determineTeamConfig(complexity);
    
    // 3. 匹配团队成员
    const teamMembers = await this.matchTeamMembers(teamConfig, task);
    
    // 4. 创建团队
    const team: AgentTeam = {
      id: this.generateTeamId(),
      members: teamMembers,
      task,
      roleAssignments: this.assignRoles(teamMembers),
      coordinationStrategy: this.determineCoordinationStrategy(teamMembers),
      status: 'formed'
    };
    
    // 5. 启动协作
    await this.startCollaboration(team);
    
    return team;
  }
}
```

---

## 📊 **验证命令**

### 🔍 **Agent 发现验证命令**
```bash
# 扫描所有 Agent 资源
npm run agent:scan

# 搜索特定技能的 Agent
npm run agent:search --skills "前端开发"

# 搜索特定阶段的 Agent
npm run agent:search --phase "marketing"

# 匹配任务的 Agent
npm run agent:match --task "前端React开发"

# 验证 Agent 性能
npm run agent:validate --agent "ui-ux-pro-max-skill"

# 查看 Agent 资源统计
npm run agent:stats
```

### 📋 **验证报告**
```json
{
  "timestamp": "2026-03-13T10:30:00Z",
  "status": "completed",
  "agentResources": {
    "total": 450,
    "byCategory": {
      "engineering": 125,
      "marketing": 89,
      "product": 45,
      "strategy": 67,
      "content": 56,
      "specialized": 68
    },
    "byPhase": {
      "concept": 89,
      "marketing": 134,
      "engineering": 156,
      "growth": 71
    }
  },
  "matchingResults": {
    "query": "前端React开发",
    "matches": [
      {
        "agent": "ui-ux-pro-max-skill",
        "score": 0.92,
        "confidence": 0.88,
        "skills": ["前端开发", "React开发", "UI/UX设计"],
        "source": "ui-ux-pro-max-skill-main/"
      }
    ]
  }
}
```

---

## 🚀 **使用示例**

### 📋 **单一 Agent 任务示例**
```typescript
// 前端开发任务
const frontendTask: Task = {
  id: "task-001",
  type: "frontendDevelopment",
  description: "开发用户登录页面",
  requiredSkills: ["React开发", "TypeScript", "UI/UX"],
  complexity: "medium",
  phase: "engineering",
  priority: "high"
};

// 自动匹配和调度
const assignment = await agentScheduler.scheduleSingleAgent(frontendTask);
console.log(`分配给 Agent: ${assignment.agent.name}`);
```

### 📋 **多 Agent 协作示例**
```typescript
// 产品发布任务
const productLaunchTask: Task = {
  id: "task-002",
  type: "productLaunch",
  description: "新产品发布和营销推广",
  requiredSkills: ["产品管理", "营销策略", "SEO优化", "社交媒体"],
  complexity: "high",
  phase: "marketing",
  priority: "high"
};

// 多 Agent 团队协作
const team = await agentScheduler.scheduleMultiAgent(productLaunchTask);
console.log(`团队配置: ${team.members.length} 个 Agent`);
```

---

## 📚 **相关文档**

- [HARNESS.md](../HARNESS.md) - 项目约束宪法
- [AGENTS.md](../AGENTS.md) - AI Agent 指南
- [agent-specialization.md](./agent-specialization.md) - Agent 专业化策略
- [workflows/router.md](../workflows/router.md) - 工作流程路由

---

## 🎊 **总结**

Agent 发现与匹配系统为项目提供了智能化的 Agent 资源管理能力，支持产品开发的全生命周期。通过智能搜索、匹配和调度，系统能够：

- **🔍 全面发现**: 自动发现整个 `ref` 文件夹下的所有 Agent 资源
- **🎯 智能匹配**: 根据任务类型、技能要求、项目阶段进行智能匹配
- **🔄 动态调度**: 支持单 Agent 和多 Agent 协作的动态调度
- **📊 性能监控**: 持续监控 Agent 性能和协作效果

这个系统使得 `.codex` 不再局限于代码实现阶段，而是能够支持整个产品开发的生命周期，包括概念规划、内容营销、工程开发和增长优化等各个阶段。

---

*最后更新: 2026-03-13*  
*验证状态: ⏳ 待验证*  
*下次审查: 2026-03-20*
