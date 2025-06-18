import * as Yup from 'yup';
import { Reference } from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Почта обязательна').email(),
  name: Yup.string().required('Имя обязательно'),
  password: Yup.string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required('Пароль обязателен'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), null] as ReadonlyArray<
        Reference<string | undefined> | string | undefined
      >,
      'Пароли должны совпадать',
    )
    .required('Подтверждение пароля обязательно'),
  isTeamLead: Yup.boolean(),
});

export const validationLoginSchema = Yup.object().shape({
  email: Yup.string().required('Почта обязательна').email(),
  password: Yup.string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required('Пароль обязателен'),
});
