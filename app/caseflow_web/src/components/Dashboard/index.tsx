import React, { useEffect } from "react";
import Search from "../Search";
import "./dashboard.scss";
import CaseList from "../CaseList";
import MyTask from "../MyTask";
import { getRecentCases } from "../../apiManager/services/caseService";
import { store } from "../../interfaces/stateInterface";
import {useSelector} from "react-redux";
const caseListProps = {
  title: "Recent Cases",
  count: 5,
  isShowSort: false,
  pagination:false
};


const Dashboard = () =>

  // { children }
  {
  let allRecentCases :any =  useSelector((state:store)=>state.cases.caseList.slice(-10));

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
          <CaseList config={caseListProps} allRecentCases ={allRecentCases}  ></CaseList>
        </div>
        <div className="my-task">
          <MyTask></MyTask>
        </div>
      </div>
    );
  };

export default Dashboard;
