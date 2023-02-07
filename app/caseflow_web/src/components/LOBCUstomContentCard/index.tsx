import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Box, Card, createTheme, ThemeProvider, Typography } from "@mui/material";
import { setSelectedLob } from "../../reducers/lobReducer";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";




import "./LOBCUstomContentCard.scss"
import moment from "moment";

interface LOBCUstomContentCardProps{
  caseCategory:any, district:any, link:any
}

const theme = createTheme({
  typography:{
    fontFamily: "Poppins, sans-serif",
    
  }
})

const LOBCUstomContentCard = (
  {lobData }
  ) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewCaseDetails = async ()=>{    
    dispatch(setSelectedLob(lobData))
    navigate("/private/lob/"+ lobData.id+'/details');
  }
  
const FormattedCreatedDate = moment(lobData.createdDate).format('MMMM Do YYYY');
 
  return (
    <div onClick={()=>{viewCaseDetails()}}>
    <ThemeProvider theme={theme} >
      <Typography />
      <ListItem button>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <ListItemText
              primary={
                <Typography 
                variant="body2"
                className="lob-card-style"
                style={{ "fontWeight": "700" }}>
                  Policy Number
                </Typography>
              }
              secondary={lobData.policyNumber}
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              primary={
                <Typography
                variant="body2"
                className="lob-card-style"
                style={{ "fontWeight": "700" }}>
                  Created date
                </Typography>
              }
              secondary={lobData.createdDate}
            />
          </Grid>          
          <Grid item xs={4}>
            <ListItemText
              primary={
                <Typography
                variant="body2"
                className="lob-card-style"
                style={{ "fontWeight": "700" }}>
                  Sum Assured
                </Typography>
              }
              secondary={lobData.sumAssured}
            />
          </Grid>          
       
          <Grid  item xs={1} display="flex" alignItems='center' justifyContent="flex-end"  >
          <Box >
          <div className="recent-case-card-status">
              <div className="recent-case-card-status-text">
                {lobData.isActive==true ?"Active":"InActive"}
              </div>
            </div>
            </Box>

          </Grid>          
         
        </Grid>
      </ListItem>
      <Divider />
    </ThemeProvider>
    </div>
  );
};

export default LOBCUstomContentCard;
