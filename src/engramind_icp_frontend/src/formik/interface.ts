import { FileResponse } from "../interface";

export interface CreateFormValues {
  name: string;
  personaPrompt: string;
  files: FileResponse[];
}

export interface EditFormValues {
  id: string;
  name: string;
  persona_name: string;
  age: string;
  gender: string;
  occupation: string;
  language: string;
  hometown: string;
  birthdate: string;
  nationality: string;
  background: string;
  scenarioSnippet: string;
  mbtiType: string;
  enneagramType: string;
  openness: string;
  conscientiousness: string;
  extraversion: string;
  agreeableness: string;
  neuroticism: string;
  skillsAndAbilities: string;
  motivationsAndGoals: string;
  build: string;
  height: string;
  eyeColor: string;
  skinTone: string;
  hairColor: string;
  hairStyle: string;
  typicalAttire: string;
  distinguishingFeatures: string;
  industryRelevance: string;
  relevanceToScenario: string;
  challengesAndGrowthAreas: string;
}

export interface CreateRubricValues {
  name: string;
  description: string;
  files: FileResponse[];
}

export interface EditRubricValues {
  name: string;
  title: string;
  description: string;
  criteria: Criteria[];
}

interface Criteria {
  name: string;
  weight: string;
  performanceLevels: PerformanceLevel[];
}

interface PerformanceLevel {
  value: string;
  description: string;
}

export interface CreateUpdateGlossaryValues {
  name: string;
  content: string;
  createOrUpdate: string;
  createdOn: string;
}

export interface CreateQuickScenarioValues {
  scenario_title: string;
  scenario_description: string;
  ai_role: string;
  my_role: string;
  files: FileResponse[];
}

export interface QuickScenarioValues {
  ai_role: string;
  my_role: string;
  scenario_description: string;
  title: string;
}
