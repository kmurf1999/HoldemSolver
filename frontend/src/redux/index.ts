import { createStore } from 'redux';
import { combineReducers } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rangeReducer from './range/reducers';
import authReducer from './auth/reducers';

import { RangeState } from './range/types';
import { AuthState } from './auth/types';

export type RootState = {
  range: RangeState;
  auth: AuthState;
};

const rootReducer = combineReducers({
  range: rangeReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer
);

export default store;
