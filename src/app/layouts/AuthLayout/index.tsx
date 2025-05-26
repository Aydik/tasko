import styles from 'pages/RegisterPage/index.module.scss';
import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: FC = () => {
  return (
    <div className={styles.registerPage}>
      <header className={styles.header}>
        <div className={styles.logo}>TASKO</div>
      </header>
      <Outlet />
      <footer className={styles.footer}>
        <div className="copyright">© Tasko Corporation by Aydik & Codeinium for Agona</div>
      </footer>
    </div>
  );
};
