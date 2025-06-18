import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from 'app/schemas/validationScheme.ts';
import styles from 'features/auth/styles/index.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'app/store/auth/store.ts';
import { RegistrationRequest } from 'features/auth/types';

export const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();

  const registration = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const onSubmit = async () => {
    const data = getValues();
    try {
      await registration(data as RegistrationRequest);
      await login(data.email, data.password);
      await checkAuth();
      navigate('/tasks');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <input {...register('email')} placeholder="email" />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <input {...register('name')} placeholder="name" />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <input {...register('password')} type="password" placeholder="password" />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Подтверждение пароля"
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor={'isTeamLead'}> Вы ТимЛид? </label>
          <input id={'isTeamLead'} {...register('isTeamLead')} type="checkbox"></input>
        </div>
        <button type="submit">Создать аккаунт</button>
      </form>
      <p className={styles.agreementText}>
        Нажимая на кнопку &#39;Создать аккаунт&#39; вы соглашаетесь с правилами и политикой
        конфиденциальности
      </p>
      <Link to={'/login'}>Войти</Link>
    </div>
  );
};
