import React from "react";
import Search from "../Search";
import "./dashboard.scss"
import CaseList from "../CaseList";
import MyTask from "../MyTask";
const caseListProps = {
  title : "Recent Cases",
  count : 5,
  isShowSort :false
}
const Dashboard = ({ children }) => {
  return (
    <div className="dashboard">
      <div className="title"><h1>CaseFlow</h1> </div>
      <div className="search">
      <Search></Search>
      </div>
     
        <div className="recent-cases"><CaseList config={caseListProps}></CaseList></div>
        <div className="my-task"><MyTask></MyTask></div>
      
     
    </div>
  );
};

export default Dashboard;
