import {
  createSlice,
} from "@reduxjs/toolkit";

const initialState = {

  stats: null,

  loading: false,

  error: null,
};

const dashboardSlice =
  createSlice({

    name: "dashboard",

    initialState,

    reducers: {

      setDashboardLoading:
        (state, action) => {

          state.loading =
            action.payload;
        },

      setDashboardStats:
        (state, action) => {

          state.stats =
            action.payload;
        },

      setDashboardError:
        (state, action) => {

          state.error =
            action.payload;
        },
    },
  });

export const {

  setDashboardLoading,

  setDashboardStats,

  setDashboardError,

} = dashboardSlice.actions;

export default dashboardSlice.reducer;