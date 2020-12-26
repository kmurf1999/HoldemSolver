import {
  RangeActionTypes,
  SET_COMBO_ACTIVE,
  SET_COMBO_INACTIVE,
  SET_SUIT_COMBO_ACTIVE,
  SET_SUIT_COMBO_INACTIVE,
  SET_RANGE_ALL,
  SET_RANGE_BROADWAY,
  SET_RANGE_PAIRS,
  SET_RANGE,
  CLEAR_RANGE,
  RangeState
} from './types';
import HandRange from './HandRange';

const defaultState: RangeState = { handRange: new HandRange(), activeCombo: 0 };

const rangeReducer = (state = defaultState, action: RangeActionTypes): RangeState => {
  switch (action.type) {
    case SET_COMBO_ACTIVE: {
      const { comboIndex } = action.payload;
      return {
        ...state,
        handRange: state.handRange.setComboActive(comboIndex),
        activeCombo: comboIndex
      };
    }
    case SET_COMBO_INACTIVE: {
      const { comboIndex } = action.payload;
      return {
        ...state,
        handRange: state.handRange.setComboInactive(comboIndex),
        activeCombo: comboIndex
      };
    }
    case SET_SUIT_COMBO_ACTIVE: {
      const { suitIndex } = action.payload;
      return {
        ...state,
        handRange: state.handRange.setSuitComboActive(state.activeCombo, suitIndex),
      };
    }
    case SET_SUIT_COMBO_INACTIVE: {
      const { suitIndex } = action.payload;
      return {
        ...state,
        handRange: state.handRange.setSuitComboInactive(state.activeCombo, suitIndex),
      };
    }
    case SET_RANGE_ALL: {
      return {
        ...state,
        handRange: HandRange.all()
      }
    }
    case SET_RANGE_PAIRS: {
      return {
        ...state,
        handRange: state.handRange.setPairs()
      }
    }
    case SET_RANGE_BROADWAY: {
      return {
        ...state,
        handRange: state.handRange.setBroadway()
      }
    }
    case CLEAR_RANGE: {
      return {
        ...state,
        handRange: new HandRange()
      }
    }
    case SET_RANGE: {
      const { handRange } = action.payload;
      return {
        ...state,
        handRange
      };
    }
    default:
      return state;
  }
};

export default rangeReducer;