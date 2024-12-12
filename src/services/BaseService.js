import axios from "axios";
import { API_URL } from "../const/api.constant";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "../const/api.constant";

const BaseService = axios.create({
  timeout: 600000,
  baseURL: API_URL,
});

BaseService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve your token here
    if (token) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE} ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default BaseService;
