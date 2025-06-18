import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';
import mockRobertPhoto from '../../../public/assets/images/robertohusaini.jpg';
import { Typography } from 'shared/ui/Typography';
import { useAuthStore } from 'app/store/auth/store.ts';
import axios from 'axios';
import { BASE_URL } from 'shared/api/ENDPOINTS.ts';
import { Variants } from 'shared/ui/Typography/enum/variants.ts';
import { Button } from 'shared/ui/Button';
import { useNavigate } from 'react-router-dom';

export const ProfileCard: FC = () => {
  const { user, setUser, logout } = useAuthStore();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${BASE_URL}/api/profile/photo`, {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const imageUrl = URL.createObjectURL(response.data);
        setAvatar(imageUrl);
        setUser({ ...user!, photoPath: imageUrl });
      } catch (error: any) {
        console.error('Error fetching avatar:', error);
        setAvatar(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvatar();

    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [user?.id]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.post(`${BASE_URL}/api/profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setUser(response.data);

      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      setUser({ ...response.data, photoPath: imageUrl });
    } catch (error: any) {
      console.error(
        'Error uploading photo:',
        error.response?.status,
        error.response?.data || error.message,
      );

      const errorMessage =
        error.response?.status === 413
          ? 'Файл слишком большой. Максимальный размер: 10MB.'
          : error.response?.data || error.message;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={clsx(styles.profileWrapper)}>
      <div className={styles.avatarContainer}>
        {isLoading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : avatar ? (
          <img
            src={avatar}
            alt="Фото профиля"
            className={styles.avatar}
            onLoad={() => URL.revokeObjectURL(avatar)}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <span>{user.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <Typography variant={Variants.H3}>{user.name}</Typography>
      <Typography variant={Variants.P} className={styles.email}>
        {user.email}
      </Typography>

      {user.emailVerified && (
        <Typography variant={Variants.P} className={styles.emailVerified}>
          Ваша почта подтверждена
        </Typography>
      )}

      <label className={styles.uploadButton}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
          disabled={isLoading}
        />
        {isLoading ? 'Загрузка...' : 'Изменить фото'}
      </label>
      <Button onClick={handleLogout} className={styles.logoutButton}>Выход</Button>
    </div>
  );
};
