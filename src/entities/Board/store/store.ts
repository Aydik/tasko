import { create } from 'zustand';
import * as BoardService from '../service/board.service.ts';
import { BoardDto } from '../service/board.service.ts';

interface BoardsState {
  boards: BoardDto[]; // Изменил с projects на boards
  isLoading: boolean;
  error: string | null;
  getBoards: () => Promise<void>;
  getBoardsByProjectId: (projectId: number) => Promise<void>; // Добавил параметр
}

export const useBoardsStore = create<BoardsState>((set) => ({
  boards: [],
  isLoading: false,
  error: null,

  getBoards: async () => {
    set({ isLoading: true, error: null });
    try {
      const boards = await BoardService.getBoards();
      set({ boards, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to load boards',
        isLoading: false,
      });
    }
  },

  getBoardsByProjectId: async (projectId: number) => {
    set({ isLoading: true, error: null });
    try {
      const boards = await BoardService.getBoardsByProject(projectId);
      set({ boards, isLoading: false });
    } catch (error: any) {
      set({
        error: error.message || 'Failed to load project boards',
        isLoading: false,
      });
    }
  },
}));
