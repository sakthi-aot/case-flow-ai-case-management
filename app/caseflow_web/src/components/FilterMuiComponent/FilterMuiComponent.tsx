import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'

interface FilterMuiComponentProps{
  label:any,
  options:any[],
  onChnagehandler:any}


const FilterMuiComponent = ({label,options,onChnagehandler}:FilterMuiComponentProps) => {
  return (
    <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 90, }} size="small">
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"          
                  label="Age"    
                  onChange={onChnagehandler}      
                >
                   {options.map((option,index) => <MenuItem key={index} value={option}>{option}</MenuItem>)}                  
                </Select>
            </FormControl>
        </Box>
  )
}

export default FilterMuiComponent
