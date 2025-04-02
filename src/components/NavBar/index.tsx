import React from "react";
import styles from './index.module.scss'
import {Divider} from "../../ui/Divider";

export const NavBar: React.FC = () => {
    return (
        <div className={styles['navbar-container']}>
            <div className={styles['navbar-bounds']}/>
            <div className={styles['navbar']}>
                <div className={styles['logo-container']}>

                </div>
                <Divider/>
                <nav className={styles['nav']}>

                </nav>
                <Divider/>
                <div className={styles['account-container']}>

                </div>
            </div>
        </div>
    )
}