import {NavLink} from "../../ui/NavLink/index.interfaces.ts";

const mainPages: NavLink[] = [
    {
        url: '/tasks',
        text: 'Задачи',
        icon: 'tasks-icon'
    },
    {
        url: '/teams',
        text: 'Команды',
        icon: 'teams-icon'
    },
    {
        url: '/dashboards',
        text: 'Дэшборды',
        icon: 'dashboards-icon'
    }
]

const helpPages: NavLink[] = [
    {
        url: '/guide',
        text: 'Гайд',
        icon: 'guide-icon'
    },
    {
        url: '/settings',
        text: 'Настройки',
        icon: 'settings-icon'
    }
]

export const pages = {
    mainPages: mainPages,
    helpPages: helpPages,
}