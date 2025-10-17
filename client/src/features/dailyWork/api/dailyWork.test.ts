import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { DailyWorkForm } from '../types/dailyWork';
import {
  addDailyWork,
  deleteDailyWork,
  editDailyWork,
  getDailyWork,
  getDailyWorks,
} from './dailWork';
import { api } from '../../../utils';

vi.mock('../../../utils', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('dailyWork API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const form: DailyWorkForm = {
    writingDate: new Date(),
    username: 'test',
    department: 'test',
    content: 'test',
    nextContent: 'test',
  };
  describe('addDailyWork', () => {
    it('일일 업무를 추가한다', async () => {
      const response = { data: { message: '작성 완료' } };
      vi.mocked(api.post).mockResolvedValue(response);
      const result = await addDailyWork(form);

      expect(result).toEqual(response);
    });

    it('필수 필드가 누락된 경우 에러를 throw 한다', async () => {
      const form = {} as DailyWorkForm;
      const error = new Error('error');
      vi.mocked(api.post).mockRejectedValue(error);

      await expect(addDailyWork(form)).rejects.toThrow(error);
    });
  });

  describe('getDailyWorks', () => {
    it('특정 날짜의 일일 업무 목록을 조회한다', async () => {
      const date = new Date();

      vi.mocked(api.get).mockResolvedValue({
        data: { allDailyWorks: form },
      });
      const result = await getDailyWorks(date);

      expect(api.get).toHaveBeenCalledWith(
        `/api/employee-inform/dailyWork?date=${date}`
      );
      expect(result).toEqual(form);
    });

    it('데이터가 없는 경우 빈 배열을 반환한다', async () => {
      const date = new Date('2025-10-19');
      vi.mocked(api.get).mockResolvedValue({
        data: {},
      });
      const result = await getDailyWorks(date);

      expect(result).toEqual([]);
    });
  });

  describe('getDailyWork', () => {
    it('특정 일일 업무의 상세 정보를 조회한다', async () => {
      const id = 'test';
      const response = { data: { dailyWork: form } };
      vi.mocked(api.get).mockResolvedValue(response);
      const result = await getDailyWork(id);
      expect(api.get).toHaveBeenCalledWith(
        `/api/employee-inform/dailyWork/${id}`
      );
      expect(result).toEqual(response.data.dailyWork);
    });

    it('아이디가 없는 경우에도 요청은 전송된다', async () => {
      vi.mocked(api.get).mockResolvedValue({ data: { dailyWork: null } });

      await getDailyWork(undefined);

      expect(api.get).toHaveBeenCalledWith(
        '/api/employee-inform/dailyWork/undefined'
      );
    });
  });

  describe('editDailyWork', () => {
    it('일일 업무를 수정한다', async () => {
      const response = { data: { message: '정보 수정 완료' } };
      vi.mocked(api.put).mockResolvedValue(response);

      const result = await editDailyWork('test', form);

      expect(api.put).toHaveBeenNthCalledWith(
        1,
        '/api/employee-inform/dailyWork/edit',
        {
          _id: 'test',
          ...form,
        }
      );
      expect(result).toEqual(response);
    });

    it('수정 중 에러 발생 시 에러를 throw 한다', async () => {
      const error = new Error('error');
      vi.mocked(api.put).mockRejectedValue(error);
      expect(editDailyWork('test', form)).rejects.toThrow(error);
    });
  });

  describe('deleteDailyWork', () => {
    it('일일 업무를 삭제한다', async () => {
      const response = { data: { message: '작성 삭제 완료' } };
      vi.mocked(api.delete).mockResolvedValue(response);
      const result = await deleteDailyWork('test');
      expect(api.delete).toHaveBeenCalledWith(
        '/api/employee-inform/dailyWork/remove/test'
      );
      expect(result).toEqual(response);
    });
  });

  it('존재하지 않는 id로 삭제 시 에러를 throw 한다', () => {
    const error = new Error('error');
    vi.mocked(api.delete).mockRejectedValue(error);
    expect(deleteDailyWork('test')).rejects.toThrow(error);
  });

  describe('에러 처리', () => {
    it('네트워크 에러 시 에러를 throw 한다', async () => {
      const error = new Error('Network Error');
      vi.mocked(api.get).mockRejectedValue(error);

      await expect(getDailyWorks(new Date())).rejects.toThrow(error);
    });

    it('서버 에러시 에러를 throw 한다', async () => {
      const error = new Error('Internal Server Error');
      vi.mocked(api.post).mockRejectedValue(error);

      await expect(addDailyWork(form)).rejects.toThrow(error);
    });
  });
});
