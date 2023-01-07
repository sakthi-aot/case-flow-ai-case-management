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
import { MenuItem, Select } from "@mui/material";


// function createData(
//   name: string,
//   size: number,
//   creationDate: Date,
//   lastUpdated: Date,
//   version: number,
// ) {
//   return { name, size, creationDate, lastUpdated, version };
// }


export default function RelatedCaseDocuments({id}) {
  
const [docDetail, setdocDetail] = useState([]);

  async function fetchCaseDocumentDetails() {
    if(id){
      let output = await getDocumentofCaseList(id);
      (setdocDetail(output))
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
  const deleteDocuments = async (id)=>{
  
      let document = await deleteDocument(id)
      fetchCaseDocumentDetails()

  
  }

  

  useEffect(() => {
    fetchCaseDocumentDetails();
  }, [id]);



  const onChnagehandler =(row,action) =>{
    switch(action){

      case 1 :{ downloadDocument(row.id,row.name,row.type); break;}
      case 2 :{ deleteDocuments(row.id); break;}
    }

  }
  return ( 
   
    <TableContainer component={Paper} sx={{ boxShadow : 0,}}>
    {docDetail.length!==0 ?  <Table sx={{ minWidth: 650 ,border : 0,}} aria-label="simple table" className="case-document-table" >
        <TableHead >
          <TableRow>
            <TableCell  sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,border:0}} >Name</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,border:0}} >Size</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,border:0}} >Creation Date</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,border:0}} >Last Updated</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,border:0}} >version ##</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,border:0}} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docDetail.map((row:any) => (
            <TableRow
              key={row.name}
              sx={{  border: 0 }}
            >
              <TableCell   style={{borderBottom: "none"}} component="th" scope="row">{row.name}</TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.size ? row.size : "1kb"}</TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.creationdate}</TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.creationdate}</TableCell>
              <TableCell  style={{borderBottom: "none"}} align="right">{row.latestversion}</TableCell>
              <TableCell  style={{borderBottom: "none"}} align="right">
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
    </TableContainer>    
  );
}