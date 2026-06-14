import axiosInstance from "./axios";

export const getNotifications =
  async () => {

    const response =
      await axiosInstance.get(
        "/notifications"
      );

    return (
      response.data.data
        ?.userNotifications || []
    );
};

export const readNotification =
  async (id) => {

    const response =
      await axiosInstance.patch(
        `/notifications/${id}/read`
      );

    return response.data;
};

export const readAllNotifications =
  async () => {

    const response =
      await axiosInstance.patch(
        "/notifications/read-all"
      );

    return response.data;
};