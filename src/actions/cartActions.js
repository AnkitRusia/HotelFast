import { SET_CART_LIST, SET_ORDER_SUCCESS, SET_PASSWORD } from "./actionTypes";

export const setCartList = (payload) => ({
  type: SET_CART_LIST,
  payload,
});

export const setOrderSuccess = (payload) => ({
  type: SET_ORDER_SUCCESS,
  payload,
});

export const setPassword = (payload) => ({
  type: SET_PASSWORD,
  payload,
});
