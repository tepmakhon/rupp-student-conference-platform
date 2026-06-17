import axiosInstance
from "./axios";

export const getSkills =
async () => {

  const response =

    await axiosInstance.get(
      "/skills"
    );

  return response.data.data;

};

export const createSkill =
async (
  payload
) => {

  const response =

    await axiosInstance.post(

      "/skills",

      payload

    );

  return response.data.data;

};

export const updateSkill =
async (

  id,

  payload

) => {

  const response =

    await axiosInstance.patch(

      `/skills/${id}`,

      payload

    );

  return response.data.data;

};

export const deleteSkill =
async (
  id
) => {

  const response =

    await axiosInstance.delete(

      `/skills/${id}`

    );

  return response.data.data;

};