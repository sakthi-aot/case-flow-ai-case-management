import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import "./FilterMuiComponent.scss"

interface FilterMuiComponentProps{
  label:any,
  options:any[],
  onChnagehandler:any,selected : any}


const FilterMuiComponent = ({label,options,onChnagehandler,selected}:FilterMuiComponentProps) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
        {/* <InputLabel id="demo-multiple-chip-label">{label}</InputLabel> */}

        <Select
          label="Age"
          value={selected}
          onChange={onChnagehandler}
          className="dropDownStyle"
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={option.id}
              sx={{
                borderTop: 1,
                borderColor: "#E2E2E2",
                paddingBlock: "1rem",
              }}
            >
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterMuiComponent
