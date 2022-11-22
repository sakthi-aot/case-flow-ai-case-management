import { combineReducers } from "redux";

import user from "./userDetailReducer";

const createRootReducer = (history) =>
  combineReducers({
    user,
  });

export default createRootReducer;
