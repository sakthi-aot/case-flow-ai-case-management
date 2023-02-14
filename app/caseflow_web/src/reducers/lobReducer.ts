import { createSlice } from "@reduxjs/toolkit";
import { PAGINATION_TAKE } from "../apiManager/endpoints/config";

const initialState = {
    lobList : [{
        sumAssured : 0,
        policyNumber : "",
        createdDate :  "" ,
        isActive : ""
      }],
      selectedLob:{
        id:0,
        sumAssured : 0,
        policyNumber : "",
        createdDate :  "" ,
        isActive : "",
        policyExpiryDate:"Date",
        policyEffectiveDate:"Date",
      },
      totalLobCount:1,
      pageSelected:1,
      editLob:false,
}
const lobSlice = createSlice({
    name:"lob",
    initialState,
    reducers:{
        setLobList:(state,action)=>{
            state.lobList = action.payload;
        },
        setLobTotalCount:(state,action) =>{     
            const TotalPage = Math.ceil(action.payload/Number (PAGINATION_TAKE))        
             state.totalLobCount = TotalPage;
        },
        setSelectedLob:(state,action)=>{
            state.selectedLob = action.payload;
        },
        setEditLob:(state,action)=>{
            state.editLob = action.payload;
        },
  
    }
});


export const {
    setLobList,
    setLobTotalCount,
    setSelectedLob,
    setEditLob,
  } = lobSlice.actions;
  export default lobSlice.reducer;