import React, { useState } from "react";
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  Box,
  Divider,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { SearchProps } from "../../interfaces/componentInterface";
import "./search.scss"



const dropDownValues = [{
  title:"NRO1 - One on One conversations",
  subtitle:"Application Maintenance Services for ISSS Feb 02, 2023",
  content:"Mines Digital Services (MDS) / … / User Research / One-on-Ones Nov 18, 2019 NRO - Vince Metcalf, Kathryn Gregory, Kevin Edquist Action Produced yes/noONotesOSystem of SourceDOAdministrative"
},
{
  title:"NRO2 - One on One conversations",
  subtitle:"Application Maintenance Services for ISSS Feb 02, 2023",
  content:"Mines Digital Services (MDS) / … / User Research / One-on-Ones Nov 18, 2019 NRO - Vince Metcalf, Kathryn Gregory, Kevin Edquist Action Produced yes/noONotesOSystem of SourceDOAdministrative"
}
]
const Search = ({ setSearchField, dropDownArray, setSearchColumn } :SearchProps) => {
  
  const[dropDown,setDropDown] = useState(false)
  const onFocus = () => setDropDown(true)
  const onBlur = () => setDropDown(false)
  
  if(!dropDownArray.includes("All")){
    dropDownArray.unshift("All")
  } 

  
  return (
    <>
    <div className="search-parent" style={{width:dropDown?"30vw":"20vw"}}>
    <div className="search-child-1">
    <FormControl fullWidth sx={{ m: 1,backgroundColor:"white" }} variant="outlined">
        
        <OutlinedInput
          id="standard-adornment-amount"
          placeholder="Search"
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setSearchField(e.target.value);
          }}
          onFocus={onFocus} onBlur={onBlur}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
    //       endAdornment={
    //         <div>
    //           <Box
    //             sx={{
    //               display: "flex",
    //               alignItems: "center",
    //               width: "fit-content",
    //               bgcolor: "background.paper",
    //               color: "text.secondary",
    //               "& hr": {
    //                 mx: 0.5,
    //               },
    //             }}
    //           >
    //             <Divider orientation="vertical" variant="middle" flexItem />
    //             <FormControl variant="standard" sx={{ m: 1, minWidth: 70 }}>
    //               <Select
    //                 labelId="demo-simple-select-standard-label"
    //                 id="demo-simple-select-standard"
    //                 label="Age"
    //                 disableUnderline
    //                 defaultValue={dropDownArray[0]}
    //                 IconComponent={KeyboardArrowDownIcon}
    //                 onChange={(e) => {
    //                   setSearchColumn(e.target.value);
    //                 }}
    //               >

    //                 {dropDownArray ? (
    //                   dropDownArray.map((dropDownValue) => (
    //                     <MenuItem key={dropDownValue} value={dropDownValue}>
    // <Typography variant="body2">

    //                       {dropDownValue}
    //     </Typography>

    //                     </MenuItem>
    //                   ))
    //                 ) : (
    //                   <MenuItem value="All">All</MenuItem>
    //                 )}

    //               </Select>
    //             </FormControl>
    //           </Box>
    //         </div>
    //       }
        />
      </FormControl>
    </div>
    <div  style={{display:dropDown?"flex":"none"}}>
    <div className="search-drop-down">
    <Card >
      <CardContent>
      {dropDownValues.map((eachValue) => (
        <div key={eachValue.title}>
                <Typography variant="body1" sx={{textDecoration: 'underline' }} color="#002EFF" >
          {eachValue.title}
     </Typography>
     <Typography variant="caption"  sx={{ fontSize: 8}}>
          {eachValue.title}
     </Typography>
     <Typography variant="body1"  sx={{ fontSize: 14}} gutterBottom>
          {eachValue.title}
     </Typography>
 

     </div>
        ))}


      </CardContent>

    </Card>
    </div>
    </div>
    </div>
      
      
    </>
  );
};

export default Search;
