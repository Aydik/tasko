import { FC, useEffect, useState } from 'react';
import { getProfile } from 'entities/User/services/user.servise.ts';
import { redirect } from 'react-router-dom';
import { RegistrationForm } from 'features/auth/components/RegistrationForm';

interface Props {
  authType: 'login' | 'register';
}

export const Auth: FC<Props> = ({ authType }) => {
  if (authType === 'register') return <RegistrationForm />;
};
