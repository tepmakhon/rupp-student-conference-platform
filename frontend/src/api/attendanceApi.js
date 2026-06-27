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

export const getMyAttendance = async () => {

  const response =
    await axiosInstance.get(
      "/attendance/my"
    );

  return response.data.data;

};

export const getAttendanceStatistics =
async (eventId) => {

  const response =
    await axiosInstance.get(
      `/attendance/statistics/${eventId}`
    );

  return response.data.data;

};

export const exportAttendanceCSV =
async (eventId) => {

  const response =
    await axiosInstance.get(
      `/attendance/export/${eventId}/csv`,
      {
        responseType: "blob",
      }
    );

  return response.data;

};

export const exportAttendancePDF =
async (eventId) => {

  const response =
    await axiosInstance.get(
      `/attendance/export/${eventId}/pdf`,
      {
        responseType: "blob",
      }
    );

  return response.data;

};