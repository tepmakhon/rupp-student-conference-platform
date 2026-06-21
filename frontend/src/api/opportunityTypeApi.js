import axiosInstance
from "./axios";

export const getOpportunityTypes =
async () => {
  const response =
    await axiosInstance.get(
      "/opportunity-types"
    );
  return response.data.data;
};

export const createOpportunityType =
async (
  payload
) => {
  const response =
    await axiosInstance.post(
      "/opportunity-types",
      payload
    );
  return response.data.data;
};

export const updateOpportunityType =
async (
  id,
  payload
) => {
  const response =
    await axiosInstance.patch(
      `/opportunity-types/${id}`,
      payload
    );
  return response.data.data;
};

export const deleteOpportunityType =
async (
  id
) => {
  const response =
    await axiosInstance.delete(
      `/opportunity-types/${id}`
    );
  return response.data.data;
};
