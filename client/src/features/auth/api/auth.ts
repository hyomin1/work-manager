import { api } from '../../../api';
import type { LoginInput, SignupInput } from '../types/auth';

export const authApi = {
  login: (data: LoginInput) => api.post('/auth/login', data),
  signup: (data: SignupInput) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  checkSession: () => api.get('/auth/checkSession'),
  checkAdminSession: () => api.get('/auth/checkAdminSession'),
};
