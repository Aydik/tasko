import axios from 'axios';
import { BASE_URL } from 'shared/api/ENDPOINTS.ts';
import { TaskStatus, TaskType } from 'entities/Task/types/types.ts';
import { CreateTaskInput, UpdateTaskInput } from 'features/draganddrop/types/types.ts';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = async (): Promise<TaskType[]> => {
  const response = await apiClient.get('/api/tasks', {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return response.data.map((task: any) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
  }));
};

export const createTask = async (input: CreateTaskInput): Promise<TaskType> => {
  const response = await apiClient.post('/api/tasks', input, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return {
    id: response.data.id,
    title: response.data.title,
    description: response.data.description,
    status: response.data.status,
    createdAt: response.data.createdAt,
  };
};

export const updateTask = async (id: number, input: UpdateTaskInput): Promise<TaskType> => {
  const response = await apiClient.put(`/api/tasks/${id}`, input, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return {
    id: response.data.id,
    title: response.data.title,
    description: response.data.description,
    status: response.data.status,
    createdAt: response.data.createdAt,
  };
};

export const deleteTask = async (id: number): Promise<void> => {
  await apiClient.delete(`api/tasks/${id}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
};

export const updateTaskStatus = async (id: number, status: TaskStatus): Promise<TaskType> => {
  const response = await apiClient.patch(
    `api/tasks/${id}/status`,
    {},
    { params: { status }, headers: { Authorization: `Bearer ${getAuthToken()}` } },
  );
  return {
    id: response.data.id,
    title: response.data.title,
    description: response.data.description,
    status: response.data.status,
    createdAt: response.data.createdAt,
  };
};
