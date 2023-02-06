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
        sumAssured : 0,
        policyNumber : "",
        createdDate :  "" ,
        isActive : ""
      },
      totalLobCount:1,
      pageSelected:1,
}
const lobSlice = createSlice({
    name:"lob",
    initialState,
    reducers:{
        setlobList:(state,action)=>{
            state.lobList = action.payload;
        },
        setLobTotalCount:(state,action) =>{     
            const TotalPage = Math.ceil(action.payload/Number (PAGINATION_TAKE))        
             state.totalLobCount = TotalPage;
        },
        setSelectedLob:(state,action)=>{
            state.selectedLob = action.payload;
        },
    }
});


export const {
    setlobList,
    setLobTotalCount,
    setSelectedLob,

  } = lobSlice.actions;
  export default lobSlice.reducer;