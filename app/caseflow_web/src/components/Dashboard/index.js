import React from "react";
import { Outlet } from "react-router-dom";
import MiniDrawer from "../NavigationDrawer";
const Dashboard = ({ children }) => {
  return (
    <div>
      <MiniDrawer>
        {" "}
        <Outlet />
      </MiniDrawer>
    </div>
  );
};

export default Dashboard;
