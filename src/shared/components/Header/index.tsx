import React from "react";
import styles from './index.module.scss'
import {SearchBar} from "../../ui/SearchBar";
import {Typography} from "../../ui/Typography";
import {Divider} from "shared/ui/Divider";

interface Props {
    title: string
}

export const Header: React.FC<Props> = ({title}) => {
    return (
        <header className={styles['header']}>
            <div className={styles['header-content']}>
                <Typography variant={'h1'} className={styles['header-title']}>{title}</Typography>
                <SearchBar/>
            </div>
            <Divider className={styles['divider']}/>
        </header>

    )
}