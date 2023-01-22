import axios from 'axios';

const axiosService = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

export const get = async (url, params) => {
    return axiosService.get(url, params);
}

export const post = async (url, data) => {
    return axiosService.post(url, data);
}

export const put = async (url, data) => {
    return axiosService.put(url, data);
}

export const remove = async (url, params) => {
    return axiosService.delete(url, params);
}