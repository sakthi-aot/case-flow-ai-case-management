import EditIcon from '@mui/icons-material/Edit';
import React from "react";
import "./PolicyHeader.scss";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { setEditLob } from "../../reducers/lobReducer";

const PolicyHeader = (props) => {
const dispatch = useDispatch();
console.log(props)

  const navigate = useNavigate();
const editCaseDetails = (id)=>{
  dispatch(setEditLob(true))

  navigate("/private/lob/"+ id+'/edit');
} 
    return (
        <div className="lob-detail-header">
          <div className="lob-id-status">
            <p className="lob-id">Policy No: {props.policy}</p>
            <p className="lob-status">{props.status}</p>
            <div className="lob-edit" 
            onClick={()=>{editCaseDetails(props.lobId)}}
            >  
          <span className="action-icon"> {<EditIcon />}</span>
              </div>
          </div>
    </div>
    )
};

export default PolicyHeader

