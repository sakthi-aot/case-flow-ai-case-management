import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Card, Typography } from "@mui/material";
import "./LOBCUstomContentCard.scss"

const LOBCUstomContentCard = ({ caseCategory, district, link }) => {
  // const caseDate = date.toJSON().slice(0,10).replace(/-/g,'/')
 
  return (
    <div>
      <Typography />
      <ListItem button>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <ListItemText
              primary={
                <Typography 
                variant="body2"
                style={{ "fontWeight": "700" }}>
                  Case Category
                </Typography>
              }
              secondary={caseCategory}
            />
          </Grid>
          <Grid item xs={4}>
            <ListItemText
              primary={
                <Typography
                variant="body2"
                
                style={{ "fontWeight": "700" }}>
                  District
                </Typography>
              }
              secondary={district}
            />
          </Grid>          
          <Grid item xs={4}>
          <ListItemText
             
              secondary={ <a className="LOB-link" href={link}>Link to the LOB record specific to this case</a>}
            />
         
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </div>
  );
};

export default LOBCUstomContentCard;
