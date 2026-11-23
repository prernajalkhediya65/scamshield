import axios from 'axios';

const AUTH_BASE_URL = 'https://scamshield-m0yf.onrender.com';

const authClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Sends and receives HTTP-only cookies
  timeout: 15000,
});

export const authApi = {
  // Register new user: { name, email, password }
  register: async (name, email, password) => {
    const response = await authClient.post('/register', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
    return response.data;
  },

  // Login user: { email, password }
  login: async (email, password) => {
    const response = await authClient.post('/login', {
      email: email.trim().toLowerCase(),
      password,
    });
    return response.data;
  },

  // Logout user: clears HTTP-only cookie
  logout: async () => {
    const response = await authClient.post('/logout');
    return response.data;
  },

  // Get currently logged-in user profile from cookie
  getMe: async () => {
    const response = await authClient.get('/me');
    return response.data;
  },
};

export default authApi;

