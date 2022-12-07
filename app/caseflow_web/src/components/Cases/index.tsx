import React from "react";
import Search from "../Search";
import "./cases.scss"
import CaseList from "../CaseList";
const caseListProps = {
  title : "Cases",
  count : 5,
  isShowSort :false
}
const Cases = (
  // { children }
  ) => {
  return (
    <section className="dashboard">
      <h1 className="title">CaseFlow</h1>
      <div className="search">
      <Search
            setSearchField={() => {}}
            dropDownArray={[]}
            setSearchColumn={() => {}}
          ></Search>
      </div>     
        <div className="recent-cases"><CaseList  config={caseListProps}></CaseList></div>
        {/* <div className="my-task"><MyTask></MyTask></div> */} 
    </section>
  );
};

export default Cases;
