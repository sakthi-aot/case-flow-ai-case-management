import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Divider from "@mui/material/Divider";
import RecentCasecard from "../RecentCaseCard";
import { SortCasesByField } from "../../helper/SortCases";
import "./caselist.scss"
import { Link, } from "react-router-dom";
import { caseListprops,  PropsConfig, RecentCase, SortValue } from "../../interfaces/componentInterface";


const allRecentCases : RecentCase[] = [
  {
    caseID: "1",
    caseDescription: "A CaseSentive",
    status: "open",    
  },
  {
    caseID: "3",
    caseDescription: "lorems",
    status: "Pending Approval",    
  },
  {
    caseID: "2",
    caseDescription: "Bust New",
    status: "Pending Approval",    
  },
  {
    caseID: "9",
    caseDescription: "new And fresh",
    status: "Pending Approval",    
  },
  {
    caseID: "5",
    caseDescription: "Finished",
    status: "Pending Approval",    
  },
];

let  sortingkeysOfAllRecentCases:SortValue[] =[]
for( let field in allRecentCases[0]){
  // sortingkeysOfAllRecentCases = [...sortingkeysOfAllRecentCases,{value:field,sortOrder:true}]
  sortingkeysOfAllRecentCases.push({value:field,sortOrder:true})
}


const CaseList =React.memo( ({config}:caseListprops) => {

  const [sortValue,setSortValue] = useState({value:"",sortOrder:null})
  const [recentCases,setRecentCases] = useState([...allRecentCases])
  const [sortSelectValue,setSortSelectValues] = useState(sortingkeysOfAllRecentCases)

  // useEffect(()=>{ 
  //  const updatedSortedData = SortCasesByField(sortValue,recentCases)
  //  setRecentCases(updatedSortedData)
  // },[sortValue])

  const onSortingValueChangeHandler = (e:any) =>{
    let tempSelectedValue = e.target.value;

    const updatedSortValueState =sortSelectValue.map(sortValue =>{
      if(sortValue.value === tempSelectedValue){
        let sortedDummyvalue = {value:tempSelectedValue,sortOrder:!sortValue.sortOrder}
        tempSelectedValue = sortedDummyvalue
         return sortedDummyvalue
        }else return sortValue
      
    }) 
    setSortSelectValues(updatedSortValueState) 
    setSortValue(tempSelectedValue)    
  }
  
  return (
    <div style={{ padding: "2rem 3rem 0rem 8rem" }}>
      <span className="recent-case-header">
      <Typography
        sx={{ padding: "1rem 1rem 1rem 1rem" }}
        variant="h6"
      >
        {config.title}
      </Typography>     
      { config.isShowSort ? <FormControl sx={{ m: 1, minWidth: 120, }}>
        <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Sorting"
            value={sortValue.value}
            onChange={onSortingValueChangeHandler}
          >
            {sortSelectValue.map((sortField,index) =>{
              return <MenuItem value={sortField.value} key={index} >{sortField.value} </MenuItem>
            })}
           
         </Select>
        </FormControl> : "" }
      </span>
      <Divider sx={{ borderBottomWidth: 3 }} />

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-label="mailbox folders"
      >
         
        {/* {recentCases.map((eachcases) => (
          <Link key={eachcases.caseID} to={'/private/cases/' + eachcases.caseID+'/details'} style={{ textDecoration: 'none' ,color:'#404040'}}>
          <RecentCasecard
            caseID={eachcases.caseID}
            caseDescription={eachcases.caseDescription}
            status={eachcases.status}
            key={eachcases.caseID}            
          />
          </Link>
        ))} */}

<RecentCasecard caseDetails={recentCases}/>
      </List>
    </div>
  );
});

export default CaseList;
