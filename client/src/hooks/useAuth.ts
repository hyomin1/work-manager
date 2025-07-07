import { useMutation, useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { checkSession, login, logout, register } from '../api/auth';
import { ROUTES } from '../constants/constant';
import { useCallback } from 'react';
import type { LoginFormData, RegisterFormData } from '../types/auth';

export default function useAuth() {
  const navigate = useNavigate();
  const [, setCookie, removeCookie] = useCookies(['rememberUserId']);

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData & { isRemember?: boolean }) => login(data),
    onSuccess: (response, data) => {
      if (response.status === 200) {
        navigate(ROUTES.DASHBOARD);
      }
      if (data.isRemember) {
        setCookie('rememberUserId', data.userId, {
          path: '/',
          maxAge: 365 * 24 * 60 * 60,
        });
      } else {
        removeCookie('rememberUserId');
      }
    },
    onError: () => {
      //alert("로그인에 실패했습니다.");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => register(data),
    onSuccess: ({ status, message }) => {
      if (status === 201) {
        navigate(ROUTES.AUTH.LOGIN);
        alert(message);
      }
    },
    onError: () => {
      alert('회원가입에 실패했습니다.');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: ({ status }) => {
      if (status === 200) {
        navigate(ROUTES.AUTH.LOGIN);
      }
    },
    onError: () => {
      alert('로그아웃에 실패했습니다.');
    },
  });

  const sessionQuery = useQuery({
    queryKey: ['session'],
    queryFn: checkSession,
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
    loginMutation,
    registerMutation,
    logoutMutation,
    redirectIfAuthenticated,
  };
}
