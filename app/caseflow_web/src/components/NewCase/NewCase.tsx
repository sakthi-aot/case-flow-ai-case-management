
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { addCases, getCaseDetails, updateCases } from "../../services/CaseService";
import {useDispatch, useSelector} from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {resetSelectedCase } from "../../reducers/newCaseReducer";
import "./NewCaseComponent.scss"
import { FormControl, MenuItem, Select } from "@mui/material";
import { fetchCaseTypess } from "../../services/constantsService";
import { setCaseTypes } from "../../reducers/constantsReducer";
import { State } from "../../interfaces/stateInterface";
import { async } from "q";
const NewCase = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialFieldValues = {
    id:0,
    name: '',
    desc:'',
    statusid: 1,
    typeid : 1,
    lobcaseid:0,
}


const caseList =  useSelector((state : State)=>state.cases.selectedCase);
const caseTypes =  useSelector((state : State)=>state.constants.caseTypes);
const [values, setValues] = useState(initialFieldValues)
const[isEdit,setIsEdit] = useState(false);
const { handleSubmit, control,register } = useForm();
// const [caseList.isEdit,setIsCaseEdit] = useState(Boolean);



  const onSubmit = async () => 
  {
    let response;
    if(isEdit){
     response = await updateCases(values);
     navigate("/private/cases/" + response.success.data.updateCase.id+'/details');
    }else{
    response = await addCases(values);
    navigate("/private/cases/"  + response.success.data.createCase.id+'/details');
    }

    if (response && response.success && response.success.data ) {
      toast.success("Success");
      }
     else{ toast.error("Error");}

  }
  useEffect(() => {     
    fetchSelectedCaseDetails()    
    getCaseTypes();

}, []);


const fetchSelectedCaseDetails = async ( ) =>{
  var matches = location.pathname.match(/(\d+)/);  
    if(matches && matches[0] && caseList){ 
      const data = await getCaseDetails(matches[0])
      const InitialSelectedCaseDetails = {
        id:data.id,
        name: data.name,
        desc:data.desc,
        statusid: data.statusid,
        typeid : data.typeid,
        lobcaseid:data.lobcaseid,

      }
      setValues(InitialSelectedCaseDetails)
      setIsEdit(true)
    }
}

const getCaseTypes = async () =>{
  const caseTypes = await fetchCaseTypess();
  dispatch(setCaseTypes(caseTypes))
}

const refreshCases=()=>{
  dispatch(resetSelectedCase());
  setValues(initialFieldValues);
  navigate("/private/cases");
}

const resetCases=()=>{
  dispatch(resetSelectedCase());
  setValues(initialFieldValues);

}
const handleBack = ()=>{
  if(isEdit){
    navigate("/private/cases/" + values.id+'/details');
  }
  else{
    navigate("/private/cases")
  }

}

  //set values when document input fiels changes
  // const handleDocumentInputChange = (e) => {
  //   const target = e.target;
  //   setValues({ ...values, [name]: value });
  // };
  return (
    <div style={{ padding: "2rem 4rem 0rem 4rem" }} className="newOrupdateCaseBlock">
      <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="h6" className="case-heading">
      {isEdit?"Update Case":"New Case"}  
      </Typography>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <Grid container spacing={3} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={4}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2" className="case-name-tag">
            Case Name :
          </Typography>
          </Grid>
          <Grid item xs={8}>
            <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextField
              id="standard-basic"
              label="Case Name"
              variant="standard"
              rows={1}
              sx={{

                width: "100%",            
              }} 
              value={values.name} 
              onChange={(e)=>{setValues({...values,name:e.target.value})}}
              placeholder="Case Name"
              
            />
          )}
        />          
      </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={4}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2" className="case-desc-tag">
            Case Description :
          </Typography>
        </Grid>
        <Grid item xs={8}>
        <Controller
        name={"desc"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id="standard-basic"
            label="Description"
            multiline
            rows={4}
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": { color: "#404040" },
              borderBottom: "1px solid #404040",  
              width: "100%",            
            }}    
            InputProps={{ disableUnderline: true }} 
            placeholder="Enter the details of the Case"
            value={values.desc}
            onChange={(e)=>{setValues({...values,desc:e.target.value})}}
          />
        )}
      />          
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={4}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2" className="case-name-tag">
            LOB Id :
          </Typography>
          </Grid>
          <Grid item xs={8}>
            <Controller
            name={"LOB Id"}
            control={control}
            render={({ field: { onChange, value } }) => (
            <TextField
              id="standard-basic"
              label="LOB Id"
              variant="standard"
              rows={1}
              sx={{

                width: "100%",            
              }} 
              value={values.lobcaseid} 
              onChange={(e)=>{setValues({...values,lobcaseid:parseInt((e && e.target && e.target.value)? e.target.value.toString() : '0')})}}
              placeholder="LOB Id"
              
            />
          )}
        />          
      </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={4}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2" className="case-desc-tag">
            Case Type :
          </Typography>
        </Grid>
        <Grid item xs={8}>
        <Controller
        name={"desc"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl sx={{ m: 1, minWidth: 90, }} size="small">
                {/* <InputLabel id="demo-simple-select-label">{label}</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"          
                  label="Age" 
                  value={values.typeid}   
                  onChange={(e)=>{setValues({...values,typeid:parseInt(e.target.value.toString())})}}
                  className="dropDownStyle"   
                >
                   {caseTypes.map((option,index) => <MenuItem key={index}  value={option.id}>{option.displayname}</MenuItem>)}                  
                </Select>
            </FormControl>
        )}
      />          
        </Grid>
      </Grid>
      <div style={{"display" : "flex", padding: "2rem 1rem 1rem 1rem", "justifyContent": "center"}}>
          <Button
            style={{
              alignItems :"center",
              // margin: "auto",
              height: "2.4375rem",
              width: "20%",             
            }}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
           {isEdit?"Update":"Create"}  
          </Button>
          <Button
            style={{
              alignItems :"center",
               marginLeft: "2rem",
              height: "2.4375rem",
              width: "20%",             
            }}
            variant="outlined"
            onClick={() =>handleBack()} 
          >
           Back
          </Button>
        </div>
    </div>
  );
};

export default NewCase;
