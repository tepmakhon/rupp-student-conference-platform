import axiosInstance from "./axios";

export const getMyApplications =
  async (
    page = 1,
    limit = 10
  ) => {

    const response =

      await axiosInstance.get(

        `/applications/me?page=${page}&limit=${limit}`

      );

    return response.data.data;

  };

export const getApplicants =
  async (
    opportunityId
  ) => {

    const response =

      await axiosInstance.get(

        `/applications/opportunity/${opportunityId}`

      );

    return response.data.data;

  };

export const updateApplicationStatus =
  async (
    id,
    status
  ) => {

    const response =

      await axiosInstance.patch(

        `/applications/${id}/status`,

        {
          status,
        }

      );

    return response.data.data;

  };