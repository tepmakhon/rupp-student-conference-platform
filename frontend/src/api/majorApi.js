import axiosInstance from "./axios";

export const getMajors = async () => {
  const response = await axiosInstance.get("/majors");
  return response.data.data;
};

export const createMajor = async (payload) => {
  const response = await axiosInstance.post("/majors", payload);
  return response.data.data;
};

export const updateMajor = async (id, payload) => {
  const response = await axiosInstance.patch(`/majors/${id}`, payload);
  return response.data.data;
};

export const deleteMajor = async (id) => {
  const response = await axiosInstance.delete(`/majors/${id}`);
  return response.data.data;
};
