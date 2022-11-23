import React from "react";
import { Outlet } from "react-router-dom";
import MiniDrawer from "../NavigationDrawer";
import "./home.scss"
const Home = ({ children }) => {
  return (
    <div className="grid-container">
      <div className="menu"> 
        <MiniDrawer/>
      </div>
      <div className="outlet">
      <Outlet />
      </div>     
    </div>
  );
};

export default Home;
