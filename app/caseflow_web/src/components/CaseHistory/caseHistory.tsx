import React from 'react'
import SingleCaseDetail from './singleCaseDetails/singleCaseDetail'
import "./caseHistory.scss"
import FilterMuiComponent from '../FilterMuiComponent/FilterMuiComponent';


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

    const optionsForFilter = ["name","date","owner"]
    const onFilterChangehandler = (e:any) =>{
      console.log("chnaged")
    }

  return (
    <div className='case-history-container'>
      <header className='case-history-header'>
        <div className='case-history-header-name'>Case History</div>       
        <FilterMuiComponent label="Filter" options={optionsForFilter} onChnagehandler={onFilterChangehandler} />
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
