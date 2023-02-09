import React, { useState } from 'react';
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from '@mui/icons-material/Add';

import { v4 as uuidv4 } from 'uuid';


const MetaDataDetails = (props) => {

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), MetadataField: '', MetadataValue: '' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(),  MetadataField: '', MetadataValue: '' }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }
  return (
    <Container>
  
      <form onSubmit={handleSubmit}>
        { inputFields.map(inputField => (
          <div key={inputField.id}>
            <TextField
              id="outlined-multiline-static"
              name="MetadataField"
              label="Metadata Field"
              variant="standard"
              sx={{
                "& .MuiInputLabel-root": { color: "#404040" },
                borderBottom: "1px solid #404040",  
                        
              }}    
              value={inputField.MetadataField}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <TextField
              name="MetadataValue"
              label="Metadata Value"
              variant="standard"
              sx={{
                "& .MuiInputLabel-root": { color: "#404040" },
                borderBottom: "1px solid #404040",  
                      
              }}    
              value={inputField.MetadataValue}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        )) }
        <Button
        
          variant="contained" 
          color="primary" 
          type="submit" 
          onClick={handleSubmit}
        >Send</Button>
      </form>
    </Container>
  );
}


export default MetaDataDetails;