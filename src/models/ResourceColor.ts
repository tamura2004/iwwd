import {blue, green, red, yellow} from "@mui/material/colors";

export const ResourceColor = {
  White: "白",
  Black: "黒",
  Green: "緑",
  Yellow: "黄",
  Blue: "青",
  Red: "赤",
} as const;
export type ResourceColor =
  (typeof ResourceColor)[keyof typeof ResourceColor];

export const isResourceColor = (color: string): color is ResourceColor => {
  return Object.values(ResourceColor).includes(color as ResourceColor);
};

export const getColor = (color: ResourceColor) => {
  switch (color) {
    case ResourceColor.White:
      return "white";
    case ResourceColor.Black:
      return "black";
    case ResourceColor.Green:
      return green[500];
    case ResourceColor.Yellow:
      return yellow[500];
    case ResourceColor.Blue:
      return blue[500];
    case ResourceColor.Red:
      return red[500];
    default:
      return null;
  }
};

export const getFontColor = (color: ResourceColor) => {
  if (color === ResourceColor.White || color === ResourceColor.Yellow) {
    return "black";
  } else {
    return "white";
  }
};
