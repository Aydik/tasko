import { FC } from 'react';
import styles from './index.module.scss';
import { SearchBar } from '../../ui/SearchBar';
import { Typography } from '../../ui/Typography';
import { Divider } from 'shared/ui/Divider';

interface Props {
  title: string;
}

export const Header: FC<Props> = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <Typography variant={'h1'} className={styles.header__title}>
          {title}
        </Typography>
        <SearchBar />
      </div>
      <Divider className={styles.divider} />
    </header>
  );
};
