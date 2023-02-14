import React,{useEffect,useState} from "react";
import Search from "../Search/Search";
import { useLocation } from 'react-router-dom'
import { useSelector, } from "react-redux";
import { State } from "../../interfaces/stateInterface";
import PolicyHeader from "../PolicyHeader/PolicyHeader";
import "./LobDetails.scss";
import moment from "moment";
import { getLobDetails } from "../../services/LOBService";
import {useDispatch} from "react-redux";
import { setSelectedLob } from "../../reducers/lobReducer";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { Typography } from "@mui/material";




const LobDetail = () => {
  const [dataForBreadCrumbs,setDataForBreadCrumbs]= useState([{text:"Home",link:"/private"}]);
  const lobData = useSelector((state: State) => state.lob.selectedLob);
  const location = useLocation();
  const dispatch = useDispatch();
  async function fetchLobDetails() {
    var matches = location.pathname.match(/(\d+)/);
    if(matches && matches[0]){
      let output = await getLobDetails(matches[0]);
      dispatch(setSelectedLob(output))
    }
  }

  useEffect(() => {
    fetchLobDetails()
  },[]);

  useEffect(() => {
    setDataForBreadCrumbs([
      {text:"Home",link:"/private"},
      {text:"Lob",link:"/private/lob"},
      {text:"LOB ID : " + lobData.id,link:"/private/lob/"+lobData.id+"details"},
    ])
  }, [lobData]);
  
  return (
    <>
      <div className="lob-details-container">
      <Typography variant="body1" className="title">CaseFlow</Typography>
        <div className="search">
          <Search
            setSearchField={() => {}}
            dropDownArray={[]}
            setSearchColumn={() => {}}
          ></Search>
        </div>
      </div>
      <section className="lob-detail-container">
      <BreadCrumbs dataForBreadCrumbs={dataForBreadCrumbs}/>

        <PolicyHeader policy={lobData.policyNumber} lobId={lobData.id} status={lobData.isActive ? "Active" : "Inctive"} />
      </section>
      <div className="lob-detail-first-row">
        <div className="lob-detail-name">
          <h3>Created Date</h3>
          <p>{moment(lobData.createdDate).format("MMMM Do YYYY")}</p>
        </div>
        <div className="lob-detail-date">
          <h3>Sum Assured</h3>
          <p>{lobData.sumAssured}</p>
        </div>
     
        <div className="lob-detail-name">
          <h3>Policy Effective Date</h3>
          <p>{moment(lobData.policyEffectiveDate).format("MMMM Do YYYY")}</p>
        </div>
        <div className="lob-detail-date">
          <h3>policy Expiry Date</h3>
          <p>{moment(lobData.policyExpiryDate).format("MMMM Do YYYY")}</p>
        </div>
      </div>

 
    </>
  );
};

export default LobDetail;
