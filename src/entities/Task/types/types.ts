export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskProps {
  task: TaskType;
}
