import axios from "axios";
import { getEnv } from "../env";
import { getContentType } from "./ContentType";

export const http = axios.create({
    baseURL: getEnv('SERVER_URL'),
    headers: {
        "Content-Type": getContentType("JSON")
    },
});
http.interceptors.request.use((config) => {
    return config;
});
http.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});