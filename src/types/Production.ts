import { isColor, Color } from "./Color.ts";
import {
  ColorVector,
  emptyColorVector,
  readColorVector,
} from "./ColorVector.ts";

export type Production = {
  resources: ColorVector;
  multiplier?: Color;
};

export const readProduction = (str: string | null): Production => {
  if (str == null) {
    const resources = emptyColorVector();
    return { resources };
  }
  if (str.endsWith("カード数")) {
    const [baseColor, multiplier] = str.split(/×|カード数/);
    const resources = readColorVector(baseColor);
    if (isColor(multiplier)) {
      return { resources, multiplier };
    }
    return { resources };
  }
  const resources = readColorVector(str);
  return { resources };
};
