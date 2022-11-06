import React, { useState } from "react";
import "./upload.scss";
import {
  uploadCMISfile,
  updateCMISdocument,
} from "../../apiManager/services/cmisService";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";


const Upload = (props) => {
  const [response,setResponse] = useState("")
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileDescription, setFileDescription] = useState("");

  const [actionSelected, setActionSelected] = useState("upload");

  const [documentID, setDocumentID] = useState(1);

  function handleUpload(event) {
    setFile(event.target.files[0]); //set file into state
    setFileName(event.target.files[0].name); //set the filename after importing new file
  }
  function fileNameChange(event) {
    setFileName(event.target.value); //set the filename from text box if name is alterded
  }

  const onActionSelectChange = (event) => {
    setActionSelected(event.target.value);
  };
  const onSubmitHandler = () => {
    if (actionSelected === "upload") {
      const response = uploadCMISfile(file, fileName, fileDescription,props.selectedDMS);
      // if (response)
      // setResponse(response)
      // console.log()
      // console.log(response);
    }

    if (actionSelected === "update") {
      updateCMISdocument(documentID, file, fileName, fileDescription,props.selectedDMS);
    }
  };

  const onDescriptionchange = (event) => {
    event.target.value == null
      ? setFileDescription("My text document description...")
      : setFileDescription(event.target.value);
  };
  const onIDchange = (event) => {
    event.target.value == null
      ? setDocumentID(1)
      : setDocumentID(parseInt(event.target.value));
  };

  return (
    <div className="upload-grid">
      <div className="upload-left">
        <div className="upload-row">
          <input type="file" id="actual-btn" onChange={handleUpload} hidden />

          <Button
            style={{
              width: "100%",
              height: "3.4375rem",
              backgroundColor: "#1B34FB",
            }}
            variant="contained"
          >
            <label
              for="actual-btn"
              style={{
                width: "100%",
                backgroundColor: "#1B34FB",
              }}
            >
              {file === "" ? "Choose File" : "replace file"}
            </label>
          </Button>
          <TextField
            id="outlined-basic"
            label="File Name"
            variant="outlined"
            style={{
              width: "100%",
            }}
            value={fileName}
            onChange={fileNameChange}
            placeholder="File Name..."
          />
        </div>
        <div
          style={{
            "padding-top": "1rem",
            width: "100%",
          }}
        >
          {file !== "" && (
            <div
              style={{
                "padding-top": "1rem",
                width: "100%",
              }}
            >
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                style={{
                  width: "100%",
                }}
                value={fileDescription}
                onChange={onDescriptionchange}
                placeholder="My text document description..."
              />
            </div>
          )}
        </div>
        <div className="upload-type-selection">
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Choose upload
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={actionSelected}
              onChange={onActionSelectChange}
            >
              <FormControlLabel
                value="upload"
                control={<Radio />}
                label="Upload"
              />
              <FormControlLabel
                value="update"
                control={<Radio />}
                label="update"
              />
            </RadioGroup>
          </FormControl>
        </div>
        {actionSelected === "update" && (
          <div
            style={{
              "padding-top": "1rem",
              width: "100%",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Document Id"
              variant="outlined"
              style={{
                width: "100%",
              }}
              onChange={onIDchange}
              placeholder="Document ID..."
            />
          </div>
        )}

        <div className="upload-button">
          <Button
            style={{
              margin: "auto",
              color: "#1B34FB",
              height: "3.4375rem",
              width: "100%",
            }}
            variant="outlined"
            onClick={onSubmitHandler}
          >
            Upload file
          </Button>
        </div>
      </div>

      <div className="upload-right">
        <div className="display-upload-result">
          <Typography style = {{
            padding :"1rem 0rem 1rem 1rem"

          }}variant="h5" >Result : </Typography>

          <div style = {{
                      padding :"1rem 0rem 1rem 1rem",
                      width:"100%",
                      height: "100%"


                    }}>{response ? response : ""} </div>

        </div>
      </div>
    </div>
  );
};

export default Upload;
