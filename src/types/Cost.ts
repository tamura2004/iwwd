import { isColor, Color } from "./Color.ts";

export type Cost = Record<Color, { needs: number; payed: number }>;

export const emptyCost = (): Cost => ({
  [Color.White]: { needs: 0, payed: 0 },
  [Color.Black]: { needs: 0, payed: 0 },
  [Color.Green]: { needs: 0, payed: 0 },
  [Color.Yellow]: { needs: 0, payed: 0 },
  [Color.Blue]: { needs: 0, payed: 0 },
  [Color.Red]: { needs: 0, payed: 0 },
});

export const createCost = (colors: Color[]): Cost => {
  const cost = emptyCost();
  colors.forEach((color) => {
    if (isColor(color)) {
      cost[color].needs++;
    }
  });
  return cost;
};

export const readCost = (str: string): Cost => {
  const colors = Array.from(str);
  return colors.reduce((acc, color) => {
    if (!isColor(color)) {
      return acc;
    }
    const cost = acc[color];
    return { ...acc, [color]: { ...cost, needs: cost.needs + 1 } };
  }, emptyCost());
};

export const addPayedCost = (cost: Cost, color: Color, pay: number) => {
  return {
    ...cost,
    [color]: { ...cost[color], payed: cost[color].payed + pay },
  };
};
