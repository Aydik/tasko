import { AUTH } from 'shared/api/ENDPOINTS.ts';
import { LoginRequest, RegistrationRequest } from 'features/auth/types';
import { axiosInstance } from 'shared/api/axiosInstance.ts';

export const AuthService = {
  login: async (data: LoginRequest) => {
    const response = await axiosInstance.post(`${AUTH}/login`, data);
    return response.data;
  },

  register: async (data: RegistrationRequest) => {
    const { email, password, name, isTeamLead } = data;
    const response = await axiosInstance.post(`${AUTH}/register`, {
      email,
      password,
      name,
      teamLead: isTeamLead,
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get(`${AUTH}/current-user`);
    return response.data;
  },

  sendVerification: async () => {
    await axiosInstance.post(`${AUTH}/send-verification`);
  },

  verifyEmail: async (code: string) => {
    await axiosInstance.post(`${AUTH}/verify-email`, { code });
  },

  logout: async () => {
    await axiosInstance.post(`${AUTH}/logout`);
  },
};
