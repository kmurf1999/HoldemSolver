import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rangeReducer, { RangeState } from './range/reducers';
import boardReducer, { BoardState } from './board/reducers';

import authSaga from './auth/saga';

export type RootState = {
  range: RangeState;
  board: BoardState;
};

function* rootSaga() {
  yield [
    authSaga()
  ];
}

const rootReducer = combineReducers({
  range: rangeReducer,
  board: boardReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
