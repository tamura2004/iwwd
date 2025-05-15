import { Box } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { ColorVector } from "../types/ColorVector.ts";
import {ProductionPanelRow} from "./ProductionPanelRow.tsx";

type Props = {
  production: ColorVector;
};

export const ConstructedArea = ({ production }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: "constructedArea" });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        height: "6vh",
        backgroundColor: isOver ? "lightgreen" : undefined,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        border: "1px solid darkblue",
      }}
    >
      <ProductionPanelRow colorVector={production} />
    </Box>
  );
};
