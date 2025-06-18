import axios from 'axios';
import { AUTH, BASE_URL, GETUSER, REGISTER } from 'shared/api/ENDPOINTS.ts';

// export async function registerUser({ email, name, password, teamLead }: RegisterParams) {
//   return await axios.post(
//     REGISTER,
//     {
//       email,
//       name,
//       password,
//       teamLead,
//     },
//     {
//       withCredentials: true,
//       withXSRFToken: true,
//     },
//   );
// }
//
// export async function loginUser({ email, password }: LoginUser) {
//   return axios.post(
//     AUTH,
//     {
//       email,
//       password,
//     },
//     {
//       withCredentials: true,
//     },
//   );
// }
//
// export async function getUser() {
//   const token = localStorage.getItem('token');
//
//   return axios.get(GETUSER, {
//     withCredentials: true,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// }

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
