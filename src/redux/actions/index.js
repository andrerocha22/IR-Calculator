import { ADD_TRANSACTION, ADD_STOCK, REMOVE_TRANSACTION } from "./types";

export const addTransaction = (payload) => {
  return {
    type: ADD_TRANSACTION,
    item: payload,
  };
};

export const removeTransaction = (payload) => {
  return {
    type: REMOVE_TRANSACTION,
    index: payload,
  };
};

export const addStock = (payload) => {
  return {
    type: ADD_STOCK,
    item: payload,
  };
};
