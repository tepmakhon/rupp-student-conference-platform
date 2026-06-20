import axiosInstance

from "./axios";

export const getRecommendations =

async () => {

 const response =

 await axiosInstance.get(

 "/recommendations"

 );

 return response.data.data;

};