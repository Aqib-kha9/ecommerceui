import axios from "axios";
import Cookies from "js-cookie";

const getBaseURL = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  // If the URL already contains /api/v1, use it as is; otherwise, append it.
  return url.includes("/api/v1") ? url : `${url.replace(/\/$/, "")}/api/v1`;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("AyurPooja_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (e.g., expired token)
    if (error.response?.status === 401) {
       // Optional: logic to clear auth and redirect
    }
    return Promise.reject(error);
  }
);

export default api;
