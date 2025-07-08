export interface LoginInput {
  userId: string;
  password: string;
}

export interface SignupInput extends LoginInput {
  passwordConfirm: string;
}
