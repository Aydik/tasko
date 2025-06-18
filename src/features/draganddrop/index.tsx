import { FC, useEffect, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { ColumnType } from 'features/draganddrop/types/types.ts';
import { Column } from 'features/draganddrop/components/Column';
import { TaskStatus, TaskType } from 'entities/Task/types/types.ts';
import { useTaskStore } from 'features/draganddrop/store/task/store.ts';
import { useAuthStore } from 'app/store/auth/store.ts';
import clsx from 'clsx';
import { CreateTaskModal } from 'features/draganddrop/modal/CreateTaskModal.tsx';
import styles from './index.module.scss';

interface Props {
  searchQuery: string;
}

const COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

export const DragAndDrop: FC<Props> = ({ searchQuery }) => {
  const { tasks, getTasks, updateTaskStatus, createTask, isLoading, error } = useTaskStore();
  const { user } = useAuthStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const isTeamLead: boolean = user?.teamLead || false; // Default to false if undefined

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = Number(active.id);
    console.log(taskId);
    const newStatus = over.id as TaskStatus;

    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  const handleCreateTask = async (taskData: {
    title: string;
    description: string;
    status?: TaskStatus;
    projectId: number;
    boardId: number;
    assigneeId?: number;
  }) => {
    await createTask({
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || COLUMNS[0].id as TaskStatus,
      projectId: taskData.projectId,
      boardId: taskData.boardId,
      assigneeId: taskData.assigneeId,
      authorId: user?.id || 0,
    });
    setIsCreateModalOpen(false);
  };

  const filteredTasks = tasks.filter(task => 
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div className={clsx(styles.loading)}>Loading...</div>;
  if (error) return <div className={clsx(styles.error)}>Error: {error}</div>;

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={filteredTasks.filter((task) => task.status === column.id)}
            isTeamLead={isTeamLead}
            setIsCreateModalOpen={setIsCreateModalOpen}
          />
        ))}
      </DndContext>
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </>
  );
};
