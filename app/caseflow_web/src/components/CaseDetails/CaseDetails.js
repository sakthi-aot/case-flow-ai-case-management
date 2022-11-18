import React from 'react'
import FilterMuiComponent from '../FilterMuiComponent/FilterMuiComponent'
import CaseDetailData from './CaseDetailData/CaseDetailData'
import CaseDetailReference from './CaseDetailReference/CaseDetailReference'
import "./CaseDetails.scss"
import Search from '../Search'
import CaseHistory from '../CaseHistory/caseHistory'

const CaseDetails = () => {
  const caseDetail ={
    id:"26111245",
    status:"OPEN",
    name:"Deer poaching Shawinigan Lake",
    date:"2022-11-01",
    owner:"Chris Robinson",
    caseDescription:"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    tasks:["Send for approval 1","Send for approval 2"],
    docketNum:"1234",
    courtRef:"2022-11-01"
  }
  const optionsForAction = ["Start Workflow","Wake","Complete","Merge"]
  const onActionChangehandler = (e) =>{
    console.log("Chnaged")
  }
  <div className="header">
      <div className="title"><h1>CaseFlow</h1> </div>
      <div className="search">
      <Search></Search>
      </div>
    </div>

  return (
    <div className='details-container'>
      <div className="title"><h1>CaseFlow</h1> </div>
      <div className="search">
      <Search></Search>
      </div>
    
    <div className='case-detail-container'>

    <div className='case-detail-header'>
        <div className='case-id-status'>
            <p className='case-id'>Case ID :{caseDetail.id}</p>
            <p className='case-status'>{caseDetail.status}</p>
        </div>
        <FilterMuiComponent label="Action" options={optionsForAction} onChnagehandler={onActionChangehandler} />

    </div>
    <CaseDetailData name={caseDetail.name} date={caseDetail.date} owner={caseDetail.status} caseDescription={caseDetail.caseDescription} tasks={caseDetail.tasks} />
    <CaseDetailReference docketNum={caseDetail.docketNum} courtRef={caseDetail.courtRef} />
    </div>
    <div className='case-history-container'>
      <CaseHistory></CaseHistory>
      </div>
    </div>
  )
}

export default CaseDetails
