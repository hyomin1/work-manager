import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '../../../utils';
import {
  createCommonItem,
  directAdminSession,
  editCommonItem,
  removeCommonItem,
} from './admin';
import type { AdminType } from '../types/admin';
import { createAdminData, editAdminData } from '../utils/admin';

vi.mock('../../../utils', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
}));

vi.mock('../utils/admin', () => ({
  createAdminData: vi.fn(),
  editAdminData: vi.fn(),
}));

describe('admin API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('removeCommonItem', () => {
    const response = { data: { message: '삭제 완료' } };
    vi.mocked(api.delete).mockResolvedValue(response);
    const id = 'test';
    it('name 필드를 삭제한다', async () => {
      const result = await removeCommonItem('name', id);
      expect(api.delete).toHaveBeenCalledWith(
        `/api/employee-inform/removeName/${id}`
      );
      expect(result).toEqual(response);
    });

    it('destination 필드를 삭제한다', async () => {
      const result = await removeCommonItem('destination', id);
      expect(api.delete).toHaveBeenCalledWith(
        `/api/employee-inform/removeDestination/${id}`
      );
      expect(result).toEqual(response);
    });

    it('business 필드를 삭제한다', async () => {
      const result = await removeCommonItem('business', id);
      expect(api.delete).toHaveBeenCalledWith(
        `/api/employee-inform/removeBusiness/${id}`
      );
      expect(result).toEqual(response);
    });

    it('타입의 첫 글자를 대문자로 변환한다', async () => {
      await removeCommonItem('test', id);
      expect(api.delete).toHaveBeenCalledWith(
        `/api/employee-inform/removeTest/${id}`
      );
    });

    it('삭제 실패 시 에러를 throw 한다', async () => {
      const error = new Error('error');
      vi.mocked(api.delete).mockRejectedValue(error);
      await expect(removeCommonItem('test', id)).rejects.toThrow(error);
    });
  });

  describe('createCommonItem', () => {
    it('항목을 생성한다', async () => {
      const activeTab: AdminType = 'username';
      const inputValue = 'test';
      vi.mocked(createAdminData).mockReturnValue({
        url: '/api/employee-inform/addName',
        body: { username: inputValue },
      });
      await createCommonItem(activeTab, inputValue);

      expect(createAdminData).toHaveBeenCalledWith(
        activeTab,
        inputValue,
        undefined
      );
      expect(api.post).toHaveBeenCalledWith('/api/employee-inform/addName', {
        username: inputValue,
      });
    });

    it('방문지가 있는 경우 함께 전달한다', async () => {
      const activeTab: AdminType = 'destination';
      const inputValue = 'test';
      const destination = 'test';
      vi.mocked(createAdminData).mockReturnValue({
        url: '/api/employee-inform/addDestination',
        body: { destination: inputValue },
      });
      await createCommonItem(activeTab, inputValue, destination);

      expect(createAdminData).toHaveBeenCalledWith(
        activeTab,
        inputValue,
        destination
      );
      expect(api.post).toHaveBeenCalledWith(
        '/api/employee-inform/addDestination',
        {
          destination: inputValue,
        }
      );
    });
    it('생성 실패 시 에러를 throw 한다', async () => {
      const error = new Error('error');
      vi.mocked(createAdminData).mockReturnValue({
        url: '/test',
        body: { username: '' },
      });
      vi.mocked(api.post).mockRejectedValue(error);
      await expect(createCommonItem('username', 'test')).rejects.toThrow(error);
    });
  });

  describe('editCommonItem', () => {
    it('항목을 수정한다', async () => {
      const activeTab: AdminType = 'username';
      const inputValue = 'test';
      const id = 'test';
      vi.mocked(editAdminData).mockReturnValue({
        url: '/api/employee-inform/editName',
        body: { id, username: inputValue },
      });
      await editCommonItem(activeTab, inputValue, id);
      expect(editAdminData).toHaveBeenCalledWith(
        activeTab,
        inputValue,
        id,
        undefined
      );
      expect(api.patch).toHaveBeenCalledWith('/api/employee-inform/editName', {
        id,
        username: inputValue,
      });
    });

    it('방문지가 있는 경우 함께 전달한다', async () => {
      const activeTab: AdminType = 'destination';
      const inputValue = 'test';
      const id = 'test';
      const destination = 'test';
      vi.mocked(editAdminData).mockReturnValue({
        url: '/api/employee-inform/editDestination',
        body: { id, destination: inputValue },
      });
      await editCommonItem(activeTab, inputValue, id, destination);
      expect(editAdminData).toHaveBeenCalledWith(
        activeTab,
        inputValue,
        id,
        destination
      );
      expect(api.patch).toHaveBeenCalledWith(
        '/api/employee-inform/editDestination',
        {
          id,
          destination: inputValue,
        }
      );
    });

    it('수정 실패 시 에러를 throw 한다', async () => {
      const error = new Error('error');
      vi.mocked(editAdminData).mockReturnValue({
        url: '/test',
        body: { id: 'test', username: '' },
      });
      vi.mocked(api.patch).mockRejectedValue(error);
      await expect(editCommonItem('username', 'test', 'test')).rejects.toThrow(
        error
      );
    });
  });
  describe('directAdminSession', () => {
    it('관리자 세션을 확인하고 상태를 반환 한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ status: 200 });

      const res = await directAdminSession();
      expect(api.get).toHaveBeenCalledWith('/auth/directAdminSession');
      expect(res).toBe(200);
    });

    it('관리자 권한이 없는 경우 403을 반환한다', async () => {
      vi.mocked(api.get).mockResolvedValue({ status: 403 });

      const res = await directAdminSession();
      expect(api.get).toHaveBeenCalledWith('/auth/directAdminSession');
      expect(res).toBe(403);
    });

    it('세션 확인 실패 시 에러를 throw한다', async () => {
      const error = new Error('error');
      vi.mocked(api.get).mockRejectedValue(error);
      await expect(directAdminSession()).rejects.toThrow(error);
    });
  });

  describe('에러 처리', () => {
    it('네트워크 에러 시 에러를 throw 한다', async () => {
      const error = new Error('error');
      vi.mocked(api.get).mockRejectedValue(error);

      await expect(removeCommonItem('TEST', 'TEST')).rejects.toThrow(error);
    });

    it('권한 에러시 에러를 throw 한다', async () => {
      const error = new Error('error');
      vi.mocked(createAdminData).mockReturnValue({
        url: '/test',
        body: { username: '' },
      });
      vi.mocked(api.post).mockRejectedValue(error);
      await expect(createCommonItem('username', 'test')).rejects.toThrow(error);
    });
  });
});
