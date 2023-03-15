import React,{useEffect,useState} from "react";
import FilterMuiComponent from "../FilterMuiComponent/FilterMuiComponent";
import CaseDetailData from "./CaseDetailData/CaseDetailData";
import CaseDetailReference from "./CaseDetailReference/CaseDetailReference";
import "./CaseDetails.scss";
import Search from "../Search/Search";
import CaseHistory from "../CaseHistory/caseHistory";
import { getCaseDetails, updateCases } from "../../services/CaseService";
import { useLocation } from 'react-router-dom'
import RelatedCaseDocuments from "../RelatedCaseDocuments/RelatedCaseDocuments";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomizedDialog from '../Dialog/Dialog'
import Upload from '../Upload/Upload'
import EditIcon from '@mui/icons-material/Edit';
import { resetSelectedCase, setCaseTasks, setSelectedCase } from "../../reducers/newCaseReducer";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCaseHistory, setFilteredCaseHistory } from '../../reducers/caseHistoryReducer';
import { getCaseHistory } from '../../services/CaseService';
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { store } from "../../interfaces/stateInterface";
import { getDocumentofCaseList } from "../../services/CaseService";
import { setSelectedCaseDocuments,setTotalDocCount } from "../../reducers/newCaseReducer";
import { fetchCaseStatuses } from "../../services/constantsService";
import { setCaseStatuses } from "../../reducers/constantsReducer";
import { State } from "../../interfaces/stateInterface";
import PopUpDialogBox from "../PopUpDialogBox/PopUpDialogBox";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { addWorkflowCaseHistory, getTaksByCaseId, getTaksByProcessInstanceId, getWorkflowList, startNewWorkflow, updateTaksById } from "../../services/workflowService";
import { Button, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import LobCustom from "./LobCustom/LobCustom";
import { createDraft, getFormDetails, getFormsList, submitNewForm,submitNewFormDraft } from "../../services/formsService";
import {Form as FormIOForm,saveSubmission,Formio } from 'react-formio'
import { FORMSFLOW_APPLICATION_URL } from "../../apiManager/endpoints";
import { publishMessage } from '../../services/NatsServices';

Formio.setProjectUrl("https://app2.aot-technologies.com/formio");
Formio.setBaseUrl("https://app2.aot-technologies.com/formio");




const CaseDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const statuses =   useSelector((state:State) => state.constants.caseTypes);
  const tasks =   useSelector((state:State) => state.cases.selectedCase.tasks);
  const selectedCase =   useSelector((state:State) => state.cases.selectedCase);
  const [dataForBreadCrumbs,setDataForBreadCrumbs]= useState([{text:"Home",link:"/private"}]);

  const caseDetail = {
    status: "OPEN",
    date: "2022-11-01",
    owner: "Chris Robinson",
    tasks: ["Send for approval 1", "Send for approval 2"],
    docketNum: "1234",
    courtRef: "2022-11-01",
  }
  const optionsForAction = [
  {id : 9, code :9 ,text: "Edit"},
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
    const output = caseHistoryData.casehistory.map((element,index) => {
      return {  
        id :index,
        date:moment(element.datetime).format("yyyy-MM-DD HH:mm"),
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
const [isOpenFormIOPopup,setOpenFormIOPopup] = useState(false);
const [selectedForm, setselectedForm]:any = useState("");
const [formsList, setFormsList]:any = useState([]);
const [selectedFormDetails, setSelectedFormDetails]:any = useState();

  const handleClose = (
    event,
    reason
  ) => {
   setOpenPopup(false);
   setSelected(0)
  };

  const onChnagehandler =(event) =>{
    setselectedForm(event.target.value)
  }
  const handleWorkflowPopUpClose = (
    event,
    reason
  ) => {
    setOpenWorkflowPopup(false);
   setSelected(0)
  };
  const handleFormIOPopUpClose = (
    event,
    reason
  ) => {
    setOpenFormIOPopup(false);
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
      case optionsForAction[1].text:{
        return getForms() // Wake
      }
      case optionsForAction[2].text:{
        return changeStatus(1) // Wake
      }
      case optionsForAction[3].text:{
        return changeStatus(2) // Pending
      }
      case optionsForAction[4].text:{
        return changeStatus(3) // Complete
      }
      case optionsForAction[7].text : {
       return setOpenPopup(true);
      }
      case optionsForAction[0].text : {
       return editCaseDetails(selectedCase);
      }
    }
  };

  const getForms = async () =>{
    const formsList = await getFormsList(1);
    setFormsList(formsList);
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
    navigate("/private/cases/"+selectedCase.id+"/edit");

    }

  useEffect(() => {
    fetchCaseDetails();
    fetchAllCaseStatuses();
    
  }, []);

  useEffect(() => {
    if(selectedCase && selectedCase.id)
    fetchRealtedTasks();
    
  }, [selectedCase.id]);

  useEffect(() => {
    return () => {
      dispatch(resetSelectedCase())
    }
}, [])

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
    const newStatus = parseInt(newStatusDetails.id.toString());
    const updatedSelectedCase = {...selectedCase,statusid:newStatus};
    let responseDetails = await updateCases(updatedSelectedCase);
    if(responseDetails && responseDetails["success"]){
      setSelected(0)
      setOpenConfirmationPopup(false);
      fetchCaseDetails();
      toast.success("Successfully updated the status")
    }
    else{
      toast.error("Error updating the status")
    }
    try {
      const SUBJECT = newStatusDetails.name;
      const MESSAGE = new Date()
      publishMessage(SUBJECT,MESSAGE)
    } catch (error) {
      console.log(error)
    }
  }
   
   
  }
  useEffect(() => {
    setDataForBreadCrumbs([
      {text:"Home",link:"/private"},
      {text:"Cases",link:"/private/cases"},
      {text:"Case ID : " + selectedCase.id,link:"/private/cases/"+selectedCase.id+"details"},
    ])
  }, [selectedCase]);

  const selectForm = async () =>{
    if(selectedForm){
      const formDetails  = await getFormDetails(selectedForm);
      setSelectedFormDetails(formDetails)
      setOpenFormIOPopup(true)

    }
  }

  const startWorkflow = async () =>{

    if(selectedForm){
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

    
  const workflow = await startNewWorkflow(selectedForm, wordFlowDetails);
  if(workflow.id){
    toast.success("New workflow started successfully");
    setSelected(0);
    setOpenWorkflowPopup(false);
    setOpenFormIOPopup(false);
    fetchRealtedTasks();
    await addWorkflowCaseHistory(selectedCase.id)
    await fetchCaseHistory(selectedCase.id)
  }
  else{
    toast.success("Failed to start the selected workflow");
  }
}else{
  toast.error("Please select a workflow");
}

  }
const fetchRealtedTasks = async() =>{
  const taskList = await getTaksByCaseId(selectedCase.id)
  dispatch(setCaseTasks(taskList))
}
const callBack = (err, submission) => {

}

const submitForm = (data) => {
              
  console.log(data)
 console.log(selectedFormDetails)

 //  dispatch(
 //   saveSubmission(
 //     "submission",
 //     data,
 //     selectedFormDetails._id,
 //     callBack
 //   )
 // );
  submitNewForm(selectedForm,data)
  .then(res=>{
   let submissionData = {
     "formId": res.form,
     "submissionId": res._id,
     "formUrl": FORMSFLOW_APPLICATION_URL + "/formio/form/"+res.form +"/submission/"+res._id,
     "webFormUrl": FORMSFLOW_APPLICATION_URL+ "/form/"+res.form +"/submission/"+res._id
 }
 let createDraftData = {data:{},formId:res.form}
  createDraft(createDraftData)
  .then((draftId)=>{
    if(draftId){
      return submitNewFormDraft(submissionData,draftId)
    }
  }).then(data =>{
     return getTaksByProcessInstanceId(data.processInstanceId)

  }).then(tasks =>{
    let task = tasks[0];
    task.caseInstanceId = selectedCase.id;
    return updateTaksById(task.id,task)

  }).then( async(updatedTask) =>{

    if(updatedTask["status"] == 204){
      toast.success("New workflow started successfully");
      setSelected(0);
      setOpenWorkflowPopup(false);
      setOpenFormIOPopup(false);
      fetchRealtedTasks();
      await addWorkflowCaseHistory(selectedCase.id)
      await fetchCaseHistory(selectedCase.id)
    }
    else{
      toast.success("Failed to  start the workflow. Please try again!");
    }

  })

  })
 }
  return (
    <>
    <div className="details-container">
      <div className="header-search">
      <Typography variant="body1" className="title">CaseFlow</Typography>
      <div className="search">
        <Search
          setSearchField={() => {}}
          dropDownArray={[]}
          setSearchColumn={() => {}}
        ></Search>
      </div>
      </div>


      <section className="case-detail-container">
      {/* <BreadCrumbs dataForBreadCrumbs={dataForBreadCrumbs}/> */}

        <span className="case-detail-header">
          <div className="case-id-status">
            <p className="case-id">Case ID : {selectedCase.id}</p>
            <Typography className="case-status">{selectedCase?.casestatus?.displayname}</Typography>   
          </div>
          <FilterMuiComponent
            label="Action"
            options={optionsForAction}
            onChnagehandler={onActionChangehandler}
            selected ={selected}
          />
        </span>
        <Divider sx={{border : 1,color:"#606060"}} />
        {(selectedCase && selectedCase.id) ? <>
        <CaseDetailData
          name={selectedCase.name}
          date={caseDetail.date}
          owner={caseDetail.owner}
          caseDescription={selectedCase.desc}
          tasks={tasks}
          caseType={selectedCase.casestype}
          lobCaseId={selectedCase.lobcaseid}
        />
       <CaseDetailReference
          caseId={selectedCase.id}
        
        /></>: ""}
         <Accordion className="case-documents">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="case-documents-head-section"
          sx={{marginBottom:0}}
        >
         <Typography variant = 'body1' className="caseDocuments-headtag">Case Documents</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{paddingLeft:0}}>
        <RelatedCaseDocuments id = {selectedCase.id} docDetail={docDetail}></RelatedCaseDocuments>
        </AccordionDetails>
      </Accordion>

     <LobCustom/>
      
      </section>
      <section className="case-history-container">
        <CaseHistory  caseId = {selectedCase.id}></CaseHistory>
      </section>
    </div>
    <CustomizedDialog title="Upload File" isOpen={isOpenPopup} setIsOpen={setOpenPopup} handleClose={handleClose}><Upload onSuccess={onSuccess} /></CustomizedDialog>
    <CustomizedDialog title="Select Form" isOpen={isOpenWorkflowPopup} setIsOpen={setOpenWorkflowPopup} handleClose={handleWorkflowPopUpClose} fullWidth>
      <div className="workflow">
    <FormControl sx={{ m: 1, minWidth: 90, }} size="small">
                <InputLabel id="demo-simple-select-label">Forms</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"          
                  label="Age" 
                  value={selectedForm}   
                  onChange={onChnagehandler}   
                  className="dropDownStyle"   
                >
                   {formsList?.forms?.map((option,index) => <MenuItem key={index}  value={option.formId}>{option.formName}</MenuItem>)}                  
                </Select>
            </FormControl>
            <FormControl>
            <Button
                variant="contained"
                sx={{backgroundColor:'primary.main',borderColor:'primary.main'}}
                onClick={selectForm}
                
              >
               Select Form
              </Button>
            </FormControl>
            </div>
    </CustomizedDialog>
    <CustomizedDialog title="Fill the Details" isOpen={isOpenFormIOPopup} setIsOpen={setOpenFormIOPopup} handleClose={handleFormIOPopUpClose} fullWidth>
      <div className="workflow">
        <FormIOForm form={selectedFormDetails}   submission={undefined} onSubmit={(data)=>submitForm(data)}/>

      
 
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
