import { Typography } from '@mui/material'
import React from 'react'
import "./CaseDetailData.scss"

interface CaseDetailDataProps {
  name:String,
  date:any,
  owner:String,
  caseDescription:String,
  tasks:any,
  caseType: any,
  lobcaseid : number
}

const CaseDetailData = ({name,date,owner,caseDescription,tasks,caseType,lobcaseid}:CaseDetailDataProps) => {
  return (
    <>
      <div className="case-details">
        <div className="case-detail-name">
          <Typography variant='body1'>
          Case name
          </Typography>
          <Typography variant='body2'>

          {name}
          </Typography>

        </div>
        <div className="case-detail-date">
          <h3>Start Date</h3>
          <p>{date}</p>
        </div>
        <div className="case-detail-owner">
          <h3>Owner</h3>
          <p>{owner}</p>
        </div>
        <div>
          <h3>Case Description</h3>
          <p>{caseDescription}</p>
        </div>
        <div>
          <h3>Case Type</h3>
          <p>{caseType?.displayname}</p>
        </div>
        <div>
          <h3>LOB ID</h3>
          <p>{lobcaseid}</p>
        </div>
      </div>
  
      <div className="case-tasks">
        <h3>Current Task(s)</h3>
        { (tasks && tasks.length) ? tasks.map((task: any, index: any) => (
          <p key={index}>{task.name}</p>
        )) : ""}
      </div>
    </>
  );
}

export default CaseDetailData
