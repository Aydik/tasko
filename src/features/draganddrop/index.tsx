import { FC, useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { ColumnType } from 'features/draganddrop/types/types.ts';
import { Column } from 'features/draganddrop/components/Column';
import { Task } from 'src/entities/Task';
import { TaskType } from 'entities/Task/types/types.ts';

const COLUMNS: ColumnType[] = [
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' },
];

const INITIAL_TASKS: TaskType[] = [
  { id: '1', title: 'API', description: 'создать api для приложения', status: 'TODO' },
  { id: '2', title: 'Дизайн', description: 'создать дизайн для приложения', status: 'IN_PROGRESS' },
  { id: '3', title: 'Фронтенд', description: 'Сверстать компонеты', status: 'IN_PROGRESS' },
  { id: '4', title: 'Тестирование', description: 'Задеплоить все приложение', status: 'DONE' },
];

export const DragAndDrop: FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>(INITIAL_TASKS);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {COLUMNS.map((column) => (
        <Column
          key={column.id}
          title={column.title}
          column={column}
          tasks={tasks.filter((task) => task.status === column.id)}
        />
      ))}
    </DndContext>
  );
};
