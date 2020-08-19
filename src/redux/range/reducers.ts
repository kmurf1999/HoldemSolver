import React, { ReactElement } from "react";
import {
  ComboState,
  ComboType,
  RangeActionTypes,
  SET_COMBO_ACTIVE,
  SET_COMBO_INACTIVE,
  SET_SUIT_ACTIVE,
  SET_SUIT_INACTIVE,
  CLEAR_RANGE,
} from "./types";

const SUIT_TO_CHAR = ["♠", "♥", "♣", "♦"];

const RANK_TO_CHAR = [
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

function getSuitColor(suit: number) {
  switch (suit) {
    case 0:
      return "black";
    case 1:
      return "red";
    case 2:
      return "green";
    case 3:
      return "blue";
    default:
      return "black";
  }
}

function createComboElement(comboIndex: number, partial = false): ReactElement {
  let rank1 = 12 - Math.floor(comboIndex / 13);
  let rank2 = 12 - (comboIndex % 13);
  let comboName;
  if (rank1 < rank2) {
    comboName = `${RANK_TO_CHAR[rank2]}${RANK_TO_CHAR[rank1]}o`;
  } else if (rank1 > rank2) {
    comboName = `${RANK_TO_CHAR[rank2]}${RANK_TO_CHAR[rank1]}s`;
  } else {
    comboName = `${RANK_TO_CHAR[rank2]}${RANK_TO_CHAR[rank1]}`;
  }
  return React.createElement(
    "div",
    { style: { pointerEvents: "none" } },
    comboName,
    partial ? "\ns" : null
  );
}

function createSuitElement(
  rank1: number,
  rank2: number,
  suit1: number,
  suit2: number
): ReactElement {
  let firstSuit = React.createElement(
    "span",
    { style: { fontSize: 20, color: getSuitColor(suit1) } },
    SUIT_TO_CHAR[suit1]
  );
  let secondSuit = React.createElement(
    "span",
    { style: { fontSize: 20, color: getSuitColor(suit2) } },
    SUIT_TO_CHAR[suit2]
  );
  return React.createElement(
    "div",
    { style: { pointerEvents: "none" } },
    RANK_TO_CHAR[rank1],
    firstSuit,
    RANK_TO_CHAR[rank2],
    secondSuit
  );
}

function createEmptyRange(): RangeState {
  let comboElements = [];
  let comboStates = [];
  let comboTypes = [];
  let suitCombos = [];
  const activeComboIndex = 0;
  for (let i = 0; i < 169; i++) {
    let rank1 = 12 - Math.floor(i / 13);
    let rank2 = 12 - (i % 13);
    let element = createComboElement(i);
    let type;
    let state = ComboState.INACTIVE;
    let suits = [];
    if (rank1 < rank2) {
      type = ComboType.OFFSUITED;
    } else if (rank1 > rank2) {
      type = ComboType.SUITED;
    } else {
      type = ComboType.PAIR;
    }
    if (rank1 < rank2) {
      const temp = rank1;
      rank1 = rank2;
      rank2 = temp;
    }
    // create suit state arrays
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        switch (type) {
          case ComboType.PAIR:
            if (j > k) {
              suits.push({
                element: createSuitElement(rank1, rank2, k, j),
                state: ComboState.INACTIVE,
              });
            } else {
              suits.push({
                element: React.createElement("div"),
                state: ComboState.UNAVAILABLE,
              });
            }
            break;
          case ComboType.OFFSUITED: {
            if (j !== k) {
              suits.push({
                element: createSuitElement(rank1, rank2, k, j),
                state: ComboState.INACTIVE,
              });
            } else {
              suits.push({
                element: React.createElement("div"),
                state: ComboState.UNAVAILABLE,
              });
            }
            break;
          }
          case ComboType.SUITED:
            if (j === k) {
              suits.push({
                element: createSuitElement(rank1, rank2, k, j),
                state: ComboState.INACTIVE,
              });
            } else {
              suits.push({
                element: React.createElement("div"),
                state: ComboState.UNAVAILABLE,
              });
            }
            break;
        }
      }
    }
    comboElements.push(element);
    comboStates.push(state);
    comboTypes.push(type);
    suitCombos.push(suits);
  }
  return {
    suitCombos,
    comboElements,
    comboStates,
    comboTypes,
    activeComboIndex,
  };
}

export type RangeState = {
  comboElements: ReactElement[];
  comboStates: ComboState[];
  comboTypes: ComboType[];
  suitCombos: Array<{ element: ReactElement; state: ComboState }>[];
  activeComboIndex: number;
};

const defaultState: RangeState = createEmptyRange();

const rangeReducer = (state = defaultState, action: RangeActionTypes) => {
  switch (action.type) {
    case CLEAR_RANGE: {
      return createEmptyRange();
    }
    case SET_SUIT_ACTIVE: {
      const { suitIndex } = action.payload;

      if (
        state.suitCombos[state.activeComboIndex][suitIndex].state ===
        ComboState.UNAVAILABLE
      ) {
        return state;
      }

      let nextCombo = [...state.suitCombos[state.activeComboIndex]];
      nextCombo[suitIndex] = {
        ...state.suitCombos[state.activeComboIndex][suitIndex],
        state: ComboState.ACTIVE,
      };

      let activeCount = 0;
      let inactiveCount = 0;

      nextCombo
        .filter((sc) => sc.state !== ComboState.UNAVAILABLE)
        .forEach((sc) =>
          sc.state === ComboState.ACTIVE ? activeCount++ : inactiveCount++
        );
      let comboState: ComboState;
      if (activeCount > 0 && inactiveCount > 0) {
        comboState = ComboState.PARTIAL;
      } else if (activeCount > 0) {
        comboState = ComboState.ACTIVE;
      } else {
        comboState = ComboState.INACTIVE;
      }

      return {
        ...state,
        comboStates: {
          ...state.comboStates,
          [state.activeComboIndex]: comboState,
        },
        comboElements: state.comboElements.map((item, index) => {
          if (index !== state.activeComboIndex) {
            return item;
          }
          return createComboElement(
            state.activeComboIndex,
            comboState === ComboState.PARTIAL
          );
        }),
        suitCombos: {
          ...state.suitCombos,
          [state.activeComboIndex]: nextCombo,
        },
      };
    }
    case SET_SUIT_INACTIVE: {
      const { suitIndex } = action.payload;

      if (
        state.suitCombos[state.activeComboIndex][suitIndex].state ===
        ComboState.UNAVAILABLE
      ) {
        return state;
      }

      let nextCombo = [...state.suitCombos[state.activeComboIndex]];
      nextCombo[suitIndex] = {
        ...state.suitCombos[state.activeComboIndex][suitIndex],
        state: ComboState.INACTIVE,
      };

      let activeCount = 0;
      let inactiveCount = 0;
      nextCombo
        .filter((sc) => sc.state !== ComboState.UNAVAILABLE)
        .forEach((sc) =>
          sc.state === ComboState.ACTIVE ? activeCount++ : inactiveCount++
        );
      let comboState: ComboState;
      if (activeCount > 0 && inactiveCount > 0) {
        comboState = ComboState.PARTIAL;
      } else if (activeCount > 0) {
        comboState = ComboState.ACTIVE;
      } else {
        comboState = ComboState.INACTIVE;
      }

      return {
        ...state,
        comboStates: {
          ...state.comboStates,
          [state.activeComboIndex]: comboState,
        },
        comboElements: state.comboElements.map((item, index) => {
          if (index !== state.activeComboIndex) {
            return item;
          }
          return createComboElement(
            state.activeComboIndex,
            comboState === ComboState.PARTIAL
          );
        }),
        suitCombos: {
          ...state.suitCombos,
          [state.activeComboIndex]: nextCombo,
        },
      };
    }
    case SET_COMBO_ACTIVE: {
      const { comboIndex } = action.payload;
      return {
        ...state,
        activeComboIndex: comboIndex,
        comboStates: {
          ...state.comboStates,
          [comboIndex]: ComboState.ACTIVE,
        },
        suitCombos: {
          ...state.suitCombos,
          [comboIndex]: state.suitCombos[comboIndex].map((c) => {
            if (c.state !== ComboState.UNAVAILABLE) {
              c.state = ComboState.ACTIVE;
            }
            return c;
          }),
        },
      };
    }
    case SET_COMBO_INACTIVE: {
      const { comboIndex } = action.payload;
      return {
        ...state,
        activeComboIndex: comboIndex,
        comboStates: {
          ...state.comboStates,
          [comboIndex]: ComboState.INACTIVE,
        },
        suitCombos: {
          ...state.suitCombos,
          [comboIndex]: state.suitCombos[comboIndex].map((c) => {
            if (c.state !== ComboState.UNAVAILABLE) {
              c.state = ComboState.INACTIVE;
            }
            return c;
          }),
        },
      };
    }
    default:
      return state;
  }
};

export default rangeReducer;
