import axiosInstance from "./axios";

export const getMyBadges =
async () => {

  const response =
    await axiosInstance.get(
      "/badges/me"
    );

  return response.data.data;

};