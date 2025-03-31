export interface LoginFormData {
  userId: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  passwordConfirm: string;
}
