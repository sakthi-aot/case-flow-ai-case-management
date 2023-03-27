import { createSlice } from "@reduxjs/toolkit";
import { Auth, AuthState } from "../interfaces/stateInterface";
const initialState: AuthState = {
  token: "",
  roles: "",
  userDetails: {
    email: "",
    userName: "",
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state: Auth, action) => {
      state.token = action.payload;
    },

    setRoles: (state: Auth, action) => {
      state.roles = action.payload;
    },

    setUserDetails: (state: Auth, action) => {
      state.userDetails = {
        ...state.userDetails,
        userName: action.payload.preferred_username,
      };
    },

    setAuthenticated: (state: Auth, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: {
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { setAuthToken, setRoles, setUserDetails, setAuthenticated } =
  authSlice.actions;
export default authSlice.reducer;
