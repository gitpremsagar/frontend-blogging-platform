import axios from "axios";
import { API_URL } from "./constants";

const axiosWithCredentials = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

const customAxios = axios.create({
    baseURL: API_URL,
    withCredentials: false,
});

export { axiosWithCredentials, customAxios };