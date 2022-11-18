import React from 'react'
import "./CaseDetailReference.scss"

const CaseDetailReference = ({docketNum,courtRef}) => {
  return (
    <>
    <div className='case-detail-reference-first-row'>
      <div>
        <h3>Docket Number</h3>
        <p>{docketNum}</p>
      </div>
      <div>
        <h3>Court Reference</h3>
        <p>{courtRef}</p>
      </div>
    </div>
    <div className='configurable-case-content-section'>Configurable case content</div>
    </>
  )
}

export default CaseDetailReference
