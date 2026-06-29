import axiosInstance from "./axios";

/*
|--------------------------------------------------------------------------
| Public Events
|--------------------------------------------------------------------------
*/

export const getApprovedEvents = async ({
  page = 1,
  limit = 10,
  keyword = "",
  categoryId = "",
} = {}) => {
  const response = await axiosInstance.get(
    "/events/approved",
    {
      params: {
        page,
        limit,
        keyword,
        categoryId,
      },
    }
  );

  return response.data.data;
};

export const getEventById = async (id) => {
  const response = await axiosInstance.get(
    `/events/${id}`
  );

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Student
|--------------------------------------------------------------------------
*/

export const registerForEvent = async (id) => {
  const response = await axiosInstance.post(
    `/events/${id}/register`
  );

  return response.data;
};

export const getMyRegisteredEvents = async () => {
  const response = await axiosInstance.get(
    "/events/my-registrations"
  );

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Organization
|--------------------------------------------------------------------------
*/

export const getEventRegistrations = async (
  id
) => {
  const response = await axiosInstance.get(
    `/events/${id}/registrations`
  );

  return response.data.data;
};

export const getMyEvents = async () => {
  const response = await axiosInstance.get(
    "/events/my-events"
  );

  return response.data.data;
};

export const createEvent = async (
  payload
) => {
  const response = await axiosInstance.post(
    "/events",
    payload
  );

  return response.data.data;
};

export const updateEvent = async (
  id,
  payload
) => {
  const response = await axiosInstance.patch(
    `/events/${id}`,
    payload
  );

  return response.data.data;
};

export const deleteEvent = async (id) => {
  const response = await axiosInstance.delete(
    `/events/${id}`
  );

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Event Attendance
|--------------------------------------------------------------------------
*/

export const getAttendanceByEvent = async (
  eventId
) => {
  const response = await axiosInstance.get(
    `/events/${eventId}/registrations`
  );

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

export const getPendingEvents = async () => {
  const response = await axiosInstance.get(
    "/events/pending"
  );

  return response.data.data;
};

export const approveEvent = async (id) => {
  const response = await axiosInstance.patch(
    `/events/${id}/approve`
  );

  return response.data;
};

export const rejectEvent = async (id) => {
  const response = await axiosInstance.patch(
    `/events/${id}/reject`
  );

  return response.data;
};