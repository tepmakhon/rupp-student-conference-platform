import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],

  currentEvent: null,

  myEvents: [],

  registrations: [],

  loading: false,

  error: null,

  filters: {
    search: "",
    category: "",
  },

  pagination: {
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  },
};

const eventSlice = createSlice({
  name: "events",

  initialState,

  reducers: {

    setEvents: (
      state,
      action
    ) => {

      state.events =
        Array.isArray(
          action.payload
        )
        ? action.payload
        : [];

    },

    setCurrentEvent: (
      state,
      action
    ) => {

      state.currentEvent =
        action.payload;

    },

    setMyEvents: (
      state,
      action
    ) => {

      state.myEvents =
        Array.isArray(
          action.payload
        )
        ? action.payload
        : [];

    },

    setRegistrations: (
      state,
      action
    ) => {

      state.registrations =
        Array.isArray(
          action.payload
        )
        ? action.payload
        : [];

    },

    setEventLoading: (
      state,
      action
    ) => {

      state.loading =
        action.payload;

    },

    setEventError: (
      state,
      action
    ) => {

      state.error =
        action.payload;

    },

    setFilters: (
      state,
      action
    ) => {

      state.filters = {

        ...state.filters,

        ...action.payload,

      };

    },

    setPagination: (
      state,
      action
    ) => {

      state.pagination =
        action.payload;

    },

    clearCurrentEvent: (
      state
    ) => {

      state.currentEvent =
        null;

    },

  },

});

export const {

  setEvents,

  setCurrentEvent,

  setMyEvents,

  setRegistrations,

  setEventLoading,

  setEventError,

  setFilters,

  setPagination,

  clearCurrentEvent,

} = eventSlice.actions;

export default eventSlice.reducer;