import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { store, history } from "./services/StoreService";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App {...{ store, history }} />
);
