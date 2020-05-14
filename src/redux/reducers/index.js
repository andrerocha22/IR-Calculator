import { combineReducers } from "redux";
import operation from "./operation";
import stocks from "./stocks";

export default combineReducers({
  operation: operation,
  stocks: stocks,
});
