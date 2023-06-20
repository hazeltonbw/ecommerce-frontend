import { AxiosInstance } from "axios";
import axios from "axios";
console.log(import.meta.env.PROD, "Running in production mode");
console.log(import.meta.env.PRODUCTION_BASE_URL, "HERES THE PRODUCTION_BASE_URL");
console.log(import.meta.env.LOCAL_BASE_URL, "HERES THE LOCAL_BASE_URL");
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.PRODUCTION_BASE_URL
    : import.meta.env.LOCAL_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
});

export default api;
