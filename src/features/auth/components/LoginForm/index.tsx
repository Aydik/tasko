import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationLoginSchema } from 'app/schemas/validationScheme.ts';
import styles from 'features/auth/styles/index.module.scss';
import { useAuthStore } from 'app/store/auth/store.ts';

export const LoginForm: FC = () => {
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
      <Link to={'/register'}>Регистрация</Link>
    </div>
  );
};
