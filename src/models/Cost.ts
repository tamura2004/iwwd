import { isResourceColor, ResourceColor } from "./ResourceColor.ts";

export type Cost = Record<ResourceColor, { needs: number; payed: number }>;
export type Entries<T> = [keyof T, T[keyof T]][];

export const createCost = (colors: ResourceColor[]): Cost => {
  const cost: Cost = {
    [ResourceColor.White]: { needs: 0, payed: 0 },
    [ResourceColor.Black]: { needs: 0, payed: 0 },
    [ResourceColor.Green]: { needs: 0, payed: 0 },
    [ResourceColor.Yellow]: { needs: 0, payed: 0 },
    [ResourceColor.Blue]: { needs: 0, payed: 0 },
    [ResourceColor.Red]: { needs: 0, payed: 0 },
  };

  colors.forEach((color) => {
    if (isResourceColor(color)) {
      cost[color].needs++;
    }
  });

  return cost;
};

export const addPayedCost = (cost: Cost, color: ResourceColor, pay: number) => {
  return {
    ...cost,
    [color]: { ...cost[color], payed: cost[color].payed + pay },
  };
};
