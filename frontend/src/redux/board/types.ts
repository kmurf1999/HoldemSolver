export const TOGGLE_CARD = 'TOGGLE_CARD';

interface toggleCardAction {
  type: typeof TOGGLE_CARD;
  payload: { cardIndex: number };
}

export type BoardActionTypes = toggleCardAction;
