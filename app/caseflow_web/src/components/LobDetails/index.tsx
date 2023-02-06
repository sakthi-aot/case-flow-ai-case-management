import * as React from 'react';
import Search from "../Search"; 

import { useSelector} from "react-redux";

import { State } from "../../interfaces/stateInterface";

import PolicyHeader from '../PolicyHeader';
import "./LobDetails.scss";


const  LobDetail = ()=> {
  const lobData =   useSelector((state:State) => state.lob.selectedLob);

  return (
    <>
        <div className="details-container">
      <h1 className="title">CaseFlow</h1>
    <div className="search">
    <Search
      setSearchField={() => {}}
      dropDownArray={[]}
      setSearchColumn={() => {}}
    ></Search>
  </div>
  </div>
  <section className="lob-detail-container">
    <PolicyHeader policy ={lobData.policyNumber} status = {lobData.isActive}/>
      </section>
      <div className='lob-detail-first-row'>
      <div className='lob-detail-name'>
        <h3>Created Date</h3>
        <p>{lobData.createdDate}</p>
      </div>
      <div className='lob-detail-date'>
        <h3>Sum Assured</h3>
        <p>{lobData.sumAssured}</p>
      </div>
      <div className='lob-detail-owner'>
        <h3>Status</h3>
        <p>{lobData.isActive}</p>
      </div>
    </div>



      </>
    

  )}

  export default  LobDetail;