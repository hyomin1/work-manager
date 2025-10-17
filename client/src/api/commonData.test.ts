import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '../utils';
import {
  getBusiness,
  getBusinesses,
  getDepartments,
  getDestinations,
  getEtcNames,
  getNames,
  getWorks,
} from './commonData';

vi.mock('../utils', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('commonData API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getNames', () => {
    it('직원 이름 목록을 조회한다', async () => {
      const names = ['이효민', '김철수', '홍길동'];
      vi.mocked(api.get).mockResolvedValue({ data: { allNames: names } });

      const result = await getNames();

      expect(result).toEqual(names);
    });

    it('데이터 없을 경우 빈 배열을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { allNames: [] } });

      const result = await getNames();

      expect(api.get).toHaveBeenCalledWith('/api/employee-inform/getName');
      expect(result).toEqual([]);
    });
  });

  describe('getDestinations', () => {
    it('방문지 목록을 조회한다', async () => {
      const destinations = ['서울', '광주', '부산'];
      vi.mocked(api.get).mockResolvedValue({
        data: { allDestinations: destinations },
      });

      const result = await getDestinations();

      expect(api.get).toHaveBeenCalledWith(
        '/api/employee-inform/getDestination'
      );
      expect(result).toEqual(destinations);
    });
    it('데이터 없을 경우 빈 배열을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { allDestinations: [] } });

      const result = await getDestinations();

      expect(result).toEqual([]);
    });
  });

  describe('getBusinesses', () => {
    it('사업명 목록을 조회한다', async () => {
      const businesses = ['회의', '출장', '점검'];
      vi.mocked(api.get).mockResolvedValue({
        data: { allBusinesses: businesses },
      });

      const result = await getBusinesses();

      expect(api.get).toHaveBeenCalledWith(
        '/api/employee-inform/getBusinesses'
      );
      expect(result).toEqual(businesses);
    });

    it('데이터가 없는 경우 빈 배열을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { allBusinesses: [] } });

      const result = await getBusinesses();

      expect(result).toEqual([]);
    });
  });

  describe('getBusiness', () => {
    it('특정 사업 정보를 조회한다', async () => {
      const business = '회의';
      vi.mocked(api.get).mockResolvedValue({ data: { business } });
      const result = await getBusiness(business);
      expect(api.get).toHaveBeenCalledWith(
        `/api/employee-inform/getBusiness/${business}`
      );
      expect(result).toEqual(business);
    });

    it('데이터가 없는 경우 빈 문자열을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { business: '' } });
      const result = await getBusiness('회의');
      expect(result).toEqual('');
    });
  });

  describe('getWorks', () => {
    it('업무 목록을 반환한다', async () => {
      const works = ['회의', '출장', '점검'];
      vi.mocked(api.get).mockResolvedValue({ data: { allWorks: works } });
      const result = await getWorks();
      expect(api.get).toHaveBeenCalledWith('/api/employee-inform/getWork');
      expect(result).toEqual(works);
    });

    it('데이터가 없는 경우 빈 배열을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { allWorks: [] } });
      const result = await getWorks();
      expect(result).toEqual([]);
    });
  });

  describe('getEtcNames', () => {
    it('기타 정보를 조회한다', async () => {
      const etcNames = ['기타1', '기타2', '기타3'];
      vi.mocked(api.get).mockResolvedValue({ data: { allEtcNames: etcNames } });
      const result = await getEtcNames();
      expect(api.get).toHaveBeenCalledWith('/api/employee-inform/getEtcName');
      expect(result).toEqual(etcNames);
    });

    it('데이터가 없는 경우 빈 배열을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { allEtcNames: [] } });
      const result = await getEtcNames();
      expect(result).toEqual([]);
    });
  });

  describe('getDepartment', () => {
    it('파트 정보를 조회한다', async () => {
      const departments = ['디비', '인프라', '미들'];
      vi.mocked(api.get).mockResolvedValue({
        data: { allDepartments: departments },
      });
      const result = await getDepartments();
      expect(api.get).toHaveBeenCalledWith(
        '/api/employee-inform/getDepartment'
      );
      expect(result).toEqual(departments);
    });

    it('데이터가 없는 경우 빈 배열을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { allDepartments: [] } });
      const result = await getDepartments();
      expect(result).toEqual([]);
    });
  });

  describe('에러 처리', () => {
    it('네트워크 에러 시 에러를 throw 한다', async () => {
      const error = new Error('Network Error');
      vi.mocked(api.get).mockRejectedValue(error);

      await expect(getNames()).rejects.toThrow(error);
    });

    it('서버 에러 시 에러를 throw 한다', async () => {
      const error = new Error('Internal Server Error');
      vi.mocked(api.get).mockRejectedValue(error);

      await expect(getDestinations()).rejects.toThrow(error);
    });
  });
});
