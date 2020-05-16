import { addTransaction } from "../actions/index";
import { ADD_TRANSACTION } from "../actions/types";

import configureStore from "redux-mock-store";
const mockStore = configureStore();
const store = mockStore();

describe("input_actions", () => {
  const dispatch = store.dispatch;

  beforeEach(() => {
    store.clearActions();
  });
  test("Dispatches the correct action and payload for operation", () => {
    const expectedActions = [
      {
        item: {
          id: "teste-555",
          stockCode: "TEST",
          date: "01-01-2020",
          operationType: "Compra",
          price: 0,
          quant: 0,
          brockageFee: 0,
        },
        type: ADD_TRANSACTION,
      },
    ];

    dispatch(
      addTransaction({
        id: "teste-555",
        stockCode: "TEST",
        date: "01-01-2020",
        operationType: "Compra",
        price: 0,
        quant: 0,
        brockageFee: 0,
      })
    );
    expect(store.getActions()).toEqual(expectedActions);
  });
});
