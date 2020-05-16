import { ADD_TRANSACTION, REMOVE_TRANSACTION } from "../actions/types";

export default function addNewTransaction(state = [], action) {
  switch (action.type) {
    case ADD_TRANSACTION:
      state = state.slice();
      state.push(action.item);
      state = state.sort((a, b) => new Date(a.date) - new Date(b.date));
      return state;

    case REMOVE_TRANSACTION:
      state = state.slice();
      state.splice(action.index, 1);
      state = state.sort((a, b) => new Date(a.date) - new Date(b.date));
      return state;

    default:
      return state;
  }
}
