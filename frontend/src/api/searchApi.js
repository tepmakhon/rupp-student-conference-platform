import axiosInstance
from "./axios";

export const globalSearch =
async (q) => {  
 const response =
 await axiosInstance.get(
 `/search?q=${q}`
 );
 return response.data.data;
};