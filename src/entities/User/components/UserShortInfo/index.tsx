import { FC, useEffect, useState } from 'react';
import { Amount } from 'shared/ui/Amount';
import { ProfileButton } from 'entities/User/components/ProfileButton';
import { getProfile } from 'entities/User/services/user.servise.ts';
import styles from './index.module.scss';

export const UserShortInfo: FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPhoto, setPhoto] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<number | null>(null);

  useEffect(() => {
    getProfile().then((res) => {
      setUserName(res.firstname as string);
      setPhoto(res.photo_url);
      setUserBalance(res.balance);
    });
  }, []);

  if (userName) {
    return (
      <div className={styles.userInfo}>
        <Amount amount={userBalance} />
        <ProfileButton src={userPhoto} firstName={userName} />
      </div>
    );
  }
};
