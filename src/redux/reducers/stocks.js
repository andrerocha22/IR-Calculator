import { ADD_STOCK } from "../actions/types";

export default function addNewStock(state = [], action) {
  switch (action.type) {
    case ADD_STOCK:
      state = state.slice();
      state.push(action.item);
      return state;

    default:
      return state;
  }
}
