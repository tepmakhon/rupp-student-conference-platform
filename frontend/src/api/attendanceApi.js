import axiosInstance from "./axios";

export const scanAttendance = async (
  registrationId
) => {

  const response =
    await axiosInstance.post(

      "/attendance/scan",

      {
        registrationId,
      }

    );

  return response.data.data;

};

export const getMyAttendance =
async () => {

  const response =
    await axiosInstance.get(
      "/attendance/my"
    );

  return response.data.data;

};