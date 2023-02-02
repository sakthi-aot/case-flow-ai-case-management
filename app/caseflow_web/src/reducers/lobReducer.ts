import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lobList : [{
        sumAssured : 0,
        policyNumber : "",
        createdDate :  "" ,
        isActive : ""
      }],
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
             state.totalLobCount = action.payload;
        },
    }
});


export const {
    setlobList,
    setLobTotalCount,

  } = lobSlice.actions;
  export default lobSlice.reducer;