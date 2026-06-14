import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
};

const notificationSlice = createSlice({
  name: "notification",

  initialState,

  reducers: {

    setNotifications: (
      state,
      action
    ) => {

      state.notifications =
        action.payload;

      state.unreadCount =
        action.payload.filter(
          (notification) =>
            !notification.isRead
        ).length;
    },

    addNotification: (
      state,
      action
    ) => {

      state.notifications.unshift(
        action.payload
      );

      state.unreadCount += 1;
    },

    markAsRead: (
      state,
      action
    ) => {

      const notification =
        state.notifications.find(
          (item) =>
            item.id === action.payload
        );

      if (
        notification &&
        !notification.isRead
      ) {

        notification.isRead =
          true;

        state.unreadCount -= 1;
      }
    },

    markAllAsRead: (
      state
    ) => {

      state.notifications =
        state.notifications.map(
          (notification) => ({
            ...notification,
            isRead: true,
          })
        );

      state.unreadCount = 0;
    },

    clearNotifications: (
      state
    ) => {

      state.notifications = [];

      state.unreadCount = 0;
    },

    setNotificationLoading: (
      state,
      action
    ) => {

      state.loading =
        action.payload;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  setNotificationLoading,
} = notificationSlice.actions;

export default notificationSlice.reducer;