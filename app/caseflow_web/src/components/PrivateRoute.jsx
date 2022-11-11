import React, { useEffect, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserService from "../services/UserService";
import { setUserAuth } from "../actions/bpmActions";
// const Download = lazy(() => import("./Download"));
// const Upload = lazy(() => import("./Upload"));
// const NotFound = lazy(() => import("./NotFound"));
import Upload from "./Upload";
import Download from "./Download";
const NotFound = lazy(() => import("./NotFound"));

const PrivateRoute = React.memo((props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.store) {
      console.log(props.store)
    }
    UserService.setKeycloakJson(null, (clientId) => {
      UserService.initKeycloak(props.store, clientId, (err, res) => {
        dispatch(setUserAuth(res.authenticated));
      });
    });
   
  });

  // useMemo prevents unneccessary rerendering caused by the route update.

  return (
    <div>
      <Routes>
        <Route index path="/download" element={<Download />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" exact={true} component={NotFound} />
      </Routes>
    </div>
  );
});

export default PrivateRoute;
