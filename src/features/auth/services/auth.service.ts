import axios from 'axios';
import { BASE_URL } from 'shared/api/ENDPOINTS.ts';
import { LoginRequest, RegistrationRequest } from 'features/auth/types';

export const AuthService = {
  login: async (data: LoginRequest) => {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  register: async (data: RegistrationRequest) => {
    const { email, password, name, isTeamLead } = data;
    const response = await axios.post(`${BASE_URL}/api/auth/register`, {
      email,
      password,
      name,
      teamLead: isTeamLead,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.get(`${BASE_URL}/api/auth/current-user`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  },

  sendVerification: async () => {
    await axios.post(
      `${BASE_URL}/api/auth/send-verification`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  },

  verifyEmail: async (code: string) => {
    await axios.post(
      `${BASE_URL}/api/auth/verify-email`,
      { code },
      {
        withCredentials: true,

        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  },

  logout: async () => {
    await axios.post(
      `${BASE_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,

        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
  },
};
