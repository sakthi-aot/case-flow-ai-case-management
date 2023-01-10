import { createSlice } from "@reduxjs/toolkit";
const initialState = {
selectedCase : {
  id : 0,
  name : "",
   description :  "" ,
   status : "",
   isEdit: false,
   lobDetails:{}
},
caseList : [{
  id : 0,
  name : "",
   description :  "" ,
   status : ""
}],
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
  setSelectedCaseLOBDetails: (state, action) => {
    state.selectedCase.lobDetails = action.payload;
},

  }
});

export const {
  setCaseList,
  setSelectedCase,
  resetSelectedCase,
  setSelectedCaseLOBDetails,
} = caseSlice.actions;
export default caseSlice.reducer;
