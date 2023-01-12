import { createSlice } from "@reduxjs/toolkit";
const initialState = {
isShowLoader : false,
progressBarStatus : 0,
};

const appSlice = createSlice({
  name: "Application",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isShowLoader = action.payload;
    },
    setProgress : (state, action) => {
      state.progressBarStatus = action.payload;
    },


  }
});

export const {
    setLoader,
    setProgress,
} = appSlice.actions;
export default appSlice.reducer;
