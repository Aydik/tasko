import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationLoginSchema } from 'app/schemas/validationScheme.ts';
import styles from 'features/auth/components/RegistrationForm/index.module.scss';
import { useAuthStore } from 'app/store/auth/store.ts';

export const SignInForm: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationLoginSchema),
  });

  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const onSubmit = async () => {
    const { email, password } = getValues();
    try {
      await login(email, password);
      await checkAuth();
      navigate('/tasks');
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <input type="email" {...register('email')} placeholder="email" />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <input {...register('password')} type="password" placeholder="password" />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        <button type="submit">Войти</button>
      </form>
      <p className={styles.agreementText}>
        Нажимая на кнопку 'Создать аккаунт' вы соглашаетесь с правилами и политикой
        конфиденциальности
      </p>
    </div>
  );
};
