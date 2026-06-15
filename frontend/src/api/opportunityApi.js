import axiosInstance from "./axios";

export const getOpportunities = async (
  page = 1,
  limit = 10
) => {

  const response =
    await axiosInstance.get(
      `/opportunities?page=${page}&limit=${limit}`
    );

  return response.data.data;
};

export const getOpportunityById =
  async (id) => {

    const response =
      await axiosInstance.get(
        `/opportunities/${id}`
      );

    return response.data.data;
};

export const createOpportunity =
  async (payload) => {

    const response =
      await axiosInstance.post(
        "/opportunities",
        payload
      );

    return response.data.data;
};

export const applyOpportunity =
  async (
    id,
    payload
  ) => {

    const response =
      await axiosInstance.post(
        `/opportunities/${id}/apply`,
        payload
      );

    return response.data;
};

export const saveOpportunity =
  async (id) => {

    const response =
      await axiosInstance.post(
        `/opportunities/${id}/save`
      );

    return response.data;
};

export const unsaveOpportunity =
  async (id) => {

    const response =
      await axiosInstance.delete(
        `/opportunities/${id}/save`
      );

    return response.data;
};

export const getSavedOpportunities =
  async () => {

    const response =
      await axiosInstance.get(
        "/opportunities/saved/list"
      );

    return response.data.data;
};

export const getRecentOpportunities =
  async () => {

    const response =
      await axiosInstance.get(
        "/opportunities/recent"
      );

    return response.data.data;
  };
  export const getPendingOpportunities =
  async () => {

    const response =
      await axiosInstance.get(
        "/opportunities/pending"
      );

    return response.data.data;
};

export const approveOpportunity =
  async (id) => {

    const response =
      await axiosInstance.patch(
        `/opportunities/${id}/approve`
      );

    return response.data.data;
};

export const rejectOpportunity =
  async (id) => {

    const response =
      await axiosInstance.patch(
        `/opportunities/${id}/reject`
      );

    return response.data.data;
};

export const getMyOpportunities =
  async () => {

    const response =

      await axiosInstance.get(
        "/opportunities/my"
      );

    return response.data.data;

};