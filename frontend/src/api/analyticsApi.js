import axiosInstance from "./axios";

/*
|--------------------------------------------------------------------------
| Student
|--------------------------------------------------------------------------
*/

export const getStudentAnalytics = async ({ month, year } = {}) => {
  const response = await axiosInstance.get("/analytics/student", {
    params: {
      month,
      year,
    },
  });

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Organization
|--------------------------------------------------------------------------
*/

export const getOrganizationAnalytics = async ({ month, year } = {}) => {
  const response = await axiosInstance.get("/analytics/organization", {
    params: {
      month,
      year,
    },
  });

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

export const getAdminAnalytics = async ({ month, year } = {}) => {
  const response = await axiosInstance.get("/analytics/admin", {
    params: {
      month,
      year,
    },
  });

  return response.data.data;
};
