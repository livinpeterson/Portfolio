export interface PipelineNode {
  id: string;
  name: string;
  subtitle: string;
  role: string;
  stageNumber: string;
  tag: string;
  color: string;
  configTitle: string;
  configSnippet: string;
  telemetry: {
    health: string;
    latency: string;
    load: string;
    status: 'OPTIMAL' | 'ACTIVE' | 'SYNCHRONIZED';
  };
}

export interface IncidentCase {
  id: string;
  severity: 'SEV-1 CRITICAL' | 'SEV-2 HIGH' | 'SEV-3 MEDIUM';
  severityColor: string;
  title: string;
  system: string;
  timestamp: string;
  impactDuration: string;
  trigger: string;
  symptoms: string[];
  terminalLogs: string[];
  rca: string;
  remediation: string;
  hotfixSnippet: string;
  preventionMeasure: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  tagline: string;
  skills: {
    name: string;
    level: string;
    highlight: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  techStack: string[];
}

export interface ProjectDeployment {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  architectureDetails: string[];
  keyMetrics: {
    label: string;
    value: string;
  }[];
  verdict: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  coursework: string[];
}
