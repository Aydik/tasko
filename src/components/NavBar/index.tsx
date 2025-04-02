import React from "react";
import styles from './index.module.scss'
import {Divider} from "../../ui/Divider";
import {LogoLink} from "../../ui/LogoLink";

export const NavBar: React.FC = () => {
    return (
        <div className={styles['nav-bar-container']}>
            <div className={styles['nav-bar-bounds']}/>
            <div className={styles['nav-bar']}>
                <LogoLink url={"/"}/>
                <nav className={styles['nav']}>

                </nav>
                <Divider/>
                <div className={styles['account-container']}>

                </div>
            </div>
        </div>
    )
}