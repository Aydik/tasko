import { axiosInstance } from 'shared/api/axiosInstance';
import { BOARDS } from 'shared/api/ENDPOINTS.ts';

export interface BoardDto {
  id: string;
  name: string;
  projectId: string;
}

export const getBoards = async (): Promise<BoardDto[]> => {
  const response = await axiosInstance.get(BOARDS);
  return response.data;
};

export const getBoardsByProject = async (projectId: number): Promise<BoardDto[]> => {
  const response = await axiosInstance.get(`${BOARDS}/project/${projectId}`);
  return response.data;
};
