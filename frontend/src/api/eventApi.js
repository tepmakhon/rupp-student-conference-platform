import axiosInstance from "./axios";

export const getApprovedEvents =
  async (
    page = 1,
    limit = 10
  ) => {

    const response =
      await axiosInstance.get(
        `/events/approved?page=${page}&limit=${limit}`
      );

    return response.data.data;
};

export const getEventById =
  async (id) => {

    const response =
      await axiosInstance.get(
        `/events/${id}`
      );

    return response.data.data;
};

export const registerForEvent =
  async (id) => {

    const response =
      await axiosInstance.post(
        `/events/${id}/register`
      );

    return response.data;
};

export const getPendingEvents =

  async () => {

    const response =

      await axiosInstance.get(

        "/events/pending"

      );

    return response.data.data;

  };

export const approveEvent =

  async (id) => {

    const response =

      await axiosInstance.patch(

        `/events/${id}/approve`

      );

    return response.data;

  };

export const rejectEvent =

  async (id) => {

    const response =

      await axiosInstance.patch(

        `/events/${id}/reject`

      );

    return response.data;

  };