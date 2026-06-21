import axiosInstance
from "./axios";

export const getMyActivityHistory =
async () => {
  const response =
    await axiosInstance.get(
      "/activity/my-history"
    );
  return response.data.data;
};