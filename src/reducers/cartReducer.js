import { SET_CART_LIST } from "../actions/actionTypes";

const initialState = {
  cartList: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_LIST:
      return {
        ...state,
        cartList: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
