import axios from 'axios';
import api from './api';
import { API_URL } from '../utils/constants';
import { User } from '../types/user';

const authService = {
  register: async (userData: User) => {
    const response = await axios.post(`${API_URL}/api/users/register`, userData);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }) => {
    const formData = new URLSearchParams();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await axios.post(`${API_URL}/api/users/login`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
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

  getAllUsers: async (): Promise<User[]> => {
    return api.get('/users/users') as unknown as Promise<User[]>;
  },

  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    return api.put(`/users/users/${id}`, userData) as unknown as Promise<User>;
  },

  deleteUser: async (id: string): Promise<any> => {
    return api.delete(`/users/users/${id}`);
  },

  getStats: async (): Promise<any> => {
    return api.get('/users/stats');
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    return api.put('/users/me', userData) as unknown as Promise<User>;
  },

  uploadAvatar: async (file: File): Promise<{ message: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/users/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }) as unknown as Promise<{ message: string }>;
  },
};

export default authService;