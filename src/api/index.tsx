import { AxiosInstance } from "axios";
import axios from "axios";
console.log(import.meta.env.MODE, "HERES THE MODE");
const api: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? import.meta.env.PRODUCTION_BASE_URL
      : import.meta.env.LOCAL_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
});

export default api;
