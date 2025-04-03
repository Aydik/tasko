import React from "react";
import styles from './index.module.scss'
import {HeaderProps} from "./index.interfaces.ts";
import {H1} from "../../ui/H1";

export const Header: React.FC<HeaderProps> = ({title}: HeaderProps) => {
    return (
        <header className={styles['header']}>
            <div className={styles['header-content']}>
                <H1 text={title}/>
            </div>
        </header>
    )
}