import { combineReducers } from "redux";
import rangeReducer from "./range/reducers";
import boardReducer from "./board/reducers";

export default combineReducers({
  range: rangeReducer,
  board: boardReducer,
});
