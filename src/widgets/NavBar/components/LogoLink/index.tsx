import {FC} from "react";
import styles from './index.module.scss'
import {Link} from "react-router-dom";

interface Props {
    url: string;
}

export const LogoLink: FC<Props> = ({url}) => {
    return (
        <Link to={url} className={styles.logoLink}>
            <img src={"/src/shared/assets/images/icons/logo.svg"} alt="home" className={styles.logo}/>
        </Link>
    )
};