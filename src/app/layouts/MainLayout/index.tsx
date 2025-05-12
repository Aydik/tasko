import { FC } from 'react';
import { NavBar } from 'widgets/NavBar/ui/NavBar';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

export const MainLayout: FC = () => {
  return (
    <div className={styles.mainLayout}>
      <NavBar />
      <Outlet />
    </div>
  );
};
