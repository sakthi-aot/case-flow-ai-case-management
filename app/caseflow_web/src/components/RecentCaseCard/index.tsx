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
import "../../styles.scss";

const RecentCaseCard = (props) => {
  console.log(props.case)
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
          <Grid item xs={2} >
            <ListItemText
              primary={
                <Typography 
                variant="body2"                
                className="recent-case-card-style"
                style={{ "fontWeight": "700","fontSize":'1rem' }}
                >
                   ID
                </Typography>
              }
              secondary={ <Typography              
                color='#606060'
                noWrap
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',                  
                  
                }}>{CaseDetails.id} </Typography>}
            />
          </Grid>
          <Grid item xs={2} >
            <ListItemText
              className="caseName-case-list"
              primary={
                <Typography 
                variant="body2"
                style={{ "fontWeight": "700" }}>
                   Name
                </Typography>
              }
              secondary={
              <Typography                 
                color='#606060'
                noWrap
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',                  
                  
                }}>{ CaseDetails.name} </Typography>}
            />
          </Grid>
          <Grid item xs={2} >
            <ListItemText             
              primary={
                <Typography
                variant="body2"
                
                style={{ "fontWeight": "700" }}>
                   Type
                </Typography>
              }
              secondary={<Typography noWrap
                color='#606060'
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  
                }}>{ CaseDetails?.casestype?.displayname} </Typography>
               }
            />
          </Grid>   

                    <Grid item xs={3} >
            <ListItemText             
              primary={
                <Typography
                variant="body2"
                
                style={{ "fontWeight": "700" }}>
                   Description
                </Typography>
              }
              secondary={<Typography noWrap
                color='#606060'
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  
                }}>{ CaseDetails.desc} </Typography>
               }
            />
          </Grid>       


          <Grid  item xs={2} display="flex" alignItems='center' justifyContent="flex-end"  >
          <Box >
          <div className="recent-case-card-status">
              <div className="recent-case-card-status-text">
                {CaseDetails?.casestatus?.displayname}
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