import React from "react";
import styles from './index.module.scss'
import {Header} from "../../shared/components/Header";
import {Divider} from "../../shared/ui/Divider";

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