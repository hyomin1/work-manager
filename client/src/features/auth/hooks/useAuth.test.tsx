import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { authApi } from '../api/auth';
import { renderHook, waitFor } from '@testing-library/react';
import useAuth from './useAuth';
import { checkCarSession } from '../../vehicle-log/api/vehicleLog';
import type { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

vi.mock('../api/auth');
vi.mock('../../vehicle-log/api/vehicleLog');
vi.mock('react-hot-toast');
vi.mock('react-cookie', () => ({
  useCookies: () => [{}, vi.fn(), vi.fn()],
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockResponse = {
    data: { success: true },
    status: 200,
  } as unknown as AxiosResponse;
  describe('login', () => {
    it('로그인 성공 시 메뉴 페이지로 이동한다', async () => {
      vi.mocked(authApi.login).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      result.current.login.mutate({
        userId: 'test',
        password: 'test1234',
      });

      await waitFor(() => expect(result.current.login.isSuccess).toBe(true));
      expect(mockNavigate).toHaveBeenCalledWith('/menu');
    });

    it('로그인 실패 시 에러 토스트가 표시된다', async () => {
      vi.mocked(authApi.login).mockRejectedValue(new Error('error'));

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      result.current.login.mutate({
        userId: 'test',
        password: 'test1234',
      });
      await waitFor(() => expect(result.current.login.isError).toBe(true));
      expect(toast.error).toHaveBeenCalledWith('로그인에 실패했습니다.');
    });
  });

  describe('signup', () => {
    it('회원가입 성공 시 로그인 페이지로 이동한다', async () => {
      vi.mocked(authApi.signup).mockResolvedValue({
        ...mockResponse,
        status: 201,
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      result.current.signup.mutate({
        userId: 'test',
        password: 'test1234',
        passwordConfirm: 'test1234',
      });
      await waitFor(() => expect(result.current.signup.isSuccess).toBe(true));
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('회원가입 실패 시 에러 토스트가 표시된다', async () => {
      vi.mocked(authApi.signup).mockRejectedValue(new Error('error'));

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });
      result.current.signup.mutate({
        userId: 'test',
        password: 'test1234',
        passwordConfirm: 'test1234',
      });

      await waitFor(() => expect(result.current.signup.isError).toBe(true));
      expect(toast.error).toHaveBeenCalledWith('회원가입에 실패했습니다.');
    });
  });

  describe('logout', () => {
    it('로그아웃 성공 시 로그인 페이지로 이동한다', async () => {
      vi.mocked(authApi.logout).mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });
      result.current.logout.mutate();
      await waitFor(() => expect(result.current.logout.isSuccess).toBe(true));
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('checkUserPermission', () => {
    it('일반 유저일 경우 근무현황 페이지로 이동할 수 있다', async () => {
      vi.mocked(checkCarSession).mockResolvedValue({
        isUser: true,
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      await result.current.checkUserPermission();

      expect(mockNavigate).toHaveBeenCalledWith('/works');
    });

    it('권한이 없는 경우 토스트 메시지를 표시한다', async () => {
      vi.mocked(checkCarSession).mockResolvedValue({
        isUser: false,
      });

      const { result } = renderHook(() => useAuth(), {
        wrapper: createWrapper(),
      });

      await result.current.checkUserPermission();

      expect(toast.error).toHaveBeenCalledWith('권한이 없습니다.');
    });
  });
});
