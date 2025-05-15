import { Box } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { ColorVector } from "../types/ColorVector.ts";
import { ProductionPanelRow } from "./ProductionPanelRow.tsx";
import { Color } from "../types/Color.ts";
import { ProductionPanel } from "./ProductionPanel.tsx";

type Props = {
  production: ColorVector;
  score: number;
};

export const ConstructedArea = ({ production, score }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: "constructedArea" });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        height: "6vh",
        backgroundColor: isOver ? "lightgreen" : undefined,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 2,
        p: 2,
        border: "1px solid darkblue",
      }}
    >
      <ProductionPanelRow colorVector={production} />
      <ProductionPanel color={Color.White} value={score} borderRadius={4} />
    </Box>
  );
};
