import axios from "axios";
import { loadToken } from "@/tools/localStorage";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";
import { connect } from "react-redux";
const baseURL = process.env.NEXT_PUBLIC_URL_API || "http://localhost:5000/";

axios.interceptors.request.use(
  async (config) => {
    try {
      const access_token = await loadToken();
      console.log(access_token);
      
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
    return Promise.reject(error);
  }
);

export default axios;
