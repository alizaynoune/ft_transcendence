import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {loadToken} from '@/tools/localStorage'
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectAuth } from "@/store/reducers/auth";
import { useEffect } from "react";

const baseURL =  'http://localhost:5000/'
const token = loadToken();

// useEffect(() => {
//     console.log(token, 'from axios');
    
// }, [token])
const config: AxiosRequestConfig = {
    baseURL,
    // headers: { Authorization: `Bearer ${token}` }
};
const client: AxiosInstance = axios.create(config);


export default client