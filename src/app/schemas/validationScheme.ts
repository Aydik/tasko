import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Имя обязательно'),
    surname: Yup.string().required('Фамилия обязательна'),
    password: Yup.string()
        .min(6, 'Пароль должен быть не менее 6 символов')
        .required('Пароль обязателен'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Подтверждение пароля обязательно'),
});
