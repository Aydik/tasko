import { INavLink } from 'widgets/NavBar/model/types.ts';

export const MAIN_PAGES: INavLink[] = [
  { url: '/tasks', text: 'Задачи', icon: 'tasks-icon' },
  { url: '/teams', text: 'Команды', icon: 'teams-icon' },
  { url: '/dashboards', text: 'Дэшборды', icon: 'dashboard-icon' },
];

export const HELP_PAGES: INavLink[] = [
  { url: '/guide', text: 'Гайд', icon: 'guide-icon' },
  { url: '/settings', text: 'Настройки', icon: 'settings-icon' },
];
