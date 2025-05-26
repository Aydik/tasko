import { FC } from 'react';
import styles from './index.module.scss';
import { Auth } from 'features/auth';

export const RegisterPage: FC = () => {
  return <Auth authType="register" />;
};
