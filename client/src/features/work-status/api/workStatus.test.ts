import { beforeEach, describe, expect, it, vi } from 'vitest';
import { addWork, deleteWork, editWork, getWorks } from './workStatus';
import { api } from '../../../utils';
import type { AddWork, EditWorkStatus } from '../types/workStatus';

vi.mock('../../../utils', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('workStatus API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getWorks', () => {
    it('특정 날짜의 근무 현황을 불러온다', async () => {
      const works = [
        {
          _id: 'test',
          isDaily: 0,
          createdAt: new Date(),
          isOwner: true,
          car: 'test',
          startDate: new Date(),
          endDate: new Date(),
          username: 'test',
          destination: 'test',
          business: 'test',
          work: 'test',
          specificDate: new Date(),
          remarks: 'test',
        },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: { allInforms: works },
      });
      const date = new Date();
      const res = await getWorks(date);
      expect(api.get).toHaveBeenCalledWith(
        `/api/employee-inform/getInform?date=${date}`
      );
      expect(res).toEqual(works);
    });

    it('근무 현황이 존재하지 않으면 빈 배열을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: { allInforms: [] },
      });
      const date = new Date();
      const res = await getWorks(date);
      expect(api.get).toHaveBeenCalledWith(
        `/api/employee-inform/getInform?date=${date}`
      );
      expect(res).toEqual([]);
    });
  });

  describe('deleteWork', () => {
    it('근무 현황을 삭제한다', async () => {
      const id = 'test';
      await deleteWork(id);
      expect(api.delete).toHaveBeenCalledWith(
        `/api/employee-inform/removeInform/${id}`
      );
    });
  });

  describe('addWork', () => {
    it('근무 현황을 추가한다', async () => {
      const data: AddWork = {
        selectedUsername: 'test',
        selectedDestinations: ['test'],
        selectedBusinesses: ['test'],
        selectedWorks: ['test'],
        selectedCar: 'test',
        isDaily: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-01'),
        remarks: 'test',
      };
      await addWork(data);
      expect(api.post).toHaveBeenCalledWith(
        '/api/employee-inform/addInform',
        expect.objectContaining({
          username: 'test',
          destination: 'test',
          business: 'test',
          work: 'test',
          car: 'test',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-01-01'),
          isDaily: 0,
          remarks: 'test',
        })
      );
      expect(api.post).toHaveBeenCalledTimes(1);
    });

    it('일일 업무일 때 startDate와 endDate가 현재 날짜로 설정되어야 한다', async () => {
      const workData: AddWork = {
        selectedUsername: '홍길동',
        selectedDestinations: ['서울'],
        selectedBusinesses: ['회의'],
        selectedWorks: ['프로젝트 미팅'],
        selectedCar: '차량1',
        isDaily: 1,
        startDate: new Date(2025, 0, 15),
        endDate: new Date(2025, 0, 15),
        remarks: '',
      };

      await addWork(workData);

      expect(api.post).toHaveBeenCalledWith(
        '/api/employee-inform/addInform',
        expect.objectContaining({
          isDaily: 1,
          startDate: expect.any(Date),
          endDate: expect.any(Date),
        })
      );
    });
  });

  describe('editWork', () => {
    it('작업을 수정해야 한다', async () => {
      const work: EditWorkStatus = {
        _id: 'work123',
        username: '홍길동',
        destination: '서울',
        business: '회의',
        work: '프로젝트 미팅 수정',
        car: '차량2',
        startDate: new Date(2025, 12, 15),
        endDate: new Date(2025, 12, 15),
        isDaily: 1,
        remarks: '수정됨',
      };

      await editWork(work);

      expect(api.put).toHaveBeenCalledWith(
        '/api/employee-inform/editInform',
        work
      );
    });
  });
});
