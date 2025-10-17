import { vi, describe, expect, beforeEach, it } from 'vitest';
import { api } from '../../../utils';
import { getUserStatistics, getDestinationStatistics } from './statistics';

vi.mock('../../../utils', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('statistics API 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserStatistics', () => {
    it('특정 사용자의 기간별 통계를 조회해야 한다', async () => {
      const username = '이효민';
      const startDate = new Date('2025-10-01');
      const endDate = new Date('2025-10-31');
      const mockStatistics = [
        {
          date: new Date('2025-10-15'),
          destination: '서울',
          business: '회의',
          work: '회의',
        },
        {
          date: new Date('2025-10-16'),
          destination: '부산',
          business: '출장',
          work: '점검',
        },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: { userStatistics: mockStatistics },
      });

      const result = await getUserStatistics(username, startDate, endDate);

      expect(api.get).toHaveBeenCalledWith(
        `/api/employee-inform/userStatistics?username=${username}&startDate=${startDate}&endDate=${endDate}`
      );
      expect(result).toEqual(mockStatistics);
    });

    it('데이터가 없을 경우 빈 배열을 반환해야 한다', async () => {
      const username = '존재하지않는사용자';
      const startDate = new Date('2025-10-01');
      const endDate = new Date('2025-10-31');

      vi.mocked(api.get).mockResolvedValue({
        data: {},
      });

      const result = await getUserStatistics(username, startDate, endDate);

      expect(result).toEqual([]);
    });

    it('단일 날짜(하루)의 통계를 조회해야 한다', async () => {
      const username = '홍길동';
      const startDate = new Date('2025-10-15');
      const endDate = new Date('2025-10-15');
      const mockStatistics = [
        {
          date: new Date('2025-10-15'),
          destination: '서울',
          business: '회의',
          work: '프로젝트 회의',
        },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: { userStatistics: mockStatistics },
      });

      const result = await getUserStatistics(username, startDate, endDate);

      expect(api.get).toHaveBeenCalledWith(
        `/api/employee-inform/userStatistics?username=${username}&startDate=${startDate}&endDate=${endDate}`
      );
      expect(result).toEqual(mockStatistics);
    });

    it('장기간(1년) 통계를 조회해야 한다', async () => {
      const username = '홍길동';
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-12-31');
      const mockStatistics = [
        {
          date: new Date('2024-06-15'),
          destination: '서울',
          business: '회의',
          work: '프로젝트',
        },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: { userStatistics: mockStatistics },
      });

      const result = await getUserStatistics(username, startDate, endDate);

      expect(api.get).toHaveBeenCalledWith(
        `/api/employee-inform/userStatistics?username=${username}&startDate=${startDate}&endDate=${endDate}`
      );
      expect(result).toEqual(mockStatistics);
    });
  });

  describe('getDestinationStatistics', () => {
    it('특정 방문지의 기간별 통계를 조회해야 한다', async () => {
      const destination = '서울';
      const startDate = new Date('2025-10-01');
      const endDate = new Date('2025-10-31');
      const mockStatistics = [
        {
          date: new Date('2025-10-15'),
          username: '홍길동',
          business: '회의',
          work: '회의',
        },
        {
          date: new Date('2025-10-16'),
          username: '김철수',
          business: '출장',
          work: '점검',
        },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: { destinationStatistics: mockStatistics },
      });

      const result = await getDestinationStatistics(
        destination,
        startDate,
        endDate
      );

      expect(api.get).toHaveBeenCalledWith(
        `/api/employee-inform/destinationStatistics?destination=${destination}&startDate=${startDate}&endDate=${endDate}`
      );
      expect(result).toEqual(mockStatistics);
    });

    it('데이터가 없을 경우 빈 배열을 반환해야 한다', async () => {
      const destination = '존재하지않는장소';
      const startDate = new Date('2025-10-01');
      const endDate = new Date('2025-10-31');

      vi.mocked(api.get).mockResolvedValue({
        data: {},
      });

      const result = await getDestinationStatistics(
        destination,
        startDate,
        endDate
      );

      expect(result).toEqual([]);
    });

    it('여러 사용자가 같은 장소를 방문한 통계를 조회해야 한다', async () => {
      const destination = '부산';
      const startDate = new Date('2025-10-01');
      const endDate = new Date('2025-10-31');
      const mockStatistics = [
        {
          date: new Date('2025-10-10'),
          username: '홍길동',
          business: '출장',
          work: '업무1',
          hours: 10,
        },
        {
          date: new Date('2025-10-10'),
          username: '김철수',
          business: '출장',
          work: '업무2',
          hours: 10,
        },
        {
          date: new Date('2025-10-20'),
          username: '이효민',
          business: '회의',
          work: '업무3',
        },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: { destinationStatistics: mockStatistics },
      });

      const result = await getDestinationStatistics(
        destination,
        startDate,
        endDate
      );

      expect(result).toHaveLength(3);
      expect(result).toEqual(mockStatistics);
    });

    it('단일 날짜의 방문지 통계를 조회해야 한다', async () => {
      const destination = '대구';
      const startDate = new Date('2025-10-15');
      const endDate = new Date('2025-10-15');
      const mockStatistics = [
        {
          date: new Date('2025-10-15'),
          username: '홍길동',
          business: '회의',
          work: '프로젝트',
        },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: { destinationStatistics: mockStatistics },
      });

      const result = await getDestinationStatistics(
        destination,
        startDate,
        endDate
      );

      expect(result).toEqual(mockStatistics);
    });
  });

  describe('에러 처리', () => {
    it('네트워크 에러 시 에러를 throw 해야 한다', async () => {
      const error = new Error('Network Error');
      vi.mocked(api.get).mockRejectedValue(error);

      await expect(
        getUserStatistics('홍길동', new Date(), new Date())
      ).rejects.toThrow('Network Error');
    });

    it('서버 에러 시 에러를 throw 해야 한다', async () => {
      const error = new Error('Internal Server Error');
      vi.mocked(api.get).mockRejectedValue(error);

      await expect(
        getDestinationStatistics('서울', new Date(), new Date())
      ).rejects.toThrow('Internal Server Error');
    });
  });
});
