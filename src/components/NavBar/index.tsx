import React from "react";
import styles from './index.module.scss'
import {useLocation} from "react-router-dom";
import {Divider} from "../../ui/Divider";
import {LogoLink} from "../../ui/LogoLink";
import {NavLink} from "../../ui/NavLink";

export const NavBar: React.FC = () => {
    const location = useLocation(); // Get the current location (URL)
    const currentPath = location.pathname;

    const isSelected = (path: string) => {
        return currentPath === path
    };

    return (
        <div className={styles['nav-bar-container']}>
            <div className={styles['nav-bar-bounds']}/>
            <div className={styles['nav-bar']}>
                <LogoLink url={"/"}/>
                <nav className={styles['nav']}>
                    <NavLink url={"/tasks"} icon={"tasks-icon"} text={"Задачи"} selected={isSelected("/tasks")}/>
                    <NavLink url={"/teams"} icon={"teams-icon"} text={"Команды"} selected={isSelected("/teams")}/>
                    <NavLink url={"/dashboards"} icon={"dashboards-icon"} text={"Дэшборды"} selected={isSelected("/dashboards")}/>
                </nav>
                <Divider/>
                <div className={styles['account-container']}>

                </div>
            </div>
        </div>
    )
}