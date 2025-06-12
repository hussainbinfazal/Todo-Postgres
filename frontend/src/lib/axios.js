import React from 'react'
import axios from 'axios';
const baseURL =  'http://localhost:5000'
export const axiosInstance = axios.create({
    baseURL:'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);
