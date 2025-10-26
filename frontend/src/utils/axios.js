import axios from 'axios';

// Base URL depending on environment
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // send cookies if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token automatically to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
