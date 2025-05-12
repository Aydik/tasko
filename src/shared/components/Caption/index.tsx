import { FC } from 'react';
import styles from './index.module.scss';
import { SearchBar } from '../../ui/SearchBar';
import { Typography } from '../../ui/Typography';
import { Divider } from 'shared/ui/Divider';

interface Props {
  title: string;
}

export const Caption: FC<Props> = ({ title }) => {
  return (
    <div className={styles.caption}>
      <div className={styles.caption__content}>
        <Typography variant={'h1'} className={styles.caption__title}>
          {title}
        </Typography>
        <SearchBar />
      </div>
      <Divider className={styles.divider} />
    </div>
  );
};
