import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'app/store/auth/store.ts';
import styles from './index.module.scss';
import clsx from 'clsx';

export const AuthorizedLayout: FC = () => {
  return (
    <div className={clsx(styles.mainContent)}>
      <Outlet />
    </div>
  );
};
