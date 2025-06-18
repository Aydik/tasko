import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from 'app/store/auth/store.ts';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoading, isAuthenticated } = useAuthStore();

  const checkAuth = useAuthStore((state) => state.checkAuth);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      checkAuth();
    }
  }, [isAuthenticated, checkAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};
