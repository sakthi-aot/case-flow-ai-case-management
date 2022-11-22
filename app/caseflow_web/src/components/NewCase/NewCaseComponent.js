import React from 'react'
import NewCase from '.'
import Search from '../Search'
import "./NewCaseComponent.scss"

const NewCaseComponent = () => {
  return (
    <div className="dashboard">
      <h1 className="title">CaseFlow</h1> 
      <div className="search">
      <Search/>
      </div>     
        <div className="recent-cases"><NewCase/></div>
    </div>
  )
}

export default NewCaseComponent
