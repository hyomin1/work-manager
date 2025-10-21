import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import { ROUTES } from '../../../constants/constant';
import type { LoginInput, SignupInput } from '../types/auth';
import { toast } from 'react-hot-toast';
import type { AxiosError } from 'axios';
import { checkCarSession } from '../../vehicle-log/api/vehicleLog';

export default function useAuth() {
  const navigate = useNavigate();
  const [, setCookie, removeCookie] = useCookies(['rememberUserId']);
  const queryClient = useQueryClient();
  const login = useMutation({
    mutationFn: (data: LoginInput & { isRemember?: boolean }) =>
      authApi.login(data),
    onSuccess: (_, { userId, isRemember }) => {
      navigate(ROUTES.MENU);

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
      queryClient.removeQueries({ queryKey: ['session'] });
      navigate(ROUTES.AUTH.LOGIN);
    },
    onError: () => {
      toast.error('로그아웃에 실패했습니다.');
    },
  });

  const checkSession = useQuery({
    queryKey: ['session'],
    queryFn: authApi.checkSession,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });

  const redirectIfAuthenticated = () => {
    if (checkSession.isPending) return;
    if (checkSession.isSuccess && checkSession.data?.status === 200) {
      navigate(ROUTES.MENU);
    }
  };

  const checkUserPermission = async () => {
    // 차량 운행일지는 차량전용만 보는 유저가 따로있어서 근무현황 갈때는 권한 등급 체크해야함
    const response = await checkCarSession();
    if (response.isUser) {
      navigate(ROUTES.WORKS.LIST);
      return;
    }
    toast.error('권한이 없습니다.');
  };

  return {
    login,
    signup,
    logout,
    redirectIfAuthenticated,
    checkUserPermission,
  };
}
