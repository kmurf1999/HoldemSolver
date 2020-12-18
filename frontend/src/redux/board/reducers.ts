import update from "react-addons-update";

import { BoardActionTypes, TOGGLE_CARD } from "./types";

type BoardState = {
  board: boolean[];
  // 1 << 13 * suit + rank
  boardCount: number;
};

const defaultState: BoardState = {
  board: new Array(52).fill(false),
  boardCount: 0,
};

const boardReducer = (
  state = defaultState,
  action: BoardActionTypes
): BoardState => {
  switch (action.type) {
    case TOGGLE_CARD:
      const { cardIndex } = action.payload;

      const boardCount = state.board[cardIndex]
        ? state.boardCount - 1
        : state.boardCount + 1;
      if (boardCount > 5) return state;
      return update(state, {
        boardCount: { $set: boardCount },
        board: {
          [cardIndex]: { $set: !state.board[cardIndex] },
        },
      });
    default:
      return state;
  }
};

export default boardReducer;
