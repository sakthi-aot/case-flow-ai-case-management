import React from 'react'
import SingleCaseDetail from './singleCaseDetails/singleCaseDetail'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import "./caseHistory.scss"


const CaseHistory = () => {

    const caseHistoryData = [
        {
            id:1,
            description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
            notes:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.",
            date:"2022-11-01 14:37",
            tasks:["Task 01","Task 02"],
            documents:"Document.pdf"
        },
        {
            id:2,
            description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
            notes:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.",
            date:"2022-11-01 14:38",
            tasks:["Task 01","Task 02"],
            documents:"Document.pdf"
        },
        {
            id:3,
            description:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
            notes:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.",
            date:"2022-11-01 14:37",
            tasks:["Task 01","Task 02"],
            documents:"Document.pdf"
        },
    ]

  return (
    <div>
      <header className='case-history-header'>
        <div>Case History</div>
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ m: 1, minWidth: 90, }} size="small">
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"          
                  label="Age"          
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
      </header>
      {caseHistoryData.map(singleCase =>{
       return <SingleCaseDetail
        key={singleCase.id}
        id={singleCase.id}
        description={singleCase.description}
        notes={singleCase.notes}
        tasks={singleCase.tasks}
        documents={singleCase.documents}
        date={singleCase.date}

         />
      })}
    </div>
  )
}

export default CaseHistory
