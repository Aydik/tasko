import { FC, useState } from 'react';
import { ColumnProps, ColumnType } from 'features/draganddrop/types/types.ts';
import { Task } from 'src/entities/Task';

import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { useDroppable } from '@dnd-kit/core';
import clsx from 'clsx';
import { Divider } from 'shared/ui/Divider';

export const Column: FC<ColumnProps> = ({
  column,
  tasks,
  isTeamLead,
  setIsCreateModalOpen,
}: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div className={styles.Column}>
      <div className={styles.ColumnHeader}>
        <Typography style={styles.TaskName}>{column.title}</Typography>
        {isTeamLead && column.title === 'To Do' && (
          <button
            className={clsx(styles.circleButton)}
            onClick={() => (setIsCreateModalOpen ? setIsCreateModalOpen(true) : null)}
          >
            +
          </button>
        )}
      </div>
      <Divider className={styles.divider} />
      <div ref={setNodeRef} className={clsx(styles.TaskContainer)}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
