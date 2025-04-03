import React from "react";
import styles from './index.module.scss'
import {Link} from "react-router-dom";

interface NavLinkProps {
    url: string;
    text: string;
    icon: string;
    selected?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({url, text, icon, selected = false}: NavLinkProps) => {
    return (
        <div className={`${styles['nav-link-container']} ${selected ? styles['nav-link-container_selected'] : ''}`}>
            <div className={styles['nav-link-bounds']}/>
            <Link to={url} className={styles['nav-link']}>
                <div className={styles['icon-container']}>
                    <img src={`/src/assets/images/vector/${icon}.svg`} className={styles['icon']}/>
                </div>
                <div className={styles['text-container']}>
                    <span className={styles['text']}>{text}</span>
                </div>
            </Link>
        </div>
    )
};