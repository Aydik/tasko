import { FC } from 'react';
import styles from './index.module.scss';
import { Typography } from 'shared/ui/Typography';
import { Avatar } from 'entities/User/components/Avatar';
import { useNavigate } from 'react-router-dom';

interface Props {
  firstName: string;
  src: string | null;
}

export const ProfileButton: FC<Props> = ({ src, firstName }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/profile');
  };
  return (
    <button className={styles.button} onClick={handleClick}>
      <Avatar size={24} src={src} />
      <Typography className={styles.name}>{firstName}</Typography>
    </button>
  );
};
