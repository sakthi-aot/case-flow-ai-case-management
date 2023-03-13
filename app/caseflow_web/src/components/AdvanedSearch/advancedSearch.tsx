import { Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import  React, { useEffect, useState }  from 'react';
import Search from '../Search/Search';
import "./advancedSearch.scss";
import SearchIcon from "@mui/icons-material/Search";
import SearchFilters from '../SearchFilters/SearchFilters';
import { searchCases } from "../../services/CaseService";
import {searchCaseDocument } from "../../services/DocumentManagementService";
import {useDispatch, useSelector} from "react-redux";
import { State } from "../../interfaces/stateInterface";
import { setadvanceSearchResult } from '../../reducers/applicationReducer';
import { getLobData } from "../../services/LOBService";
import moment from "moment";
import { useNavigate } from 'react-router';



export default function AdvancedSearch() {

  const [searchField, setSearchField] = useState("");
  const searchresults = useSelector((state:State)=>state.app.advanceSearchResult)
  const dispatch = useDispatch();
  const navigate = useNavigate();  



  const searchDetails = async ()=>{
    let result:any = []
    let totalCount = 0
    await Promise.all([searchCases(searchField,"name",1,"id",true,true)
    .then((searchCaseResult=>{
      totalCount = totalCount + searchCaseResult.totalCount;
      searchCaseResult?.Cases.map((element) => {
        result.push({title:element.id + " - " +element.name,content:element.desc, subtitle:"Cases",link:"/private/cases/"  + element.id+'/details',imgIcon:require("../../assets/CasesIcon.png")})
      });
    })) , searchCaseDocument(searchField,"Name","name",true,true)
    .then(searchDocumentResult=>{
      totalCount = totalCount + searchDocumentResult.totalCount;
      searchDocumentResult?.CaseDocuments.map((element) => {
        result.push({title:element.id + " - " +element.name,content:element.desc, subtitle:"CaseDocuments",link:"",imgIcon:require("../../assets/DocumentsIcon.png")})
    });
    }),
     getLobData(1,searchField,"policyNumber")
    .then(searchLobResult=>{
      totalCount = totalCount + searchLobResult?.totalCount;
      searchLobResult?.CaseflowLob.map((element) => {    
        result.push({title:element.id + " - " +element.policyNumber,content: moment(element.createdDate).format('MMMM Do, YYYY'), subtitle:"Policy",link:"/private/lob/"+ element.id+'/details',imgIcon:require("../../assets/LOBIcon.png")})
     });
    }
    )
    
  ]);

    dispatch(setadvanceSearchResult({searchResult:result,totalCount:totalCount}));
  }

  
 useEffect(() => {
  searchDetails();
  console.log(searchresults)
 }, [searchField])


 
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
          {searchresults?.totalCount} search results
     </Typography>

     {searchresults?.searchResult.map((eachValue) => (
           <Grid container  key={eachValue.title}>
           <Grid item xs={0.5} sx={{pt:"5vh"}}>
           <img
            alt="Tasksicon"
            src={eachValue.imgIcon}
            style={{"height":"1rem"}}
            ></img>
        </Grid>
        <Grid item xs={11}>
        <div>
                <Typography variant="body1" sx={{pt:4,textDecoration: 'underline', cursor:"pointer" }} color="#002EFF"onClick={()=>{navigate(eachValue.link)}}  >
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