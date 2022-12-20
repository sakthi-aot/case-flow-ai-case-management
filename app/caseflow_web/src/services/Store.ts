import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import authReducer from "../reducers/authReducer";
import documentsReducer  from "../reducers/documentsReducer"
import applicationReducer from "../reducers/applicationReducer";
import caseReducer from "../reducers/newCaseReducer";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    auth : authReducer,
    documents : documentsReducer,
    app: applicationReducer,
    cases:caseReducer
  }),
  middleware: [routerMiddleware],
});

export const history = createReduxHistory(store);
