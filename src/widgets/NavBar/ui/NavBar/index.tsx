import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Divider } from 'shared/ui/Divider';
import { Typography } from 'shared/ui/Typography';
import { LogoLink } from '../LogoLink';
import { NavLink } from '../NavLink';
import { mainPages, helpPages } from 'widgets/NavBar/model/pages.ts';
import styles from './index.module.scss';

export const NavBar: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isSelected = (path: string) => currentPath === path;

  return (
    <div className={styles.navBar}>
      <nav className={styles.nav}>
        <div className={styles.logoLink_container}>
          <LogoLink url="/" />
        </div>
        <ul className={styles.navList}>
          {mainPages.map((page) => (
            <li key={page.url} className={styles.navList__item}>
              <NavLink
                url={page.url}
                icon={page.icon}
                text={page.text}
                selected={isSelected(page.url)}
              />
            </li>
          ))}
        </ul>
        <Typography variant={'h3'} className={styles.helpTitle}>
          Помощь
        </Typography>
        <ul className={`${styles.navList} ${styles.navList_help}`}>
          {helpPages.map((page) => (
            <li key={page.url} className={styles.navList__item}>
              <NavLink
                url={page.url}
                icon={page.icon}
                text={page.text}
                selected={isSelected(page.url)}
              />
            </li>
          ))}
        </ul>
      </nav>
      <Divider />
      <div className={styles.accountContainer} />
    </div>
  );
};
