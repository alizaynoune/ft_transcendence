import axios from "axios";
import { loadToken } from "@/tools/localStorage";
const baseURL = process.env.API_URL || "http://localhost:5000/";

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  (config) => {
    try {
      const access_token = loadToken();
      config.baseURL = baseURL;
      config.headers = {
        Authorization: config.headers && config.headers.Authorization ? config.headers.Authorization : `Bearer ${access_token}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": config.headers && config.headers["Content-Type"] ? config.headers["Content-Type"] : "application/json",
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

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      //@ts-ignore
      const err = new Error(error.response?.data?.message || error.message);
      err.name = error.name;
      err.status = error.response?.status;

      return Promise.reject(err);
    }

    return Promise.reject(error.response);
  }
);
export default instance;
