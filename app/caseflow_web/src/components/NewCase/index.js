import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";

const NewCase = () => {
  const [file, setFile] = useState("");
  const [caseName, setCaseName] = useState("");
  const [caseDescription, setCaseDescription] = useState("");

  function caseNameChange(event) {
    setCaseName(event.target.value); //set the filename from text box if name is alterded
  }
  const onDescriptionchange = (event) => {
    event.target.value == null
      ? setCaseDescription("My text document description...")
      : setCaseDescription(event.target.value);
  };
  function handleUpload(event) {
    setFile(event.target.files[0]); //set file into state
  }

  const onSubmitHandler = () => {
    //call the assosiated services to handle the upload here
  
    console.log(file,caseName,caseDescription)
  };
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
          <TextField
            id="standard-basic"
            label="Case Name"
            variant="outlined"
            style={{
              width: "100%",
            }}
            value={caseName}
            onChange={caseNameChange}
            placeholder="File Name..."
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
            value={caseDescription}
            onChange={onDescriptionchange}
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
          <input type="file" id="actual-btn" onChange={handleUpload} hidden />

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
              {file === "" ? "Choose File" : "replace file"}
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
            onClick={onSubmitHandler}
          >
            Upload file
          </Button>
        </div>
    </div>
  );
};

export default NewCase;
