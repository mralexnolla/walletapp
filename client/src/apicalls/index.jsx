import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // in the package.json "proxy": "http://localhost:8000"
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});