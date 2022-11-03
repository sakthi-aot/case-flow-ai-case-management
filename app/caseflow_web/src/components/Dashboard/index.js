import React from "react";
import { Link } from "react-router-dom";
// import "./home.css";
import MiniDrawer  from "../NavigationDrawer"
const Dashboard = () => {
  return (
    <div className="welcome">
      <MiniDrawer></MiniDrawer>
    </div>
  );
};

export default Dashboard;