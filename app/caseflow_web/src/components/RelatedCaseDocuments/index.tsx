import React, {useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from "react-redux";
import { store } from "../../interfaces/stateInterface";
import "./RelatedCaseDocuments.scss"



function createData(
  name: string,
  size: number,
  creationDate: Date,
  lastUpdated: Date,
  version: number,
) {
  return { name, size, creationDate, lastUpdated, version };
}


export default function RelatedCaseDocuments() {

  let selectedDocuments =  useSelector((state:store)=>state.documents.documentsList);

  const [docDetail, setdocDetail] = useState([]);

  useEffect(() => {

    const clone = structuredClone(selectedDocuments);
    const value = Object.assign(clone, selectedDocuments);
    // console.log(selectedDocuments)
    // console.log(value)
    // console.log(clone)
    setdocDetail(value)

  }, [selectedDocuments]);
  return (    
    <TableContainer component={Paper} sx={{ boxShadow : 0,}}>
      <Table sx={{ minWidth: 650 ,border : 0,}} aria-label="simple table" className="case-document-table" >
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
          {docDetail.map((row) => (
            <TableRow
              key={row.name}
              sx={{  border: 0 }}
            >
              <TableCell style={{borderBottom: "none"}} component="th" scope="row">{row.name}</TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.size ? row.size : "1kb"}</TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.creationdate}</TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.creationdate}</TableCell>
              <TableCell  style={{borderBottom: "none"}} align="right">{row.latestversion}</TableCell>
              <TableCell  style={{borderBottom: "none"}} align="right">
                <select className="caseDocumentAction-center" >                
                <option selected >...</option>
                <option >Delete</option>
                <option >Update</option>
                <option >Merge</option>
                </select>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>    
  );
}