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
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./fileHandler.scss";
import Upload from "../Upload";
import Download from "../Download";

const FileHandler = () => {
  const [DMS, setDMS] = useState("DMS01");
  return (
    <div className="background">
      <div className="file-card">
      <div className="DMS-selector">
        <Box sx={{ minWidth: 120 ,backgroundColor: "white"}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">DMS</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={DMS}
              label="DMS"
              onChange={(event) => setDMS(event.target.value)}>
              <MenuItem value={"DMS01"}>Alfresco</MenuItem>
              <MenuItem value={"DMS02"}>S3</MenuItem>
              <MenuItem value={"DMS03"}>Share Point</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

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
          <AccordionDetails>
            <Typography>
              <Upload selectedDMS = {DMS} />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
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
        </Accordion>
      </div>
      </div>
      
    </div>
  );
};

export default FileHandler;
