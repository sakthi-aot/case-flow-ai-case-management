import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import { setSelectedLob } from "../../reducers/lobReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./LOBCUstomContentCard.scss";
import moment from "moment";



const LOBCUstomContentCard = ({ lobData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewCaseDetails = async () => {
    dispatch(setSelectedLob(lobData));
    navigate("/private/lob/" + lobData.id + "/details");
  };

  const formattedCreatedDate = moment(lobData.createdDate).format(
    "MMMM Do, YYYY"
  );
  return (
    <div
      onClick={() => {
        viewCaseDetails();
      }}
    >
      <Typography />
      <ListItem button sx={{ paddingInline: 0, paddingBlock: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <ListItemText
              primary={<Typography variant="body2">{lobData.id}</Typography>}
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              primary={
                <Typography variant="body2">{lobData.policyNumber}</Typography>
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              primary={
                <Typography variant="body2">{formattedCreatedDate}</Typography>
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              primary={
                <Typography variant="body2">{formattedCreatedDate}</Typography>
              }
            />
          </Grid>

          <Grid
            item
            xs={1}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Box>
              <Typography className="recent-case-card-status">
                <div className="recent-case-card-status-text">
                  {lobData.isActive == true ? "Active" : "InActive"}
                </div>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </ListItem>
      <Divider sx={{ borderBottomWidth: 1, borderBottomColor: "#E2E2E2" }} />
    </div>
  );
};

export default LOBCUstomContentCard;
