import React from "react";
import styles from './index.module.scss'
import {Link} from "react-router-dom";

interface LogoLinkProps {
    url: string;
}

export const LogoLink: React.FC<LogoLinkProps> = ({url}: LogoLinkProps) => {
    return (
        <div className={styles['logo-link-container']}>
            <Link to={url} className={styles['logo-link']}>
                <img src={"/src/assets/images/vector/logo.svg"} alt="home" className={styles['logo']}/>
            </Link>
        </div>
    )
};