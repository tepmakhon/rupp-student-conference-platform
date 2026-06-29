import axiosInstance from "./axios";

export const getLeaderboard = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/leaderboard?page=${page}&limit=${limit}`,
  );
  return response.data.data;
};
