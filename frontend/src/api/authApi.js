
import axios from 'axios';

const API_BASE = (import.meta.env.VITE_API_URL || 'https://scamshield-m0yf.onrender.com').replace(/\/+$/, '');
const AUTH_BASE_URL = `${API_BASE}/api/auth`;

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 60000, // 60s timeout to accommodate Render cold starts
});

export const authApi = {
  register: async (name, email, password) => {
    const response = await authClient.post('/register', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    return response.data;
  },

  login: async (email, password) => {
    const response = await authClient.post('/login', {
      email: email.trim().toLowerCase(),
      password,
    });

    return response.data;
  },

  logout: async () => {
    const response = await authClient.post('/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await authClient.get('/me');
    return response.data;
  },
};

export default authApi;