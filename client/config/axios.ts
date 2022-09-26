import axios from "axios";
import { loadToken } from "@/tools/localStorage";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { selectAuth } from "@/reducers/auth";


const baseURL = "http://localhost:5000/";

const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const access_token = loadToken();
    // const { access_token } = useAppSelector(selectAuth);
    console.log(config);
    config.baseURL = baseURL;
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
