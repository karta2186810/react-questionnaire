import Axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@/config';
import { storage } from '@/utils/storage';

export const axios = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${storage.getAuthUser()?.token}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);
