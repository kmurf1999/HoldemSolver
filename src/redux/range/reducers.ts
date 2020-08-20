import update from "react-addons-update";
import {
  RangeActionTypes,
  SET_COMBO_ACTIVE,
  SET_COMBO_INACTIVE,
  SET_SUIT_COMBO_ACTIVE,
  SET_SUIT_COMBO_INACTIVE,
  CLEAR_RANGE,
} from "./types";
import {
  createEmptyRange,
  ComboType,
  OFFSUITED_MASK,
  SUITED_MASK,
  PAIR_MASK,
} from "../../HandRange";

export type RangeState = {
  combos: number[];
  types: ComboType[];
  activeComboIndex: number;
};

const defaultState: RangeState = { ...createEmptyRange(), activeComboIndex: 0 };

const rangeReducer = (state = defaultState, action: RangeActionTypes) => {
  switch (action.type) {
    case SET_COMBO_ACTIVE: {
      const { comboIndex } = action.payload;
      let newCombo;
      switch (state.types[comboIndex]) {
        case ComboType.OFFSUITED:
          newCombo = OFFSUITED_MASK;
          break;
        case ComboType.SUITED:
          newCombo = SUITED_MASK;
          break;
        case ComboType.PAIR:
          newCombo = PAIR_MASK;
          break;
      }
      return update(state, {
        combos: {
          [comboIndex]: { $set: newCombo },
        },
        activeComboIndex: { $set: comboIndex },
      });
    }
    case SET_COMBO_INACTIVE: {
      const { comboIndex } = action.payload;
      return update(state, {
        combos: {
          [comboIndex]: { $set: 0 },
        },
        activeComboIndex: { $set: comboIndex },
      });
    }
    case SET_SUIT_COMBO_ACTIVE: {
      const { activeComboIndex } = state;
      const { suitIndex } = action.payload;
      const newCombo = state.combos[activeComboIndex] | (1 << suitIndex);
      return update(state, {
        combos: {
          [activeComboIndex]: { $set: newCombo },
        },
      });
    }
    case SET_SUIT_COMBO_INACTIVE: {
      const { activeComboIndex } = state;
      const { suitIndex } = action.payload;
      const newCombo = state.combos[activeComboIndex] & ~(1 << suitIndex);
      return update(state, {
        combos: {
          [activeComboIndex]: { $set: newCombo },
        },
      });
    }
    case CLEAR_RANGE:
      return defaultState;
    default:
      return state;
  }
};

export default rangeReducer;
