import { axiosInstance } from 'shared/api/axiosInstance.ts';

export const getProfile = async () => {
  try {
    const res = await axiosInstance.get('profile');
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    throw err;
  }
};
