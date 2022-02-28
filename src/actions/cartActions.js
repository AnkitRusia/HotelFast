import { SET_CART_LIST, SET_ORDER_SUCCESS } from "./actionTypes";

export const setCartList = (payload) => ({
  type: SET_CART_LIST,
  payload,
});

export const setOrderSuccess = (payload) => ({
  type: SET_ORDER_SUCCESS,
  payload,
});
