import { TaskStatus, TaskType } from 'entities/Task/types/types.ts';

export interface ColumnType {
  id: TaskStatus;
  title: string;
}

export interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
}
