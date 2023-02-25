import { CharData, ClassData } from '@/data';
export function getSelectedClass(
  currentChar: CharData,
  currentClass: ClassData
) {
  return currentChar.name === 'Jean'
    ? {
        ...currentClass,
        growth: currentClass.growth.map((c) => c * 2),
      }
    : currentClass;
}

export function getFinalGrowth(
  currentChar: CharData,
  selectedClass: ClassData
) {
  return currentChar.growth.map((v, i) => v + selectedClass.growth[i]);
}

export function getStarsphere(finalGrowth: number[]) {
  return finalGrowth.map((v, i) => {
    return i === 9 ? v + 135 : v + 15;
  });
}

export function getMaxStats(currentChar: CharData, selectedClass: ClassData) {
  return currentChar.mods.map((v, i) => v + selectedClass.mods[i]);
}
