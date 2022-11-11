import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./userDetailReducer";

const createRootReducer = (history) =>
  combineReducers({
    user,
  });

export default createRootReducer;
