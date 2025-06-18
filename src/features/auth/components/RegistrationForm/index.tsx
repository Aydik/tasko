import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from 'app/schemas/validationScheme.ts';
import styles from './index.module.scss';
import getFieldValue from 'react-hook-form/dist/logic/getFieldValue';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from 'app/store/auth/store.ts';
import { RegistrationRequest } from 'features/auth/types';
export const RegistrationForm: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const registration = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const onSubmit = () => {
    const data = getValues();
    console.log(data);
    try {
      registration(data as RegistrationRequest).then(() => login(data.email, data.password));
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
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.formGroup}>
          <input {...register('name')} placeholder="name" />
          {errors.surname && <p className={styles.error}>{errors.surname.message}</p>}
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
          <label> Вы ТимЛид? </label>
          <input {...register('isTeamLead')} type="checkbox"></input>
        </div>
        <button type="submit">Создать аккаунт</button>
      </form>
      <p className={styles.agreementText}>
        Нажимая на кнопку 'Создать аккаунт' вы соглашаетесь с правилами и политикой
        конфиденциальности
      </p>
    </div>
  );
};
