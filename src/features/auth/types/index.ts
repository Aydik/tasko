export type FormType = 'login' | 'register';

export interface AuthorizeUserData {
  login: string;
  password: string;
}

export interface RegisterUserData {
  login: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  email: string;
  password: string;
}
