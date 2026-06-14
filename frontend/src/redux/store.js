import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice.js";
import notificationReducer from "./slices/notificationSlice";
import eventReducer from "./slices/eventSlice";
import opportunityReducer from "./slices/opportunitySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    notifications: notificationReducer,
    events: eventReducer,
    opportunities: opportunityReducer,
  },
});