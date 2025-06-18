import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  );
}; 