import React, { useEffect } from 'react'
import "./CaseDetailReference.scss"
import  lobConfig from "../../../config/lob_data.json";
import { getLobDetails } from '../../../services/LOBService';
import { setSelectedCaseLOBDetails } from '../../../reducers/newCaseReducer';
import { useSelector } from 'react-redux';
import { State } from "../../../interfaces/stateInterface";
import {useDispatch} from "react-redux";
import moment from 'moment'


const getDisplayData =(key) =>{
  let object=  lobConfig.caseDetails.filter((data)=> data.databaseIdentifier == key)
  return object[0];

}



interface CaseDetailReferenceProps
{caseId:any}


const CaseDetailReference = ({caseId} :CaseDetailReferenceProps ) => {
  const dispatch = useDispatch();
  const selectedCase = useSelector((state:State) => state.cases.selectedCase);
  const lobData = selectedCase.lobDetails;
  // let  lobData = {}
  useEffect( () => {
    if(selectedCase.lobcaseid > 0){

    getCaseLobDetails(selectedCase.lobcaseid)
    // lobData = selectedCase.lobDetails;
          
  }
  }, [selectedCase.lobcaseid]);
  const getCaseLobDetails = async (id) =>{
    let lobDetails = await getLobDetails(id);
    if(lobDetails && lobDetails.id){
      dispatch(setSelectedCaseLOBDetails(lobDetails))
    }
  }
  return (
    <>
    <div className='case-detail-reference-first-row'>
    {lobData ? Object.keys(lobData).map((key) => <>{getDisplayData(key) ? <div key={key}>
      <div className='item'>
        <h3>{getDisplayData(key)["displayName"]}</h3>
        <p>{getDisplayData(key)["type"]=="boolean" ? (lobData[key] == true ? getDisplayData(key)["trueValueDisplayText"] : getDisplayData(key)["falseValueDisplayText"]) : (getDisplayData(key)["type"]=="Date" ? moment(lobData[key]).format('L') :lobData[key])  }</p>
      </div>
      </div> : ""}</>) : ""}
    </div>
    <div className='configurable-case-content-section'>Configurable case content</div>
    </>
  )
}

export default CaseDetailReference