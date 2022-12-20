
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import {Case} from "../../dto/cases"
import { addCases } from "../../services/CaseService";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";

const NewCase = (props) => {
  const params = useParams();
  const initialFieldValues = {
    caseID:0,
    name: '',
    statusid: 1,
   
}
const caseList =  useSelector(state=>state.cases.selectedCase);
const {casename,casedesc}=caseList;
console.log("caseList",caseList);
const  recordForEdit = props.documentDetailsForEdit
  const [values, setValues] = useState(initialFieldValues)

  const { handleSubmit, reset, control,register } = useForm();
  const onSubmit = async (data:any) => 
  {
    console.log("data",data)
    const caseData:Case|void = new Case();
    caseData.name = data.name;
    caseData.statusid = 1;
    const response = await addCases(caseData);
    console.log(response);
    // if(response)
    // if (response && response.data && response.data.status == "success") {
    //   toast.success("Success");
    //   }
    //  else{ toast.error("Error");}
    // const caseData:Case|void = new Case();
    // caseData.name = data.name;
    // caseData.statusid = 1;
    // dispatch(addCases(caseData)).unwrap();
    // navigate("/cases/create");
  }
  useEffect(() => {
    if (recordForEdit!= null){
         setValues(editFieldValues); //set the edit value to focument inputs
        }else{
          // refreshDocumentList();
        }
    }, [recordForEdit])
    let editFieldValues;
    if (recordForEdit!= null){
      const {dms_provider,content,description,docname,name,documentid,downloadurl}=recordForEdit;
      editFieldValues = {
        name: dms_provider,
        statusid: name,
     
    }}
  return (
    <div style={{ padding: "2rem 3rem 0rem 8rem" }}>
      <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="h6">
        New Case
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
              style={{
                width: "100%",
                border:"none"
                
              }}
              value={casename.caseName} 
              onChange={onChange}
              placeholder="File Name..."
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
            value={casedesc.caseDescription}
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
            Submit
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
