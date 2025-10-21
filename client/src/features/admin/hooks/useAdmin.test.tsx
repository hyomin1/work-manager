import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getBusinesses,
  getDestinations,
  getNames,
} from '../../../api/commonData';
import { renderHook, waitFor } from '@testing-library/react';
import { useAdmin } from './useAdmin';
import {
  createCommonItem,
  editCommonItem,
  removeCommonItem,
} from '../api/admin';
import toast from 'react-hot-toast';
import type { AxiosResponse } from 'axios';

vi.mock('../../../api/commonData');
vi.mock('../../vehicle-log/api/vehicleLog');
vi.mock('../api/admin');
vi.mock('react-hot-toast');

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

describe('useAdmin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockResponse = {
    data: {
      success: true,
      message: 'success',
    },
  } as unknown as AxiosResponse;
  describe('username 탭', () => {
    it('직원 목록을 정렬하여 반환한다', async () => {
      const mockNames = [
        { id: '1', username: '이효민' },
        { id: '2', username: '김철수' },
        { id: '3', username: '홍길동' },
      ];
      vi.mocked(getNames).mockResolvedValue(mockNames);
      const { result } = renderHook(() => useAdmin('username'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.data).toHaveLength(3);
      });

      expect(result.current.data[0].username).toBe('김철수');
      expect(result.current.data[1].username).toBe('이효민');
    });
  });

  describe('addItem', () => {
    it('아이템 추가 성공 시 토스트를 표시한다', async () => {
      vi.mocked(createCommonItem).mockResolvedValue(mockResponse);
      vi.mocked(getNames).mockResolvedValue([]);

      const { result } = renderHook(() => useAdmin('username'), {
        wrapper: createWrapper(),
      });

      result.current.addItem({ inputValue: 'test' });

      await waitFor(() =>
        expect(toast.success).toHaveBeenCalledWith('성공적으로 등록하였습니다.')
      );
    });

    it('아이템 추가 실패 시 에러 토스를 표시한다', async () => {
      vi.mocked(createCommonItem).mockRejectedValue(new Error('error'));
      vi.mocked(getNames).mockResolvedValue([]);

      const { result } = renderHook(() => useAdmin('username'), {
        wrapper: createWrapper(),
      });

      result.current.addItem({ inputValue: 'test' });

      await waitFor(() =>
        expect(toast.error).toHaveBeenCalledWith('등록에 실패했습니다.')
      );
    });
  });

  describe('editItem', () => {
    it('아이템 수정 성공 시 토스트를 표시한다', async () => {
      vi.mocked(editCommonItem).mockResolvedValue(mockResponse);
      vi.mocked(getNames).mockResolvedValue([]);

      const { result } = renderHook(() => useAdmin('username'), {
        wrapper: createWrapper(),
      });

      result.current.editItem({ editId: '1', inputValue: 'test' });

      await waitFor(() =>
        expect(toast.success).toHaveBeenCalledWith('성공적으로 수정하였습니다.')
      );
    });

    it('아이템 수정 실패 시 에러 토스트를 표시한다', async () => {
      vi.mocked(editCommonItem).mockRejectedValue(new Error('error'));
      vi.mocked(getNames).mockResolvedValue([]);

      const { result } = renderHook(() => useAdmin('username'), {
        wrapper: createWrapper(),
      });

      result.current.editItem({ editId: '1', inputValue: 'test' });

      await waitFor(() =>
        expect(toast.error).toHaveBeenCalledWith('수정에 실패했습니다.')
      );
    });
  });

  describe('removeItem', () => {
    it('아이템 삭제 성공 시 토스트를 표시한다', async () => {
      vi.mocked(removeCommonItem).mockResolvedValue(mockResponse);
      vi.mocked(getNames).mockResolvedValue([]);

      const { result } = renderHook(() => useAdmin('username'), {
        wrapper: createWrapper(),
      });

      result.current.removeItem('test');

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '성공적으로 삭제하였습니다.'
        );
      });
    });

    it('아이템 삭제 실패 시 에러 토스트를 표시한다', async () => {
      vi.mocked(removeCommonItem).mockRejectedValue(new Error('error'));
      vi.mocked(getNames).mockResolvedValue([]);

      const { result } = renderHook(() => useAdmin('username'), {
        wrapper: createWrapper(),
      });

      result.current.removeItem('test');

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('삭제에 실패했습니다.');
      });
    });
  });

  describe('business', () => {
    it('방문지도 함께 조회된다', async () => {
      const mockBusinesses = ['회의', '출장', '점검'];
      const mockDestinations = ['대전', '서울', '부산'];

      vi.mocked(getBusinesses).mockResolvedValue(mockBusinesses);
      vi.mocked(getDestinations).mockResolvedValue(mockDestinations);

      const { result } = renderHook(() => useAdmin('business'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockBusinesses);
        expect(result.current.destinations).toEqual(mockDestinations);
      });
    });
  });
});
