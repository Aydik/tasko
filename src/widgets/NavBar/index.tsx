import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Divider } from 'shared/ui/Divider';
import { Typography } from 'shared/ui/Typography';
import { LogoLink } from './components/LogoLink';
import { NavLink } from './components/NavLink';
import { HELP_PAGES, MAIN_PAGES } from 'widgets/NavBar/constants';
import styles from './index.module.scss';
import { Variants } from 'shared/ui/Typography/enum/variants.ts';
import clsx from 'clsx';

import { useAuthStore } from 'app/store/auth/store.ts';
import { Avatar } from 'entities/User/components/Avatar';

export const NavBar: FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuthStore();

  const isSelected = (path: string) => currentPath === path;

  return (
    <div className={clsx(styles.navBar)}>
      <nav className={clsx(styles.nav)}>
        <div className={clsx(styles.logoLink_container)}>
          <LogoLink url="/" />
        </div>
        <ul className={clsx(styles.navList)}>
          {MAIN_PAGES.map((page) => (
            <li key={page.url} className={clsx(styles.navList__item)}>
              <NavLink
                url={page.url}
                icon={page.icon}
                text={page.text}
                selected={isSelected(page.url)}
              />
            </li>
          ))}
        </ul>
        <Typography variant={Variants.H3} className={clsx(styles.helpTitle)}>
          Помощь
        </Typography>
        <ul className={clsx(styles.navList, styles.navList_help)}>
          {HELP_PAGES.map((page) => (
            <li key={page.url} className={clsx(styles.navList__item)}>
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

      <div className={clsx(styles.accountContainer)}>
        <Link to={'/profile'}>
          <div className={clsx(styles.avatarContainer)}>
            <Avatar size={40} src={user?.photoPath || null} />
          </div>
          <div className={clsx(styles.credentialsContainer)}>
            <Typography variant={Variants.P} className={styles.credential}>
              {' '}
              {user?.name}{' '}
            </Typography>
            <Typography variant={Variants.P} className={styles.credential}>
              {' '}
              {user?.email}{' '}
            </Typography>
          </div>
        </Link>
      </div>
    </div>
  );
};
