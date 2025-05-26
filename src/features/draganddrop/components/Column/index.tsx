import { FC } from 'react';
import { ColumnProps, ColumnType } from 'features/draganddrop/types/types.ts';
import { Task } from 'src/entities/Task';

import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Variants } from 'shared/ui/Typography/enum/variants.ts';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { Divider } from 'shared/ui/Divider';

export const Column: FC<ColumnProps> = ({ column, tasks }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div className={styles.Column}>
      <Typography style={styles.TaskName} variant={Variants.H4}>
        {column.title}
      </Typography>
      <Divider className={styles.divider} />
      <div ref={setNodeRef} className={clsx(styles.TaskContainer)}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
