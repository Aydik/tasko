import { FC } from 'react';
import { Caption } from 'src/shared/components/Caption';
import clsx from 'clsx';
import styles from './index.module.scss';
import { DragAndDrop } from 'features/draganddrop';

export const TaskBoard: FC = () => {
  return (
    <div className={clsx(styles.Board)}>
      <DragAndDrop />
    </div>
  );
};
