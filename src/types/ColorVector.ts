import { Entries } from "./Entries.ts";
import { Color, isColor, Color } from "./Color.ts";

export type ColorVector = Record<Color, number>;

export const emptyColorVector = () => ({
  [Color.White]: 0,
  [Color.Black]: 0,
  [Color.Green]: 0,
  [Color.Yellow]: 0,
  [Color.Blue]: 0,
  [Color.Red]: 0,
});

export const addColorVector = (a: ColorVector, b: ColorVector): ColorVector => {
  return {
    [Color.White]: a[Color.White] + b[Color.White],
    [Color.Black]: a[Color.Black] + b[Color.Black],
    [Color.Green]: a[Color.Green] + b[Color.Green],
    [Color.Yellow]: a[Color.Yellow] + b[Color.Yellow],
    [Color.Blue]: a[Color.Blue] + b[Color.Blue],
    [Color.Red]: a[Color.Red] + b[Color.Red],
  };
};

export const sumColorVectorValue = (a: ColorVector): number => {
  return Object.values(a).reduce((acc, value) => acc + value, 0);
};

export const showColorVector = (a: ColorVector): string => {
  const entries = Object.entries(a) as Entries<ColorVector>;
  return entries.map(([key, value]) => key.repeat(value)).join("");
};

export const readColorVector = (str: string): ColorVector => {
  const result = emptyColorVector();
  for (const color of str) {
    if (isColor(color)) {
      result[color] += 1;
    }
  }
  return result;
};
