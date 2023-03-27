import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  caseTypes: [],
  caseStatuses: [],
};

const constantsSlice = createSlice({
  name: "Constants",
  initialState,
  reducers: {
    setCaseTypes: (state, action) => {
      state.caseTypes = action.payload;
    },
    setCaseStatuses: (state, action) => {
      state.caseTypes = action.payload;
    },
  },
});

export const { setCaseTypes, setCaseStatuses } = constantsSlice.actions;
export default constantsSlice.reducer;
