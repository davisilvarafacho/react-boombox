import axios from 'axios';

export const auth = axios.create({
  baseURL: import.meta.env.VITE_APP_AUTH_URL,
});
