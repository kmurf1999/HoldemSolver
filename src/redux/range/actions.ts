import {
  RangeActionTypes,
  CLEAR_RANGE,
  SET_COMBO_ACTIVE,
  SET_COMBO_INACTIVE,
  SET_SUIT_COMBO_ACTIVE,
  SET_SUIT_COMBO_INACTIVE,
} from "./types";

export function clearRange(): RangeActionTypes {
  return {
    type: CLEAR_RANGE,
  };
}

export function setComboActive(comboIndex: number): RangeActionTypes {
  return {
    type: SET_COMBO_ACTIVE,
    payload: {
      comboIndex,
    },
  };
}

export function setComboInactive(comboIndex: number): RangeActionTypes {
  return {
    type: SET_COMBO_INACTIVE,
    payload: {
      comboIndex,
    },
  };
}

export function setSuitComboActive(suitIndex: number): RangeActionTypes {
  return {
    type: SET_SUIT_COMBO_ACTIVE,
    payload: {
      suitIndex,
    },
  };
}

export function setSuitComboInactive(suitIndex: number): RangeActionTypes {
  return {
    type: SET_SUIT_COMBO_INACTIVE,
    payload: {
      suitIndex,
    },
  };
}
