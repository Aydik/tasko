import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { AuthService } from 'features/auth/services/auth.service.ts';
import { RegistrationRequest } from 'features/auth/types';
import { User } from 'entities/User/types';
import Cookies from 'js-cookie';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegistrationRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  sendVerification: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    (set) => ({
      ...initialState,

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const token = Cookies.get('accessToken');
          if (!token) {
            set({ isLoading: false });
            return;
          }

          const response = await AuthService.getCurrentUser();
          const cleanUser = JSON.parse(JSON.stringify(response));

          set({
            user: cleanUser,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          Cookies.remove('accessToken');
          set({
            ...initialState,
            isLoading: false,
          });
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await AuthService.login({ email, password });
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
          Cookies.set('accessToken', response.token);
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Login failed',
            isLoading: false,
          });
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await AuthService.register(data);
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
          });
          Cookies.set('accessToken', response.token);
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Registration failed',
            isLoading: false,
          });
        }
      },

      logout: () => {
        Cookies.remove('accessToken');
        set(initialState);
      },

      sendVerification: async () => {
        set({ isLoading: true, error: null });
        try {
          await AuthService.sendVerification();
          set({ isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to send verification',
            isLoading: false,
          });
        }
      },

      verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
          await AuthService.verifyEmail(code);
          set((state) => ({
            user: state.user ? { ...state.user, emailVerified: true } : null,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Verification failed',
            isLoading: false,
          });
        }
      },

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
    }),
    {
      name: 'auth-store',
      serialize: true,
    },
  ),
);

useAuthStore.getState().checkAuth();
