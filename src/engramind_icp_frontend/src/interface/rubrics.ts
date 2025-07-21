export interface RubricsResponse {
  statusCode: number;
  jobId: string;
  jobStatus: string;
  progress: number;
  result: RubricsResult;
  failedReason: any;
}

export interface RubricsResult {
  jobStatus: string;
  message: string;
  processedId: string;
  assessment: Assessment;
  name: string;
}

export interface Assessment {
  id: string;
  name: string;
  organization_id: any;
  rubric_id: string;
  scenario_id: any;
  timestamp: string;
  user_id: number;
  rubrics: FinalRubrics;
}

export interface FinalRubrics {
  rubric_title: string;
  description: string;
  criteria: Criterum[];
  scoring_guide: ScoringGuide;
  performance_levels_summary: PerformanceLevelsSummary;
  note: string;
}

export interface Criterum {
  criterion_name: string;
  weight: number;
  performance_levels: PerformanceLevels;
}

export interface PerformanceLevels {
  Excellent: string;
  Good: string;
  Fair: string;
  Poor: string;
  "No Attempt": string;
}

export interface ScoringGuide {
  individual_score_description: string;
  weighted_score_description: string;
  total_score_description: string;
}

export interface PerformanceLevelsSummary {
  Excellent: string;
  Good: string;
  Fair: string;
  Poor: string;
  "No Attempt": string;
}
