import { createStore } from 'redux';
import { combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rangeReducer from './range/reducers';
import { RangeState } from './range/types';

export type RootState = {
  range: RangeState;
};

const rootReducer = combineReducers({
  range: rangeReducer,
});

const store = createStore(
  rootReducer
);

export default store;
