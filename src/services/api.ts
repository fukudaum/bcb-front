import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/useAuth";

export const Api = axios.create({
    baseURL: "http://localhost:3010"
})

Api.interceptors.request.use(
    (config) => {
        const user = getUserLocalStorage();

        config.headers.Authorization = user?.token;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)