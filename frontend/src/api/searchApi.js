import axiosInstance from "./axios";

export const globalSearch = async (keyword) => {
  const response = await axiosInstance.get(
    `/search?q=${encodeURIComponent(keyword)}`,
  );

  return response.data.data;
};
