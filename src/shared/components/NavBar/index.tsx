import React from "react";
import styles from './index.module.scss'
import {useLocation} from "react-router-dom";
import {Divider} from "../../ui/Divider";
import {LogoLink} from "../../ui/LogoLink";
import {NavLink} from "../../ui/NavLink";
import {pages} from "./index.interfaces.ts";
import {H3} from "../../ui/H3";

export const NavBar: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isSelected = (path: string) => {
        return currentPath === path
    };

    const {mainPages, helpPages} = pages

    return (
        <div className={styles['nav-bar-container']}>
            <div className={styles['nav-bar__bounds']}/>
            <div className={styles['nav-bar']}>
                <LogoLink url={"/"}/>
                <nav className={styles['nav']}>
                    <ul className={styles['nav-list']}>
                        {mainPages.map(page => (
                            <li className={styles['nav-list__item']}>
                                <NavLink url={page.url} icon={page.icon} text={page.text}
                                         selected={isSelected(page.url)}/>
                            </li>
                        ))}
                    </ul>
                    <div className={styles['h3-container']}>
                        <H3 text={'Помощь'}/>
                    </div>
                    <ul className={`${styles['nav-list']} ${styles['nav-list_help']}`}>
                        {helpPages.map(page => (
                            <li className={styles['nav-list__item']}>
                                <NavLink url={page.url} icon={page.icon} text={page.text}
                                         selected={isSelected(page.url)}/>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Divider/>
                <div className={styles['account-container']}>

                </div>
            </div>
        </div>
    )
}