import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import useVehicleLog from './useVehicle';
import toast from 'react-hot-toast';
import {
  addVehicleLog,
  addVehicleMaintenance,
  addVehicleNotice,
  deleteVehicleLog,
  deleteVehicleMaintenance,
  deleteVehicleNotice,
  editVehicleLog,
  editVehicleMaintenance,
  getCarMaintenances,
  getCars,
  getVehicleLogs,
} from '../api/vehicleLog';
import type { AxiosResponse } from 'axios';
import type {
  Maintenance,
  MaintenanceEditForm,
  VehicleLog,
  VehicleLogForm,
} from '../types/vehicleLog';

vi.mock('../api/vehicleLog');
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

describe('useVehicleLog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockResponse = {
    status: 200,
  } as unknown as AxiosResponse;
  const log = {
    car: '1234',
    selectedDate: new Date(),
    selectedUsernames: ['test1', 'test2'],
    destination: 'test',
    startKM: 100,
    endKM: 200,
    totalKM: 100,
    fuelCost: 100,
    toll: 100,
  } as VehicleLogForm;
  describe('데이터 조회', () => {
    it('차량 목록 조회', async () => {
      const mockCars = [
        { id: '1', car: '1234', notification: '' },
        { id: '2', car: '5678', notification: '' },
      ];

      vi.mocked(getCars).mockResolvedValue(mockCars);

      const { result } = renderHook(() => useVehicleLog(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.carsQuery.data).toHaveLength(2);
      });
    });

    it('특정 차량의 운행 일지 조회', async () => {
      const mockLogs = [
        {
          id: '1',
          car: '1234',
          date: new Date('2025-10-21'),
          username: 'test',
        },
      ];

      vi.mocked(getVehicleLogs).mockResolvedValue(mockLogs);
      vi.mocked(getCars).mockResolvedValue([]);

      const testDate = new Date('2025-10-21');
      const { result } = renderHook(() => useVehicleLog('1', testDate), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.vehicleLogsQuery.data).toHaveLength(1);
      });
    });

    it('carId나 currentDate가 없으면 쿼리 비활성화', () => {
      vi.mocked(getCars).mockResolvedValue([]);

      const { result } = renderHook(() => useVehicleLog(), {
        wrapper: createWrapper(),
      });

      expect(result.current.vehicleLogsQuery.data).toBeUndefined();
    });
  });

  describe('add', () => {
    it('운행 일지 추가 성공', async () => {
      vi.mocked(addVehicleLog).mockResolvedValue(mockResponse);
      vi.mocked(getCars).mockResolvedValue([]);

      const { result } = renderHook(() => useVehicleLog(), {
        wrapper: createWrapper(),
      });

      result.current.add.mutate(log);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('운행이 등록되었습니다.');
        expect(mockNavigate).toHaveBeenCalledWith('/vehicleLog', {
          state: { car: '1234' },
        });
      });
    });
  });

  describe('edit', () => {
    it('운행 일지 수정 성공', async () => {
      vi.mocked(editVehicleLog).mockResolvedValue(mockResponse);
      vi.mocked(getCars).mockResolvedValue([]);

      const { result } = renderHook(() => useVehicleLog(), {
        wrapper: createWrapper(),
      });

      const editedLog = {} as VehicleLog;

      result.current.edit.mutate(editedLog);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('운행이 수정되었습니다.');
      });
    });
  });

  describe('deleteLog', () => {
    it('운행 일지 삭제 성공', async () => {
      vi.mocked(deleteVehicleLog).mockResolvedValue(mockResponse);
      vi.mocked(getCars).mockResolvedValue([]);

      const { result } = renderHook(() => useVehicleLog(), {
        wrapper: createWrapper(),
      });

      result.current.deleteLog.mutate('1');

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '운행기록이 삭제 되었습니다.'
        );
      });
    });
  });

  describe('공지사항', () => {
    it('공지사항 추가 성공', async () => {
      vi.mocked(addVehicleNotice).mockResolvedValue(mockResponse);
      vi.mocked(getCars).mockResolvedValue([]);

      const { result } = renderHook(() => useVehicleLog(), {
        wrapper: createWrapper(),
      });

      result.current.addNotice.mutate({
        carId: '1',
        notification: '정비 필요',
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '공지사항이 등록 되었습니다.'
        );
      });
    });

    it('공지사항 삭제 성공', async () => {
      vi.mocked(deleteVehicleNotice).mockResolvedValue(mockResponse);
      vi.mocked(getCars).mockResolvedValue([]);

      const { result } = renderHook(() => useVehicleLog(), {
        wrapper: createWrapper(),
      });

      result.current.deleteNotice.mutate('1');

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '공지사항이 삭제 되었습니다.'
        );
      });
    });
  });

  describe('정비내역', () => {
    it('정비내역 조회', async () => {
      const mockMaintenances = [
        { id: '1', car: '1234', date: new Date('2025-10-21'), content: 'test' },
      ];

      vi.mocked(getCarMaintenances).mockResolvedValue(mockMaintenances);
      vi.mocked(getCars).mockResolvedValue([]);

      const { result } = renderHook(() => useVehicleLog('1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.maintenancesQuery.data).toHaveLength(1);
      });
    });

    it('정비내역 추가 성공', async () => {
      vi.mocked(addVehicleMaintenance).mockResolvedValue(mockResponse);
      vi.mocked(getCars).mockResolvedValue([]);

      const { result } = renderHook(() => useVehicleLog(), {
        wrapper: createWrapper(),
      });

      const form = {} as Maintenance;

      result.current.addMaintenance.mutate({
        carId: '1',
        form,
      });

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '정비내역이 등록되었습니다.'
        );
      });
    });

    it('정비내역 수정 성공', async () => {
      vi.mocked(editVehicleMaintenance).mockResolvedValue(mockResponse);
      vi.mocked(getCars).mockResolvedValue([]);

      const { result } = renderHook(() => useVehicleLog(), {
        wrapper: createWrapper(),
      });

      const editedMaintenance = {} as MaintenanceEditForm;

      result.current.editMaintenance.mutate(editedMaintenance);

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '정비내역이 수정 되었습니다.'
        );
      });
    });

    it('정비내역 삭제 성공', async () => {
      vi.mocked(deleteVehicleMaintenance).mockResolvedValue(mockResponse);
      vi.mocked(getCars).mockResolvedValue([]);

      const { result } = renderHook(() => useVehicleLog(), {
        wrapper: createWrapper(),
      });

      result.current.deleteMaintenance.mutate('1');

      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith(
          '정비내역이 삭제 되었습니다.'
        );
      });
    });
  });
});
