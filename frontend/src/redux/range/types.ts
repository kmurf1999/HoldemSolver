import HandRange from './HandRange';
// remove all
export const CLEAR_RANGE = 'CLEAR_RANGE';
export const SET_COMBO_ACTIVE = 'SET_COMBO_ACTIVE';
export const SET_COMBO_INACTIVE = 'SET_COMBO_INACTIVE';
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
// set range directly
export const SET_RANGE = 'SET_RANGE';

export type RangeState = {
  handRange: HandRange;
  activeCombo: number; // 0 -> 169
}

interface setRangeAction {
  type: typeof SET_RANGE;
  payload: {
    handRange: HandRange;
  };
}

interface setComboActiveAction {
  type: typeof SET_COMBO_ACTIVE;
  payload: {
    comboIndex: number
  }
}

interface setComboInactiveAction {
  type: typeof SET_COMBO_INACTIVE;
  payload: {
    comboIndex: number
  }
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
  | setRangeAction;
