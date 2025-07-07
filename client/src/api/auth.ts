import { axiosReq } from '../api';
import type { LoginFormData, RegisterFormData } from '../types/auth';

export const login = async (data: LoginFormData) => {
  const res = await axiosReq.post('/auth/login', data);

  return { status: res.status };
};

export const register = async (data: RegisterFormData) => {
  const res = await axiosReq.post('/auth/register', data);

  return { status: res.status, message: res.data.message };
};

export const logout = async () => {
  const res = await axiosReq.post('/auth/logout');
  return { status: res.status };
};

export const checkSession = async () => {
  const res = await axiosReq.get('/auth/checkSession');
  return { status: res.status };
};
