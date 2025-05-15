import { Color } from "./Color.ts";

export type Score = {
  baseScore: number;
  multiplier?: Color;
};

export const readScore = (str: string | null): Score => {
  if (str == null) {
    return { baseScore: 0 }
  }
  if (str.match(/カード/)) {
    const [multiplier, baseScore] = str.split(/カード×/);
    return {
      baseScore: Number(baseScore),
      multiplier: multiplier as Color
    }
  }
  return {
    baseScore: Number(str),
  }
}
