
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
import { setSelectedCase } from "../../reducers/newCaseReducer";

const NewCase = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFieldValues = {
    id:0,
    name: '',
    description:'',
    statusid: 1
}

const caseList =  useSelector(state=>state.cases.selectedCase);
const [values, setValues] = useState(initialFieldValues)
const { handleSubmit, reset, control,register } = useForm();

  const onSubmit = async (data:any) => 
  {

    const caseData:Case|void = new Case();
    caseData.name = data.name;
    caseData.statusid = 1;
    let response;
    if(values.id){
     caseData.id=values.id;
     response = await updateCases(caseData);
     refreshCases();
    }else{
    response = await addCases(caseData);
    refreshCases();
    }
    console.log(response);
    // if(response)
    if (response && response.data) {
      toast.success("Success");
      }
     else{ toast.error("Error");}

  }
  useEffect(() => {
    console.log("inside");
  if(caseList)
  setValues(caseList);
}, []);

const refreshCases=()=>{
  dispatch(setSelectedCase(initialFieldValues));
  setValues(initialFieldValues);
  navigate("/private/cases");
}
  return (
    <div style={{ padding: "2rem 3rem 0rem 8rem" }}>
      <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="h6">
      {values.id==0?"New Case":"Update Case"}  
      </Typography>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <Grid container spacing={3} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={4}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2">
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
           
              value={values.name} 
              onChange={onChange}
              placeholder="Case Name"
            />
          )}
        />          
      </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={4}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2">
            Case Description :
          </Typography>
        </Grid>
        <Grid item xs={8}>
        <Controller
        name={"description"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id="standard-basic"
            label="Description"
            multiline
            rows={1}
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": { color: "#404040" },
              borderBottom: "1px solid #404040",  
              width: "100%",            
            }}    
            InputProps={{ disableUnderline: true }} 
            placeholder="Enter the details of the Case"
            value={values.description}
            onChange={onChange}
          />
        )}
      />          
        </Grid>
      </Grid>

      <div style={{"display" : "flex", padding: "2rem 1rem 1rem 1rem"}}>
          <Button
            style={{
              alignItems :"center",
              margin: "auto",
              height: "3.4375rem",
              width: "30%",
              backgroundColor:"#404040"
            }}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
           {values.id==0?"Submit":"Update"}  
          </Button>
          <Button
            style={{
              alignItems :"center",
              margin: "auto",
              height: "3.4375rem",
              width: "30%",
              backgroundColor:"#404040"
            }}
            variant="contained"
            onClick={() => reset()} 
          >
           Reset
          </Button>
        </div>
    </div>
  );
};

export default NewCase;
