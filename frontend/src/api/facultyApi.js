import axiosInstance
from "./axios";

export const getFaculties =
async () => {

  const response =

    await axiosInstance.get(

      "/faculties"

    );

  return response.data.data;

};

export const createFaculty =
async (
  payload
) => {

  const response =

    await axiosInstance.post(

      "/faculties",

      payload

    );

  return response.data.data;

};

export const updateFaculty =
async (

  id,

  payload

) => {

  const response =

    await axiosInstance.patch(

      `/faculties/${id}`,

      payload

    );

  return response.data.data;

};

export const deleteFaculty =
async (
  id
) => {

  const response =

    await axiosInstance.delete(

      `/faculties/${id}`

    );

  return response.data.data;

};