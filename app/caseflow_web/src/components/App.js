import React from "react";
import { Provider } from "react-redux";
import BaseRouting from "./BaseRouting";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import NotFound from "./NotFound";

const App = React.memo((props) => {
  const { store, history } = props;
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <React.Fragment>
            {/* <React.StrictMode> */}
            <Routes>
              <Route index path="/" element={<BaseRouting store={store} />} />
              <Route
                index
                path="/private/*"
                element={<PrivateRoute store={store} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* </React.StrictMode> */}
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    </div>
  );
});

export default App;
