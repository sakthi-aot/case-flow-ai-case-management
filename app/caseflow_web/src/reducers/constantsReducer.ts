import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  caseTypes: [],
};

const constantsSlice = createSlice({
  name: "Constants",
  initialState,
  reducers: {
    setCaseTypes: (state, action) => {
      state.caseTypes = action.payload;
    },
  },
});

export const { setCaseTypes } = constantsSlice.actions;
export default constantsSlice.reducer;
