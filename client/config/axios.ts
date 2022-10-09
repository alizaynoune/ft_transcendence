import axios from "axios";
import { loadToken } from "@/tools/localStorage";
const baseURL = process.env.NEXT_PUBLIC_URL_API || "http://localhost:5000/";

axios.interceptors.request.use(
  (config) => {
    try {
      const access_token = loadToken();
      config.baseURL = baseURL;
      config.headers = {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(new Error(error.response.data?.message || error.message));
  }
);

export default axios;
