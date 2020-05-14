import { ADD_TRANSACTION } from "../actions/types";

export default function addNewTransaction(state = [], action) {
  console.log(action.item);
  switch (action.type) {
    case ADD_TRANSACTION:
      state = state.slice();
      state.push(action.item);
      state = state.sort((a, b) => new Date(b.date) - new Date(a.date));
      return state;

    default:
      return state;
  }
}
