import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const baseURL = process.env.REACT_APP_API_UR || 'http://localhost:3000/'

const config: AxiosRequestConfig = {
    baseURL
};
const client: AxiosInstance = axios.create(config);


export default client