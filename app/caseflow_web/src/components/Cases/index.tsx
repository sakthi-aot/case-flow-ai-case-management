import React, { useEffect, useState } from "react";
import Search from "../Search";
import "./cases.scss"
import CaseList from "../CaseList";
import {useSelector,useDispatch} from "react-redux";
import { store } from "../../interfaces/stateInterface";

const caseListProps = {
  title : "Cases",
  count : 5,
  isShowSort :false,
  pagination:true
}
const Cases = (
  // { children }
  ) => {
  let allRecentCases :any =  useSelector((state:store)=>state.cases.caseList);
  const [filteredCaseDetails, setFilteredCaseDetails] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [dropDownArray, setdropDownArray] = useState([""]);

  const filterDocumentDetails = () => {
    switch (searchColumn) {
      case "name":
        return setFilteredCaseDetails(
          allRecentCases.filter((eachValue:any) => {
            if( eachValue.name) {
            return eachValue.name
              .toLowerCase()
              .includes(searchField.toLowerCase());
            }
          })
          
        );
        case "description":
          return setFilteredCaseDetails(
            
            allRecentCases.filter((eachValue:any) => {
            if( eachValue.description) {
              return eachValue.description
              .toLowerCase()
              .includes(searchField.toLowerCase());
            }

            })
          );
      case "id":
        return setFilteredCaseDetails(
          allRecentCases.filter((eachValue:any) => {
            if( eachValue.id) {
            return eachValue.id
              .toString()
              .toLowerCase()
              .includes(searchField.toLowerCase());
            }
          })
        );
        case "status":
          return setFilteredCaseDetails(
            allRecentCases.filter((eachValue:any) => {
            if( eachValue.status) {   
              return eachValue.status
                .toString()
                .toLowerCase()
                .includes(searchField.toLowerCase());
            }
            })
          );
      default:
        return setFilteredCaseDetails(
          allRecentCases.filter((eachValue:any) => {
            return eachValue.name
              .toLowerCase()
              .includes(searchField.toLowerCase());
          })
        );
    }
  };
  useEffect(() => {
    setFilteredCaseDetails(allRecentCases);
    setdropDownArray(Object.keys(allRecentCases[0]))
  }, [allRecentCases]);


  useEffect(() => {
    filterDocumentDetails();
  }, [searchField]);


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
