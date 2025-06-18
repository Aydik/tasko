import { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './index.module.scss';
import clsx from 'clsx';
import { TaskProps } from 'entities/Task/types/types.ts';
import { Typography } from 'shared/ui/Typography';
import { Variants } from 'shared/ui/Typography/enum/variants.ts';
import { useAuthStore } from 'app/store/auth/store.ts';
import { useTaskStore } from 'features/draganddrop/store/task/store.ts';
import { deleteTask } from 'features/draganddrop/services/task.service.ts';

export const Task: FC<TaskProps> = ({ task }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });
  const { user } = useAuthStore();
  const { getTasks } = useTaskStore();

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const handleDelete = async () => {
    console.log('handleDelete called for task:', task.id);

    try {
      await deleteTask(task.id);
      await getTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  console.log(user?.teamLead);

  return (
    <div className={clsx(styles.Task)} style={style}>
      <div ref={setNodeRef} {...listeners} {...attributes} className={styles.dragHandle}>
        <Typography style={styles.leftMargin} variant={Variants.H5}>
          {task.title}
        </Typography>
        <Typography style={styles.leftMargin}> {task.description} </Typography>
        <Typography style={styles.leftMargin}> Создано: {task.createdAt} </Typography>
      </div>
      {user?.teamLead && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className={styles.deleteButton}
        >
          Delete
        </button>
      )}
    </div>
  );
};
