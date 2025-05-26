import { axiosInstance } from 'shared/api/axiosInstance.ts';
import { AuthorizeUserData, RegisterUserData } from 'features/Authentication/types';

export const registerUser = async (data: RegisterUserData) => {
  try {
    const res = await axiosInstance.post('account', data);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const authUser = async (data: AuthorizeUserData) => {
  try {
    const res = await axiosInstance.post('login', data);
    localStorage.setItem('authToken', res.data.token);
    window.location.reload();
    return res.data;
  } catch (err) {
    throw err;
  }
};
