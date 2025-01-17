import Axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@/config';
import { storage } from '@/utils/storage';

export type ResponseError = {
  message?: string;
};

export const axios = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axios.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${storage.getAuthToken()}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ResponseError>) => {
    return Promise.reject(new Error(error.response?.data?.message ?? ''));
  },
);
