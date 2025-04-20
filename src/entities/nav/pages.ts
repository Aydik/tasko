import { INavLink } from 'shared/interfaces/NavLink';

export const mainPages: INavLink[] = [
  { url: '/tasks', text: 'Задачи', icon: 'tasks-icon' },
  { url: '/teams', text: 'Команды', icon: 'teams-icon' },
  { url: '/dashboards', text: 'Дэшборды', icon: 'dashboard-icon' },
];

export const helpPages: INavLink[] = [
  { url: '/guide', text: 'Гайд', icon: 'guide-icon' },
  { url: '/settings', text: 'Настройки', icon: 'settings-icon' },
];
