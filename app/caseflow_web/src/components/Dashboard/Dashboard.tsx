import React, { useEffect,useState } from "react";
import Search from "../Search/Search";
import "./dashboard.scss";
import CaseList from "../CaseList/CaseList";
import MyTask from "../MyTask/MyTask";
import { fetchRecentCaseList } from "../../services/CaseService";
import { Typography } from "@mui/material";

const caseListProps = {
  title: "Recent Cases",
  count: 5,
  isShowSort: false,
  pagination:false
};


const Dashboard = () =>
  {
  const [recentCases, setrecentCases] = useState([]);

    const recentCaseList = async () => {
      let recentCases = await fetchRecentCaseList();
      recentCases = recentCases.map((element) => {
        return {...element}
      });
      if(recentCases) setrecentCases(recentCases)
    };
  
  
  
    useEffect(() => {
      recentCaseList()
    }, []);
    // useEffect(() => {
      // getRecentCases({}, (err, res) => {
      //   // const {token } = res;
      //   // dispatch(setAuthToken(token));
      //   // dispatch(setAuthenticated(true));
      //   // });
      // });
    // });
    const [filteredCaseDetails, setFilteredCaseDetails] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [searchColumn, setSearchColumn] = useState("name");
    const [dropDownArray, setdropDownArray] = useState(['Name', "Description"]);
    return (
      <div className="dashboard">
     <Typography variant="body1" className="title">CaseFlow</Typography>
        <div className="search">
          <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
          ></Search>
        </div>
        <div className="recent-cases">
          <CaseList config={caseListProps} allRecentCases ={recentCases} ></CaseList>
        </div>
        <div className="my-task">
          <MyTask></MyTask>
        </div>
      </div>
    );
  };

export default Dashboard;
