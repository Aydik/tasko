import { Link, useRoutes } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { Suspense } from 'react';

import { MainLayout } from 'app/layouts/MainLayout';
import { TaskPage } from 'pages/TaskPage';
import { TeamPage } from 'pages/TeamPage';
import { DashboardPage } from 'pages/DashboardPage';
import { RegisterPage } from 'pages/RegisterPage';
import { LoginPage } from 'pages/LoginPage';
import { AuthorizedLayout } from 'app/layouts/AutorizedLayout';
import { ProfilePage } from 'pages/ProfilePage';
import { ProtectedRoute } from 'shared/routes/protected-route.tsx';
import AdminPage from 'pages/AdminPage/AdminPage.tsx';

const routeConfig: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Link to="/tasks" />
          </ProtectedRoute>
        ),
      },
      {
        path: '/tasks',
        element: (
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/team',
        element: (
          <ProtectedRoute>
            <TeamPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dashboards',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <AuthorizedLayout />,
    children: [
      {
        path: '/register',
        element: (
          <Suspense fallback={<div> Loading... </div>}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<div> Loading... </div>}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
];

export const AppRouter = () => useRoutes(routeConfig);
