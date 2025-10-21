import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import useWorkStatus from './useWorkStatus';
import toast from 'react-hot-toast';
import { addWork, deleteWork, editWork, getWorks } from '../api/workStatus';
import type { AxiosResponse } from 'axios';
import type { AddWork, EditWorkStatus } from '../types/workStatus';

vi.mock('../api/workStatus');
vi.mock('react-hot-toast');

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

describe('useWorkStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockResponses = {
    status: 200,
  } as unknown as AxiosResponse[];

  const newWork = {
    selectedUsername: 'test',
    selectedDestinations: ['test1', 'test2', 'test3'],
    selectedBusinesses: ['test1', 'test2', 'test3'],
    selectedWorks: ['test1', 'test2', 'test3'],
    selectedCar: 'test',
    isDaily: 0,
    startDate: new Date('2025-10-21'),
    endDate: new Date('2025-10-21'),
    remarks: 'test',
  } as AddWork;
  describe('데이터 조회', () => {
    it('근무 현황 목록을 조회한다', async () => {
      const mockWorks = [
        { id: '1', username: 'test1', date: new Date('2025-10-21') },
        { id: '2', username: 'test2', date: new Date('2025-10-21') },
      ];

      vi.mocked(getWorks).mockResolvedValue(mockWorks);

      const testDate = new Date('2025-10-21');
      const { result } = renderHook(() => useWorkStatus(testDate), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.worksQuery.data).toHaveLength(2);
      });
    });
  });

  describe('add', () => {
    it('근무 현황 추가 성공 시 근무 목록 페이지로 이동한다', async () => {
      vi.mocked(addWork).mockResolvedValue(mockResponses);

      const { result } = renderHook(() => useWorkStatus(), {
        wrapper: createWrapper(),
      });

      result.current.add.mutate(newWork);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('업무가 등록되었습니다.');
        expect(mockNavigate).toHaveBeenCalledWith('/works');
      });
    });

    it('근무 현황 추가 실패', async () => {
      vi.mocked(addWork).mockRejectedValue(new Error('Failed'));

      const { result } = renderHook(() => useWorkStatus(), {
        wrapper: createWrapper(),
      });

      result.current.add.mutate(newWork);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('업무 등록에 실패했습니다.');
      });
    });
  });

  describe('edit', () => {
    it('근무 현황 수정 성공', async () => {
      vi.mocked(editWork).mockResolvedValue();

      const { result } = renderHook(() => useWorkStatus(), {
        wrapper: createWrapper(),
      });

      const editedWork = {
        _id: '1',
        username: 'test',
        startDate: new Date(),
        destination: 'test',
        business: 'test',
        work: 'test',
      } as EditWorkStatus;

      result.current.edit.mutate(editedWork);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('업무가 수정되었습니다.');
      });
    });

    it('근무 현황 수정 실패', async () => {
      vi.mocked(editWork).mockRejectedValue(new Error('error'));

      const { result } = renderHook(() => useWorkStatus(), {
        wrapper: createWrapper(),
      });

      const editedWork = {
        _id: '1',
        username: 'test',
        startDate: new Date(),
        destination: 'test',
        business: 'test',
        work: 'test',
      } as EditWorkStatus;

      result.current.edit.mutate(editedWork);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('업무 수정에 실패했습니다.');
      });
    });
  });

  describe('deleteMutation', () => {
    it('근무 현황 삭제 성공', async () => {
      vi.mocked(deleteWork).mockResolvedValue();

      const { result } = renderHook(() => useWorkStatus(), {
        wrapper: createWrapper(),
      });

      result.current.deleteMutation.mutate('1');

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '성공적으로 삭제되었습니다.'
        );
      });
    });

    it('근무 현황 삭제 실패', async () => {
      vi.mocked(deleteWork).mockRejectedValue(new Error('error'));

      const { result } = renderHook(() => useWorkStatus(), {
        wrapper: createWrapper(),
      });

      result.current.deleteMutation.mutate('1');

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('삭제에 실패했습니다.');
      });
    });
  });
});
