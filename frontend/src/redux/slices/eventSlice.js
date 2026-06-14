import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  selectedEvent: null,
  registeredEvents: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",

  initialState,

  reducers: {

    setEvents: (
      state,
      action
    ) => {

      state.events =
        action.payload;

      state.error = null;
    },

    setSelectedEvent: (
      state,
      action
    ) => {

      state.selectedEvent =
        action.payload;

      state.error = null;
    },

    setRegisteredEvents: (
      state,
      action
    ) => {

      state.registeredEvents =
        action.payload;
    },

    addRegisteredEvent: (
      state,
      action
    ) => {

      state.registeredEvents.unshift(
        action.payload
      );
    },

    removeRegisteredEvent: (
      state,
      action
    ) => {

      state.registeredEvents =
        state.registeredEvents.filter(
          (item) =>
            item.eventId !==
            action.payload
        );
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

    clearSelectedEvent: (
      state
    ) => {

      state.selectedEvent =
        null;
    },

    clearEventState: (
      state
    ) => {

      state.events = [];
      state.selectedEvent = null;
      state.registeredEvents = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setEvents,
  setSelectedEvent,
  setRegisteredEvents,
  addRegisteredEvent,
  removeRegisteredEvent,
  setEventLoading,
  setEventError,
  clearSelectedEvent,
  clearEventState,
} = eventSlice.actions;

export default eventSlice.reducer;