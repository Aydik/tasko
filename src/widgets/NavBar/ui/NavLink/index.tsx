import { FC } from 'react';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { INavLink } from 'shared/interfaces/NavLink.ts';
import { Icon } from 'shared/ui/Icon/Icon.tsx';

interface Props extends INavLink {
  selected?: boolean;
}

export const NavLink: FC<Props> = ({ url, text, icon, selected = false }: Props) => {
  return (
    <Link to={url} className={`${styles.navLink} ${selected ? styles.navLink_selected : ''}`}>
      <Icon name={icon} size={{ width: 24, height: 22 }} className={styles.icon} />
      <span className={styles.text}>{text}</span>
    </Link>
  );
};
