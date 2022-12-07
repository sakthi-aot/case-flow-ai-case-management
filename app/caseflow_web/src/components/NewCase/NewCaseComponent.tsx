import React from 'react'
import NewCase from '.'
import Search from '../Search'
import "./NewCaseComponent.scss"

const NewCaseComponent = () => {
 
  let dropDownArrayItem:String[]=[];
  const serachField =(e:any) =>{
    console.log("serachField")
  }
  const SearchColumn = (e:any) =>{
    console.log("setSearchColumn")
  }
  return (
    <div className="dashboard">
      <h1 className="title">CaseFlow</h1> 
      <div className="search">
      <Search setSearchField={serachField} dropDownArray={dropDownArrayItem} setSearchColumn={SearchColumn}/>
      </div>     
        <div className="recent-cases"><NewCase/></div>
    </div>
  )
}

export default NewCaseComponent
