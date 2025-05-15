import { blue, green, red, yellow } from "@mui/material/colors";

export const Color = {
  White: "白",
  Black: "黒",
  Green: "緑",
  Yellow: "黄",
  Blue: "青",
  Red: "赤",
} as const;
export type Color = (typeof Color)[keyof typeof Color];

export const isColor = (color: string): color is Color => {
  return Object.values(Color).includes(color as Color);
};

export const getColor = (color: Color) => {
  switch (color) {
    case Color.White:
      return "white";
    case Color.Black:
      return "black";
    case Color.Green:
      return green[500];
    case Color.Yellow:
      return yellow[500];
    case Color.Blue:
      return blue[500];
    case Color.Red:
      return red[500];
    default:
      return null;
  }
};

export const getFontColor = (color: Color) => {
  if (color === Color.White || color === Color.Yellow) {
    return "black";
  } else {
    return "white";
  }
};
