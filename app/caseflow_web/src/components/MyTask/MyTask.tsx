import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import MyTaskCard from "../MyTaskCard/MyTaskCard";
import { EachTask } from "../../interfaces/componentInterface";
import "./myTask.scss";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import { getTaksByUserId } from "../../services/workflowService";
import { setUserTaskList } from "../../reducers/taskReducer";

const MyTask = () => {

const dispatch = useDispatch();
const userName = useSelector((state:State) => state.auth.userDetails.userName);
const taskList = useSelector((state:State) => state.tasks.userTasksList);

useEffect(() => {
  if(userName){
    fetchUserTasks();
  }
}, [userName]);
const fetchUserTasks = async() =>{
  const tasks = await getTaksByUserId(userName)
  dispatch(setUserTaskList(tasks))
}

  return (
    <div className="myTaskStyle" style={{ padding: "2rem 4rem 0rem 4rem" }}>
      <Typography
        sx={{ padding: "1rem 1rem 1rem 1rem" }}
        variant="h6"
        className="myTaskStyle"
      >
        My Tasks
      </Typography>
      

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-label="mailbox folders"
      >

    <ListItem >
        <Grid container spacing={1} >
          <Grid item xs={2}  >
            <ListItemText
              primary={
                <Typography 
                variant="subtitle1"                
                className="recent-case-card-style"
                >
                   Name 
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2} >
            <ListItemText
              primary={
                <Typography 
                variant="subtitle1"                
                className="recent-case-card-style"
                >
                   Date Created
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={4}>
            <ListItemText
              primary={
                <Typography 
                variant="subtitle1"                
                className="recent-case-card-style"
                >
                   Description
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2} >
            <ListItemText
              primary={
                <Typography 
                variant="subtitle1"                
                className="recent-case-card-style"
                >
                   Assigned By
                </Typography>
              }
            />
          </Grid>
          <Grid  item xs={2} style={{"paddingLeft":"1.5rem"}}>
            <ListItemText
              primary={
                <Typography 
                variant="subtitle1"                
                className="recent-case-card-style"
                >
                  Status
                </Typography>
              }
            />
          </Grid>
      </Grid>
      
      </ListItem>
      <Divider sx={{ borderBottomWidth: 3 }} />




      
        {taskList?.length>0 ? taskList.map((eachTask,index) => (
          <MyTaskCard
          key={index}
          task={eachTask}
          />
        )):
      <ListItem >
          <Grid container spacing={1}  >
          <Grid item xs={12} >
            <ListItemText
              primary={
                <Typography 
                variant="body2"
                style={{"textAlign":"center","color":"rgba(0, 0, 0, 0.6)"}}>
                  No Task  Found!
                </Typography>
              }             
            />
          </Grid>
          </Grid>
        </ListItem>
        }
      </List>

    </div>
  );
};

export default MyTask;
