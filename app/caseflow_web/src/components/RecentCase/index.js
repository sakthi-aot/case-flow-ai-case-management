import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import RecentCasecard from "../RecentCaseCard";

const RecentCase = () => {
  const allRecentCases = [
    {
      caseID: "165876876",
      caseDescription: "  My Bonnie lies over the ocean.My Bonnie lies over the ocean.",
      status: "open",
    },
    {
      caseID: "7658587678",
      caseDescription: " My Bonnie lies over the scvea.My Bonnie lies over the sea.",
      status: "Pending Approval",
    },
  ];
  return (
    <div style={{ padding: "2rem 3rem 0rem 10rem" }}>
      <Typography
        sx={{ padding: "1rem 1rem 1rem 1rem" }}
        variant="h6"
      >
        Recent Cases
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
        {allRecentCases.map((eachcases) => (
          <RecentCasecard
            caseID={eachcases.caseID}
            caseDescription={eachcases.caseDescription}
            status={eachcases.status}
            key={eachcases.caseID}
          />
        ))}
      </List>
    </div>
  );
};

export default RecentCase;
