import React,{useEffect,useState} from "react";
import FilterMuiComponent from "../FilterMuiComponent/FilterMuiComponent";
import CaseDetailData from "./CaseDetailData/CaseDetailData";
import CaseDetailReference from "./CaseDetailReference/CaseDetailReference";
import "./CaseDetails.scss";
import Search from "../Search";
import CaseHistory from "../CaseHistory/caseHistory";
import { getCaseDetails, updateCases } from "../../services/CaseService";
import { useLocation } from 'react-router-dom'
import RelatedCaseDocuments from "../RelatedCaseDocuments";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomizedDialog from '../Dialog'
import Upload from '../Upload'
import EditIcon from '@mui/icons-material/Edit';
import { setCaseTasks, setSelectedCase } from "../../reducers/newCaseReducer";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCaseHistory, setFilteredCaseHistory } from '../../reducers/caseHistoryReducer';
import { getCaseHistory } from '../../services/CaseService';
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { store } from "../../interfaces/stateInterface";
import { getDocumentofCaseList } from "../../services/CaseService";
import { setSelectedCaseDocuments,setTotalDocCount } from "../../reducers/newCaseReducer";
import { findAllByAltText } from "@testing-library/react";
import { fetchCaseStatuses } from "../../services/constantsService";
import { setCaseStatuses } from "../../reducers/constantsReducer";
import { State } from "../../interfaces/stateInterface";
import PopUpDialogBox from "../PopUpDialogBox/PopUpDialogBox";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { getTaksByCaseId, getWorkflowList, startNewWorkflow } from "../../services/workflowService";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";






const CaseDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statuses =   useSelector((state:State) => state.constants.caseTypes);
  const tasks =   useSelector((state:State) => state.cases.selectedCase.tasks);
  const selectedCase =   useSelector((state:State) => state.cases.selectedCase);
  const caseDetail = {
    status: "OPEN",
    date: "2022-11-01",
    owner: "Chris Robinson",
    tasks: ["Send for approval 1", "Send for approval 2"],
    docketNum: "1234",
    courtRef: "2022-11-01",
  }
  const optionsForAction = [{id : 0, code :'1' ,text: "Select Action"},
  {id : 1, code :'1' ,text: "Start Workflow"},
  {id : 2, code :2 ,text: "Wake"},
  {id : 3, code :3 ,text: "Pending"},
  {id : 4, code :4 ,text: "Complete"},
  {id : 5, code :5 ,text: "Merge"},
  {id : 6, code :6 ,text: "Archive"},
  {id : 7, code :7 ,text: "Upload Document"},
  {id : 8, code :8 ,text: "Delete"},
];
  async function fetchCaseDetails() {
    var matches = location.pathname.match(/(\d+)/);
    if(matches && matches[0]){
      let output = await getCaseDetails(matches[0]);
      dispatch(setSelectedCase({...output,isEdit:false}));
      // setselectedCaseDetails(output)
      await fetchCaseHistory(matches[0])
    }
  }
    async function fetchCaseHistory(id) {    
    const caseHistoryData = await getCaseHistory(id);
    console.log(caseHistoryData,"caseHistoryData")
    const output = caseHistoryData.casehistory.map((element,index) => {
      return {  
        id :index,
        date:moment(element.datetime).format('MMMM Do YYYY, h:mm:ss a'),
        caseHistoryType:element.event.eventtype.text,
      };
    });

    dispatch(setCaseHistory(output))
    dispatch(setFilteredCaseHistory(output))
  } 
  
// const [selectedCase, setselectedCaseDetails]:any = useState({});
const [isOpenPopup,setOpenPopup] = useState(false);
const [isOpenConfirmationPopup,setOpenConfirmationPopup] = useState(false);
const [confirmationText,setConfirmationText] = useState("");
const [newStatus,setNewStatus] = useState(0);
const [selected, setSelected] = useState(0);
const docDetail = useSelector((state:store)=>state.cases.selectedCase.documents);
const [isOpenWorkflowPopup,setOpenWorkflowPopup] = useState(false);
const [selectedWorkflow, setselectedWorkflow]:any = useState("");
const [workflows, setworkflows]:any = useState([]);

  const handleClose = (
    event,
    reason
  ) => {
   setOpenPopup(false);
   setSelected(0)
  };

  const onChnagehandler =(event) =>{
    setselectedWorkflow(event.target.value)
  }
  const handleWorkflowPopUpClose = (
    event,
    reason
  ) => {
    setOpenWorkflowPopup(false);
   setSelected(0)
  };
  const onSuccess = async ()=>{
    setOpenPopup(false);
    setSelected(0)
    // fetchCaseDocumentDetails()
    toast.success("Success")
    await fetchRelatedDocuments()
    await fetchCaseHistory(selectedCase.id)
  }

  const fetchRelatedDocuments = async ()=>{
    let output = await getDocumentofCaseList(selectedCase.id,1);
    dispatch(setSelectedCaseDocuments(output.CaseDocuments))  
    dispatch(setTotalDocCount(output.totalCount))    
  }
  const onActionChangehandler = async (e: any) => {

    setSelected(e.target.value)
    switch(e.target.value){
      case 1:{
        return getWorkflows() // Wake
      }
      case 2:{
        return changeStatus(1) // Wake
      }
      case 3:{
        return changeStatus(2) // Pending
      }
      case 4:{
        return changeStatus(3) // Complete
      }
      case 7 : {
       return setOpenPopup(true);
      }
    }
  };

  const getWorkflows = async () =>{
    const workflowsList = await getWorkflowList(1);
    console.log(workflowsList);
    setworkflows(workflowsList);
    setOpenWorkflowPopup(true);
  }

  const changeStatus = async (status) =>{
    setConfirmationText("Do you want to change the status of the case?")
    setOpenConfirmationPopup(true);
    setNewStatus(status);
    
   
  }
  const editCaseDetails=(selectedCase)=> {

    dispatch(setSelectedCase({...selectedCase,isEdit:true}));
    localStorage.setItem('setSelectedCase',JSON.stringify({...selectedCase,isEdit:true}))    
    navigate("/private/cases/create");

    }

  useEffect(() => {
    fetchCaseDetails();
    fetchAllCaseStatuses();
    
  }, []);

  useEffect(() => {
    if(selectedCase && selectedCase.id)
    fetchRealtedTasks();
    
  }, [selectedCase.id]);

  const fetchAllCaseStatuses = async () => {
    const statusList =  await fetchCaseStatuses();
    dispatch(setCaseStatuses(statusList))
  }

  const onCloseConfirmationPopup =() =>{
    setOpenConfirmationPopup(false);
    setSelected(0)
  }
  const onConfirmation = async () =>{
  
    let newStatusDetails = statuses.find(stat=> stat.code == newStatus);
    if(newStatusDetails && newStatusDetails.id){
    selectedCase.statusid = parseInt(newStatusDetails.id.toString()) ;
    let responseDetails = await updateCases(selectedCase);
    if(responseDetails && responseDetails["success"]){
      setSelected(0)
      setOpenConfirmationPopup(false);
      fetchCaseDetails();
      toast.success("Successfully updated the status")
    }
    else{
      toast.error("Error updating the status")
    }
  }
   
   
  }

  const startWorkflow = async () =>{

    if(selectedWorkflow){
    const wordFlowDetails = {
      variables: {
        caseId: {
          value: selectedCase.id,
        },
        submissionDate: {
          value: new Date(),
        },
        submitterName: {
          value: "caseflow-reviewer",
        },
      },
      caseInstanceId: selectedCase.id,
    };

    
  const workflow = await startNewWorkflow(selectedWorkflow, wordFlowDetails)
}else{
  toast.error("Please select a workflow");
}

  }
const fetchRealtedTasks = async() =>{
  const taskList = await getTaksByCaseId(selectedCase.id)
  dispatch(setCaseTasks(taskList))
}
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
      <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/private">
    Home
  </Link>
  <Link
    underline="hover"
    color="inherit"
    href="/private/cases"
  >
    Cases
  </Link>
  <Typography>Case ID :{selectedCase.id}</Typography>
</Breadcrumbs>
        <span className="case-detail-header">
          <div className="case-id-status">
            <p className="case-id">Case ID :{selectedCase.id}</p>
            <p className="case-status">{selectedCase?.casestatus?.displayname}</p>
          <div className="case-edit" onClick={()=>{editCaseDetails(selectedCase)}}>  
          <span className="action-icon"> {<EditIcon />}</span>
              </div>
           
          </div>
          <FilterMuiComponent
            label="Action"
            options={optionsForAction}
            onChnagehandler={onActionChangehandler}
            selected ={selected}
          />
        </span>

        <CaseDetailData
          name={selectedCase.name}
          date={caseDetail.date}
          owner={caseDetail.owner}
          caseDescription={selectedCase.desc}
          tasks={tasks}
          caseType={selectedCase.casestype}
          lobcaseid={selectedCase.lobcaseid}
        />
        {(selectedCase && selectedCase.id) ? <CaseDetailReference
          caseId={selectedCase.id}
        
        />: ""}
         <Accordion className="case-documents">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="case-documents-head-section"
          sx={{marginBottom:0}}
        >
         <h2 className="caseDocuments-headtag">Case Documents</h2>
        </AccordionSummary>
        <AccordionDetails sx={{paddingLeft:0}}>
        <RelatedCaseDocuments id = {selectedCase.id} docDetail={docDetail}></RelatedCaseDocuments>
        </AccordionDetails>
      </Accordion>
      
      </section>
      <section className="case-history-container">
        <CaseHistory  caseId = {selectedCase.id}></CaseHistory>
      </section>
    </div>
    <CustomizedDialog title="Upload File" isOpen={isOpenPopup} setIsOpen={setOpenPopup} handleClose={handleClose}><Upload onSuccess={onSuccess} /></CustomizedDialog>
    <CustomizedDialog title="Select Workflow" isOpen={isOpenWorkflowPopup} setIsOpen={setOpenWorkflowPopup} handleClose={handleWorkflowPopUpClose}>
      <div className="workflow">
    <FormControl sx={{ m: 1, minWidth: 90, }} size="small">
                <InputLabel id="demo-simple-select-label">Workflow</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"          
                  label="Age" 
                  value={selectedWorkflow}   
                  onChange={onChnagehandler}   
                  className="dropDownStyle"   
                >
                   {workflows.map((option,index) => <MenuItem key={index}  value={option.key}>{option.name}</MenuItem>)}                  
                </Select>
            </FormControl>
            <FormControl>
            <Button
                variant="outlined"
                onClick={startWorkflow}
              >
               Start Workflow
              </Button>
            </FormControl>
            </div>
    </CustomizedDialog>
    <ToastContainer />
    <PopUpDialogBox 
      isOpen ={isOpenConfirmationPopup}
      onClose={onCloseConfirmationPopup}
      dialogContentText ={confirmationText}       
      onConfirm={onConfirmation} 
      btn1={"Cancel"}      
      btn2={"Confirm"}   
      type="confirm"    
      
      />
    </>
  );
};

export default CaseDetails;
