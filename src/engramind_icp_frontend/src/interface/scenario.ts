export interface DetailDescription {
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
  charactersMotiivationsandGoals: string;
  charactersName: string;
  charactersNeuroticism: string;
  charactersOccupation: string;
  charactersOpenness: string;
  charactersRelevanceToScenario: string;
  charactersScenarioSnippet: string;
  charactersSkillsAndAbilities: string;
  scenarioBackground: string;
  scenarioDetails: {
    "Achievement Badges": string[];
    "Assessment Milestones": string;
    "Character Memory": string;
    "Difficulty Level": string;
    Guidelines: string;
    "Interaction Phase": string;
    "Interaction Rules": string;
    "Interactive Elements": string;
    "Key Challenges": string;
    "Learner Profile": string;
    "Learning Objectives": string;
    "Main Quest": string;
    "Other Relevant Information": string;
    Overview: string;
    "Participant's Character Role": string;
    "Persona (NPC Character)": string;
    "Response Guide": string;
    "Side Quest": string;
    "Time Limit": string;
    "Win/Lose Conditions": string;
  };
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  timestamp: string;
  organization_id: string;
  user_id: string;
  soft_delete: boolean;
  visibility: boolean;
  category: string[];
}
export interface ScenarioListResponse {
  data: Scenario[];
}
