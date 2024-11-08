

'use client'

import axios, { AxiosInstance } from 'axios';

const Ajax: AxiosInstance = axios.create({
  baseURL: '/api/',
  withCredentials: true,
});

console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/`);

// Request Interceptor
Ajax.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
Ajax.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const handleHttpError = (e: any) => {
      console.error('HTTP Error:', e);
      const { statusCode } = e.response?.data;

      if (statusCode === 401) {
        // Handle unauthorized error, for example redirect to login page
        window.location.href = '/login';
      } else {
        console.warn('Error details:', e);
      }
    };
    
    handleHttpError(error);
    return Promise.reject(error);
  }
);

// Exporting headers function
export function headers(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export default Ajax;