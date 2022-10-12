import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { BASE_ROUTE } from "../constants/constants";

/*import SideBar from "../containers/SideBar";*/
// import NavBar from "../containers/NavBar";
// import Footer from "../components/Footer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Home from "./Home";
import NotFound from "./NotFound";
import Upload from "./Upload";

const BaseRouting = React.memo(({ store }) => {
  // const isAuth = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" exact={true} component={NotFound} />
        {/* <Navigate from="*" to="/404" /> */}
      </Routes>
    </div>
  );
});

export default BaseRouting;
