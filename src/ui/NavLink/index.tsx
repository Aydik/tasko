import React from "react";
import styles from './index.module.scss'
import {Link} from "react-router-dom";
import {NavLinkProps} from './index.interfaces.ts'

export const NavLink: React.FC<NavLinkProps> = ({url, text, icon, selected = false}: NavLinkProps) => {
    return (
        <div className={`${styles['nav-link-container']} ${selected ? styles['nav-link-container_selected'] : ''}`}>
            <div className={styles['nav-link__bounds']}/>
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