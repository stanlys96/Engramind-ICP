export interface RoleplayResponse {
  assessment_ids: string[];
  category: string[];
  character_ids: string[];
  consultation_agent_id: any;
  description: Description;
  environment_id: any;
  glossary_id: any;
  id: string;
  name: string;
  organization_id: string;
  soft_delete: boolean;
  timestamp: string;
  user_id: number;
  visibility: boolean;
}

export interface RoleplayResponseRaw {
  assessment_ids: string[];
  category: string[];
  character_ids: string[];
  consultation_agent_id: any;
  description: string;
  environment_id: any;
  glossary_id: any;
  id: string;
  name: string;
  organization_id: string;
  soft_delete: boolean;
  timestamp: string;
  user_id: number;
  visibility: boolean;
}

export interface Description {
  Categories: string;
  SubCategories: string;
  characterChallengesAndGrowthAreas: string;
  charactersAge: string;
  charactersAgreeableness: string;
  charactersAppearance: string;
  charactersBackground: string;
  charactersConscientiousness: string;
  charactersEnneagramType: string;
  charactersExtraversion: string;
  charactersGender: string;
  charactersLanguage: string;
  charactersMbtiType: string;
  charactersMotivationsAndGoals: string;
  charactersName: string;
  charactersNeuroticism: string;
  charactersOccupation: string;
  charactersOpenness: string;
  charactersRelevanceToScenario: string;
  charactersScenarioSnippet: string;
  charactersSkillsAndAbilities: string;
  scenarioBackground: string;
}

export interface RoleplayJobResponse {
  statusCode: number;
  jobId: string;
  jobStatus: string;
  progress: number;
  result: RoleplayJobResult;
  failedReason: any;
}

export interface RoleplayJobResult {
  jobStatus: string;
  message: string;
  processedId: string;
  code: number;
  is_success: boolean;
  data: RoleplayJobData;
}

export interface RoleplayJobData {
  assessment_id: string;
  roleplay_agent_id: string;
  scenario_id: string;
}
