import React from "react";
import styles from './index.module.scss'

interface H1Props {
    text: string;
}

export const H1: React.FC<H1Props> = ({text}: H1Props) => {
    return (
        <h1 className={styles['h1']}>{text}</h1>
    )
}