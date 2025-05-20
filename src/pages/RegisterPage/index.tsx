import { FC } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from './index.module.scss'
import { validationSchema } from "features/registration/model/validationScheme.ts";

export const RegisterPage: FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    })

    const onSubmit: SubmitHandler<{
        name: string;
        password: string;
        surname: string;
        confirmPassword: string;
    }> = (data) => {
        console.log(data)
        // как бэки дадут апишники тут пределать будет
    };

    return (
        <div className={styles.registerPage}>
            <div className={styles.header}>
                <div className={styles.logo}>TASKO</div>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.formContainer}>
                    <h2>Регистрация</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.formGroup}>
                            <input {...register('name')} placeholder="Имя" />
                            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <input {...register('surname')} placeholder="Фамилия" />
                            {errors.surname && <p className={styles.error}>{errors.surname.message}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <input {...register('password')} type="password" placeholder="Пароль" />
                            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <input {...register('confirmPassword')} type="password" placeholder="Подтверждение пароля" />
                            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                        </div>
                        <button type="submit">Создать аккаунт</button>
                    </form>
                    <p className={styles.agreementText}>
                        Нажимая на кнопку 'Создать аккаунт' вы соглашаетесь с правилами и политикой конфиденциальности
                    </p>
                    <div className={styles.socialLogins}>
                        <button className={styles.github}>GitHub</button>
                        <button className={styles.google}>Google</button>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <div className="copyright">© Tasko Corporation by Aydik & Codeinium for Agona</div>
            </footer>
        </div>
    )
}