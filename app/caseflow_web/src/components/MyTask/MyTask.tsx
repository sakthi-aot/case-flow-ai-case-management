import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import MyTaskCard from "../MyTaskCard/MyTaskCard";
import { EachTask } from "../../interfaces/componentInterface";
import "./myTask.scss";

const MyTask = () => {
  const allTasks : EachTask[] = [
    {
      taskID: 1,
      taskDescription: "  My Bonnie lies over the ocean.My Bonnie lies over the ocean.",
      
    },
    {
      taskID: 2,
      taskDescription: " My Bonnie lies over the scvea.My Bonnie lies over the sea.",
    },
  ];
  return (
    <div className="myTaskStyle" style={{ padding: "2rem 4rem 0rem 4rem" }}>
      <Typography
        sx={{ padding: "1rem 1rem 1rem 1rem" }}
        variant="h6"
        className="myTaskStyle"
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
        {allTasks.map((eachTask) => (
          <MyTaskCard
          taskID={eachTask.taskID}
          taskDescription={eachTask.taskDescription}
          key={eachTask.taskID}
          />
        ))}
      </List>
    </div>
  );
};

export default MyTask;
