import { AxiosInstance } from "axios";
import axios from "axios";
const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
});

export default api;
