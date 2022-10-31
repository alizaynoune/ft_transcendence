import axios from "axios";
import { loadToken } from "@/tools/localStorage";
const baseURL = process.env.API_URL || "http://localhost:5000/";

const instance = axios.create({ baseURL });
export const AxiosFormData = axios.create({ baseURL });

AxiosFormData.interceptors.request.use(
  (config) => {
    try {
      const access_token = loadToken();
      config.baseURL = baseURL;
      config.headers = {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
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

AxiosFormData.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      //@ts-ignore
      const err = new Error(error.response?.data?.message || error.message);
      err.name = error.name;
      err.status = error.response?.status;
      console.log(err);
      return Promise.reject(err);
    }

    return Promise.reject(error.response);
  }
);

instance.interceptors.request.use(
  (config) => {
    try {
      const access_token = loadToken();
      config.baseURL = baseURL;
      config.headers = {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json, text/plain, */*",
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
      console.log(err);
      return Promise.reject(err);
    }

    return Promise.reject(error.response);
  }
);
export default instance;
