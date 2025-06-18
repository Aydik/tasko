import { FC, ReactNode, useEffect } from 'react';
import { useAuthStore } from 'app/store/auth/store.ts';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Authentication check failed:', error);
      }
    };

    initializeAuth();
  }, [checkAuth]);

  return <>{children}</>;
};
