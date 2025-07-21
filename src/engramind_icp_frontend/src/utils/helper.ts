import { Assessment, PersonaData } from "../interface";

export enum Category {
  Quick,
  Advanced,
}

export enum ItemType {
  Persona,
  Rubrics,
  Glossary,
}

export function selectCommonIds(firstArray: any, secondArray: any): any {
  const secondArrayIds = new Set<string>(
    secondArray.map((item: any) => item.id)
  );

  const commonItems: any = [];

  for (const item of firstArray) {
    if (secondArrayIds.has(item.id)) {
      commonItems.push(item);
    }
  }

  commonItems.sort((a: any, b: any) => {
    const dateA = new Date(a.timestamp).getTime(); // getTime() returns milliseconds since epoch
    const dateB = new Date(b.timestamp).getTime();
    return dateB - dateA; // For ascending order (earliest first)
  });

  return commonItems;
}

export function selectCommonFiles(firstArray: any, secondArray: any): any {
  const secondArrayIds = new Set<string>(
    secondArray.map((item: any) => item.id)
  );

  const commonItems: any = [];

  for (const item of firstArray) {
    if (secondArrayIds.has(item.file_id)) {
      commonItems.push(item);
    }
  }

  commonItems.sort((a: any, b: any) => {
    const dateA = new Date(a.created_at).getTime(); // getTime() returns milliseconds since epoch
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA; // For ascending order (earliest first)
  });

  return commonItems;
}

export function formatBackgroundInput(text: string): string {
  const [main, context] = text.split("--- Input Context/Rubric Provided: ---");

  const cleanedMain = main.trim();
  const cleanedContext = context?.trim();

  return `${cleanedMain}<br/><br/>--- Input Context/Rubric Provided: ---<br/>${cleanedContext}`;
}

export const personalDetailsData = (persona: PersonaData | null) => [
  {
    id: 1,
    title: "Birthdate",
    value: persona?.persona_details?.birthdate,
  },
  {
    id: 2,
    title: "Gender",
    value: persona?.persona_details?.gender,
  },
  {
    id: 3,
    title: "Hometown",
    value: persona?.persona_details?.hometown,
  },
  {
    id: 4,
    title: "Languages",
    value: persona?.persona_details?.language,
  },
];

export const personalityProfileData = (persona: PersonaData | null) => [
  {
    id: 1,
    title: "Agreeableness",
    value:
      persona?.persona_details?.personalityTraits?.bigFive?.agreeableness ??
      "0",
  },
  {
    id: 2,
    title: "Conscientiousness",
    value:
      persona?.persona_details?.personalityTraits?.bigFive?.conscientiousness ??
      "0",
  },
  {
    id: 3,
    title: "Extraversion",
    value:
      persona?.persona_details?.personalityTraits?.bigFive?.extraversion ?? "0",
  },
  {
    id: 4,
    title: "Neuroticism",
    value:
      persona?.persona_details?.personalityTraits?.bigFive?.neuroticism ?? "0",
  },
  {
    id: 5,
    title: "Openness",
    value:
      persona?.persona_details?.personalityTraits?.bigFive?.openness ?? "0",
  },
];

export const capitalCase = (str: string) =>
  str
    .replace(/_/g, " ") // replace underscores with spaces
    .replace(
      /\w\S*/g,
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    );

export function extractAndParseRubricJSON(input: string): Assessment | null {
  const jsonRegex = /```json\s*({[\s\S]*?})\s*```/;
  const match = input.match(jsonRegex);

  if (match && match[1]) {
    try {
      const json = JSON.parse(match[1]);
      return json;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      return null;
    }
  } else {
    console.warn("No valid JSON block found in the input.");
    return null;
  }
}

export function formatDateToLocal(input: string): string {
  const date = new Date(input);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day} ${month} ${year} at ${hours}:${minutes}:${seconds}`;
}

export const scenarioPresets = [
  {
    id: 1,
    type: "Customer Service",
    options: [
      {
        title: "Handling Product Return Dispute",
        ai_role: "Dissatisfied Customer",
        my_role: "Customer Service Manager",
        scenario_description:
          "Context: Customer Service\nScenario: Handle a frustrated customer who received a defective product\n\nCreate a detailed roleplay scenario for a Handling Product Return Dispute situation between a Customer Service Manager and a Dissatisfied Customer.",
        file_ids: [],
      },
    ],
  },
  {
    id: 2,
    type: "Leadership",
    options: [
      {
        title: "Performance Improvement Discussion",
        ai_role: "Underperforming Employee",
        my_role: "Team Leader",
        scenario_description:
          "Context: Leadership\nScenario: Conduct a challenging performance review\n\nCreate a detailed roleplay scenario for a Performance Improvement Discussion situation between a Team Leader and a Underperforming Employee.",
        file_ids: [],
      },
    ],
  },
  {
    id: 3,
    type: "Sales",
    options: [
      {
        title: "Enterprise Deal Negotiation",
        ai_role: "Procurement Director",
        my_role: "Senior Sales Manager",
        scenario_description:
          "Context: Sales\nScenario: Negotiate a high-value contract with specific terms\n\nCreate a detailed roleplay scenario for a Enterprise Deal Negotiation situation between a Senior Sales Manager and a Procurement Director.",
        file_ids: [],
      },
    ],
  },
  {
    id: 4,
    type: "HR",
    options: [
      {
        title: "Workplace Harassment Investigation",
        ai_role: "Employee Filing Complaint",
        my_role: "HR Manager",
        scenario_description:
          "Context: HR\nScenario: Handle a sensitive workplace harassment report\n\nCreate a detailed roleplay scenario for a Workplace Harassment Investigation situation between a HR Manager and a Employee Filing Complaint.",
        file_ids: [],
      },
    ],
  },
  {
    id: 5,
    type: "Project Management",
    options: [
      {
        title: "Budget Overrun Meeting",
        ai_role: "Finance Manager",
        my_role: "Program Director",
        scenario_description:
          "Context: Project Management\nScenario: Justify and discuss project budget increases\n\nCreate a detailed roleplay scenario for a Budget Overrun Meeting situation between a Program Director and a Finance Manager.",
        file_ids: [],
      },
    ],
  },
];
