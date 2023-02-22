import { createSlice } from "@reduxjs/toolkit";
const initialState = {
selectedCase : {
  id : 0,
  name : "",
   description :  "" ,
   status : "",
   isEdit: false,
   lobDetails:{},
   documents:[],
   totalDocCount:0,
   tasks:[],
   additionalFields : {}
},
caseList : [{
  id : 0,
  name : "",
   description :  "" ,
   status : ""
}],
totalCaseCount:0,
pageSelected:1,
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
  setSelectedCaseDocuments: (state, action) => {
    state.selectedCase.documents = action.payload;
},
setTotalCaseCount: (state,action) => {
  state.totalCaseCount =action.payload;
},
setPageSelected : (state,action) =>{
  state.pageSelected=action.payload
},
setTotalDocCount : (state,action) =>{
  state.selectedCase.totalDocCount =action.payload
},
setCaseTasks : (state,action) =>{
  state.selectedCase.tasks =action.payload
},
setAdditionalCaseDetails : (state,action) =>{
  state.selectedCase.additionalFields =action.payload
},


  }
});

export const {
  setCaseList,
  setSelectedCase,
  resetSelectedCase,
  setSelectedCaseDocuments,
  setSelectedCaseLOBDetails,
  setTotalCaseCount,
  setPageSelected,
  setTotalDocCount,
  setCaseTasks,
  setAdditionalCaseDetails,
} = caseSlice.actions;
export default caseSlice.reducer;
