import { NavLink } from 'widgets/NavBar/types';

export const MAIN_PAGES: NavLink[] = [
  { url: '/tasks', text: 'Задачи', icon: 'tasks-icon' },
  { url: '/teams', text: 'Команды', icon: 'teams-icon' },
  { url: '/dashboards', text: 'Дэшборды', icon: 'dashboard-icon' },
];

export const HELP_PAGES: NavLink[] = [
  { url: '/guide', text: 'Гайд', icon: 'guide-icon' },
  { url: '/settings', text: 'Настройки', icon: 'settings-icon' },
];
