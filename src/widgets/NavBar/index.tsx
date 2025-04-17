import React from 'react';
import {useLocation} from 'react-router-dom';
import {Divider} from 'shared/ui/Divider';
import {LogoLink} from 'shared/ui/LogoLink';
import {NavLink} from 'shared/ui/NavLink';
import {mainPages, helpPages} from 'entities/nav/pages'; // данные для навигации
import {Typography} from 'shared/ui/Typography';
import styles from './index.module.scss';

export const NavBar: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const isSelected = (path: string) => currentPath === path;

    return (
        <div className={styles['nav-bar-container']}>
            <div className={styles['nav-bar']}>
                <LogoLink url="/"/>
                <nav className={styles['nav']}>
                    <ul className={styles['nav-list']}>
                        {mainPages.map(page => (
                            <li key={page.url} className={styles['nav-list__item']}>
                                <NavLink
                                    url={page.url}
                                    icon={page.icon}
                                    text={page.text}
                                    selected={isSelected(page.url)}
                                />
                            </li>
                        ))}
                    </ul>
                    <Typography variant={'h3'} className={styles['help-title']}>
                        Помощь
                    </Typography>
                    <ul className={`${styles['nav-list']} ${styles['nav-list_help']}`}>
                        {helpPages.map(page => (
                            <li key={page.url} className={styles['nav-list__item']}>
                                <NavLink
                                    url={page.url}
                                    icon={page.icon}
                                    text={page.text}
                                    selected={isSelected(page.url)}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>
                <Divider/>
                <div className={styles['account-container']}/>
            </div>
        </div>
    );
};
