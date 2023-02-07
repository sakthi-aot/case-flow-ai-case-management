
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import {Case} from "../../dto/cases"
import { addCases, updateCases } from "../../services/CaseService";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { setSelectedCase,resetSelectedCase } from "../../reducers/newCaseReducer";
import "./NewCaseComponent.scss"

const NewCase = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFieldValues = {
    id:0,
    name: '',
    desc:'',
    statusid: 1
}

const caseList =  useSelector(state=>state.cases.selectedCase);
const [values, setValues] = useState(initialFieldValues)
const { handleSubmit, control,register } = useForm();
// const [caseList.isEdit,setIsCaseEdit] = useState(Boolean);

// console.log("caseList",caseList)
// console.log("values",values)

  const onSubmit = async () => 
  {
    let response;
    if(caseList.isEdit){
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
    if(caseList.isEdit){
       setValues(caseList);     
    }
}, [caseList]);

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
  if(caseList.isEdit){
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
    <div style={{ padding: "2rem 3rem 0rem 8rem" }} className="newOrupdateCaseBlock">
      <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="h6" className="case-heading">
      {caseList.isEdit?"Update Case":"New Case"}  
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

      <div style={{"display" : "flex", padding: "2rem 1rem 1rem 1rem", "justifyContent": "center"}}>
          <Button
            style={{
              alignItems :"center",
              // margin: "auto",
              height: "2.4375rem",
              width: "20%",
              backgroundColor:"#404040"
            }}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
           {caseList.isEdit?"Update":"Create"}  
          </Button>
          <Button
            style={{
              alignItems :"center",
               marginLeft: "2rem",
              height: "2.4375rem",
              width: "20%",
              backgroundColor:"#404040"
            }}
            variant="contained"
            onClick={() =>handleBack()} 
          >
           Back
          </Button>
        </div>
    </div>
  );
};

export default NewCase;
