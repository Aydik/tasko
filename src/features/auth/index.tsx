import { FC } from 'react';
import { RegistrationForm } from 'features/auth/components/RegistrationForm';
import { LoginForm } from 'features/auth/components/LoginForm';

interface Props {
  authType: 'login' | 'register';
}

export const Auth: FC<Props> = ({ authType }) => {
  return authType === 'register' ? <RegistrationForm /> : <LoginForm />;
};
