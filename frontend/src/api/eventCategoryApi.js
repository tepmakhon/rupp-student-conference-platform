import axiosInstance from "./axios";

export const getEventCategories =
  async () => {

    const response =
      await axiosInstance.get(
        "/event-categories"
      );

    return response.data.data;

};