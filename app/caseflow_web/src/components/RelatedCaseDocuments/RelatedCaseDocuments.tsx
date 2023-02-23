import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDocumentofCaseList } from "../../services/CaseService";
import "./RelatedCaseDocuments.scss"
import { getDocument,deleteDocument } from "../../services/DocumentManagementService";
import { MenuItem, Select, Typography } from "@mui/material";
import { Pagination } from "@mui/material";
import { PAGINATION_TAKE } from "../../apiManager/endpoints/config";
import { setSelectedCaseDocuments,setTotalDocCount } from "../../reducers/newCaseReducer";
import {useSelector,useDispatch} from "react-redux";
import { store } from "../../interfaces/stateInterface";
import PopUpDialogBox from "../PopUpDialogBox/PopUpDialogBox";
import { setSelectedDocument } from "../../reducers/documentsReducer";
import moment from "moment";
import { getCaseHistory } from '../../services/CaseService';
import { setCaseHistory, setFilteredCaseHistory } from '../../reducers/caseHistoryReducer';






// function createData(
//   name: string,
//   size: number,
//   creationDate: Date,
//   lastUpdated: Date,
//   version: number,
// ) {
//   return { name, size, creationDate, lastUpdated, version };
// }


export default function RelatedCaseDocuments({id, docDetail}) {
  
// const [docDetail, setdocDetail] = useState([]);
const [totalPageNo,setTotalPageNo] = useState(0);
const [pageNo,setPageNo]= useState(1);
const [isDeleteConfirmationUpOpen,setDeleteConfirmation] =useState(false);

const dispatch = useDispatch()
const SelectedDocId = useSelector((state:store) =>state.documents.seletedDocument)
const totalDocCount = useSelector((state:store)=>state.cases.selectedCase.totalDocCount);


useEffect(() => {
  fetchCaseDetails();
}, [id,pageNo]);

useEffect(() => {
  setPageNo(1)
  if(docDetail && docDetail.length){
    
    const TotalPage = Math.ceil(totalDocCount/Number(PAGINATION_TAKE)) 
    setTotalPageNo(TotalPage);  
  }
}, [totalDocCount]);


  async function fetchCaseDetails() {
    if(id){      
      let output = await getDocumentofCaseList(id,pageNo);
      dispatch(setTotalDocCount(output.totalCount))    
      const TotalPage = Math.ceil(totalDocCount/Number(PAGINATION_TAKE)) 
      setTotalPageNo(TotalPage);  
      dispatch(setSelectedCaseDocuments(output.CaseDocuments))      
      
    }
  }
  const options = [{id :0,text : '...'},
  {id :1,text : 'Download'},
  {id :2,text : 'Delete'}
    ];
      let selected = 0;
      const downloadDocument = async (id,name,type)=>{
  
      let response = await getDocument(id)
      const downloadUrl = window.URL.createObjectURL(
        new Blob([response["data"]],)
      );

      const link = document.createElement("a");
  
        link.href = downloadUrl;
        const file_name : string = name;
        link.setAttribute("download", file_name)//any other extension

        document.body.appendChild(link);

        link.click();

        link.remove();
      
  }
  const deleteDocuments = async (selectedDocId)=>{  
      setDeleteConfirmation(true)   
      dispatch(setSelectedDocument(selectedDocId));
  }

  const previewDocument = async (id,type) => {
      let response = await getDocument(id)
      let newWindow = window.open('/')!
          newWindow.onload = () => {
            newWindow.location = window.URL.createObjectURL(
              new Blob([response["data"]], {type: type})
            );
          }

  }

  const fetchCaseHistory = async  (id) =>{    
    const caseHistoryData = await getCaseHistory(id);
    const output = caseHistoryData.casehistory.map((element,index) => {
      return {  
        id :index,
        date:moment(element.datetime).format('YYYY-MM-DD H:MM'),
        caseHistoryType:element.event.eventtype.text,
      };
    });
    dispatch(setCaseHistory(output))
    dispatch(setFilteredCaseHistory(output))
  } 

  

  // useEffect(() => {
  //   fetchCaseDocumentDetails();
  // }, [id]);



  const onChnagehandler =(row,action) =>{
    switch(action){

      case 1 :{ downloadDocument(row.id,row.name,row.type); break;}
      case 2 :{ deleteDocuments(row.id); break;}
    }

  }

  const onChangePageNumber = (e,p) =>{
    setPageNo(p) 
  }

  const onCloseDeletePopup= (id) =>{
    setDeleteConfirmation(false)   
  }

  const onConfirmDeleteDoc = async ( ) =>{
    let document = await deleteDocument(SelectedDocId)
    fetchCaseDetails()
    setDeleteConfirmation(false) 
    await fetchCaseHistory(id);

    
  }
 const  getLatestVersion=(version)=> { 
   return (version)?version[0]?.versions:1;
  }
  return (  
    <>
    <TableContainer component={Paper} sx={{ boxShadow : 0,}} >
    {docDetail && docDetail.length!==0 ?  <Table sx={{ minWidth: 650 ,border : 0,}} aria-label="simple table" className="case-document-table" >
        <TableHead >
          <TableRow>
            <TableCell align="left" sx={{ color: '#404040',fontSize: 16,fontWeight:600,borderBottom:2,borderBottomColor:'#606060',paddingLeft:0}} >Name</TableCell>
            <TableCell align="left" sx={{ color: '#404040',fontSize: 16,fontWeight:600,borderBottom:2,borderBottomColor:'#606060',paddingLeft:0}} >Size</TableCell>
            <TableCell align="left" sx={{ color: '#404040',fontSize: 16,fontWeight:600,borderBottom:2,borderBottomColor:'#606060',paddingLeft:0}} >Date Created</TableCell>
            <TableCell align="left" sx={{ color: '#404040',fontSize: 16,fontWeight:600,borderBottom:2,borderBottomColor:'#606060',paddingLeft:0}} >Last Updated</TableCell>
            <TableCell align="left" sx={{ color: '#404040',fontSize: 16,fontWeight:600,borderBottom:2,borderBottomColor:'#606060',paddingLeft:0}} >version #</TableCell>
            <TableCell align="left" sx={{ color: '#404040',fontSize: 16,fontWeight:600,borderBottom:2,borderBottomColor:'#606060',paddingLeft:0}} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docDetail.map((row:any,index) => (
            <TableRow
            key={row.id}
            >
              <TableCell   
              sx={{  border: 0,borderBottom:1,borderBottomColor:'#E2E2E2',paddingLeft:0 }}
              onClick={()=>{
                previewDocument(row.id,row.type)
              }
              } component="th" scope="row">{row.name}</TableCell>
              <TableCell sx={{borderBottom:1,borderBottomColor:'#E2E2E2',paddingLeft:0}} align="left">{row.size ? row.size : "1kb"}</TableCell>
              <TableCell sx={{borderBottom:1,borderBottomColor:'#E2E2E2',paddingLeft:0}} align="left">{moment(row.creationdate).format('MMMM Do YYYY , h:mm:ss a')}</TableCell>
              <TableCell sx={{borderBottom:1,borderBottomColor:'#E2E2E2',paddingLeft:0}} align="left">{moment(row.creationdate).format('MMMM Do YYYY , h:mm:ss a')}</TableCell>
              <TableCell sx={{borderBottom:1,borderBottomColor:'#E2E2E2',paddingLeft:0}} align="left">{ getLatestVersion(row.versions)}</TableCell>
              <TableCell sx={{borderBottom:1,borderBottomColor:'#E2E2E2',paddingLeft:0}} align="left">
                {/* <select className="caseDocumentAction-center" onChange={(e)=>{downloadDocument(row.id,e.target.value)}}>                
                <option selected  >...</option>
                <option >Delete</option>
                <option >Update</option>
                <option >Merge</option>
                <option value = "download" >download</option> */}
                <Select
                  id="document-actions"  
                  className="document-actions"        
                  label="Age"  
                  value={selected}   
                  onChange={(e)=>{onChnagehandler(row,e.target.value)}  }    
                >
                   {options.map((option,index) => <MenuItem key={index}  value={option.id}>{option.text}</MenuItem>)}                  
                </Select>

                {/* </select> */}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> :
      <p className="no-case-doc-found">No Case Documents Found !</p>
      }
      {totalPageNo>1 &&  <Pagination count={totalPageNo} shape="rounded" className="pagination-case-list" onChange={onChangePageNumber}  />}
    </TableContainer>    
      <PopUpDialogBox 
      isOpen ={isDeleteConfirmationUpOpen}
      onClose={onCloseDeletePopup}
      dialogContentText ={" Do you want to delete Document?"}       
      onConfirm={onConfirmDeleteDoc} 
      btn1={"Cancel"}      
      btn2={"Delete"}   
      type="delete"    
      
      />
    </>  

  );
}


