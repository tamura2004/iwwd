import { Box } from "@mui/material";
import { Color, getColor, getFontColor } from "../types/Color.ts";

type Props = {
  color: Color;
  value: number;
  borderRadius?: number;
};

export const ProductionPanel = ({ color, value, borderRadius }: Props) => {
  const bgcolor = getColor(color);
  const fontColor = getFontColor(color);
  const borderColor = color === Color.White ? "black" : bgcolor;
  return (
    <Box
      sx={{
        m: 1,
        p: 2,
        borderRadius: borderRadius ?? 1,
        fontSize: 18,
        bgcolor,
        color: fontColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      {value}
    </Box>
  );
};
