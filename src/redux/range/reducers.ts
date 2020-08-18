import {
  ComboState,
  ComboType,
  RangeActionTypes,
  SET_COMBO_ACTIVE,
  SET_COMBO_INACTIVE,
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

export type RangeState = {
  comboNames: string[];
  comboStates: ComboState[];
  comboTypes: ComboType[];
  suitCombos: Array<{ name?: string; state: ComboState }>[];
  activeComboIndex: number;
};

function createEmptyRange(): RangeState {
  let comboNames = [];
  let comboStates = [];
  let comboTypes = [];
  let suitCombos = [];
  const activeComboIndex = 0;
  for (let i = 0; i < 169; i++) {
    let rank1 = 12 - Math.floor(i / 13);
    let rank2 = 12 - (i % 13);
    let name: string;
    let type;
    let state = ComboState.INACTIVE;
    let suits = [];
    if (rank1 < rank2) {
      name = `${RANK_TO_CHAR[rank2]}${RANK_TO_CHAR[rank1]}o`;
      type = ComboType.OFFSUITED;
    } else if (rank1 > rank2) {
      name = `${RANK_TO_CHAR[rank1]}${RANK_TO_CHAR[rank2]}s`;
      type = ComboType.SUITED;
    } else {
      name = `${RANK_TO_CHAR[rank1]}${RANK_TO_CHAR[rank2]}`;
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
                name: `${RANK_TO_CHAR[rank1]}${SUIT_TO_CHAR[k]}${RANK_TO_CHAR[rank2]}${SUIT_TO_CHAR[j]}`,
                state: ComboState.INACTIVE,
              });
            } else {
              suits.push({ state: ComboState.UNAVAILABLE });
            }
            break;
          case ComboType.OFFSUITED: {
            if (j !== k) {
              suits.push({
                name: `${RANK_TO_CHAR[rank1]}${SUIT_TO_CHAR[k]}${RANK_TO_CHAR[rank2]}${SUIT_TO_CHAR[j]}`,
                state: ComboState.INACTIVE,
              });
            } else {
              suits.push({ state: ComboState.UNAVAILABLE });
            }
            break;
          }
          case ComboType.SUITED:
            if (j === k) {
              suits.push({
                name: `${RANK_TO_CHAR[rank1]}${SUIT_TO_CHAR[k]}${RANK_TO_CHAR[rank2]}${SUIT_TO_CHAR[j]}`,
                state: ComboState.INACTIVE,
              });
            } else {
              suits.push({ state: ComboState.UNAVAILABLE });
            }
            break;
        }
      }
    }
    comboNames.push(name);
    comboStates.push(state);
    comboTypes.push(type);
    suitCombos.push(suits);
  }
  return {
    suitCombos,
    comboNames,
    comboStates,
    comboTypes,
    activeComboIndex,
  };
}

const defaultState: RangeState = createEmptyRange();

const rangeReducer = (state = defaultState, action: RangeActionTypes) => {
  switch (action.type) {
    case CLEAR_RANGE: {
      return createEmptyRange();
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
