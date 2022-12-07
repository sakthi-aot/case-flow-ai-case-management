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

    setSelectedCase: (state, action) => {
        state.selectedCase = action.payload;
    },

  }
});

export const {
  setCaseList,
  setSelectedCase,
} = caseSlice.actions;
export default caseSlice.reducer;
