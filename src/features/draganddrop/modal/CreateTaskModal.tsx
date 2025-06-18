import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { TaskStatus } from 'entities/Task/types/types.ts';
import clsx from 'clsx';
import { useProjectStore } from 'entities/Project/store/store.ts';
import { useBoardsStore } from 'entities/Board/store/store.ts';
import { useAuthStore } from 'app/store/auth/store.ts';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (taskData: {
    title: string;
    description: string;
    status?: TaskStatus;
    projectId: number;
    boardId: number;
    assigneeId?: number;
  }) => Promise<void>;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (taskData: {
    description: string;
    boardId: string;
    title: string;
    projectId: any;
    assigneeId: any;
    status?: TaskStatus;
  }) => Promise<void>;
}

export const CreateTaskModal: FC<CreateTaskModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthStore();
  const { project, isLoading: projectLoading, getProjectByUserId } = useProjectStore();
  const { boards, getBoardsByProjectId, isLoading: boardsLoading } = useBoardsStore();

  // Получаем проекты пользователя при открытии модалки
  useEffect(() => {
    if (isOpen && user?.id) {
      getProjectByUserId(user.id);
    }
  }, [isOpen, user, getProjectByUserId]);

  useEffect(() => {
    if (isOpen && project?.id) {
      getBoardsByProjectId(Number(project.id));
    }
  }, [isOpen, project, getBoardsByProjectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title) {
      setError('Title is required');
      return;
    }
    if (projectLoading || boardsLoading) {
      setError('Loading data, please wait...');
      return;
    }
    if (!project || boards.length === 0) {
      setError('No project or board found');
      return;
    }
    const projectId = project.id;
    const boardId = boards[0].id;
    setIsSubmitting(true);
    try {
      await onCreate({
        title,
        description,
        projectId,
        boardId,
        assigneeId: user?.id,
        status: undefined,
      });
      resetForm();
      onClose();
    } catch (error) {
      setError('Failed to create task');
      console.error('Failed to create task', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create New Task</h2>
          <button
            className={styles.closeButton}
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={clsx(styles.input, styles.textarea)}
              rows={4}
            />
          </div>

          <div className={styles.grid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Project</label>
              <div className={styles.infoBox}>
                {projectLoading ? (
                  <span>Loading project...</span>
                ) : project ? (
                  <span>{project.name}</span>
                ) : (
                  <span className={styles.error}>No project found</span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Board</label>
              <div className={styles.infoBox}>
                {boardsLoading ? (
                  <span>Loading board...</span>
                ) : boards.length > 0 ? (
                  <span>{boards[0].name}</span>
                ) : (
                  <span className={styles.error}>No board found</span>
                )}
              </div>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.footer}>
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className={clsx(styles.button, styles.secondary)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={clsx(styles.button, styles.primary)}
              disabled={
                isSubmitting ||
                projectLoading ||
                boardsLoading ||
                !project ||
                boards.length === 0
              }
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
