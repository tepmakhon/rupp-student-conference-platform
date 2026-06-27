import axiosInstance from "./axios";

export const getStudentAnalytics = async () => {
  const response = await axiosInstance.get(
    "/analytics/student"
  );

  return response.data.data;
};

export const getOrganizationAnalytics = async () => {
  const response = await axiosInstance.get(
    "/analytics/organization"
  );

  return response.data.data;
};

export const getAdminAnalytics = async () => {
  const response = await axiosInstance.get(
    "/analytics/admin"
  );

  return response.data.data;
};