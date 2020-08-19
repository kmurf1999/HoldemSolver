export const CLEAR_RANGE = "CLEAR_RANGE";
export const SET_COMBO_ACTIVE = "SET_COMBO_ACTIVE";
export const SET_COMBO_INACTIVE = "SET_COMBO_INACTIVE";
export const SET_SUIT_ACTIVE = "SET_SUIT_ACTIVE";
export const SET_SUIT_INACTIVE = "SET_SUIT_INACTIVE";

export enum ComboType {
  PAIR = 0,
  SUITED,
  OFFSUITED,
}

export enum ComboState {
  INACTIVE = 0,
  ACTIVE,
  PARTIAL,
  UNAVAILABLE,
}

interface setSuitActiveAction {
  type: typeof SET_SUIT_ACTIVE;
  payload: {
    suitIndex: number;
  };
}

interface setSuitInactiveAction {
  type: typeof SET_SUIT_INACTIVE;
  payload: {
    suitIndex: number;
  };
}

interface clearRangeAction {
  type: typeof CLEAR_RANGE;
}

interface setComboActiveAction {
  type: typeof SET_COMBO_ACTIVE;
  payload: {
    comboIndex: number;
  };
}

interface setComboInactiveAction {
  type: typeof SET_COMBO_INACTIVE;
  payload: {
    comboIndex: number;
  };
}

export type RangeActionTypes =
  | setComboActiveAction
  | setComboInactiveAction
  | clearRangeAction
  | setSuitActiveAction
  | setSuitInactiveAction;
