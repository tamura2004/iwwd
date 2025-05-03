export const Area = {
  Deck: "deck",
  Hand: "hand",
  Draft: "draft",
  Construction: "construction",
  Constructed: "constructed",
  Discard: "discard",
} as const;
export type Area = (typeof Area)[keyof typeof Area];
