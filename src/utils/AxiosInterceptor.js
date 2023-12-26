import axios from "axios";
import { toast } from "react-toastify";

import { API_BASE } from "./constants";

const authHeader = () => {
    const token = localStorage.getItem("token");
    if (token) {
        return { Authorization: "Bearer " + token };
    }
    return {};
};

export default (history = null) => {
    const axiosInstance = axios.create({ baseURL: API_BASE, headers: authHeader() });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 502) {
                // do something
                const { message } = error.response.data;
                if (message) {
                    toast.error(message)
                } else {
                    toast.error("Logging Out!!")
                }
                console.log("NOT FOUND");
                setTimeout(() => {
                    localStorage.clear();
                    if (history) {
                        history.push("/login");
                    } else {
                        window.location = "/login";
                    }
                }, 2000);
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};
