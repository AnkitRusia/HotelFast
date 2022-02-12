import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

const reducer = combineReducers(
  Object.fromEntries(
    Object.entries({
      cartReducer,
    })
  )
);

export default reducer;
