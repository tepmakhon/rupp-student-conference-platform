import axiosInstance from "./axios";

export const uploadFile = async (file) => {

  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response =
    await axiosInstance.post(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};