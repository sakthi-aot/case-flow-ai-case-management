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
        <Grid container spacing={1}  onClick={()=>{viewCaseDetails(CaseDetails)}}>
          <Grid item xs={3} >
            <ListItemText
              primary={
                <Typography 
                variant="body2"
                style={{ "fontWeight": "700" }}>
                   ID
                </Typography>
              }
              secondary={CaseDetails.id}
            />
          </Grid>
          <Grid item xs={3} >
            <ListItemText
              primary={
                <Typography 
                variant="body2"
                style={{ "fontWeight": "700" }}>
                   Name
                </Typography>
              }
              secondary={CaseDetails.name}
            />
          </Grid>
          <Grid item xs={4} >
            <ListItemText
              primary={
                <Typography
                variant="body2"
                
                style={{ "fontWeight": "700" }}>
                   Description
                </Typography>
              }
              secondary={CaseDetails.desc}
            />
          </Grid>          


          <Grid  item xs={2}  >
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