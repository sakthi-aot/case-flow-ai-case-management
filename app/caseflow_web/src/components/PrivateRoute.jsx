import React, { useEffect, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../services/UserService";
import { setAuthToken, setAuthenticated, setUserDetails } from "../reducers/authReducer";
import Loading from "../containers/Loading";
// import Upload from "./Upload";
// import Download from "./Download";
import Home from "./Home";
import FileHandler from "./FileHandler";
import CaseDocuments from "./CaseDocuments";

import EditDocuments from "./FileHandler/editDocuments";
import Lob from './Lob'
import Tasks from './Tasks'
import Cases from './Cases'
import Dashboard from './Dashboard'
import CaseDetails from './CaseDetails/CaseDetails'
import NewCaseComponent from "./NewCase/NewCaseComponent";

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
      const {token ,userInfo} = res;
      userInfo.then(res=>dispatch(setUserDetails(res)))
      dispatch(setAuthToken(token));
      dispatch(setAuthenticated(true));
      // });
    });
  }, [props.store, dispatch]);

  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="cases" >
            <Route index element={<Cases />} />
            <Route path="create" element={<NewCaseComponent />} />
            <Route path=":id/details" element={<CaseDetails />} />
          </Route>
           
             
            <Route path="documents" element={<CaseDocuments />} />
            <Route path="documents/update/:id" element={<EditDocuments />} />
            <Route path="lob" element={<Lob />} />
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
