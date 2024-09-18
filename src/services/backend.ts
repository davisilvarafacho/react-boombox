import axios from 'axios';
import { sessionKeys } from 'constants/sessionKeys';

export const backend = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

backend.interceptors.request.use((config) => {
  const token = localStorage.getItem(sessionKeys.jwt);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
