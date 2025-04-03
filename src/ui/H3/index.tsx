import React from "react";
import styles from './index.module.scss'

interface H3Props {
    text: string;
}

export const H3: React.FC<H3Props> = ({text}: H3Props) => {
    return (
        <h3 className={styles['h3']}>{text}</h3>
    )
}