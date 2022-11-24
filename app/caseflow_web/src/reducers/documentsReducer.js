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
    getDocumentList: (state, action) => {
      return state.documentsList;
    },
    setSelectedDocument: (state, action) => {
      state.seletedDocument = action.payload;
    },
    getSelectedDocument: (state, action) => {
      return state.seletedDocument;
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
  getDocumentList,
  setSelectedDocument,
  getSelectedDocument
} = documentSlice.actions;
export default documentSlice.reducer;
