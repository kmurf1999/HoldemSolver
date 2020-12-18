export const CLEAR_RANGE = 'CLEAR_RANGE';
export const SET_COMBO_ACTIVE = 'SET_COMBO_ACTIVE';
export const SET_COMBO_INACTIVE = 'SET_COMBO_INACTIVE';
export const SET_SUIT_COMBO_ACTIVE = 'SET_SUIT_COMBO_ACTIVE';
export const SET_SUIT_COMBO_INACTIVE = 'SET_SUIT_COMBO_INACTIVE';
export const SET_RANGE_ALL = 'SET_RANGE_ALL';
export const SET_RANGE_BROADWAY = 'SET_RANGE_BROADWAY';
export const SET_RANGE_PAIRS = 'SET_RANGE_PAIRS';
export const SET_RANGE_TEXT = 'SET_RANGE_TEXT';

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

interface setRangeTextAction {
  type: typeof SET_RANGE_TEXT;
  payload: {
    rangeString: string;
  };
}

interface setRangePairsAction {
  type: typeof SET_RANGE_PAIRS;
}

interface setRangeBroadwayAction {
  type: typeof SET_RANGE_BROADWAY;
}

interface setRangeAllAction {
  type: typeof SET_RANGE_ALL;
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

interface setSuitComboActiveAction {
  type: typeof SET_SUIT_COMBO_ACTIVE;
  payload: {
    suitIndex: number;
  };
}

interface setSuitComboInactiveAction {
  type: typeof SET_SUIT_COMBO_INACTIVE;
  payload: {
    suitIndex: number;
  };
}

export type RangeActionTypes =
  | setComboActiveAction
  | setComboInactiveAction
  | clearRangeAction
  | setSuitComboInactiveAction
  | setSuitComboActiveAction
  | setRangeAllAction
  | setRangeBroadwayAction
  | setRangePairsAction
  | setRangeTextAction;
