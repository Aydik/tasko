import { create } from 'zustand';
import { TaskStatus, TaskType } from 'entities/Task/types/types.ts';
import { CreateTaskInput, UpdateTaskInput } from 'features/draganddrop/types/types.ts';
import { devtools } from 'zustand/middleware';
import * as TaskService from '../../services/task.service.ts';

interface TaskState {
  tasks: TaskType[];
  isLoading: boolean;
  error: string | null;
}

interface TaskActions {
  getTasks: () => Promise<void>;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTask: (id: number, input: UpdateTaskInput) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  updateTaskStatus: (id: number, status: TaskStatus) => Promise<void>;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: null,
};

export const useTaskStore = create<TaskState & TaskActions>()(
  devtools(
    (set) => ({
      ...initialState,
      getTasks: async () => {
        set({ isLoading: true, error: null });
        try {
          const tasks = await TaskService.getTasks();
          set({ tasks, isLoading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to load tasks', isLoading: false });
        }
      },
      createTask: async (input) => {
        set({ isLoading: true, error: null });
        try {
          const newTask = await TaskService.createTask(input);
          set((state) => ({ tasks: [...state.tasks, newTask], isLoading: false }));
        } catch (error: any) {
          set({ error: error.message || 'Failed to create task', isLoading: false });
        }
      },
      updateTask: async (id, input) => {
        set({ isLoading: true, error: null });
        try {
          const updatedTask = await TaskService.updateTask(id, input);
          set((state) => ({
            tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
            isLoading: false,
          }));
        } catch (error: any) {
          set({ error: error.message || 'Failed to update task', isLoading: false });
        }
      },
      deleteTask: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await TaskService.deleteTask(id);
          set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== id),
            isLoading: false,
          }));
        } catch (error: any) {
          set({ error: error.message || 'Failed to delete task', isLoading: false });
        }
      },
      updateTaskStatus: async (id, status) => {
        set({ isLoading: true, error: null });
        try {
          const updatedTask = await TaskService.updateTaskStatus(id, status);
          set((state) => ({
            tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
            isLoading: false,
          }));
        } catch (error: any) {
          set({ error: error.message || 'Failed to update task status', isLoading: false });
        }
      },
    }),
    {
      name: 'task-store',
      serialize: true,
    },
  ),
);
