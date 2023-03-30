import axios from 'axios';
import {authHeader} from "@/services/auth.service";

const axiosService = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});
axiosService.interceptors.request.use(
    (config) => {
        console.log("REQUEST => " + config.headers);
        return {
            ...config,
            headers: {
                ...config.headers,
            }
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosService.interceptors.response.use(
    (res) => {
        console.log("OK")
        return res
    },
    (error) => {
        console.log("ERROR => " + JSON.stringify(error))
        return Promise.reject(error)
    }
);

export const get = async (url, params) => {
    if (!params) params = {headers: authHeader()}
    else if (!params.headers) params.headers = authHeader()
    else params.headers = {...params.headers, ...authHeader()}
    return axiosService.get(url, params);
}

export const post = async (url, data) => {
    const headers = {headers: authHeader()}
    return axiosService.post(url, data, headers);
}

export const put = async (url, data) => {
    const headers = {headers: authHeader()}
    return axiosService.put(url, data, headers);
}

export const remove = async (url, params) => {
    const headers = {headers: authHeader()}
    return axiosService.delete(url, params, headers);
}