import axiosInstance from "./axios";

/*
|--------------------------------------------------------------------------
| Student Dashboard
|--------------------------------------------------------------------------
*/

export const getStudentDashboard =
  async () => {

    const response =

      await axiosInstance.get(
        "/dashboard/student"
      );

    return response.data.data;

  };

/*
|--------------------------------------------------------------------------
| Organization Dashboard
|--------------------------------------------------------------------------
*/

export const getOrganizationDashboard =
  async () => {

    const response =

      await axiosInstance.get(
        "/dashboard/organization"
      );

    return response.data.data;

  };

/*
|--------------------------------------------------------------------------
| Admin Dashboard
|--------------------------------------------------------------------------
*/

export const getAdminDashboard =
  async () => {

    const response =

      await axiosInstance.get(
        "/dashboard/admin"
      );

    return response.data.data;

  };

  