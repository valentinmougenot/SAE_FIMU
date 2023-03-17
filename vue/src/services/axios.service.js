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
    return axiosService.get(url, params);
}

export const post = async (url, data) => {
    if (!data) {
        data = authHeader();
    }
    else
        data['x-access-token'] = authHeader()["x-access-token"];
    return axiosService.post(url, data);
}

export const put = async (url, data) => {
    if (!data) {
        data = authHeader();
    }
    else
        data['x-access-token'] = authHeader()["x-access-token"];
    return axiosService.put(url, data);
}

export const remove = async (url, params) => {
    if (!params) {
        params = authHeader();
    }
    else
        params['x-access-token'] = authHeader()["x-access-token"];
    return axiosService.delete(url, params);
}