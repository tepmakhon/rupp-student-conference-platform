import axiosInstance
from "./axios";

export const getMySkills =
async () => {
  const response =
  await axiosInstance.get(
    "/student-skills"
  );

  return response.data.data;
};

export const updateMySkills =
async (
  skillIds
) => {
  const response =
  await axiosInstance.put(
    "/student-skills",
    {
      skillIds,
    }
  );
  return response.data.data;
};