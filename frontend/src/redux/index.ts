import { combineReducers } from 'redux';
import rangeReducer, { RangeState } from './range/reducers';
import boardReducer, { BoardState } from './board/reducers';

export type RootState = {
  range: RangeState;
  board: BoardState;
};

export default combineReducers({
  range: rangeReducer,
  board: boardReducer,
});
