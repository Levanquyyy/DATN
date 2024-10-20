import { HOST } from "@/utilities/constant";
import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: HOST,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
