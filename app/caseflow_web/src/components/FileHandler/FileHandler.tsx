import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "./fileHandler.scss";
import Upload from "../Upload/Upload";
import CaseDocuments from "../CaseDocuments/CaseDocuments";

const FileHandler = () => {
  const [DMS, setDMS] = useState("DMS1");
  return (
    <div className="background">
      <div className="file-card">  
      <div className="accordion">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="acordions"            
          >
            <Typography variant="h5">Upload File</Typography>
          </AccordionSummary>
          <div className="DMS-selector">
        <Box sx={{ minWidth: 120 ,backgroundColor: "white"}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">DMS</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={DMS}
              label="DMS"
              variant="standard"  
              className="styled-select"
              InputProps={{ disableUnderline: true }}             
              onChange={(event) => setDMS(event.target.value)}>
              <MenuItem value={"DMS1"}>Alfresco</MenuItem>
              <MenuItem value={"DMS2"}>S3</MenuItem>
              <MenuItem value={"DMS3"}>Share Point</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
          <AccordionDetails>
            <Typography>
              <Upload selectedDMS = {DMS} />
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            className="acordions"
          >
            <Typography variant="h5">Download File</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Download  selectedDMS = {DMS} />
            </Typography>
          </AccordionDetails>
        </Accordion> */}
      </div>
      <div className="case-document-list">
      <CaseDocuments/>

      </div>

      </div>
      
    </div>
  );
};

export default FileHandler;
