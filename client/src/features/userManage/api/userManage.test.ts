import { vi, describe, expect, beforeEach, it } from 'vitest';
import { api } from '../../../utils';
import {
  approveUser,
  changeRole,
  deleteUser,
  getUsers,
  rejectUser,
} from './userManage';

vi.mock('../../../utils', () => ({
  api: {
    get: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('userManageApi 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUsers', () => {
    it('승인된 유저 목록을 가져와야 한다', async () => {
      const mockUsers = [
        { id: '1', userId: 'user1', name: '홍길동', role: 1 },
        { id: '2', userId: 'user2', name: '김철수', role: 2 },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: { users: mockUsers },
      });

      const result = await getUsers();

      expect(api.get).toHaveBeenCalledWith('/api/users');
      expect(result).toEqual(mockUsers);
    });

    it('유저 목록이 없으면 빈 문자열을 반환해야 한다', async () => {
      vi.mocked(api.get).mockResolvedValue({
        data: {},
      });

      const result = await getUsers();

      expect(result).toBe('');
    });
  });

  describe('deleteUser', () => {
    it('유저를 삭제해야 한다', async () => {
      const userId = 'user123';

      await deleteUser(userId);

      expect(api.delete).toHaveBeenCalledWith(`/api/users/${userId}`);
    });
  });

  describe('approveUser', () => {
    it('유저를 승인해야 한다', async () => {
      const userId = 'user123';

      await approveUser(userId);

      expect(api.patch).toHaveBeenCalledWith(`/api/users/${userId}/approve`);
    });
  });

  describe('rejectUser', () => {
    it('유저를 거절해야 한다', async () => {
      const userId = 'user123';

      await rejectUser(userId);

      expect(api.patch).toHaveBeenCalledWith(`/api/users/${userId}/reject`);
    });
  });

  describe('changeRole', () => {
    it('유저의 권한을 변경해야 한다', async () => {
      const userId = 'user123';
      const newRole = 2;

      await changeRole(userId, newRole);

      expect(api.patch).toHaveBeenCalledWith(`/api/users/${userId}/role`, {
        role: newRole,
      });
    });

    it('관리자 권한(role: 1)으로 변경할 수 있어야 한다', async () => {
      const userId = 'user123';
      const adminRole = 1;

      await changeRole(userId, adminRole);

      expect(api.patch).toHaveBeenCalledWith(`/api/users/${userId}/role`, {
        role: 1,
      });
    });

    it('일반 사용자 권한(role: 3)으로 변경할 수 있어야 한다', async () => {
      const userId = 'user123';
      const userRole = 3;

      await changeRole(userId, userRole);

      expect(api.patch).toHaveBeenCalledWith(`/api/users/${userId}/role`, {
        role: 3,
      });
    });
  });
});
