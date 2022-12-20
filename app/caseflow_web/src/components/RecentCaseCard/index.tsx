import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./recentCaseCard.scss"
import { RecentCase } from "../../interfaces/componentInterface";
import { editCaseDetails } from "../../services/CaseService";
import EditIcon from '@mui/icons-material/Edit';
import Paper from "@mui/material/Paper";
import { Case } from "../../dto/cases";

const RecentCaseCard = () => {
const [caseDetails, setCaseDetails] = useState([]);
  // const caseDate = date.toJSON().slice(0,10).replace(/-/g,'/')
 
  return (
    <div>


<Divider sx={{ borderBottomWidth: 3 }} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Edit </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {caseDetails &&
              caseDetails.map((caseDetail:Case) => (
                <TableRow
                  key={caseDetail.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {caseDetail.id}
                  </TableCell>
            
                  <TableCell align="left">
                    {caseDetail.description}
                  </TableCell>
                  <TableCell align="left">
                    {caseDetail.description}
                  </TableCell>
                
                 
                  <TableCell
                    align="left"
                    onClick={()=>{}}
                  >
                    <span className="action-icon"> {<EditIcon />}</span>
                  </TableCell>

                
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>



    
      <Divider />
    </div>
  
  );
              }

export default RecentCaseCard;
