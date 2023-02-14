import React from 'react'
import NewCase from './NewCase'
import Search from '../Search/Search'
import "./NewCaseComponent.scss"
import { Typography } from '@mui/material'

const NewCaseComponent = () => {
 
  let dropDownArrayItem:string[]=[];
  const serachField =(e:any) =>{
    console.log("serachField")
  }
  const SearchColumn = (e:any) =>{
    console.log("setSearchColumn")
  }
  return (
    <div className="dashboard">
      <Typography variant="body1" className="title">CaseFlow</Typography>
      <div className="search">
      <Search setSearchField={serachField} dropDownArray={dropDownArrayItem} setSearchColumn={SearchColumn}/>
      </div>     
        <div className="recent-cases"><NewCase/></div>
    </div>
  )
}

export default NewCaseComponent
