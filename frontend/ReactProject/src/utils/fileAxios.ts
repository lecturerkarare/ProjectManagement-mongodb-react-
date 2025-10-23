import axios from "axios";
import { getAccessToken } from "./util";

export const FILE_API_URL = "http://localhost:3001/api"; // adjust if file upload is a different base URL

const axiosFileHttp = axios.create({
  baseURL: FILE_API_URL,
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

axiosFileHttp.interceptors.request.use(
  (config: any) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosFileHttp;
