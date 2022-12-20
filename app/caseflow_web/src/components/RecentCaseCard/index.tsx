
import { React,useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import "./recentCaseCard.scss"
import { RecentCase } from "../../interfaces/componentInterface";
import { Link, } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { updateCases } from "../../services/CaseService";
import { useDispatch } from "react-redux";
import { setSelectedCase } from "../../reducers/newCaseReducer";
import { useNavigate } from "react-router-dom";


const RecentCaseCard = ({ caseID,caseName, caseDescription, status } : RecentCase) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const caseDate = date.toJSON().slice(0,10).replace(/-/g,'/')
  // const  fetchDocumentDetails=(caseid,casedesc)=>{
  //   setDocumentDetailsForEdit({
  //     caseid:caseid,
  //     casedesc:casedesc
  //   })
  //     }


       // to fetch the case list and set the state of cases 
  // useEffect(() => {
  //   fetchDocumentDetails();
  // }, []);
  
 const fetchDocumentDetails=(caseid,casename,casedesc)=> {
    const output =  {
      caseid :caseid,
      casename:casename,
      casedesc:casedesc,

      };
      dispatch(setSelectedCase(output));
      navigate("/private/cases/create");
    }
   
   
  return (
    <div>
     

      <Typography />
      <ListItem button>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <ListItemText
              primary={
                <Typography 
                variant="body2"
                style={{ "fontWeight": "700" }}>
                  Case ID
                </Typography>
              }
              secondary={caseID}
            />
          </Grid>
          <Grid item xs={4}>
            <ListItemText
              primary={
                <Typography
                variant="body2"
                
                style={{ "fontWeight": "700" }}>
                  Case Description
                </Typography>
              }
              secondary={caseDescription}
            />
          </Grid>   
           
          {/*  <Link key={caseID} to={'/private/cases/' + caseID+'/details'} style={{ textDecoration: 'none' ,color:'#404040'}}>      */}
          <Grid item xs={3}>
            <div className="recent-case-card-status">
              <div className="recent-case-card-status-text">
                {status}
              </div>
            </div>  
            {/* </Link> */}
          </Grid>
        
          <Grid item xs={2}>
          <div onClick={()=>{fetchDocumentDetails({caseID},{caseName},{caseDescription})}}>  
              <span className="action-icon"> {<EditIcon />}</span>
              </div>
           
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
     

    </div>
  );
};

export default RecentCaseCard;


