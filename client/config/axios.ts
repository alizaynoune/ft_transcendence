import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const baseURL = process.env.REACT_APP_API_URL || 'http://10.12.3.11:5000/'

const config: AxiosRequestConfig = {
    baseURL
};
const client: AxiosInstance = axios.create(config);


export default client