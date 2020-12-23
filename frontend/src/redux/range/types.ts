// remove all
export const CLEAR_RANGE = 'CLEAR_RANGE';
export const SET_COMBO = 'SET_COMBO';
// set specific suit active
export const SET_SUIT_COMBO_ACTIVE = 'SET_SUIT_COMBO_ACTIVE';
// set specific suit invactive
export const SET_SUIT_COMBO_INACTIVE = 'SET_SUIT_COMBO_INACTIVE';
// set range to all
export const SET_RANGE_ALL = 'SET_RANGE_ALL';
// set all broadway
export const SET_RANGE_BROADWAY = 'SET_RANGE_BROADWAY';
// set all pairs
export const SET_RANGE_PAIRS = 'SET_RANGE_PAIRS';
// set range using text
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
  type: typeof SET_COMBO
  payload: {
    active: boolean;
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
