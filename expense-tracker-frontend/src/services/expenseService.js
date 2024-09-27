import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://swifrut-task-7-expense-tracker.onrender.com', // Point to your backend
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach the token to Authorization header
  }
  return config;
});

export default axiosInstance;