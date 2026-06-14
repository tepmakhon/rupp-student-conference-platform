import axiosInstance from "./axios";

export const getStudentDashboard =
  async () => {

    const response =
      await axiosInstance.get(
        "/dashboard/student"
      );

    return response.data.data;
  };