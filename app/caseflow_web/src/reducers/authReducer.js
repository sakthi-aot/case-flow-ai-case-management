import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  roles: "",
  userDetails: {
    email: "",
    userName:""
  }, 
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    getAuthToken: (state, action) => {
      return state.token;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    getRoles: (state, action) => {
      return state.roles;
    },
    setUserDetails: (state, action) => { 
      state.userDetails={
        ...state.userDetails,
        userName:action.payload.preferred_username
      }     
    },
    getUserDetails: (state, action) => {
      return state.userDetails;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    getAuthenticated: (state, action) => {
      return state.isAuthenticated;
    },
  },
  extraReducers: {
    logout: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  setAuthToken,
  getAuthToken,
  setRoles,
  getRoles,
  setUserDetails,
  getUserDetails,
  setAuthenticated,
  getAuthenticated,
} = authSlice.actions;
export default authSlice.reducer;
