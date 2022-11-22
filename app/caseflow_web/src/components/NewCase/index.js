import React from "react";
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
    <div style={{ padding: "2rem 15rem 0rem 15rem" }}>
      <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="h6">
        New Case
      </Typography>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <Grid container spacing={3} sx={{ padding: "2rem 1rem 2rem 1rem" }}>
        <Grid item xs={5}>
          <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="body2">
            Case Name :
          </Typography>
        </Grid>
        <Grid item xs={7}>
        <Controller
        name={"name"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id="standard-basic"
            label="Case Name"
            variant="outlined"
            style={{
              width: "100%",
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
        <Grid item xs={5}>
          <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="body2">
            Case Description :
          </Typography>
        </Grid>
        <Grid item xs={7}>
        <Controller
        name={"description"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
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
        <Grid item xs={5}>
          <Typography sx={{ padding: "1rem 1rem 1rem 1rem" }} variant="body2">
            Attach Documents :
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <input type="file" id="actual-btn" {...register("file")} hidden />

          <Button
            style={{
              width: "100%",
              height: "3.4375rem",
            }}
            variant="outlined"
          >
            <label
              htmlFor="actual-btn"
              style={{
                width: "100%",
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
