import { Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import * as React from 'react';
import Search from '../Search/Search';
import "./advancedSearch.scss";
import SearchIcon from "@mui/icons-material/Search";
import SearchFilters from '../SearchFilters/SearchFilters';

const searchValues = [{
  title:"NRO1 - One on One conversations",
  subtitle:"Application Maintenance Services for ISSS Feb 02, 2023",
  content:"Mines Digital Services (MDS) / … / User Research / One-on-Ones Nov 18, 2019 NRO - Vince Metcalf, Kathryn Gregory, Kevin Edquist Action Produced yes/noONotesOSystem of SourceDOAdministrative",
  imgIcon:"../../assets/TasksIcon.png"
},
{
  title:"NRO2 - One on One conversations",
  subtitle:"Application Maintenance Services for ISSS Feb 02, 2023",
  content:"Mines Digital Services (MDS) / … / User Research / One-on-Ones Nov 18, 2019 NRO - Vince Metcalf, Kathryn Gregory, Kevin Edquist Action Produced yes/noONotesOSystem of SourceDOAdministrative",
  imgIcon:"../../assets/TasksIcon.png"

},
{
  title:"NRO2 - One on One conversations",
  subtitle:"Application Maintenance Services for ISSS Feb 02, 2023",
  content:"Mines Digital Services (MDS) / … / User Research / One-on-Ones Nov 18, 2019 NRO - Vince Metcalf, Kathryn Gregory, Kevin Edquist Action Produced yes/noONotesOSystem of SourceDOAdministrative",
  imgIcon:"../../assets/TasksIcon.png"

},{
  title:"NRO2 - One on One conversations",
  subtitle:"Application Maintenance Services for ISSS Feb 02, 2023",
  content:"Mines Digital Services (MDS) / … / User Research / One-on-Ones Nov 18, 2019 NRO - Vince Metcalf, Kathryn Gregory, Kevin Edquist Action Produced yes/noONotesOSystem of SourceDOAdministrative",
  imgIcon:"../../assets/TasksIcon.png"

},{
  title:"NRO2 - One on One conversations",
  subtitle:"Application Maintenance Services for ISSS Feb 02, 2023",
  content:"Mines Digital Services (MDS) / … / User Research / One-on-Ones Nov 18, 2019 NRO - Vince Metcalf, Kathryn Gregory, Kevin Edquist Action Produced yes/noONotesOSystem of SourceDOAdministrative",
  imgIcon:"../../assets/TasksIcon.png"

}
]


export default function AdvancedSearch({setSearchField}) {

 
  return (<>
  
  <div className="details-container">
      <div className="header-search">
      <Typography variant="body1" className="title">CaseFlow</Typography>
      <div className="search">
        <Search
          setSearchField={() => {}}
          dropDownArray={[]}
          setSearchColumn={() => {}}
        ></Search>
      </div>
      </div>
  <div className="search-area-container">
  <Typography variant="h5">Advanced Search</Typography>

  <div className="search-bar-advanced-search">
  <OutlinedInput
    sx={{width:"100%"}}
          id="standard-adornment-amount"
          placeholder="Search"
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setSearchField(e.target.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }/>
          </div>
          <Typography variant="caption"  sx={{ fontSize: 8}}>
          {searchValues?.length} search results
     </Typography>

     {searchValues.map((eachValue) => (
           <Grid container  key={eachValue.title}>
           <Grid item xs={0.5} sx={{pt:"5vh"}}>
           <img
            alt="Tasksicon"
            src={require("../../assets/CasesIcon.png")}
            style={{"height":"1rem"}}
            ></img>
        </Grid>
        <Grid item xs={11}>
        <div>
                <Typography variant="body1" sx={{pt:4,textDecoration: 'underline' }} color="#002EFF" >
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
  </div>


  <div className="filter-area-container">
<SearchFilters />
  </div>



      </div>


  </>)


  }