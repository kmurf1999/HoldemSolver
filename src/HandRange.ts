import React, { ReactNode } from "react";
import { UIState } from "./lib";

export const COMBO_COUNT = 169;
export const SUIT_COUNT = 4;
export const SUIT_TO_CHAR = ["♠", "♥", "♣", "♦"];
export const TEXT_SUIT_TO_CHAR = ["s", "h", "c", "d"];
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

function charToRank(c: string): number {
  switch (c) {
    case "A":
      return 12;
    case "K":
      return 11;
    case "Q":
      return 10;
    case "J":
      return 9;
    case "T":
      return 8;
    default:
      return Number(c) - 2;
  }
}

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

function addCombo(
  combos: number[],
  rank1: number,
  rank2: number,
  type: string,
  plus: boolean
) {
  switch (type) {
    case "o": {
      const index = (12 - rank2) * 13 + (12 - rank1);
      combos[index] = OFFSUITED_MASK;
      break;
    }
    case "s": {
      const index = (12 - rank1) * 13 + (12 - rank2);
      combos[index] = SUITED_MASK;
      break;
    }
    default:
      if (rank1 === rank2) {
        const index = (12 - rank1) * 13 + (12 - rank2);
        combos[index] = PAIR_MASK;
      } else {
        const offsuitIndex = (12 - rank2) * 13 + (12 - rank1);
        const suitedIndex = (12 - rank1) * 13 + (12 - rank2);
        combos[offsuitIndex] = OFFSUITED_MASK;
        combos[suitedIndex] = SUITED_MASK;
      }
      break;
  }
  if (plus && rank1 === rank2 && rank1 < 12) {
    addCombo(combos, rank1 + 1, rank1 + 1, type, plus);
  }
  if (plus && rank2 < rank1 - 1) {
    addCombo(combos, rank1, rank2 + 1, type, plus);
  }
}

export function stringToRange(rangeStr: string): number[] {
  const reg = /(([2-9TJQAK]{2})(S|O)?(\+)?)|(([2-9TJQKA])([SHCD])([2-9TJQKA])([SHCD]))/;
  let combos = new Array(169).fill(0);
  const elements = rangeStr.toUpperCase().split(",");
  elements.forEach((element) => {
    const components = reg.exec(element);
    if (!components) return;
    if (components[1]) {
      // not suit specific
      const type = components[3] ? components[3].toLowerCase() : "both";
      const rank1 = charToRank(components[2][0]);
      const rank2 = charToRank(components[2][1]);
      const plus = components[4] ? true : false;
      addCombo(combos, rank1, rank2, type, plus);
    }
    if (components[5]) {
      // suit specific
    }
  });
  return combos;
}

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

export function bitCount(n: number): number {
  n = n - ((n >> 1) & 0x55555555);
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
  return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
}

export function getComboCount(combos: number[]): number {
  let cnt = 0;
  combos.forEach((c) => (cnt += bitCount(c)));
  return cnt;
}

export function rangeToString(combos: number[], types: ComboType[]): string {
  let ret = new Array(169).fill(null);
  for (let i = 0; i < COMBO_COUNT; i++) {
    const ranks = [12 - Math.floor(i / 13), 12 - (i % 13)];
    const firstRank = RANK_TO_CHAR[Math.max(...ranks)];
    const secondRank = RANK_TO_CHAR[Math.min(...ranks)];
    switch (types[i]) {
      case ComboType.OFFSUITED:
        if (combos[i] === OFFSUITED_MASK) {
          ret[i] = `${firstRank}${secondRank}o`;
        }
        break;
      case ComboType.SUITED:
        if (combos[i] === SUITED_MASK) {
          ret[i] = `${firstRank}${secondRank}s`;
        }
        break;
      case ComboType.PAIR:
        if (combos[i] === PAIR_MASK) {
          ret[i] = `${firstRank}${secondRank}`;
        }
        break;
    }
  }
  // combine pairs
  let endIdx = 0,
    endStr = null;
  for (let i = 0; i < 13; i++) {
    let j = i * 13 + i;
    if (ret[j]) {
      endIdx = j;
      endStr = ret[j];
      ret[j] = null;
    } else {
      break;
    }
  }
  if (endIdx) {
    ret.push(`${endStr}+`);
  } else {
    ret[endIdx] = endStr;
  }
  // combine offsuit combos
  // iterate over columns
  for (let i = 0; i < 13; i++) {
    let j = (i + 1) * 13 + i;
    let endIdx = 0,
      startIdx = 0;
    endStr = null;
    while (ret[j] && j < 169) {
      if (!startIdx) {
        startIdx = j;
      }
      endIdx = j;
      endStr = ret[j];
      ret[j] = null;
      j += 13;
    }
    if (endIdx && endIdx !== startIdx) {
      ret.push(`${endStr}+`);
    } else if (endIdx) {
      ret[endIdx] = endStr;
    }
  }

  // combined suited combos
  for (let i = 0; i < 13; i++) {
    let j = i * 13 + (i + 1);
    let endIdx = 0,
      startIdx = 0;
    let endStr = null;
    while (ret[j] && j < 169) {
      if (!startIdx) {
        startIdx = j;
      }
      endIdx = j;
      endStr = ret[j];
      ret[j] = null;
      j++;
    }
    if (endIdx && endIdx !== startIdx) {
      ret.push(`${endStr}+`);
    } else if (endIdx) {
      ret[endIdx] = endStr;
    }
  }

  // merge suited + offsuited combos
  const n = ret.length;
  const reg = /(.{2})(o|s)?(\+)?/;
  ret.sort();
  for (let i = 0; i < n - 1; i++) {
    if (ret[i] === null || ret[i + 1] === null) continue;
    let x = ret[i].replace(reg, "$1$3");
    let y = ret[i + 1].replace(reg, "$1$3");
    if (x === y) {
      ret[i] = null;
      ret[i + 1] = null;
      ret.push(x);
    }
  }

  // add suit combos
  for (let i = 0; i < 169; i++) {
    if (combos[i] === 0) continue;
    switch (types[i]) {
      case ComboType.OFFSUITED:
        if (combos[i] === OFFSUITED_MASK) continue;
        break;
      case ComboType.SUITED:
        if (combos[i] === SUITED_MASK) continue;
        break;
      case ComboType.PAIR:
        if (combos[i] === PAIR_MASK) continue;
        break;
    }
    for (let j = 0; j < 16; j++) {
      const ranks = [12 - Math.floor(i / 13), 12 - (i % 13)];
      if ((1 << j) & combos[i]) {
        const suits = [Math.floor(j / 4), j % 4];
        if (ranks[0] > ranks[1]) {
          ret.push(
            `${RANK_TO_CHAR[ranks[0]]}${TEXT_SUIT_TO_CHAR[suits[0]]}${
              RANK_TO_CHAR[ranks[1]]
            }${TEXT_SUIT_TO_CHAR[suits[1]]}`
          );
        } else {
          ret.push(
            `${RANK_TO_CHAR[ranks[1]]}${TEXT_SUIT_TO_CHAR[suits[1]]}${
              RANK_TO_CHAR[ranks[0]]
            }${TEXT_SUIT_TO_CHAR[suits[0]]}`
          );
        }
      }
    }
  }
  return ret.filter((x) => x !== null).join(",");
}

function getSuitColor(suitIndex: number) {
  switch (suitIndex) {
    case 0:
      return "black";
    case 1:
      return "red";
    case 2:
      return "green";
    case 3:
      return "blue";
  }
}

/**
 * Returns an HTML element displaying the correct suit/card combination with colors
 * @param comboIndex
 * @param suitIndex
 */
export function getSuitComboElement(
  comboIndex: number,
  suitIndex: number
): ReactNode {
  let firstRank = 12 - Math.floor(comboIndex / 13);
  let secondRank = 12 - (comboIndex % 13);
  let firstSuit = Math.floor(suitIndex / 4);
  let secondSuit = suitIndex % 4;
  if (firstRank > secondRank) {
    return React.createElement(
      "div",
      null,
      RANK_TO_CHAR[firstRank],
      React.createElement(
        "span",
        { fontSize: 18, style: { color: getSuitColor(firstSuit) } },
        SUIT_TO_CHAR[firstSuit]
      ),
      RANK_TO_CHAR[secondRank],
      React.createElement(
        "span",
        { fontSize: 18, style: { color: getSuitColor(secondSuit) } },
        SUIT_TO_CHAR[secondSuit]
      )
    );
    // return `${RANK_TO_CHAR[firstRank]}${SUIT_TO_CHAR[firstSuit]}${RANK_TO_CHAR[secondRank]}${SUIT_TO_CHAR[secondSuit]}`;
  } else {
    return React.createElement(
      "div",
      null,
      RANK_TO_CHAR[secondRank],
      React.createElement(
        "span",
        { fontSize: 18, style: { color: getSuitColor(secondSuit) } },
        SUIT_TO_CHAR[secondSuit]
      ),
      RANK_TO_CHAR[firstRank],
      React.createElement(
        "span",
        { fontSize: 18, style: { color: getSuitColor(firstSuit) } },
        SUIT_TO_CHAR[firstSuit]
      )
    );

    // return `${RANK_TO_CHAR[secondRank]}${SUIT_TO_CHAR[secondSuit]}${RANK_TO_CHAR[firstRank]}${SUIT_TO_CHAR[firstSuit]}`;
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
