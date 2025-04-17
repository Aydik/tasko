import {FC} from "react";
import styles from './index.module.scss'

interface Props {
    className?: string;
}

export const Divider: FC<Props> = ({className}) => {
    return (
        <div className={`${styles.divider} ${className}`}/>
    )
}