import axios from "axios";
import { FRONT_HOST_STATIC } from "./utils/communication";

const axiosInstance = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if(token != null)
    if (config?.headers) {
      config.headers["Authorization"] = token as string;
    }

  return config;
});

axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  if (error.response.status === 401 || error.response.status === 403){
    localStorage.removeItem("token");
    window.location.href = FRONT_HOST_STATIC + "/login";
  }
  return Promise.reject(error);
});

export default axiosInstance;
