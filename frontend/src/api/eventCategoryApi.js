import axiosInstance from "./axios";

export const getEventCategories = async () => {
  const response = await axiosInstance.get("/event-categories");
  return response.data.data;
};

export const createEventCategory = async (payload) => {
  const response = await axiosInstance.post("/event-categories", payload);
  return response.data.data;
};

export const updateEventCategory = async (id, payload) => {
  const response = await axiosInstance.patch(
    `/event-categories/${id}`,
    payload,
  );
  return response.data.data;
};

export const deleteEventCategory = async (id) => {
  const response = await axiosInstance.delete(`/event-categories/${id}`);
  return response.data.data;
};
