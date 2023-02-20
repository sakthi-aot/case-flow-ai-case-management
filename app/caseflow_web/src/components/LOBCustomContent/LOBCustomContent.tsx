import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import LOBCUstomContentCard from "../LOBCUstomContentCard/LOBCUstomContentCard";
import { getLobData } from "../../services/LOBService";
import {useSelector,useDispatch} from "react-redux";
import { setLobList, setLobTotalCount } from "../../reducers/lobReducer";
import { State } from "../../interfaces/stateInterface";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import {  Button, Pagination } from "@mui/material";
import Search from "../Search/Search";
import "./LOBCustomContent.scss"
import { Link } from "react-router-dom";
import { setEditLob } from "../../reducers/lobReducer";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";


const LOBCustomContent = () => {

  const [searchField, setSearchField] = useState("");
  const [searchColumn, setSearchColumn] = useState("All");
  const [dropDownArray, setDropDownArray] = useState([""]);
  const [ selectedPage,setSelectedPage] = useState(1);
   
  
  const dispatch = useDispatch()
  
  const lobListData = useSelector((state:State)=>state.lob.lobList);
  const lobTotalPageCount = useSelector((state:State) =>state.lob.totalLobCount) 
const [dataForBreadCrumbs,setDataForBreadCrumbs]= useState([{text:"Home",link:"/private"},{text:"Lob",link:"/private/lob"}]);



  useEffect(()=>{    
    fetchLobList()
  },[searchField,searchColumn,selectedPage])

  const fetchLobList =async () =>{
    const output = await getLobData(selectedPage,searchField,searchColumn);
    dispatch(setLobList(output.CaseflowLob))
    dispatch(setLobTotalCount(output.totalCount))
   
  //  let fields= Object.keys( output.CaseflowLob[0])
   setDropDownArray(["policyNumber"])    
  }

  const onLobPageCountChange =(e,p) =>{
    setSelectedPage(p)
  }
  const resetEdit = ()=>{
    dispatch(setEditLob(false))
  }
  return (
    <section className="dashboard">
      <div className="header-search">
      <Typography variant="body1" className="title">CaseFlow</Typography>
      <div className="search">
        <Search
            setSearchField={setSearchField}
            dropDownArray={dropDownArray}
            setSearchColumn={setSearchColumn}
        ></Search>
      </div>
      </div>   
    <div className="lobData-container" style={{ padding: "2rem 3rem 0rem 5rem" }}>
    {/* <BreadCrumbs dataForBreadCrumbs={dataForBreadCrumbs}/> */}
      
      <div className="lobData-header">
      <Typography
        sx={{ padding: "1rem 1rem 1rem 1rem" }}
        variant="h6"
        className="lob-heading"
      >
       Policy
    </Typography>

      <Button 
       style={{
        alignItems :"center",        
        height: "2.4375rem",
        width: "20%",       
        borderRadius:"8px",
        textTransform:"unset"
        }}
        sx={{backgroundColor:'primary.main'}}
        variant="contained"
        component={Link} to="/private/lob/create"
        onClick={resetEdit}
        >Start New Policy</Button>


      </div>

      

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          minHeight:"44rem"
        }}
        className="lobDataList"
        component="nav"
        aria-label="mailbox folders"
      >
        
        <ListItem >
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <ListItemText
                primary={
                  <Typography 
                  variant="subtitle1"
                  >
                    ID
                  </Typography>
                }
                />
            </Grid>
            <Grid item xs={3}>
              <ListItemText
                primary={
                  <Typography 
                  variant="subtitle1"
                  className="lob-card-style"
            >
                    Policy Number
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={3}>
              <ListItemText
                primary={
                  <Typography
                  variant="subtitle1"
                  className="lob-card-style"
                >
                    Created date
                  </Typography>
                }
              />
            </Grid>          
            <Grid item xs={3}>
              <ListItemText
                primary={
                  <Typography
                  variant="subtitle1"
                  className="lob-card-style"
                >
                    Sum Assured
                  </Typography>
                }
              />
            </Grid>
            <Grid item xs={1}>
              <ListItemText
                primary={
                  <Typography
                  variant="subtitle1"
                  className="lob-card-style"
                >
                    Status
                  </Typography>
                }
              />
            </Grid>
          </Grid> 
        </ListItem>
        <Divider sx={{ borderBottomWidth: 3 }} />
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
              style={{"textAlign":"center","color":"rgba(0, 0, 0, 0.6)"}}>
                No LOB Found!
              </Typography>
            }             
          />
        </Grid>
        </Grid>
      </ListItem>
        }
      </List>
        {(lobListData && lobListData.length !== 0 && lobTotalPageCount >1) && <Pagination count={lobTotalPageCount} shape="rounded" className="pagination-case-list" onChange={onLobPageCountChange} />}
    </div>
  </section>


   
  );
};

export default LOBCustomContent;
