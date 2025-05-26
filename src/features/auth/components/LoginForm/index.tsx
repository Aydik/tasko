import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormType } from 'features/Authentication/types';
import { Button } from 'shared/ui/Button';
import { Typography } from 'shared/ui/Typography';
import styles from 'features/Authentication/styles/index.module.scss';
import { InputWithFormatter } from 'features/Authentication/components/ui/InputWithFormatter';
import { formatPhone, formatPhoneBeforeRequest } from 'shared/utils/phoneFormatter.ts';
import { authUser } from 'features/Authentication/services/auth.service.ts';

interface LoginFormData {
  phone: string;
  password: string;
}

interface Props {
  setFormType: (type: FormType) => void;
}

export const LoginForm: FC<Props> = ({ setFormType }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authUser({
        login: formatPhoneBeforeRequest(data.phone),
        password: data.password,
      });
    } catch (e) {
      console.error('Ошибка авторизации:', e);
      setError('password', {
        type: 'manual',
        message: 'Неверный телефон или пароль',
      });
    }
  };

  return (
    <>
      <Typography variant={'h4'} className={styles.title}>
        Вход
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGrid}>
          <InputWithFormatter<LoginFormData>
            name="phone"
            label="Телефон"
            type="tel"
            control={control}
            format={formatPhone}
            error={errors.phone}
            rules={{
              required: 'Телефон обязателен',
              validate: (value: string | undefined) => {
                if (!value) return false;
                const digitsOnly = value.replace(/\D/g, '');
                return digitsOnly.length === 11 || 'Неверный формат телефона';
              },
            }}
          />
          <InputWithFormatter<LoginFormData>
            name="password"
            label="Пароль"
            type="password"
            control={control}
            error={errors.password}
            rules={{
              required: 'Введите пароль',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать минимум 6 символов',
              },
            }}
          />
        </div>
        <Button style="primary" className={styles.button} type="submit">
          Войти
        </Button>
        <div className={styles.linkContainer}>
          <button type="button" className={styles.link}>
            Войти с помощью смс
          </button>
          <button type="button" className={styles.link} onClick={() => setFormType('register')}>
            Регистрация
          </button>
        </div>
        <Button
          key={'loginForPartners'}
          style={'secondary'}
          className={styles.button}
          onClick={() => setFormType('login')}
        >
          Вход для партнеров
        </Button>
      </form>
    </>
  );
};
