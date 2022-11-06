import React, { useEffect, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../services/UserService";
import { setAuthToken, setAuthenticated } from "../reducers/authReducer";
import Loading from "../containers/Loading";
import Upload from "./Upload";
import Download from "./Download";
import Dashboard from "./Dashboard";
const NotFound = lazy(() => import("./NotFound"));

const PrivateRoute = React.memo((props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (props.store) {
      console.log(props.store);
    }
    // UserService.setKeycloakJson(null, (clientId) => {
    UserService.initKeycloak(props.store, (err, res) => {
      const { roles, token, userInfo, email } = res;
      dispatch(setAuthToken(token));
      dispatch(setAuthenticated(true));
      // });
    });
  }, [props.store, dispatch]);

  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="download" element={<Download />} />
            <Route path="upload" element={<Upload />} />
            <Route path="tasks" element={<Upload />} />
            <Route path="cases" element={<Upload />} />
            <Route path="documents" element={<Upload />} />
            <Route path="llb" element={<Upload />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Loading />
      )}
    </>
  );
});

export default PrivateRoute;
