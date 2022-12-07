import { createSlice } from "@reduxjs/toolkit";
const initialState = {
isShowLoader : false,
};

const appSlice = createSlice({
  name: "Application",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isShowLoader = action.payload;
    },


  }
});

export const {
    setLoader,
} = appSlice.actions;
export default appSlice.reducer;
