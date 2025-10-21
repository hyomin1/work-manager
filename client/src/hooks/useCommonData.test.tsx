import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useCommonData } from './useCommonData';
import {
  getBusinesses,
  getDepartments,
  getDestinations,
  getEtcNames,
  getNames,
  getWorks,
} from '../api/commonData';
import { getCars } from '../features/vehicle-log/api/vehicleLog';

vi.mock('../api/commonData');
vi.mock('../features/vehicle-log/api/vehicleLog');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useCommonData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('모든 데이터를 조회한다', async () => {
    const mockUsernames = [{ id: '1', username: 'test' }];
    const mockDestinations = [{ id: '1', destination: 'test' }];
    const mockBusinesses = [{ id: '1', business: 'test' }];
    const mockWorks = [{ id: '1', work: 'test' }];
    const mockCars = [{ id: '1', car: 'test' }];
    const mockEtcList = [{ id: '1', etcName: 'test' }];
    const mockDepartments = [{ id: '1', department: 'test' }];

    vi.mocked(getNames).mockResolvedValue(mockUsernames);
    vi.mocked(getDestinations).mockResolvedValue(mockDestinations);
    vi.mocked(getBusinesses).mockResolvedValue(mockBusinesses);
    vi.mocked(getWorks).mockResolvedValue(mockWorks);
    vi.mocked(getCars).mockResolvedValue(mockCars);
    vi.mocked(getEtcNames).mockResolvedValue(mockEtcList);
    vi.mocked(getDepartments).mockResolvedValue(mockDepartments);

    const { result } = renderHook(() => useCommonData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.usernames).toHaveLength(1);
      expect(result.current.destinations).toHaveLength(1);
      expect(result.current.businesses).toHaveLength(1);
      expect(result.current.works).toHaveLength(1);
      expect(result.current.cars).toHaveLength(1);
      expect(result.current.etcList).toHaveLength(1);
      expect(result.current.departments).toHaveLength(1);
    });
  });

  it('로딩 상태를 올바르게 반환한다', async () => {
    vi.mocked(getNames).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve([]), 100))
    );
    vi.mocked(getDestinations).mockResolvedValue([]);
    vi.mocked(getBusinesses).mockResolvedValue([]);
    vi.mocked(getWorks).mockResolvedValue([]);
    vi.mocked(getCars).mockResolvedValue([]);
    vi.mocked(getEtcNames).mockResolvedValue([]);
    vi.mocked(getDepartments).mockResolvedValue([]);

    const { result } = renderHook(() => useCommonData(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
