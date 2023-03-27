import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userTasksList: [],
  totalTaskCount: 0,
  pageSelected: 1,
};

const taskSlice = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    setUserTaskList: (state, action) => {
      state.userTasksList = action.payload;
    },
    setTotalTaskCount: (state, action) => {
      state.totalTaskCount = action.payload;
    },
    setPageSelected: (state, action) => {
      state.pageSelected = action.payload;
    },
  },
});

export const { setUserTaskList, setTotalTaskCount, setPageSelected } =
  taskSlice.actions;
export default taskSlice.reducer;
