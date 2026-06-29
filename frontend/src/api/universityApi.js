import axiosInstance from "./axios";

export const getUniversities = async () => {
  const response = await axiosInstance.get("/universities");
  return response.data.data;
};

export const createUniversity = async (payload) => {
  const response = await axiosInstance.post("/universities", payload);
  return response.data.data;
};

export const updateUniversity = async (id, payload) => {
  const response = await axiosInstance.patch(`/universities/${id}`, payload);
  return response.data.data;
};

export const deleteUniversity = async (id) => {
  const response = await axiosInstance.delete(`/universities/${id}`);
  return response.data.data;
};
