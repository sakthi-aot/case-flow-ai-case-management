import { createSlice } from "@reduxjs/toolkit";
import { PAGINATION_TAKE } from "../apiManager/endpoints/config";
const initialState = {
  documentsList: [],
  seletedDocument: null,
  totalPageCount:1,
  documentsSearchResult:{},
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
    setTotalDocumentPageCount:(state,action) =>{
      const TotalPage = Math.ceil(action.payload/Number (PAGINATION_TAKE))        
      state.totalPageCount = TotalPage;
    },
    setsearchDocumentResult : (state,action) =>{
      state.documentsSearchResult =action.payload
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
  setTotalDocumentPageCount,
  setsearchDocumentResult,
} = documentSlice.actions;
export default documentSlice.reducer;
