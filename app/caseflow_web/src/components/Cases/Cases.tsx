import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import "./cases.scss"
import CaseList from "../CaseList/CaseList";
import {useSelector,useDispatch} from "react-redux";
import { State } from "../../interfaces/stateInterface";
import { searchCases } from "../../services/CaseService";
import { setTotalCaseCount } from "../../reducers/newCaseReducer";
import { Typography } from "@mui/material";
const caseListProps = {
  title : "Cases",
  count : 5,
  isShowSort :false,
  pagination:true
}
const Cases = (
  // { children }
  ) => {
  const [filteredCaseDetails, setFilteredCaseDetails] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [dropDownArray, setdropDownArray] = useState(['Name', "Description"]);
  const [sortSetting, setSortSetting] = useState({orderBy :"id",orderType :true});



  const dispatch = useDispatch()
  const selectedPage = useSelector((state:State)=>state.cases.pageSelected)
  
  const filterDocumentDetails = async () => {    
    let searchResult = await searchCases(searchField,searchColumn,selectedPage,sortSetting.orderBy,sortSetting.orderType)    
   let searchResultCases = searchResult.Cases.map((element) => {
      return {...element,status:"Open"};
    });
    
    if(searchResultCases)
    setFilteredCaseDetails(searchResultCases)
    dispatch(setTotalCaseCount(searchResult.totalCount))
  };



  useEffect(() => {
    filterDocumentDetails();
  }, [searchField,searchColumn,selectedPage,sortSetting]);



  return (
    <section className="dashboard">
      <div className="header-search">
      <Typography variant="body1" className="title">CaseFlow</Typography>
      <div className="search">
        <Search
         setSearchField={setSearchField}
         dropDownArray={dropDownArray}
         setSearchColumn={setSearchColumn}
        ></Search>
      </div>
      </div>  
        <div className="recent-cases"><CaseList sortSetting={sortSetting} setSortSetting ={setSortSetting} config={caseListProps}    allRecentCases = {filteredCaseDetails}></CaseList></div>
        {/* <div className="my-task"><MyTask></MyTask></div> */} 
    </section>
  );
};

export default Cases;
