import { createSlice } from "@reduxjs/toolkit";
const initialState = {
selectedCase : {
  id : 0,
  name : "",
   description :  "" ,
   status : "",
   isEdit: false
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

    setSelectedCase: (state, action) => {
        state.selectedCase = action.payload;
    },
    resetSelectedCase: (state) => {
      state.selectedCase = initialState.selectedCase;
  },

  }
});

export const {
  setCaseList,
  setSelectedCase,
  resetSelectedCase,
} = caseSlice.actions;
export default caseSlice.reducer;
