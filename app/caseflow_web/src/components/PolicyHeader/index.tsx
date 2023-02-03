import FilterMuiComponent from "../FilterMuiComponent/FilterMuiComponent";
import EditIcon from '@mui/icons-material/Edit';
import React,{ useState } from "react";
import "./PolicyHeader.scss";

const PolicyHeader = (props) => {


  
  const [selected, setSelected] = useState(0);
  const [isOpenPopup,setOpenPopup] = useState(false);
  
  const optionsForAction = [{id : 0, code :'1' ,text: "Select Action"},
    {id : 1, code :'1' ,text: "Start Workflow"},
    {id : 2, code :2 ,text: "Wake"},
    {id : 3, code :3 ,text: "Pending"},
    {id : 4, code :4 ,text: "Complete"},
    {id : 5, code :5 ,text: "Merge"},
    {id : 6, code :6 ,text: "Archive"},
    {id : 7, code :7 ,text: "Upload Document"},
    {id : 8, code :8 ,text: "Delete"},
  ];

  const onActionChangehandler = async (e: any) => {

    setSelected(e.target.value)
    switch(e.target.value){
      case 2:{
        return changeStatus(1) // Wake
      }
      case 3:{
        return changeStatus(2) // Pending
      }
      case 4:{
        return changeStatus(3) // Complete
      }
      case 7 : {
       return setOpenPopup(true);
      }
    }
  };

  const changeStatus = async (status) =>{
    // setConfirmationText("Do you want to change the status of the case?")
    // setOpenConfirmationPopup(true);
    // setNewStatus(status);
  }



    return (
        <div className="case-detail-header">
          <div className="case-id-status">
            <p className="case-id">Policy No:{props.policy}</p>
            <p className="case-status">{props.status}</p>
          <div className="case-edit" /*onClick={()=>{editCaseDetails(selectedCase)}}*/>  
            <span className="action-icon"> {<EditIcon />}</span>
          </div>
           
          </div>
          <FilterMuiComponent
            label="Action"
            options={optionsForAction}
            onChnagehandler={onActionChangehandler}
            selected ={selected}
          />
    </div>
    )
};

export default PolicyHeader

