import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';
import clsx from 'clsx';

export const AuthorizedLayout: FC = () => {
  return (
    <div className={clsx(styles.mainContent)}>
      <Outlet />
    </div>
  );
};
