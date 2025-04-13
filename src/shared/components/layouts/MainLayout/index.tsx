import React from "react";
import {NavBar} from "../../NavBar";
import {Outlet} from "react-router-dom";
import styles from './index.module.scss'

export const MainLayout: React.FC = () => {
    return (
        <div className={styles['main-layout']}>
            <NavBar/>
            <Outlet/>
        </div>
    )
}