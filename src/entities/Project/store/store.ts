import { create } from 'zustand';
import * as ProjectService from '../service/project.service.ts';
import { ProjectDto } from 'entities/Project/service/project.service.ts';

interface ProjectState {
  project: ProjectDto | null;
  isLoading: boolean;
  error: string | null;
  getProjects: () => Promise<void>;
  getProjectByUserId: (id: number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: null,
  isLoading: false,
  error: null,

  getProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const projects = await ProjectService.getProjects();
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  getProjectByUserId: async (userId: number) => {
    set({ isLoading: true, error: null });
    try {
      const project = await ProjectService.getProjectByUserId(userId);
      set({ project, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
