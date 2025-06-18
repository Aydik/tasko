import { FC } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import { DragAndDrop } from 'features/draganddrop';

interface Props {
  searchQuery: string;
}

export const TaskBoard: FC<Props> = ({ searchQuery }) => {
  return (
    <div className={clsx(styles.Board)}>
      <DragAndDrop searchQuery={searchQuery} />
    </div>
  );
};
