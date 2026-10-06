import axios from "axios";
import { API_URL } from "../utils/apiConfig";

const axiosInstance = axios.create({ baseURL: API_URL, timeout: 15000 });
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
axiosInstance.interceptors.response.use((response) => {
  const authorization = response.config?.headers?.Authorization;
  if (authorization && authorization !== `Bearer ${localStorage.getItem("token")}`) {
    throw new axios.CanceledError("Session changed while the request was in progress");
  }
  return response;
}, (error) => {
  // Do not clear a new session when an older, in-flight request fails.
  const token = localStorage.getItem("token");
  if (error.response?.status === 401 && token &&
      error.config?.headers?.Authorization === `Bearer ${token}`) {
    window.dispatchEvent(new Event("auth:expired"));
  }
  return Promise.reject(error);
});
export default axiosInstance;
