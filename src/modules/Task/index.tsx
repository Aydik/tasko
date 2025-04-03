import React from "react";
import styles from './index.module.scss'
import {Header} from "../../components/Header";
import {Divider} from "../../ui/Divider";

export const Task: React.FC = () => {
    return (
        <div>
            <Header title={"Доска команды"}/>
            <div className={styles['divider-container']}>
                <Divider/>
            </div>
        </div>
    )
}