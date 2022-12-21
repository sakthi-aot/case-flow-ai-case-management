import React,{useEffect,useState} from "react";
import FilterMuiComponent from "../FilterMuiComponent/FilterMuiComponent";
import CaseDetailData from "./CaseDetailData/CaseDetailData";
import CaseDetailReference from "./CaseDetailReference/CaseDetailReference";
import "./CaseDetails.scss";
import Search from "../Search";
import CaseHistory from "../CaseHistory/caseHistory";
import {useSelector} from "react-redux";
import { store } from "../../interfaces/stateInterface";



const CaseDetails = () => {
  let selectedCase =  useSelector((state:store)=>state.cases.selectedCase);
  const [caseDetail, setcaseDetail] = useState({
    id: 26111245,
    status: "OPEN",
    name: "Deer poaching Shawinigan Lake",
    date: "2022-11-01",
    owner: "Chris Robinson",
    caseDescription:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    tasks: ["Send for approval 1", "Send for approval 2"],
    docketNum: "1234",
    courtRef: "2022-11-01",
  });
  const optionsForAction = ["Start Workflow", "Wake", "Complete", "Merge"];
  const onActionChangehandler = (e: any) => {
    console.log("Chnaged");
  };
  useEffect(() => {

    const clone = structuredClone(caseDetail);
    const value = Object.assign(clone, selectedCase);
    setcaseDetail(value)
    console.log(selectedCase)
    console.log(caseDetail)

  }, [selectedCase]);
  return (
    <div className="details-container">
      <h1 className="title">CaseFlow</h1>
      <div className="search">
        <Search
          setSearchField={() => {}}
          dropDownArray={[]}
          setSearchColumn={() => {}}
        ></Search>
      </div>

      <section className="case-detail-container">
        <span className="case-detail-header">
          <div className="case-id-status">
            <p className="case-id">Case ID :{caseDetail.id}</p>
            <p className="case-status">{caseDetail.status}</p>
          </div>
          <FilterMuiComponent
            label="Action"
            options={optionsForAction}
            onChnagehandler={onActionChangehandler}
          />
        </span>
        <CaseDetailData
          name={caseDetail.name}
          date={caseDetail.date}
          owner={caseDetail.status}
          caseDescription={caseDetail.caseDescription}
          tasks={caseDetail.tasks}
        />
        <CaseDetailReference
          docketNum={caseDetail.docketNum}
          courtRef={caseDetail.courtRef}
        />
      </section>
      <section className="case-history-container">
        <CaseHistory></CaseHistory>
      </section>
    </div>
  );
};

export default CaseDetails;
