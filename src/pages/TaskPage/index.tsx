import { FC } from 'react';
import { TaskBoard } from 'widgets/TaskBoard';
import styles from './index.module.scss';
import { Caption } from 'shared/components/Caption';

import clsx from 'clsx';

export const TaskPage: FC = () => {
  return (
    <main className={clsx(styles.Main)}>
      <Caption title="Доска команды" />
      <TaskBoard />
    </main>
  );
};
