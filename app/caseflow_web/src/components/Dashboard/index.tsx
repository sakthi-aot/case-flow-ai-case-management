import React, { useEffect } from "react";
import Search from "../Search";
import "./dashboard.scss";
import CaseList from "../CaseList";
import MyTask from "../MyTask";
import { getRecentCases } from "../../apiManager/services/caseService";
const caseListProps = {
  title: "Recent Cases",
  count: 5,
  isShowSort: false,
};

const Dashboard = () =>
  // { children }
  {
    useEffect(() => {
      // getRecentCases({}, (err, res) => {
      //   // const {token } = res;
      //   // dispatch(setAuthToken(token));
      //   // dispatch(setAuthenticated(true));
      //   // });
      // });
    });
    return (
      <div className="dashboard">
        <h1 className="title">CaseFlow</h1>
        <div className="search">
          <Search
            setSearchField={() => {}}
            dropDownArray={[]}
            setSearchColumn={() => {}}
          ></Search>
        </div>
        <div className="recent-cases">
          <CaseList config={caseListProps}></CaseList>
        </div>
        <div className="my-task">
          <MyTask></MyTask>
        </div>
      </div>
    );
  };

export default Dashboard;
