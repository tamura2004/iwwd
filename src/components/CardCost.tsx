import { Cost, Entries } from "../models/Cost.ts";
import { Box } from "@mui/material";
import { Resource } from "./Resource.tsx";
import { ResourceColor } from "../models/ResourceColor.ts";
import { Card } from "./Card.tsx";

type Props = {
  card: Card;
  payCost: (card: Card, color: ResourceColor, pay: number) => void;
};

const iota = (n: number) => [...Array(n)].map((_, i) => i);

export const CardCost = ({ card, payCost }: Props) => {
  const entries = Object.entries(card.cost) as Entries<Cost>;
   console.log({
     payCost
   })

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
