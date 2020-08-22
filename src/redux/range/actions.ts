import {
  RangeActionTypes,
  CLEAR_RANGE,
  SET_COMBO_ACTIVE,
  SET_COMBO_INACTIVE,
  SET_SUIT_COMBO_ACTIVE,
  SET_SUIT_COMBO_INACTIVE,
  SET_RANGE_ALL,
  SET_RANGE_BROADWAY,
  SET_RANGE_PAIRS,
  SET_RANGE_TEXT,
} from "./types";

export function setRangeText(rangeString: string): RangeActionTypes {
  return {
    type: SET_RANGE_TEXT,
    payload: {
      rangeString,
    },
  };
}

export function setRangePairs(): RangeActionTypes {
  return {
    type: SET_RANGE_PAIRS,
  };
}

export function setRangeBroadway(): RangeActionTypes {
  return {
    type: SET_RANGE_BROADWAY,
  };
}

export function clearRange(): RangeActionTypes {
  return {
    type: CLEAR_RANGE,
  };
}

export function setRangeAll(): RangeActionTypes {
  return {
    type: SET_RANGE_ALL,
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
