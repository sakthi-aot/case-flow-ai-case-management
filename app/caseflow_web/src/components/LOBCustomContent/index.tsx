import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import LOBCUstomContentCard from "../LOBCUstomContentCard";
import { CustomContent } from "../../interfaces/componentInterface";
import { getLobData } from "../../services/LOBService";
import {useSelector,useDispatch} from "react-redux";
import { setlobList, setLobTotalCount } from "../../reducers/lobReducer";
import { State } from "../../interfaces/stateInterface";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { Box, Card } from "@mui/material";
import Search from "../Search";
import "./LOBCustomContent.scss"
const LOBCustomContent = () => {

  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [dropDownArray, setdropDownArray] = useState([""]);
  
  const dispatch = useDispatch()
  
  const lobListData = useSelector((state:State)=>state.lob.lobList);
  const lobTotalCount = useSelector((state:State) =>state.lob.totalLobCount) 

  useEffect(()=>{
    fetLobList(searchField,searchColumn)
  },[searchField,searchColumn])

  const fetLobList =async (searchField,searchColumn) =>{
    const output = await getLobData(1);
    dispatch(setlobList(output.getLobList.CaseflowLob))
    dispatch(setLobTotalCount(output.getLobList.totalCount))
   
   let fields= Object.keys( output.getLobList.CaseflowLob[0])
   setdropDownArray(fields)

    console.log(fields)
  }
  return (
    <section className="dashboard">
    <h1 className="title-c">CaseFlow</h1>
    <div className="search">
    <Search
          setSearchField={setSearchField}
          dropDownArray={dropDownArray}
          setSearchColumn={setSearchColumn}
        ></Search>
    </div>     
    <div className="lobData-container" style={{ padding: "2rem 3rem 0rem 5rem" }}>
      <Typography
        sx={{ padding: "1rem 1rem 1rem 1rem" }}
        variant="h6"
        className="lob-heading"
      >
       LOB
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
        {(lobListData && lobListData.length !== 0)?lobListData.map((lobData,index ) => (
          <LOBCUstomContentCard
          key={index}
          lobData = {lobData}
          />
        )):
        <ListItem >
        <Grid container spacing={1}  >
        <Grid item xs={12} >
          <ListItemText
            primary={
              <Typography 
              variant="body2"
              style={{ "fontWeight": "700" ,"textAlign":"center","color":"rgba(0, 0, 0, 0.6)"}}>
                No LOB Found!
              </Typography>
            }             
          />
        </Grid>
        </Grid>
      </ListItem>
        }
      </List>
    </div>
  </section>


   
  );
};

export default LOBCustomContent;
