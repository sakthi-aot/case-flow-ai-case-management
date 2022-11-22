import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";

const NewCase = () => {
  const { handleSubmit, reset, control,register } = useForm();
  const onSubmit = (data) => console.log(data);


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
              value={value} 
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
            style={{
              width: "100%",
            }}
            placeholder="Enter the details of the Case"
            value={value} 
            onChange={onChange}
          />
        )}
      />
          
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={4}>
          <Typography sx={{ padding: "1rem 1rem 0rem 0rem" }} variant="body2">
            Attach Documents :
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <input type="file" id="actual-btn" {...register("file")} hidden />

          <Button
            style={{
              width: "100%",
              height: "3.4375rem",
              border:"1px solid #404040"
            }}
            variant="outlined"
          >
            <label
              htmlFor="actual-btn"
              style={{
                width: "100%",
                color:"#404040"
              }}
            >
              Choose File
            </label>
          </Button>
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
