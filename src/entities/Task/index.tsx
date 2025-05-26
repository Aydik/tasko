import { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './index.module.scss';
import clsx from 'clsx';
import { TaskProps } from 'entities/Task/types/types.ts';
import { Typography } from 'shared/ui/Typography';
import { Variants } from 'shared/ui/Typography/enum/variants.ts';

export const Task: FC<TaskProps> = ({ task }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      className={clsx(styles.Task)}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <Typography style={styles.leftMargin} variant={Variants.H5}>
        {' '}
        {task.title}{' '}
      </Typography>
      <Typography style={styles.leftMargin}> {task.description} </Typography>
    </div>
  );
};
