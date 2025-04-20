import { RouteObject } from 'react-router-dom';
import { MainLayout } from 'shared/layouts/MainLayout';
import { TaskPage } from 'pages/TaskPage';
import { TeamPage } from 'pages/TeamPage';
import { DashboardPage } from 'pages/DashboardPage';

export const routeConfig: RouteObject[] = [
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
];
