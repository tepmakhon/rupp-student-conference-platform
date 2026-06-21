import axiosInstance from "./axios";

export const getMyProfile =
  async () => {
    const response =
      await axiosInstance.get(
        "/users/profile"
      );
    return response.data.data;
};

export const createProfile =
  async (profileData) => {
    const response =
      await axiosInstance.post(
        "/users/profile",
        profileData
      );
    return response.data;
};

export const updateProfile =
  async (profileData) => {
    const response =
      await axiosInstance.put(
        "/users/profile",
        profileData
      );
    return response.data;
};