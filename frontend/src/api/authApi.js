import axiosInstance from "./axios";

export const loginUser = async (userData) => {

  const response = await axiosInstance.post(
    "/auth/login",
    userData
  );

  return response.data;
};