import { FC, useEffect, useState } from 'react';
import { getProfile } from 'entities/User/services/user.servise.ts';
import { RegistrationForm } from 'features/auth/components/RegistrationForm';
import { SignInForm } from 'features/auth/components/SignInForm';

interface Props {
  authType: 'login' | 'register';
}

export const Auth: FC<Props> = ({ authType }) => {
  return authType === 'register' ? <RegistrationForm /> : <SignInForm />;
};
