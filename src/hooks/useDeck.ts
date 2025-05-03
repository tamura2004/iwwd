import { useState } from "react";
import Cards from "../assets/cards.json";
import { Card } from "../components/Card.tsx";
import { addPayedCost, createCost } from "../models/Cost.ts";
import { ResourceColor } from "../models/ResourceColor.ts";
import { Area } from "../models/Area.ts"; // Assuming you have a JSON file with card data

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
      const cost = createCost(Array.from(card.cost ?? "") as ResourceColor[]);
      deck.push({ ...card, serialNumber: serialNumber, cost, area: Area.Deck });
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

  const payCost = (card: Card, color: ResourceColor, pay: number) => {
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

  return {
    moveCard,
    payCost,
    handCards,
    draftCards,
    constructionCards,
    constructedCards,
    dealCards,
  };
};
