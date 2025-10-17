import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '../../../utils';
import { getSchedule } from './schedule';
import type { WorkStatus } from '../../work-status/types/workStatus';

vi.mock('../../../utils', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('schedule API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSchedule', () => {
    const schedules: WorkStatus[] = [
      {
        _id: '1',
        username: '이효민',
        destination: '서울',
        business: '회의',
        work: '미팅',
        car: '1234',
        startDate: new Date('2023-02-01T00:00:00.000Z'),
        endDate: new Date('2023-02-01T00:00:00.000Z'),
        createdAt: new Date('2023-02-01T00:00:00.000Z'),
        isDaily: 0,
        remarks: 'test',
        isOwner: false,
        specificDate: new Date('2023-02-01T00:00:00.000Z'),
      },
    ];
    const year = 2023;
    const month = 2;
    const username = 'test';
    it('연도와 월로 전체 스케줄을 조회한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { schedules } });
      const result = await getSchedule(year, month, username);

      expect(api.get).toHaveBeenCalledWith(
        `/api/schedule/getSchedule?year=${year}&month=${month}&username=${username}`
      );
      expect(result).toEqual(schedules);
    });

    it('데이터가 없는 경우 빈 배열을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: {},
      });
      const res = await getSchedule(year, month, username);
      expect(res).toEqual([]);
    });
  });

  describe('에러 처리', () => {
    it('네트워크 에러 시 에러를 throw 한다', async () => {
      const error = new Error('Network Error');
      vi.mocked(api.get).mockRejectedValue(error);

      await expect(getSchedule(2023, 2, 'test')).rejects.toThrow(error);
    });

    it('서버 에러시 에러를 throw 한다', async () => {
      const error = new Error('Internal Server Error');
      vi.mocked(api.get).mockRejectedValue(error);
      await expect(getSchedule(2023, 2, 'test')).rejects.toThrow(error);
    });
  });
});
