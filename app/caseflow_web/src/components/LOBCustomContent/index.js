import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import LOBCUstomContentCard from "../LOBCUstomContentCard";

const LOBCustomContent = () => {
  const customContentList = [
    {
      caseCategory: "wildlife Offance",
      district: "shownan lake",
      link : ''
      
    },
    {
        caseCategory: "wildlife offance",
        district: " shownan lake",
        link : ''
    },
  ];
  return (
    <div style={{ padding: "2rem 3rem 0rem 10rem" }}>
      <Typography
        sx={{ padding: "1rem 1rem 1rem 1rem" }}
        variant="h6"
      >
        My Tasks
      </Typography>
      <Divider sx={{ borderBottomWidth: 3 }} />

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-label="mailbox folders"
      >
        {customContentList.map((customContent) => (
          <LOBCUstomContentCard
          caseCategory={customContent.caseCategory}
          district={customContent.district}
          link={customContent.link}
          />
        ))}
      </List>
    </div>
  );
};

export default LOBCustomContent;
