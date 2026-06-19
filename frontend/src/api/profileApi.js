import axiosInstance

from "./axios";

export const getMyProfile =

async () => {

  const response =

  await axiosInstance.get(

    "/profile/me"

  );

  return response.data.data;

};

export const updateMyProfile =

async (data) => {

  const response =

  await axiosInstance.put(

    "/profile/me",

    data

  );

  return response.data.data;

};