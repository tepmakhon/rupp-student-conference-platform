import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],

  pagination: null,

  loading: false,

  error: null,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",

  initialState,

  reducers: {
    setLeaderboardLoading: (
      state,

      action,
    ) => {
      state.loading = action.payload;
    },

    setLeaderboardData: (
      state,

      action,
    ) => {
      state.students = action.payload.students;

      state.pagination = action.payload.pagination;
    },

    setLeaderboardError: (
      state,

      action,
    ) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLeaderboardLoading,

  setLeaderboardData,

  setLeaderboardError,
} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
