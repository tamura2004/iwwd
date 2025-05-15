import { Box } from "@mui/material";
import { Card } from "./Card.tsx";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DraftArea } from "./DraftArea.tsx";
import { HandArea } from "./HandArea.tsx";
import { useDeck } from "../hooks/useDeck.ts";
import { ConstructionArea } from "./ConstructionArea.tsx";
import { Area } from "../types/Area.ts";
import { isColor } from "../types/Color.ts";
import { ConstructedArea } from "./ConstructedArea.tsx";

export const GameBoard = () => {
  const {
    moveCard,
    payCost,
    handCards,
    draftCards,
    constructionCards,
    dealCards,
    production,
    score,
  } = useDeck();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        height: "95vh",
        m: 2,
        gap: 2,
      }}
    >
      <DndContext
        sensors={sensors}
        onDragEnd={(event) => {
          const { over, active } = event;
          if (over == null || active.data.current == null) {
            return;
          }
          const card = active.data.current as Card;
          const targetCard = over.data.current as Card;
          switch (over.id) {
            case "draftArea":
              if (card.area === Area.Hand) {
                dealCards();
              }
              moveCard(card, Area.Draft);
              break;
            case "constructionArea":
              moveCard(card, Area.Construction);
              break;
            case "constructedArea":
              moveCard(card, Area.Constructed);
              break;
            default:
              if (
                targetCard.area === Area.Construction &&
                card.area === Area.Draft
              ) {
                moveCard(card, Area.Discard);
                const discard = card.discard;
                if (isColor(discard)) {
                  payCost(targetCard, discard, 1);
                }
              }
          }
        }}
      >
        <ConstructedArea production={production} score={score}/>
        <ConstructionArea cards={constructionCards} payCost={payCost} />
        <DraftArea cards={draftCards} payCost={payCost} />
        <HandArea
          handleDealCards={dealCards}
          cards={handCards}
          payCost={payCost}
        />
      </DndContext>
    </Box>
  );
};
