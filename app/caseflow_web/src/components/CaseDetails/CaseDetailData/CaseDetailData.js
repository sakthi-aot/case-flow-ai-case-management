import React from 'react'
import "./CaseDetailData.scss"

const CaseDetailData = ({name,date,owner,caseDescription,tasks}) => {
  return (
    <>
    <div className='case-detail-first-row'>
      <div className='case-detail-name'>
        <h3>Case name</h3>
        <p>{name}</p>
      </div>
      <div className='case-detail-date'>
        <h3>Start Date</h3>
        <p>{date}</p>
      </div>
      <div className='case-detail-owner'>
        <h3>Owner</h3>
        <p>{owner}</p>
      </div>
    </div>
    <div className='case-detail-second-row'>
      <h3>Case Description</h3>
      <p>{caseDescription}</p>
    </div>
    <div className='case-detail-third-row'>
      <h3>Current Task(s)</h3>
      {tasks.map((task,index)=><p key={index}>{task}</p>)}
    </div>
    </>
  )
}

export default CaseDetailData
