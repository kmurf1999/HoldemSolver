import { createStore } from 'redux';
import { combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rangeReducer, { RangeState } from './range/reducers';
import boardReducer, { BoardState } from './board/reducers';

export type RootState = {
  range: RangeState;
  board: BoardState;
};

const rootReducer = combineReducers({
  range: rangeReducer,
  board: boardReducer
});

const store = createStore(
  rootReducer
);

export default store;
