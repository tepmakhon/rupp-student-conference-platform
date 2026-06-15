import axiosInstance
from "./axios";

export const getStudentDashboard =
  async () => {

    const response =

      await axiosInstance.get(
        "/dashboard/student"
      );

    return response.data.data;

  };

export const getOrganizationDashboard =
  async () => {

    const response =

      await axiosInstance.get(
        "/dashboard/organization"
      );

    return response.data.data;

  };

export const getAdminDashboard =
  async () => {

    const response =

      await axiosInstance.get(
        "/dashboard/admin"
      );

    return response.data.data;

  };