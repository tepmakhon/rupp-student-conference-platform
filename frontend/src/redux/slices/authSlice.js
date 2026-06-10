import { createSlice } from "@reduxjs/toolkit";

const token =
  localStorage.getItem("token");

const initialState = {
  user: null,
  token,
  role: null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    loginSuccess: (state, action) => {

      console.log(
        "TOKEN SAVED:",
        action.payload.token
      );

      state.user =
        action.payload.user;

      state.token =
        action.payload.token;

      state.role =
        action.payload.user?.role?.roleName ||
        null;

      state.isAuthenticated =
        true;

      localStorage.setItem(
        "token",
        action.payload.token
      );
    },

    logout: (state) => {

      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;

      localStorage.removeItem(
        "token"
      );
    },
  },
});

export const {
  loginSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;