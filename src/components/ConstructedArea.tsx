import { Box } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import { ColorVector, showColorVector } from "../types/ColorVector.ts";
import { Resources } from "./Resource.tsx";

type Props = {
  production: ColorVector;
};

export const ConstructedArea = ({ production }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: "constructedArea" });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        height: "4vh",
        backgroundColor: isOver ? "lightgreen" : undefined,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        border: "1px solid darkblue",
      }}
    >
      <Resources str={showColorVector(production)} />
    </Box>
  );
};
