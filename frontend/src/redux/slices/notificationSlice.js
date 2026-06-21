import {

  createSlice,

} from "@reduxjs/toolkit";

const initialState = {

  notifications: [],

  unreadCount: 0,

  loading: false,

  error: null,

  filter: "ALL",

  pagination: {

    page: 1,

    limit: 10,

    total: 0,

    totalPages: 1,

  },

};

const notificationSlice =

createSlice({

  name:

  "notification",

  initialState,

  reducers: {

    setNotifications:

    (

      state,

      action

    ) => {

      const payload =

      action.payload ||

      {};

      state.notifications =

      payload

      .userNotifications

      || [];

      state.pagination =

      payload

      .pagination

      || {

        page:1,

        limit:10,

        total:0,

        totalPages:1,

      };

      state.unreadCount =

      state.notifications

      .filter(

        item =>

        !item.isRead

      )

      .length;

    },

    addNotification:

    (

      state,

      action

    ) => {

      state.notifications

      .unshift(

        action.payload

      );

      state.unreadCount += 1;

    },

    markAsRead:

    (

      state,

      action

    ) => {

      const notification =

      state.notifications

      .find(

        item =>

        item.id ===

        action.payload

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

    markAllAsRead:

    (

      state

    ) => {

      state.notifications =

      state.notifications

      .map(

        item => ({

          ...item,

          isRead:true,

        })

      );

      state.unreadCount = 0;

    },

    clearNotifications:

    (

      state

    ) => {

      state.notifications = [];

      state.unreadCount = 0;

    },

    setNotificationLoading:

    (

      state,

      action

    ) => {

      state.loading =

      action.payload;

    },

    setNotificationError:

    (

      state,

      action

    ) => {

      state.error =

      action.payload;

    },

    setFilter:

    (

      state,

      action

    ) => {

      state.filter =

      action.payload;

    },

    setPagination:

    (

      state,

      action

    ) => {

      state.pagination =

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

  setNotificationError,

  setFilter,

  setPagination,

} =

notificationSlice.actions;

export default

notificationSlice.reducer;