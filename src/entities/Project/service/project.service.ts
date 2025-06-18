import { axiosInstance } from 'shared/api/axiosInstance.ts';
import { PROJECTS } from 'shared/api/ENDPOINTS.ts';

export interface ProjectDto {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  teamLeadId: string;
}

export const getProjects = async (): Promise<ProjectDto[]> => {
  const response = await axiosInstance.get(PROJECTS);
  return response.data;
};

export const getProjectByUserId = async (userId: number): Promise<ProjectDto[]> => {
  const response = await axiosInstance.get(`${PROJECTS}/${userId}`);
  return response.data;
};
