import { useRoutes } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import { MainLayout } from 'app/layouts/MainLayout';
import { TaskPage } from 'pages/TaskPage';
import { TeamPage } from 'pages/TeamPage';
import { DashboardPage } from 'pages/DashboardPage';
import { RegisterPage } from 'pages/RegisterPage';
import { Authentication } from 'features/Authentication';
import { AuthLayout } from 'app/layouts/AuthLayout';

const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <></>,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: '/tasks',
        element: <TaskPage />,
      },
      {
        path: '/teams',
        element: <TeamPage />,
      },
      {
        path: '/dashboards',
        element: <DashboardPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
];

export const AppRouter = () => useRoutes(routeConfig);
