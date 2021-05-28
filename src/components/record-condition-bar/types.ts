export type conditionTypes = {
  rating: number;
  color: string;
  display?: string;
};

export interface conditionKeys {
  [key: string]: conditionTypes;
}

export const conditionList: conditionKeys = {
  poor: {
    rating: 1,
    color: "#ff4545",
    display: "Poor",
  },
  fair: {
    rating: 2,
    color: "#ffa534",
    display: "Fair",
  },
  good: {
    rating: 3,
    color: "#ffe234",
    display: "Good",
  },
  very_good: {
    rating: 4,
    color: "#b7dd29",
    display: "Very Good",
  },
  mint: {
    rating: 5,
    color: "#57e32c",
    display: "Mint",
  },
};
