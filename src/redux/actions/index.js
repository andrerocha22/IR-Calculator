import { ADD_TRANSACTION, ADD_STOCK } from "./types";

export const addTransaction = (payload) => {
  return {
    type: ADD_TRANSACTION,
    item: payload,
  };
};

export const addStock = (payload) => {
  return {
    type: ADD_STOCK,
    item: payload,
  };
};
