import { PersonaData } from "../interface";

export function selectCommonIds(
  firstArray: any,
  secondArray: any
): PersonaData[] {
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
