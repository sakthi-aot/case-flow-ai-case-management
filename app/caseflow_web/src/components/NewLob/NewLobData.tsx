
import React, {useEffect} from "react";
import Search from "../Search";

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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "./NewLobData.scss"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker/DesktopDatePicker";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { createNewLob, updateLob } from "../../services/LOBService";
import { setEditLob } from "../../reducers/lobReducer";
import { State } from "../../interfaces/stateInterface";
import { setSelectedLob } from "../../reducers/lobReducer";



let defaultValues ={}


const NewLobData = () =>{
  const dispatch = useDispatch();   
   const selectedLob = useSelector((state: State) => state.lob.selectedLob);
   const isEdit = useSelector((state: State) => state.lob.editLob);
    if(isEdit){
       defaultValues = {
      policyNumber:selectedLob?.policyNumber,    
      policyEffectiveDate:selectedLob?.policyEffectiveDate,
      policyExpireDate:selectedLob?.policyExpiryDate,
      policyStatus:selectedLob?.isActive,
      sumAssured:selectedLob?.sumAssured
  }
}
  else{
     defaultValues = {
      policyNumber:"",    
      policyEffectiveDate:new Date(),
      policyExpireDate:new Date(),
      policyStatus:"Active",
      sumAssured:0
    }

  }


    const {handleSubmit,reset,setValue,control,formState:{errors}} = useForm({defaultValues});
    
    const navigate = useNavigate()



    let dropDownArrayItem:string[]=[];
    const serachField =(e:any) =>{
      console.log("serachField")
    }
    const SearchColumn = (e:any) =>{
      console.log("setSearchColumn")
    }



    const onSubmitHandler = async (data) => {
      if (isEdit) {
        data.id = Number(selectedLob.id)
        const response = await updateLob(data).catch((err) => {
          console.log(err);
          toast.error("Error ");
        });
        reset();
        toast.success("Successfully Updated the Lob");
        navigate("/private/lob/"+ response.id+'/details');
      } else {
        const response = await createNewLob(data).catch((err) => {
          console.log(err);
          toast.error("Error ");
        });
        reset();
        toast.success("Successfully Created New Lob");
        dispatch(setSelectedLob(response))
        navigate("/private/lob/"+ response.id+'/details');
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
      <h1 className="title-t">CaseFlow</h1> 
      <div className="search">
      <Search setSearchField={serachField} dropDownArray={dropDownArrayItem} setSearchColumn={SearchColumn}/>
      </div>    


    <div className="lob-main-container">
        <div style={{ padding: "2rem 3rem 0rem 8rem" }} className="newOrupdateLobBlock">
      <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="h6" className="lob-heading">
      {isEdit?"Update ":"Create " }New Lob  
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
            rules={{required:true}}
            render={({ field: { onChange, value ,ref}  }) => (
            <TextField
              id="standard-basic"
              label="Policy Number"
              variant="standard"             
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
            label="Effective Date"
            inputFormat="DD/MM/YYYY"
            value={value} 
            onChange={onChange}
            inputRef={ref}
            
            renderInput={(params) => <TextField {...params}   />} 
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
            render={({ field: { onChange, value } }) => (            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
            label="Expire Date"
            inputFormat="DD/MM/YYYY"
            value={value} 
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}              />

        </LocalizationProvider>
          )}
        />          
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
        render={({ field: { onChange, value } }) => (
          <TextField
            id="standard-basic"
            label="Sum Assured"
            multiline
            rows={1}
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": { color: "#404040" },
              borderBottom: "1px solid #404040",  
              width: "100%",            
            }}    
            InputProps={{ disableUnderline: true }} 
            placeholder="Sum Assured"
            value={value} 
            onChange={onChange}
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