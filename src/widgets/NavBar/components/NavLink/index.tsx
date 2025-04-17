import {FC} from "react";
import styles from './index.module.scss'
import {Link} from "react-router-dom";
import {INavLink} from 'shared/interfaces/NavLink.ts'
import {SvgIcon} from "shared/ui/SvgIcon";

interface Props extends INavLink {
    selected?: boolean;
}

export const NavLink: FC<Props> = ({url, text, icon, selected = false}: Props) => {
    return (
        <Link to={url} className={`${styles.navLink} ${selected ? styles.navLink_selected : ''}`}>
            <div className={styles['icon-container']}>
                <SvgIcon className={styles.icon} src={`/src/shared/assets/images/vector/${icon}.svg`}/>
            </div>
            <span className={styles.text}>{text}</span>
        </Link>
    )
};