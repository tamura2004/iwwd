import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";
import { Resources } from "./Resource.tsx";
import { keyframes } from "@mui/material/styles";
import { Cost } from "../types/Cost.ts";
import { CardCost } from "./CardCost.tsx";
import { Area } from "../types/Area.ts";
import { Production } from "../types/Production.ts";
import { showColorVector } from "../types/ColorVector.ts";
import { Color } from "../types/Color.ts";

export type Card = {
  color: Color;
  cost: Cost;
  name: string;
  number: number;
  discard: string;
  bonus: string | null;
  production: Production;
  score: string | null;
  serialNumber: string;
  area: Area;
};

type Props = {
  card: Card;
  animate?: boolean;
  payCost: (card: Card, color: Color, pay: number) => void;
};

export const Card = ({ card, animate, payCost }: Props) => {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({ id: card.serialNumber, data: card });
  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: card.serialNumber,
    data: card,
  });

  const transformStyle = {
    transform: CSS.Translate.toString(transform),
  };

  const deal = keyframes({
    from: {
      transform: "translate(100vw, 0) rotate(60deg)",
      opacity: 0,
    },
    to: {
      transform: "translate(0, 0) rotate(0deg)",
      opacity: 1,
    },
  });

  const { resources, multiplier } = card.production;
  const production = showColorVector(resources);

  return (
    <div ref={setDroppableNodeRef}>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={transformStyle}
      >
        <Box
          sx={{
            cursor: isDragging ? "grabbing" : "grab",
            width: "100px",
            height: "170px",
            borderRadius: "8px",
            backfaceVisibility: "hidden",
            transformOrigin: "center",
            backgroundColor: !isOver ? "white" : "lightgreen",
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontSize: "12px",
            fontWeight: "bold",
            animation: animate ? `${deal} 0.5s ease-out forwards` : undefined,
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {card.name}
          </Box>
          <hr style={{ width: "100%" }} />
          <CardCost card={card} payCost={payCost} />
          <hr style={{ width: "100%" }} />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Resources str={card.discard} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            {card.score}
          </Box>
          <hr style={{ width: "100%" }} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Resources str={production} multiplier={multiplier} />
          </Box>
        </Box>
      </div>
    </div>
  );
};
