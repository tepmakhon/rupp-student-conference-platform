import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,

  loading: false,

  error: null,
};

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    setProfileLoading: (state, action) => {
      state.loading = action.payload;
    },

    setProfileData: (state, action) => {
      state.profile = action.payload;
    },

    setProfileError: (state, action) => {
      state.error = action.payload;
    },

    clearProfile: (state) => {
      state.profile = null;

      state.error = null;

      state.loading = false;
    },
  },
});

export const {
  setProfileLoading,

  setProfileData,

  setProfileError,

  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
