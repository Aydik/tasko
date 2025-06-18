import axios from 'axios';
import { apiClient, getAuthToken } from 'shared/api/api.ts';

export interface BoardDto {
  id: string;
  name: string;
  projectId: string;
}

export const getBoards = async (): Promise<BoardDto[]> => {
  const response = await apiClient.get('/api/boards', {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return response.data;
};

export const getBoardsByProject = async (projectId: number): Promise<BoardDto[]> => {
  const response = await apiClient.get(`/api/boards/project/${projectId}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return response.data;
};
