import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import "./FilterMuiComponent.scss"
import { Typography } from '@mui/material';

interface FilterMuiComponentProps{
  label:any,
  options:any[],
  onChnagehandler:any,selected : any}
  


const FilterMuiComponent = ({label,options,onChnagehandler,selected}:FilterMuiComponentProps) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 100,border:0}} size="small">
        <Select
          value={selected}
          onChange={onChnagehandler}
          className="dropDownStyle"
          displayEmpty 
          renderValue={(value) => value || <Typography variant='body2'sx={{paddingTop : .2}}>{label}</Typography>}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={option.text}
              sx={{
                borderTop: 1,
                borderColor: "#E2E2E2",
                paddingBlock: "1rem",
              }}
            >
              <Typography variant='body2' >{option.text}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterMuiComponent
