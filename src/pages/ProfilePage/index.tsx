import { FC } from 'react';
import clsx from 'clsx';
import styles from 'pages/TaskPage/index.module.scss';
import { Caption } from 'shared/components/Caption';
import { ProfileCard } from 'features/profile';

export const ProfilePage: FC = () => {
  return (
    <main className={clsx(styles.Main)}>
      <Caption title="Профиль" />
      <ProfileCard />
    </main>
  );
};
