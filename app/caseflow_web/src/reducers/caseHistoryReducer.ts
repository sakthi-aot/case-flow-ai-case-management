import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  caseHistory: [],
  filteredCaseHistory: [],
  optionsForFilter : ["loading"]

};

const setCaseHistorySlice = createSlice({
  name: "caseHistory",
  initialState,
  reducers: {
    setCaseHistory: (state, action) => {
      state.caseHistory = action.payload;
    },
    setoptionsForFilter: (state, action) => {
      state.optionsForFilter = action.payload;
    },
    setFilteredCaseHistory: (state, action) => {
      state.filteredCaseHistory = action.payload;
    },
  },
  extraReducers: {
    logout: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  setCaseHistory,
  setoptionsForFilter,
  setFilteredCaseHistory,
} = setCaseHistorySlice.actions;
export default setCaseHistorySlice.reducer;
