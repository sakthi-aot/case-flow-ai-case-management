
import React, {useEffect,  useState} from "react";
import Search from "../Search/Search";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";

import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';import "./NewLobData.scss"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker/DesktopDatePicker";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

import { createNewLob, getLobDetails, updateLob } from "../../services/LOBService";
import { setEditLob } from "../../reducers/lobReducer";
import { State } from "../../interfaces/stateInterface";
import { setSelectedLob } from "../../reducers/lobReducer";
import { useLocation } from 'react-router-dom'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



let defaultValues ={}

const schema = Yup.object().shape({
  policyNumber:  Yup.number().positive().required() ,
  policyEffectiveDate: Yup.date().required(),
  policyExpireDate: Yup.date().min(Yup.ref('policyEffectiveDate')).required(),
  sumAssured: Yup.number().positive().required()
  
  
});


const NewLobData = () =>{
  const dispatch = useDispatch();   
   const selectedLob = useSelector((state: State) => state.lob.selectedLob);
   const isEdit = useSelector((state: State) => state.lob.editLob);
   const location = useLocation();

   const SetDefaultValue = ( ) =>{
     if(isEdit){
        defaultValues = {
       policyNumber:selectedLob.policyNumber,    
       policyEffectiveDate:selectedLob.policyEffectiveDate,
       policyExpireDate:selectedLob.policyExpiryDate,
       policyStatus:selectedLob.isActive?"Active":"Inactive",
       sumAssured:selectedLob.sumAssured
   }
 
   
 }
   else{
      defaultValues = {
       policyNumber:"",    
       policyEffectiveDate:null,
       policyExpireDate:null,
       policyStatus:"Active",
       sumAssured:0
     }
 
   }
   }
    SetDefaultValue()
    
    
    const {handleSubmit,reset,control,formState:{errors}} = useForm({defaultValues,resolver:yupResolver(schema)});   
  
    const navigate = useNavigate()

    async function fetchLobDetails() {
      var matches = location.pathname.match(/(\d+)/);
      if(matches && matches[0]){
        let output = await getLobDetails(matches[0]);
        dispatch(setSelectedLob(output))
        dispatch(setEditLob(true))
        SetDefaultValue()
        reset()
      }
    }
  
    useEffect(() => {
      fetchLobDetails()
     
      
    },[]);


    let dropDownArrayItem:string[]=[];
    const serachField =(e:any) =>{
    }
    const SearchColumn = (e:any) =>{
    }



    const onSubmitHandler = async (data) => {
     
        if (isEdit) {
          data.id = Number(selectedLob.id)
          const response = await updateLob(data)
          if (response && response.id ) {         
            toast.success("Successfully Updated the Lob");
            navigate("/private/lob/"+ response.id+'/details');
            reset();
            }
           else{ toast.error("Error");}

         
        } else {
          const response = await createNewLob(data)
          if (response && response.id  ) {           
            reset();
          toast.success("Successfully Created New Lob");
          dispatch(setSelectedLob(response))
          navigate("/private/lob/"+ response.id+'/details');
            }
           else{ toast.error("Error");}        
        }

    
    }

    const onLobBackBtnHandler = ( ) =>{
      if(isEdit){
        navigate("/private/lob/"+ selectedLob.id+'/details');
      }
      else{
        navigate('/private/lob')
    }
  }



    return <>
    <form className="dashboard" onSubmit={handleSubmit(onSubmitHandler)}>
    <Typography variant="body1" className="title">CaseFlow</Typography>
      <div className="search">
      <Search setSearchField={serachField} dropDownArray={dropDownArrayItem} setSearchColumn={SearchColumn}/>
      </div>    


    <div className="lob-main-container">
        <div style={{ padding: "2rem 3rem 0rem 8rem" }} className="newOrupdateLobBlock">
      <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="h6" className="lob-heading">
      {isEdit?"Update ":"Create " }New Policy  
      </Typography>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <Grid container spacing={3} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={3}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2" className="lob-policy-tag">
           Policy Number
          </Typography>
          </Grid>
          <Grid item xs={9}>
            <Controller
            name="policyNumber"
            control={control}            
            render={({ field: { onChange, value ,ref}  }) => (
            <TextField
              id="standard-basic"
              variant="standard"             
              label="Policy Number"
              rows={1}
              sx={{

                width: "100%",            
              }} 
              value={value} 
              onChange={onChange}             
              placeholder="Policy Number"
              inputRef={ref}
              error={!!errors.policyNumber}                        
              
            />
          )}
        />          
      </Grid>

        {/* <Grid item xs={3}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2" className="case-name-tag">
           Case ID
          </Typography>
          </Grid>
          <Grid item xs={3}>
            <Controller
            name="caseId"
            control={control}
            rules={{required:true}}
            render={({ field: { onChange, value ,ref}  }) => (
            <TextField
              id="standard-basic"
              label="Case ID"
              variant="standard"             
              rows={1}
              sx={{

                width: "100%",            
              }} 
              value={value} 
              onChange={onChange}
              placeholder="Case ID"
              inputRef={ref}
              error={!!errors.caseId}
              
            />
          )}
        />          
      </Grid> */}


      </Grid>

     <Grid container spacing={3} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={3}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2" className="case-name-tag">
           Policy Effective Date
          </Typography>
          </Grid>
          <Grid item xs={3}>
            <Controller
            name="policyEffectiveDate"
            control={control} 
            render={({ field: { onChange, value ,ref}}) => (  
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label={"Policy Effective Date"}
                inputFormat="DD/MM/YYYY"
                value={value}
                onChange={onChange}
                inputRef={ref}
                renderInput={(params) => (
                  <TextField
                    {...params}   
                    fullWidth                   
                  />
                )}
              />
          </LocalizationProvider>
        
          
          )}

        
             
        />          
      </Grid>

        <Grid item xs={3}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2" className="case-name-tag">
           Policy Expire Date
          </Typography>
          </Grid>
          <Grid item xs={3}>
            <Controller
            name="policyExpireDate"
            control={control}  
            render={({ field: { onChange, value,ref,name, ...field } }) => (            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            label="Policy Expire Date"
            inputFormat="DD/MM/YYYY"
            value={value}   
            onChange={onChange}   
            inputRef={ref}        
            renderInput={(params) => <TextField {...params}  
             />}    
            />

        </LocalizationProvider>
        
          )}
        />     
      <p className="policyExpDateError">{errors.policyExpireDate && '* Policy Expire Date Cannot Be Before Policy Effective Date'}  </p>    
      </Grid>


      </Grid> 


      <Grid container spacing={3} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={3}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2" className="policy-detail-tag">
            Policy status
          </Typography>
        </Grid>
        <Grid item xs={3}>
        <Controller
        name="policyStatus"
        control={control}
        render={({ field: { onChange, value } }) => (     

        <ToggleButtonGroup
              color="error"
              exclusive
              value={value} 
              onChange={onChange}
              aria-label="Platform"
            >
              <ToggleButton value="Active">Active</ToggleButton>
              <ToggleButton value="Inactive">Inactive</ToggleButton>             
            </ToggleButtonGroup>
            
        )}
      />          
        </Grid>

        
        <Grid item xs={3}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2" className="policy-detail-tag">
            Sum Assured
          </Typography>
        </Grid>
        <Grid item xs={3}>
        <Controller
        name="sumAssured"
        control={control}
        rules={{required:true,min:0,pattern:/^[0-9]+$/}}
        render={({ field: { onChange, value ,ref} }) => (
          <TextField
            id="standard-basic"
            label="Sum Assured"
            multiline
            rows={1}
            variant="standard"
            sx={{
              // "& .MuiInputLabel-root": { color: "#404040" },               
              width: "100%",            
            }}    
            // InputProps={{ disableUnderline: true }} 
            placeholder="Sum Assured"
            value={value} 
            onChange={onChange}
            error={!!errors.sumAssured}
            inputRef={ref}

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
            type="submit"          
          >
             {isEdit?"Update ":"Create " }  
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
            onClick={onLobBackBtnHandler}      
          >
           Back
          </Button>
        </div>
    </div>
 </div>
    </form>
    <ToastContainer/>
    </>
}

export default NewLobData