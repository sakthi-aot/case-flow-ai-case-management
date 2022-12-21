import React, { useState } from "react";
import FilterMuiComponent from "../FilterMuiComponent/FilterMuiComponent";
import CaseDetailData from "./CaseDetailData/CaseDetailData";
import CaseDetailReference from "./CaseDetailReference/CaseDetailReference";
import "./CaseDetails.scss";
import Search from "../Search";
import CaseHistory from "../CaseHistory/caseHistory";
import RelatedCaseDocuments from "../RelatedCaseDocuments";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomizedDialog from '../Dialog'
import Upload from '../Upload'
const CaseDetails = () => {
  const [isOpenPopup,setOpenPopup] = useState(false);
  const [selected, setSelected] = useState(0);
  const handleClose = (
    event,
    reason
  ) => {
   setOpenPopup(false);
   setSelected(0)
  };
  const caseDetail = {
    id: "26111245",
    status: "OPEN",
    name: "Deer poaching Shawinigan Lake",
    date: "2022-11-01",
    owner: "Chris Robinson",
    caseDescription:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    tasks: ["Send for approval 1", "Send for approval 2"],
    docketNum: "1234",
    courtRef: "2022-11-01",
  };
  const optionsForAction = [{id : 0, code :'1' ,text: "Select Action"},
  {id : 1, code :'1' ,text: "Start Workflow"},
  {id : 2, code :2 ,text: "Wake"},
  {id : 3, code :3 ,text: "Complete"},
  {id : 4, code :4 ,text: "Merge"},
  {id : 5, code :5 ,text: "Archive"},
  {id : 6, code :6 ,text: "Upload Document"},
  {id : 7, code :7 ,text: "Delete"},
];
  const onActionChangehandler = (e: any) => {
    console.log("Chnaged",e);
    setSelected(e.target.value)
    switch(e.target.value){

      case 6 : {
        setOpenPopup(true);
      }
    }
  };
  return (
    <>
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
            selected ={selected}
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
         <Accordion className="case-documents">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
         <h2>Case Documents</h2>
        </AccordionSummary>
        <AccordionDetails>
        <RelatedCaseDocuments></RelatedCaseDocuments>
        </AccordionDetails>
      </Accordion>
      
      </section>
      <section className="case-history-container">
        <CaseHistory></CaseHistory>
      </section>
    </div>
    <CustomizedDialog title="Upload File" isOpen={isOpenPopup} setIsOpen={setOpenPopup} handleClose={handleClose}><Upload/></CustomizedDialog>
    </>
  );
};

export default CaseDetails;
