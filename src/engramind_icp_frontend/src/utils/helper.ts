import { Assessment, PersonaData } from "../interface";

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
