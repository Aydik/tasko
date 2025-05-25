import { FC, ReactNode } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface Props {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
  style?: string; //isPrimary, isSecondary etc.
  children: ReactNode;
}

export const Typography: FC<Props> = ({ variant = 'p', className, children, style }) => {
  switch (variant) {
    case 'h1':
      return <h1 className={clsx(className, style, styles.typography)}>{children}</h1>;
    case 'h2':
      return <h2 className={clsx(className, style, styles.typography)}>{children}</h2>;
    case 'h3':
      return <h3 className={clsx(className, style, styles.typography)}>{children}</h3>;
    case 'h4':
      return <h4 className={clsx(className, style, styles.typography)}>{children}</h4>;
    case 'h5':
      return <h5 className={clsx(className, style, styles.typography)}>{children}</h5>;
    case 'h6':
      return <h6 className={clsx(className, style, styles.typography)}>{children}</h6>;
    case 'p':
    default:
      return <p className={clsx(className, style, styles.typography)}>{children}</p>;
  }
};
