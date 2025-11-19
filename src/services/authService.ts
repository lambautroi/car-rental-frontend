import axios from 'axios';
import { API_URL } from '../utils/constants';
import { User } from '../types/user';

const authService = {
  register: async (userData: User) => {
    const response = await axios.post(`${API_URL}/api/users/register`, userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/api/users/login`, credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axios.get(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default authService;