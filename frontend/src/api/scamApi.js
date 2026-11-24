import axios from 'axios';

const API_BASE = (import.meta.env.VITE_API_URL || 'https://scamshield-m0yf.onrender.com').replace(/\/+$/, '');
const API_BASE_URL = `${API_BASE}/api/scams`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Required for cookie-based authentication
  timeout: 60000, // 60s timeout to accommodate Render cold starts & AI analysis
});

export const scamApi = {
  // Analyze content: type must be "URL" | "MESSAGE" | "OFFER"
  analyze: async (type, content) => {
    const response = await api.post('/analyze', {
      type: type.toUpperCase(),
      content: content.trim(),
    });
    return response.data;
  },

  // Fetch all scan records sorted by createdAt desc
  getHistory: async () => {
    const response = await api.get('/history');
    return response.data;
  },

  // Delete a single scan record by ID
  deleteScan: async (id) => {
    const response = await api.delete(`/history/${id}`);
    return response.data;
  },

  // Clear all scan history
  clearHistory: async () => {
    const response = await api.delete('/history');
    return response.data;
  },
};

export default scamApi;
