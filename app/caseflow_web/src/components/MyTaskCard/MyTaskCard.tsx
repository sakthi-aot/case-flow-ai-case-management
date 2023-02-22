import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/system/Box";
import moment from "moment";

const MyTaskCard = (props ) => {
  console.log(props)
    return (     
      < >
      <Typography />
      <ListItem button>
        <Grid container spacing={1} >
          <Grid item xs={2} >
            <ListItemText
              primary={<Typography 
                variant="body2"  
                noWrap
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}><u>{props.task.name}</u></Typography>}
            />
          </Grid>
          <Grid item xs={2} >
            <ListItemText
              className="caseName-case-list"
              primary={
              <Typography 
                variant="body2"
                noWrap
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap', 
                }}>{moment( props.task.dateCreated).format("MMMM Do, YYYY")} </Typography>}
            />
          </Grid>
          <Grid item xs={4} >
            <ListItemText             
              primary={<Typography
                variant="body2"
                noWrap
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>{ props.task.description} </Typography>
               }
            />
          </Grid> 
          <Grid item xs={2} >
            <ListItemText             
              primary={<Typography
                variant="body2"
                noWrap
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>{ props.task.assignedBy} </Typography>
               }
            />
          </Grid>     

          <Grid  item xs={2} display="flex" alignItems='center' justifyContent="flex-start" >
          <Box >
          <Typography className="recent-case-card-status">
              <div className="recent-case-card-status-text">
                {props.task.status}
              </div>
          </Typography>
            </Box>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />

    </>      
    );
};

export default MyTaskCard;
