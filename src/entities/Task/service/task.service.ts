import { apiClient, getAuthToken } from 'shared/api/api.ts';

export const deleteTask = async (taskId: string) => {
  const response = await apiClient.delete(`/api/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return response.data;
}; 