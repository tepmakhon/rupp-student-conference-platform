import axiosInstance from "./axios";

export const getEventTicket = async (
  eventId
) => {

  const response =
    await axiosInstance.get(
      `/events/${eventId}/ticket`
    );

  return response.data.data;

};