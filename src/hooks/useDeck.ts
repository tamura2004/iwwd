import { useMemo, useState } from "react";
import Cards from "../assets/cards.json";
import { Card } from "../components/Card.tsx";
import { addPayedCost, readCost } from "../types/Cost.ts";
import { isColor, Color } from "../types/Color.ts";
import { Area } from "../types/Area.ts";
import { readProduction } from "../types/Production.ts";
import { emptyColorVector } from "../types/ColorVector.ts";
import { readScore } from "../types/Score.ts";

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]; // Create a copy of the array to avoid mutating the original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

const createDeck = (): Card[] => {
  const deck: Card[] = [];

  for (const card of Cards) {
    for (let i = 0; i < card.number; i++) {
      const serialNumber = `${card.name}_${i}`;
      const cost = readCost(card.cost);
      const color = card.color as Color;
      if (isColor(color)) {
        const production = readProduction(card.production);
        const score = readScore(card.score);
        deck.push({
          ...card,
          serialNumber: serialNumber,
          cost,
          area: Area.Deck,
          color,
          production,
          score,
        });
      }
    }
  }

  return shuffleArray(deck);
};

export const useDeck = () => {
  const [offset, setOffset] = useState(0);
  const [number, setNumber] = useState(7);
  const [cards, setCards] = useState(createDeck());

  const dealCards = () => {
    setCards((prev) =>
      prev.map((card, i) => {
        if (card.area === Area.Hand) {
          return { ...card, area: Area.Discard };
        }
        if (offset <= i && i < offset + number) {
          return { ...card, area: Area.Hand };
        }
        return card;
      }),
    );
    setOffset((prev) => prev + number);
    setNumber((prev) => (prev === 0 ? 7 : prev - 1));
  };

  const moveCard = (card: Card, area: Area) => {
    setCards((prev) =>
      prev.map((_card) => {
        if (_card.serialNumber === card.serialNumber) {
          return { ..._card, area };
        }
        return _card;
      }),
    );
  };

  const payCost = (card: Card, color: Color, pay: number) => {
    setCards((prev) =>
      prev.map((_card) => {
        if (_card.serialNumber === card.serialNumber) {
          const cost = addPayedCost(_card.cost, color, pay);
          return { ..._card, cost };
        }
        return _card;
      }),
    );
  };

  const handCards = cards.filter((card) => card.area === Area.Hand);
  const draftCards = cards.filter((card) => card.area === Area.Draft);
  const constructionCards = cards.filter(
    (card) => card.area === Area.Construction,
  );
  const constructedCards = cards.filter(
    (card) => card.area === Area.Constructed,
  );
  const structureColors = constructedCards.reduce((acc, card) => {
    return {...acc, [card.color]: acc[card.color] + 1}
  }, emptyColorVector());

  const production = useMemo(() => {
    const productionColors = emptyColorVector();
    productionColors[Color.White] = 2;
    productionColors[Color.Black] = 1;
    productionColors[Color.Green] = 1;
    for (const card of constructedCards) {
      const { resources, multiplier } = card.production;
      if (multiplier != null) {
        if (isColor(multiplier)) {
          for (const color of Object.keys(resources)) {
            if (isColor(color)) {
              productionColors[color] +=
                structureColors[multiplier] * resources[color];
            }
          }
        }
      } else {
        for (const color of Object.keys(resources)) {
          if (isColor(color)) {
            productionColors[color] += resources[color];
          }
        }
      }
    }
    return productionColors;
  }, [constructedCards, structureColors]);

  const score = constructedCards.reduce((acc, card) => {
    const { baseScore, multiplier } = card.score
    if (multiplier != null) {
      return acc + baseScore;
    }
    return acc + baseScore * structureColors[card.color]
  }, 0);

  return {
    moveCard,
    payCost,
    handCards,
    draftCards,
    constructionCards,
    constructedCards,
    dealCards,
    production,
    score,
  };
};
