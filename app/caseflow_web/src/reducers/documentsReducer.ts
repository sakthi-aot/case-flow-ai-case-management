import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  documentsList: [],
  seletedDocument: null,
};

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocumentList: (state, action) => {
      state.documentsList = action.payload;
    },

    setSelectedDocument: (state, action) => {
      state.seletedDocument = action.payload;
    },
  },
  extraReducers: {
    logout: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  setDocumentList,
  setSelectedDocument,
} = documentSlice.actions;
export default documentSlice.reducer;
