import React, {useEffect,useState} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import "./recentCaseCard.scss"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { setSelectedCase } from "../../reducers/newCaseReducer";

const RecentCaseCard = (props) => {
  const [CaseDetails, setcaseDetails] = useState(props.case);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const viewCaseDetails = async (CaseDetails)=>{    
    dispatch(setSelectedCase({
      id:CaseDetails.id,
      name:CaseDetails.name,
      description:CaseDetails.description,
      status:CaseDetails.status,
      isEdit:false
    }))
    navigate("/private/cases/"  + CaseDetails.id+'/details');
  }

    useEffect(() => {
      setcaseDetails(props.case)
    }, []);

 
  return (
    <div className="caselist" >
      <Typography />
      <ListItem button>
        <Grid container spacing={1}  >

          <Grid item xs={4} onClick={()=>{viewCaseDetails(CaseDetails)}}>
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
          <Grid item xs={6}  onClick={()=>{viewCaseDetails(CaseDetails)}}>
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


          <Grid  item xs={2}  onClick={()=>{viewCaseDetails(CaseDetails)}}>
          <Box display="flex" justifyContent="flex-end">
          <div className="recent-case-card-status">
              <div className="recent-case-card-status-text">
                {CaseDetails.status}
              </div>
            </div>
            </Box>

          </Grid>

        </Grid>

      </ListItem>
      <Divider />

    </div>
  );
};

export default RecentCaseCard;