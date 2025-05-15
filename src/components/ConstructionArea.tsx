import { Card } from "./Card.tsx";
import { Box } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import {Color} from "../types/Color.ts";

type Props = {
  cards: Card[];
  payCost: (card: Card, color: Color, pay: number) => void;
};

export const ConstructionArea = ({ cards, payCost }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ id: "constructionArea" });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        flexGrow: 1,
        backgroundColor: isOver ? "lightgreen" : undefined,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        border: "1px solid darkblue",
      }}
    >
      {cards.map((card, index) => {
        return <Card card={card} payCost={payCost} key={index} />;
      })}
    </Box>
  );
};
