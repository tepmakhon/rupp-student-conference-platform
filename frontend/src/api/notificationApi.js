import axiosInstance from "./axios";

export const getNotifications = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/notifications?page=${page}&limit=${limit}`,
  );
  return response.data.data;
};

export const readNotification = async (id) => {
  const response = await axiosInstance.patch(`/notifications/${id}/read`);
  return response.data.data;
};

export const readAllNotifications = async () => {
  const response = await axiosInstance.patch("/notifications/read-all");
  return response.data.data;
};
