import { vi, describe, expect, beforeEach, it } from 'vitest';
import { api } from '../../../utils';
import { authApi } from './auth';

vi.mock('../../../api', () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe('authApi 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('로그인 요청이 전송되어야 한다.', async () => {
    const loginData = { userId: 'test123', password: 'test123' };
    await authApi.login(loginData);

    expect(api.post).toHaveBeenCalledWith('/auth/login', loginData);
  });

  it('회원가입 요청이 전송되어야 한다', async () => {
    const signupData = {
      userId: 'test123',
      password: 'test123',
      passwordConfirm: 'test123',
    };
    await authApi.signup(signupData);

    expect(api.post).toHaveBeenCalledWith('/auth/register', signupData);
  });

  it('로그아웃 요청이 전송되어야 한다', async () => {
    await authApi.logout();

    expect(api.post).toHaveBeenCalledWith('/auth/logout');
  });

  it('세션 체크 요청이 전송되어야 한다', async () => {
    await authApi.checkSession();

    expect(api.get).toHaveBeenCalledWith('/auth/checkSession');
  });
});
