import { FC, ReactNode } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { Variants } from 'shared/ui/Typography/enum/variants.ts';

interface Props {
  variant?: Variants;
  className?: string;
  style?: string; //isPrimary, isSecondary etc.
  children: ReactNode;
}

export const Typography: FC<Props> = ({ variant = Variants.P, className, children, style }) => {
  switch (variant) {
    case Variants.H1:
      return <h1 className={clsx(className, style, styles.typography)}>{children}</h1>;
    case Variants.H2:
      return <h2 className={clsx(className, style, styles.typography)}>{children}</h2>;
    case Variants.H3:
      return <h3 className={clsx(className, style, styles.typography)}>{children}</h3>;
    case Variants.H4:
      return <h4 className={clsx(className, style, styles.typography)}>{children}</h4>;
    case Variants.H5:
      return <h5 className={clsx(className, style, styles.typography)}>{children}</h5>;
    case Variants.H6:
      return <h6 className={clsx(className, style, styles.typography)}>{children}</h6>;
    case Variants.P:
    default:
      return <p className={clsx(className, style, styles.typography)}>{children}</p>;
  }
};
