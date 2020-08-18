import { combineReducers } from "redux";
import rangeReducer from "./range/reducers";

export default combineReducers({
  range: rangeReducer,
});
