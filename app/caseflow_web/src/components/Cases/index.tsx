import React, { useEffect, useState } from "react";
import Search from "../Search";
import "./cases.scss"
import CaseList from "../CaseList";
import {useSelector,useDispatch} from "react-redux";
import { store } from "../../interfaces/stateInterface";
import { searchCases } from "../../services/CaseService";

const caseListProps = {
  title : "Cases",
  count : 5,
  isShowSort :false
}
const Cases = (
  // { children }
  ) => {
  const [filteredCaseDetails, setFilteredCaseDetails] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [dropDownArray, setdropDownArray] = useState(['Name', "Description"]);

  const filterDocumentDetails = async () => {
    let searchResult = await searchCases(searchField,searchColumn)
    if(searchResult)
    setFilteredCaseDetails(searchResult)
  };



  useEffect(() => {
    filterDocumentDetails();
  }, [searchField,searchColumn]);


  return (
    <section className="dashboard">
      <h1 className="title">CaseFlow</h1>
      <div className="search">
      <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
          ></Search>
      </div>     
        <div className="recent-cases"><CaseList  config={caseListProps}    allRecentCases = {filteredCaseDetails}></CaseList></div>
        {/* <div className="my-task"><MyTask></MyTask></div> */} 
    </section>
  );
};

export default Cases;
