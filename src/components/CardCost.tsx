import { Cost } from "../types/Cost.ts";
import { Box } from "@mui/material";
import { Resource } from "./Resource.tsx";
import { Color } from "../types/Color.ts";
import { Card } from "./Card.tsx";
import { Entries } from "../types/Entries.ts";

type Props = {
  card: Card;
  payCost: (card: Card, color: Color, pay: number) => void;
};

const iota = (n: number) => [...Array(n)].map((_, i) => i);

export const CardCost = ({ card, payCost }: Props) => {
  const entries = Object.entries(card.cost) as Entries<Cost>;
  return (
    <Box sx={{ display: "flex", gap: "2px", flexFlow: "row wrap" }}>
      {entries.flatMap(([color, { needs, payed }]) => {
        return iota(needs).map((i) => {
          const checked = i < payed;
          return (
            <Resource
              key={`${color}_${i}`}
              color={color}
              checked={checked}
              onClick={() => payCost(card, color, 1)}
            />
          );
        });
      })}
    </Box>
  );
};
