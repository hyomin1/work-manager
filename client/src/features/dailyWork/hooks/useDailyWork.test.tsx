import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addDailyWork,
  deleteDailyWork,
  editDailyWork,
  getDailyWorks,
} from '../api/dailWork';
import { renderHook, waitFor } from '@testing-library/react';
import useDailyWork from './useDailyWork';
import type { DailyWork } from '../types/dailyWork';
import type { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

vi.mock('../api/dailWork');
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

describe('useDailyWork', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockResponse = {
    status: 200,
  } as unknown as AxiosResponse;

  const mockWork = {
    _id: '1',
    username: 'test1',
    department: 'test1',
    writerId: '1',
    createdAt: new Date('2025-10-21'),
    content: 'Test Content',
    nextContent: 'Test Next Content',
  };

  describe('getDailyWork', () => {
    it('일일 업무 목록을 조회한다', async () => {
      const mockData = [
        mockWork,
        {
          _id: '2',
          username: 'test2',
          department: 'test2',
          writerId: '2',
          createdAt: new Date('2025-10-21'),
          content: 'Test Content 2',
          nextContent: 'Test Next Content 2',
        },
      ] as DailyWork[];

      vi.mocked(getDailyWorks).mockResolvedValue(mockData);

      const { result } = renderHook(() => useDailyWork(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.dailyWorks).toEqual(mockData);
        expect(result.current.dailyWorks).toHaveLength(2);
      });
    });
  });

  describe('addItem', () => {
    const item = {
      writingDate: new Date(),
      username: 'test',
      department: 'test',
      content: 'test',
      nextContent: 'test',
    };
    it('일일 업무 추가 성공 시 토스트를 표시한다', async () => {
      vi.mocked(getDailyWorks).mockResolvedValue([]);
      vi.mocked(addDailyWork).mockResolvedValue({
        ...mockResponse,
        status: 201,
      });

      const { result } = renderHook(() => useDailyWork(new Date()), {
        wrapper: createWrapper(),
      });
      result.current.addItem(item);
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '일일 업무가 등록되었습니다.'
        );
      });
    });
    it('일일 업무 추가 실패시 에러 토스트를 표시한다', async () => {
      vi.mocked(getDailyWorks).mockResolvedValue([]);
      vi.mocked(addDailyWork).mockRejectedValue(new Error('test'));
      const { result } = renderHook(() => useDailyWork(new Date()), {
        wrapper: createWrapper(),
      });
      result.current.addItem(item);
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          '일일 업무 등록에 실패했습니다.'
        );
      });
    });
  });

  describe('editItem', () => {
    const item = {
      writingDate: new Date(),
      username: 'test',
      department: 'test',
      content: 'test',
      nextContent: 'test',
    };
    it('일일 업무 수정에 성공시 토스트를 표시한다', async () => {
      vi.mocked(getDailyWorks).mockResolvedValue([]);
      vi.mocked(editDailyWork).mockResolvedValue({
        ...mockResponse,
        status: 201,
      });

      const { result } = renderHook(() => useDailyWork(new Date()), {
        wrapper: createWrapper(),
      });
      result.current.editItem({ id: 'test', form: item });
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '일일 업무가 수정되었습니다.'
        );
      });
    });

    it('일일 업무 수정에 실패시 에러 토스트를 표시한다', async () => {
      vi.mocked(getDailyWorks).mockResolvedValue([]);
      vi.mocked(editDailyWork).mockRejectedValue(new Error('test'));
      const { result } = renderHook(() => useDailyWork(new Date()), {
        wrapper: createWrapper(),
      });
      result.current.editItem({ id: 'test', form: item });
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          '일일 업무 수정에 실패했습니다.'
        );
      });
    });
  });

  describe('deleteItem', () => {
    it('일일 업무 삭제 성공 시 토스트를 표시한다', async () => {
      vi.mocked(getDailyWorks).mockResolvedValue([]);
      vi.mocked(deleteDailyWork).mockResolvedValue(mockResponse);
      const { result } = renderHook(() => useDailyWork(new Date()), {
        wrapper: createWrapper(),
      });
      result.current.deleteItem('test');
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '일일 업무가 삭제되었습니다.'
        );
      });
    });

    it('일일 업무 삭제 실패 시 에러 토스트를 표시한다', async () => {
      vi.mocked(getDailyWorks).mockResolvedValue([]);
      vi.mocked(deleteDailyWork).mockRejectedValue(new Error('test'));
      const { result } = renderHook(() => useDailyWork(new Date()), {
        wrapper: createWrapper(),
      });
      result.current.deleteItem('test');
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          '일일 업무 삭제에 실패했습니다.'
        );
      });
    });
  });
});
