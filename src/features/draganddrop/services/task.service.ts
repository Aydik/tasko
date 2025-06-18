import { TaskStatus, TaskType } from 'entities/Task/types/types.ts';
import { CreateTaskInput, UpdateTaskInput } from 'features/draganddrop/types/types.ts';
import { axiosInstance } from 'shared/api/axiosInstance.ts';
import { TASKS } from 'shared/api/ENDPOINTS.ts';

export const getTasks = async (): Promise<TaskType[]> => {
  const response = await axiosInstance.get(TASKS);
  return response.data.map((task: any) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
  }));
};

export const createTask = async (input: CreateTaskInput): Promise<TaskType> => {
  const response = await axiosInstance.post(TASKS, input);
  return {
    id: response.data.id,
    title: response.data.title,
    description: response.data.description,
    status: response.data.status,
    createdAt: response.data.createdAt,
  };
};

export const updateTask = async (id: number, input: UpdateTaskInput): Promise<TaskType> => {
  const response = await axiosInstance.put(`${TASKS}/${id}`, input);
  return {
    id: response.data.id,
    title: response.data.title,
    description: response.data.description,
    status: response.data.status,
    createdAt: response.data.createdAt,
  };
};

export const deleteTask = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${TASKS}/${id}`);
};

export const updateTaskStatus = async (id: number, status: TaskStatus): Promise<TaskType> => {
  const response = await axiosInstance.patch(`${TASKS}/${id}/status`, {}, { params: { status } });
  return {
    id: response.data.id,
    title: response.data.title,
    description: response.data.description,
    status: response.data.status,
    createdAt: response.data.createdAt,
  };
};
