import React, {useEffect, useState} from 'react'
import SingleCaseDetail from './singleCaseDetails/singleCaseDetail'
import "./caseHistory.scss"
import FilterMuiComponent from '../FilterMuiComponent/FilterMuiComponent';
import { setoptionsForFilter, setFilteredCaseHistory } from '../../reducers/caseHistoryReducer';
import {useDispatch,useSelector} from "react-redux";




const CaseHistory = ({caseId}) => {

  const dispatch = useDispatch();
  const [selectedCaseHistoryFilterOption, setselectedCaseHistoryFilterOption]:any = useState("");

  const selectedCaseHistory = useSelector((state:any) => state.caseHistory.caseHistory);
  const selectedFilteredCaseHistory = useSelector((state:any) => state.caseHistory.filteredCaseHistory);

  const optionsForFilter = useSelector((state:any) => state.caseHistory.optionsForFilter);


  const Filteroptions = () => {
    let arrayOfCaseHistoryTypeValues : any[] =  selectedCaseHistory
        .map((eachHistory) => eachHistory.caseHistoryType)
        .filter((value, index, self) =>
           self.indexOf(value) === index)
        .map((eachValue,index)=>{ return {id : index+1, text:eachValue}})
    arrayOfCaseHistoryTypeValues = [{"id": 0, "text" : "All"},...arrayOfCaseHistoryTypeValues]
    dispatch(setoptionsForFilter(arrayOfCaseHistoryTypeValues))
  };

    const onFilterChangehandler = (e: any) => {
      setselectedCaseHistoryFilterOption(e.target.value);
      if(e.target.value === 0)
      dispatch(setFilteredCaseHistory(selectedCaseHistory))
      else{
        dispatch(
          setFilteredCaseHistory(
            selectedCaseHistory.filter(
              (eachCaseHistory) =>
                eachCaseHistory.caseHistoryType ===
                optionsForFilter.filter(
                  (eachOptions) => eachOptions.id === e.target.value
                )[0].text
            )
          )
        );
      }

    };

    useEffect(() => {
      Filteroptions();
      console.log(optionsForFilter)
    }, [selectedCaseHistory]);

  return (
    <div className='case-history-container'>
      <header className='case-history-header'>
        <div className='case-history-header-name' onClick={()=>console.log(selectedCaseHistory)}>Case History</div>       
        <FilterMuiComponent label="Filter" selected = {selectedCaseHistoryFilterOption} options={optionsForFilter} onChnagehandler={onFilterChangehandler} />
      </header>
      {selectedFilteredCaseHistory.map(singleCaseHistory =>{
       return <SingleCaseDetail
        key={singleCaseHistory.id}
        caseHisoryData = {singleCaseHistory}
         />
      })}
    </div>
  )
}

export default CaseHistory
