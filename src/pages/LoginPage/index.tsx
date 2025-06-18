import { FC } from 'react';
import styles from './index.module.scss';
import { Auth } from 'features/auth';

export const LoginPage: FC = () => {
  return <Auth authType="login" />;
};
