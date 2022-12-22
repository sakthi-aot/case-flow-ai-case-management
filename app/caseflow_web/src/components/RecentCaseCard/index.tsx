import React, {useEffect,useState} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import "./recentCaseCard.scss"
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { setSelectedCase } from "../../reducers/newCaseReducer";
import EditIcon from '@mui/icons-material/Edit';
import { setDocumentList } from "../../reducers/documentsReducer";
import {getDocumentofCaseList } from "../../services/CaseService";






const RecentCaseCard = (props) => {
  const [CaseDetails, setcaseDetails] = useState(props.case);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewCaseDetails = async (CaseDetails)=>{
    let documenList = await getDocumentofCaseList(CaseDetails.id);
    dispatch(setDocumentList(documenList))
    dispatch(setSelectedCase(CaseDetails));
    navigate("/private/cases/"  + CaseDetails.id+'/details');

  }
  const editCaseDetails=(CaseDetails)=> {
        dispatch(setSelectedCase(CaseDetails));
        navigate("/private/cases/create");

        }
    useEffect(() => {
      setcaseDetails(props.case)
    }, []);

 
  return (
    <div className="caselist" >
      <Typography />
      <ListItem button>
        <Grid container spacing={1}  >

          <Grid item xs={3} onClick={()=>{viewCaseDetails(CaseDetails)}}>
            <ListItemText
              primary={
                <Typography 
                variant="body2"
                style={{ "fontWeight": "700" }}>
                  Case ID
                </Typography>
              }
              secondary={CaseDetails.id}
            />
          </Grid>
          <Grid item xs={4}  onClick={()=>{viewCaseDetails(CaseDetails)}}>
            <ListItemText
              primary={
                <Typography
                variant="body2"
                
                style={{ "fontWeight": "700" }}>
                  Case Description
                </Typography>
              }
              secondary={CaseDetails.description}
            />
          </Grid>          


       
          <Grid item xs={3}  onClick={()=>{viewCaseDetails(CaseDetails)}}>
            <div className="recent-case-card-status">
              <div className="recent-case-card-status-text">
                {CaseDetails.status}
              </div>
            </div>
          </Grid>
          <Grid item xs={2} >
          <div onClick={()=>{editCaseDetails(CaseDetails)}}>  
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