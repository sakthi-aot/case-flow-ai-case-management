import { createSlice } from "@reduxjs/toolkit";
const initialState = {
userTasksList : []
};

const taskSlice = createSlice({
  name: "Tasks",
  initialState,
  reducers: {
    setUserTaskList: (state, action) => {
      state.userTasksList = action.payload;
    },
  }
});

export const {
  setUserTaskList,
} = taskSlice.actions;
export default taskSlice.reducer;
