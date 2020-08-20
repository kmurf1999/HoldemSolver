import { UIState } from "./lib";

export const COMBO_COUNT = 169;
export const SUIT_COUNT = 4;
export const SUIT_TO_CHAR = ["♠", "♥", "♣", "♦"];
export const RANK_TO_CHAR = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

export const PAIR_MASK = 0b0000100011001110;
export const SUITED_MASK = 0b1000010000100001;
export const OFFSUITED_MASK = 0b0111101111011110;

// /**
//  * Gets last 16 bits of number
//  * @param number
//  */
// function uint16(n: number) {
//   return n & 0xffff;
// }

export enum ComboType {
  OFFSUITED,
  SUITED,
  PAIR,
}

/**
 * HandRanges are stored as a 13 * 13 (169) length array of 16 bit integers
 */
type HandRange = {
  types: ComboType[];
  combos: number[];
};

export function createEmptyRange(): HandRange {
  let types = [];
  let combos = [];
  for (let i = 0; i < COMBO_COUNT; i++) {
    let combo = 0;
    let type: ComboType;
    let firstRank = 12 - Math.floor(i / 13);
    let secondRank = 12 - (i % 13);
    if (firstRank < secondRank) {
      type = ComboType.OFFSUITED;
    } else if (firstRank > secondRank) {
      type = ComboType.SUITED;
    } else {
      type = ComboType.PAIR;
    }
    types.push(type);
    combos.push(combo);
  }
  return { types, combos };
}

export function getComboName(comboIndex: number): string {
  const firstRank = 12 - Math.floor(comboIndex / 13);
  const secondRank = 12 - (comboIndex % 13);
  if (firstRank < secondRank) {
    return `${RANK_TO_CHAR[secondRank]}${RANK_TO_CHAR[firstRank]}o`;
  } else if (firstRank > secondRank) {
    return `${RANK_TO_CHAR[firstRank]}${RANK_TO_CHAR[secondRank]}s`;
  } else {
    return `${RANK_TO_CHAR[firstRank]}${RANK_TO_CHAR[secondRank]}`;
  }
}

export function getSuitComboName(
  comboIndex: number,
  suitIndex: number
): string {
  let firstRank = 12 - Math.floor(comboIndex / 13);
  let secondRank = 12 - (comboIndex % 13);
  let firstSuit = Math.floor(suitIndex / 4);
  let secondSuit = suitIndex % 4;
  if (firstRank > secondRank) {
    return `${RANK_TO_CHAR[firstRank]}${SUIT_TO_CHAR[firstSuit]}${RANK_TO_CHAR[secondRank]}${SUIT_TO_CHAR[secondSuit]}`;
  } else {
    return `${RANK_TO_CHAR[secondRank]}${SUIT_TO_CHAR[secondSuit]}${RANK_TO_CHAR[firstRank]}${SUIT_TO_CHAR[firstSuit]}`;
  }
}

export function getSuitComboState(
  type: ComboType,
  combo: number,
  suitIndex: number
): UIState {
  const suitIndexShifted = 1 << suitIndex;
  switch (type) {
    case ComboType.OFFSUITED:
      if ((suitIndexShifted & OFFSUITED_MASK) === 0) return UIState.UNAVAILABLE;
      break;
    case ComboType.SUITED:
      if ((suitIndexShifted & SUITED_MASK) === 0) return UIState.UNAVAILABLE;
      break;
    case ComboType.PAIR:
      if ((suitIndexShifted & PAIR_MASK) === 0) return UIState.UNAVAILABLE;
      break;
  }
  if (combo & suitIndexShifted) {
    return UIState.ACTIVE;
  } else {
    return UIState.INACTIVE;
  }
}
