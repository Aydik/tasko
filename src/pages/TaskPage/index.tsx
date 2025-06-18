import { FC, useState, ChangeEvent } from 'react';
import { TaskBoard } from 'widgets/TaskBoard';
import styles from './index.module.scss';
import { Caption } from 'shared/components/Caption';

import clsx from 'clsx';

export const TaskPage: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <main className={clsx(styles.Main)}>
      <Caption title="Доска команды" searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <TaskBoard searchQuery={searchQuery} />
    </main>
  );
};
