import { apiClient, getAuthToken } from 'shared/api/api.ts';

export interface ProjectDto {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  teamLeadId: string;
}

export const getProjects = async (): Promise<ProjectDto[]> => {
  const response = await apiClient.get('/api/projects', {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });

  return response.data;
};

export const getProjectByUserId = async (userId: number): Promise<ProjectDto[]> => {
  const response = await apiClient.get(`/api/projects/${userId}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });

  return response.data;
};
