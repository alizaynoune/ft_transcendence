import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {loadToken} from '@/tools/localStorage'

const baseURL =  'http://localhost:5000/'
const token = loadToken()
const config: AxiosRequestConfig = {
    baseURL,
    headers: { Authorization: `Bearer ${token?.access_token || ''}` }
};
const client: AxiosInstance = axios.create(config);


export default client