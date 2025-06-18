import { TaskStatus, TaskType } from 'entities/Task/types/types.ts';
import { User } from 'entities/User/types';

export interface ColumnType {
  id: TaskStatus;
  title: string;
}

export interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  isTeamLead: boolean;
  setIsCreateModalOpen?: (boolean) => void;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  authorId: number;
  projectId: number;
  boardId: number;
  assigneeId?: number;
}

export interface UpdateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
}
