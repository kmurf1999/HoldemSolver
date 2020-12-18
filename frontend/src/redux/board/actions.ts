import { BoardActionTypes, TOGGLE_CARD } from "./types";

export function toggleCard(cardIndex: number): BoardActionTypes {
  return {
    type: TOGGLE_CARD,
    payload: {
      cardIndex,
    },
  };
}
