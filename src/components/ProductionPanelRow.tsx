import { ColorVector } from "../types/ColorVector.ts";
import { Box } from "@mui/material";
import { Entries } from "../types/Entries.ts";
import { ProductionPanel } from "./ProductionPanel.tsx";

type Props = {
  colorVector: ColorVector;
};

export const ProductionPanelRow = ({ colorVector }: Props) => {
  const entries = Object.entries(colorVector) as Entries<ColorVector>;
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {entries.map(([color, value]) => {
        return <ProductionPanel color={color} value={value} key={color} />;
      })}
    </Box>
  );
};
