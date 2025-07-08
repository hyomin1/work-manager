import { useMutation, useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { ROUTES } from '../../../constants/constant';
import { useCallback } from 'react';
import type { LoginInput, SignupInput } from '../types/auth';
import toast from './../../../../node_modules/react-hot-toast/src/index';
import type { AxiosError } from 'axios';

export default function useAuth() {
  const navigate = useNavigate();
  const [, setCookie, removeCookie] = useCookies(['rememberUserId']);

  const login = useMutation({
    mutationFn: (data: LoginInput & { isRemember?: boolean }) =>
      authApi.login(data),
    onSuccess: (_, { userId, isRemember }) => {
      navigate(ROUTES.DASHBOARD);

      if (isRemember) {
        setCookie('rememberUserId', userId, {
          path: '/',
          maxAge: 365 * 24 * 60 * 60,
        });
      } else {
        removeCookie('rememberUserId');
      }
    },
    onError: () => {
      toast.error('로그인에 실패했습니다.');
    },
  });

  const signup = useMutation({
    mutationFn: (data: SignupInput) => authApi.signup(data),
    onSuccess: () => {
      toast.success('회원가입에 성공했습니다.');
      navigate(ROUTES.AUTH.LOGIN);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<{ error: string }>;
      const message =
        axiosError.response?.data.error || '회원가입에 실패했습니다.';
      toast.error(message);
    },
  });

  const logout = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      navigate(ROUTES.AUTH.LOGIN);
    },
    onError: () => {
      toast.error('로그아웃에 실패했습니다.');
    },
  });

  const sessionQuery = useQuery({
    queryKey: ['session'],
    queryFn: authApi.checkSession,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const redirectIfAuthenticated = useCallback(() => {
    if (sessionQuery.data?.status === 200) {
      navigate(ROUTES.DASHBOARD);
      return true;
    }
    return false;
  }, [sessionQuery.data, navigate]);
  return {
    login,
    signup,
    logout,
    redirectIfAuthenticated,
  };
}
