import { FC } from 'react';
import styles from './index.module.scss';

interface Props {
  size: number;
  src: string | null;
}

export const Avatar: FC<Props> = ({ size, src }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };
  const defaultPhoto: string =
    'https://i.pinimg.com/474x/c6/00/f2/c600f276b3f7cafcd572402ac86e489b.jpg';

  return (
    <div className={styles.avatar} style={style}>
      <img src={src || defaultPhoto} alt="Avatar" className={styles.avatar__image} style={style} />
    </div>
  );
};
