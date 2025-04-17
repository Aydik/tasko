import React from "react";
import styles from './index.module.scss'

interface Props {
    className?: string;
}

export const Divider: React.FC<Props> = ({className}) => {
    return (
        <div className={`${styles.divider} ${className}`}/>
    )
}