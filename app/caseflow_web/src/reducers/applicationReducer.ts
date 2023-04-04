import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isShowLoader: false,
  progressBarStatus: 0,
  advanceSearchResult: {
    searchResult: [],
    totalCount: 0,
  },
};

const appSlice = createSlice({
  name: "Application",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isShowLoader = action.payload;
    },
    setProgress: (state, action) => {
      state.progressBarStatus = action.payload;
    },
    setadvanceSearchResult: (state, action) => {
      state.advanceSearchResult = action.payload;
    },
  },
});

export const { setLoader, setProgress, setadvanceSearchResult } =
  appSlice.actions;
export default appSlice.reducer;
