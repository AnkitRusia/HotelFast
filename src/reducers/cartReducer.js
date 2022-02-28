import { SET_CART_LIST, SET_ORDER_SUCCESS } from "../actions/actionTypes";

const initialState = {
  cartList: [],
  orderSuccess: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_LIST:
      return {
        ...state,
        cartList: action.payload,
      };
    case SET_ORDER_SUCCESS:
      return {
        ...state,
        orderSuccess: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
