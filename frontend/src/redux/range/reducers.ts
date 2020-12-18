import update from 'react-addons-update';
import {
  RangeActionTypes,
  SET_COMBO_ACTIVE,
  SET_COMBO_INACTIVE,
  SET_SUIT_COMBO_ACTIVE,
  SET_SUIT_COMBO_INACTIVE,
  SET_RANGE_ALL,
  SET_RANGE_BROADWAY,
  SET_RANGE_PAIRS,
  SET_RANGE_TEXT,
  CLEAR_RANGE,
} from './types';
import { stringToRange, createEmptyRange, ComboType, OFFSUITED_MASK, SUITED_MASK, PAIR_MASK } from '../../HandRange';

export type RangeState = {
  combos: number[];
  types: ComboType[];
  activeComboIndex: number;
};

const defaultState: RangeState = { ...createEmptyRange(), activeComboIndex: 0 };

const rangeReducer = (state = defaultState, action: RangeActionTypes): RangeState => {
  switch (action.type) {
    case SET_RANGE_TEXT: {
      return {
        ...state,
        combos: stringToRange(action.payload.rangeString),
      };
    }
    case SET_RANGE_ALL: {
      const combos = [...state.combos];
      for (let i = 0; i < 169; i++) {
        switch (state.types[i]) {
          case ComboType.OFFSUITED:
            combos[i] = OFFSUITED_MASK;
            break;
          case ComboType.SUITED:
            combos[i] = SUITED_MASK;
            break;
          case ComboType.PAIR:
            combos[i] = PAIR_MASK;
            break;
        }
      }
      return {
        ...state,
        combos,
      };
    }
    case SET_RANGE_PAIRS: {
      const combos = [...state.combos];
      for (let i = 0; i < 13; i++) {
        const j = i * 13 + i;
        combos[j] = PAIR_MASK;
      }
      return {
        ...state,
        combos,
      };
    }
    case SET_RANGE_BROADWAY: {
      const combos = [...state.combos];
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          const k = i * 13 + j;
          switch (state.types[k]) {
            case ComboType.OFFSUITED:
              combos[k] = OFFSUITED_MASK;
              break;
            case ComboType.SUITED:
              combos[k] = SUITED_MASK;
              break;
            case ComboType.PAIR:
              combos[k] = PAIR_MASK;
              break;
          }
        }
      }
      return { ...state, combos };
    }

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
      switch (state.types[activeComboIndex]) {
        case ComboType.OFFSUITED:
          if (((1 << suitIndex) & OFFSUITED_MASK) === 0) return state;
          break;
        case ComboType.SUITED:
          if (((1 << suitIndex) & SUITED_MASK) === 0) return state;
          break;
        case ComboType.PAIR:
          if (((1 << suitIndex) & PAIR_MASK) === 0) return state;
          break;
      }
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
      switch (state.types[activeComboIndex]) {
        case ComboType.OFFSUITED:
          if (((1 << suitIndex) & OFFSUITED_MASK) === 0) return state;
          break;
        case ComboType.SUITED:
          if (((1 << suitIndex) & SUITED_MASK) === 0) return state;
          break;
        case ComboType.PAIR:
          if (((1 << suitIndex) & PAIR_MASK) === 0) return state;
          break;
      }
      const newCombo = state.combos[activeComboIndex] & ~(1 << suitIndex);
      return update(state, {
        combos: {
          [activeComboIndex]: { $set: newCombo },
        },
      });
    }
    case CLEAR_RANGE:
      return { ...createEmptyRange(), activeComboIndex: 0 };
    default:
      return state;
  }
};

export default rangeReducer;
