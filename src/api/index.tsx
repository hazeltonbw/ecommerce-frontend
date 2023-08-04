import { AxiosInstance } from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  // baseURL: import.meta.env.PROD
  //   ? import.meta.env.VITE_PRODUCTION_BASE_URL
  //   : import.meta.env.VITE_LOCAL_BASE_URL,
  baseURL: "/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
});

export default api;
