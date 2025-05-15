import { Box } from "@mui/material";
import { Card } from "./Card.tsx";
import { Color } from "../types/Color.ts";
import { blue } from "@mui/material/colors";

type Props = {
  handleDealCards: () => void;
  cards: Card[];
  payCost: (card: Card, color: Color, pay: number) => void;
};

export const HandArea = ({ handleDealCards, cards, payCost }: Props) => {
  return (
    <Box
      sx={{
        height: "16vh",
        backgroundColor: blue[100],
        border: "1px solid darkblue",
        p: 2,
        display: "flex",
        gap: 1,
      }}
      onClick={handleDealCards}
    >
      {cards.map((card) => {
        return (
          <Card card={card} payCost={payCost} key={card.serialNumber} animate />
        );
      })}
    </Box>
  );
};
