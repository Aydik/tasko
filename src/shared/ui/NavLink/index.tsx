import React from "react";
import styles from './index.module.scss'
import {Link} from "react-router-dom";
import {INavLink} from '../../interfaces/NavLink'
import {SvgIcon} from "../SvgIcon";

interface Props extends INavLink {
    selected?: boolean;
}

export const NavLink: React.FC<Props> = ({url, text, icon, selected = false}: Props) => {
    return (
        <div className={`${styles['nav-link-container']} ${selected ? styles['nav-link-container_selected'] : ''}`}>
            <div className={styles['nav-link__bounds']}/>
            <Link to={url} className={styles['nav-link']}>
                <div className={styles['icon-container']}>
                    <SvgIcon className={styles['icon']} src={`/src/shared/assets/images/vector/${icon}.svg`}/>
                </div>
                <div className={styles['text-container']}>
                    <span className={styles['text']}>{text}</span>
                </div>
            </Link>
        </div>
    )
};