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
    getLoader: (state, action) => {
      return state.isShowLoader;
    },

  }
});

export const {
    setLoader,
    getLoader,

} = appSlice.actions;
export default appSlice.reducer;
