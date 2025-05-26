import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getProfile } from 'entities/User/services/user.servise.ts';

const AuthorizedLayout: FC = () => {
  const [access, setAccess] = useState<boolean>();
  const navigate = useNavigate();
  useEffect(() => {
    getProfile()
      .then(() => setAccess(true))
      .catch(() => navigate('/login'));
  }, []);
  if (access) return <Outlet />;
};
