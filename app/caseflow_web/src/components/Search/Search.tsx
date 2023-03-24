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
  Grid,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { SearchProps } from "../../interfaces/componentInterface";
import "./search.scss"
import { useNavigate } from "react-router-dom";





const Search = ({ setSearchField, dropDownArray, setSearchColumn , dropDownValues={}} :SearchProps) => {
  
  const[dropDown,setDropDown] = useState(false)
  const onFocus = () => setDropDown(true)
  const onBlur = () => setTimeout(()=>setDropDown(false),300)
  
  if(!dropDownArray.includes("All")){
    dropDownArray.unshift("All")
  } 
  const navigate = useNavigate();  
console.log(dropDownValues)
  
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
          onFocus={onFocus} 
          onBlur={onBlur}
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
    <Card sx={{mb:2}} >
      <CardContent >
      <Typography variant="caption"  sx={{ paddingBottom:10 ,fontSize: 8}}>
          {dropDownValues?.totalCount} search results
     </Typography>
     <Box sx={{overflow:"auto",height:"40vh"}}>  
          {dropDownValues?.searchResult?.map((eachValue) => (
           <Grid container  key={eachValue.title}>
                       <Grid item xs={0.5} >
           <img
            alt="Tasksicon"
            src={eachValue.imgIcon}
            style={{"height":"1rem"}}
            ></img>
        </Grid>
        <Grid item xs={11} sx={{pl:"1rem"}}>
      <div key={eachValue.title} >
      <Typography variant="body1" sx={{textDecoration: 'underline', cursor:"pointer"}} color="#002EFF" onClick={()=>{navigate(eachValue.link)}}  >
          {eachValue.title}
     </Typography>

     <Typography variant="caption"  sx={{ fontSize: 8}}>
          {eachValue.subtitle}
     </Typography>
     <Typography variant="body1"  sx={{ fontSize: 14}} gutterBottom>
          {eachValue.content}
     </Typography>
 

     </div>
     </Grid>
           </Grid>
        ))}
        </Box>

    


      </CardContent>
      <Divider />

      <div className="advanced-search" onClick={()=>{navigate('/private/advancedSearch')}}>
        <SearchIcon sx={{ fontSize: "18px"}}/>   
          <Typography variant="body2" sx={{pl:1}}>
          Advanced Search
     </Typography>
      </div>


    </Card>

    </div>
 
    </div>
    </div>
      
      
    </>
  );
};

export default Search;
