import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opportunities: [],
  selectedOpportunity: null,
  savedOpportunities: [],
  loading: false,
  error: null,
};

const opportunitySlice = createSlice({
  name: "opportunity",

  initialState,

  reducers: {
    setOpportunities: (state, action) => {
      state.opportunities = action.payload;

      state.error = null;
    },

    setSelectedOpportunity: (state, action) => {
      state.selectedOpportunity = action.payload;

      state.error = null;
    },

    setSavedOpportunities: (state, action) => {
      state.savedOpportunities = action.payload;
    },

    addSavedOpportunity: (state, action) => {
      state.savedOpportunities.unshift(action.payload);
    },

    removeSavedOpportunity: (state, action) => {
      state.savedOpportunities = state.savedOpportunities.filter(
        (item) => item.opportunityId !== action.payload,
      );
    },

    setOpportunityLoading: (state, action) => {
      state.loading = action.payload;
    },

    setOpportunityError: (state, action) => {
      state.error = action.payload;
    },

    clearSelectedOpportunity: (state) => {
      state.selectedOpportunity = null;
    },

    clearOpportunityState: (state) => {
      state.opportunities = [];
      state.selectedOpportunity = null;
      state.savedOpportunities = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setOpportunities,
  setSelectedOpportunity,
  setSavedOpportunities,
  addSavedOpportunity,
  removeSavedOpportunity,
  setOpportunityLoading,
  setOpportunityError,
  clearSelectedOpportunity,
  clearOpportunityState,
} = opportunitySlice.actions;

export default opportunitySlice.reducer;
