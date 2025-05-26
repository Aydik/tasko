import { FC } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const Divider: FC<Props> = ({ className }) => {
  return <div className={clsx(styles.divider, className)} />;
};
