import { TaskStatus, TaskType } from 'entities/Task/types/types.ts';

export interface ColumnType {
  id: TaskStatus;
  title: string;
}

export interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  isTeamLead: boolean;
  setIsCreateModalOpen?: (isCreateModal: boolean) => void;
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
