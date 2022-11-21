import { createSlice } from "@reduxjs/toolkit";
const initialState = {
selectedCase : {
  id : 0,
  name : "",
   description :  "" ,
   status : ""
},
caseList : [{
  id : 0,
  name : "",
   description :  "" ,
   status : ""
}]
};

const caseSlice = createSlice({
  name: "Cases",
  initialState,
  reducers: {
    setCaseList: (state, action) => {
      state.caseList = action.payload;
    },
    getCaseList: (state, action) => {
      return state.caseList;
    },
    setSelectedCase: (state, action) => {
        state.selectedCase = action.payload;
    },
    getSelectedCase: (state, action) => {
        return state.selectedCase;
    },
  }
});

export const {
  setCaseList,
  getCaseList,
  setSelectedCase,
  getSelectedCase


} = caseSlice.actions;
export default caseSlice.reducer;
