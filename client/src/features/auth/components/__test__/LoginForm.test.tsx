import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import LoginForm from '../LoginForm';

const mockLoginMutate = vi.fn();
vi.mock('../../hooks/useAuth', () => ({
  default: vi.fn(() => ({
    login: {
      mutate: mockLoginMutate,
      isPending: false,
    },
  })),
}));

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLoginForm = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    renderLoginForm();
  });

  it('로그인 폼이 렌더링된다', () => {
    expect(screen.getByLabelText('아이디')).toBeInTheDocument();
    expect(screen.getByLabelText('패스워드')).toBeInTheDocument();
    expect(screen.getByLabelText('아이디 저장')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '회원가입' })
    ).toBeInTheDocument();
  });

  it('아이디와 패스워드 입력 필드가 있다', () => {
    const userIdInput = screen.getByPlaceholderText('아이디를 입력해주세요');
    const passwordInput =
      screen.getByPlaceholderText('패스워드를 입력해주세요');
    expect(userIdInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('아이디 저장 체크박스가 동작한다', async () => {
    const user = userEvent.setup();

    const checkbox = screen.getByLabelText('아이디 저장') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it('회원가입 버튼 클릭 시 회원가입 페이지로 이동한다', async () => {
    const user = userEvent.setup();

    const signupButton = screen.getByRole('button', { name: '회원가입' });
    await user.click(signupButton);
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });

  it('필수 입력값이 없으면 에러 메시지가 표시된다', async () => {
    const user = userEvent.setup();
    const loginButton = screen.getByRole('button', { name: '로그인' });
    await user.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText('아이디를 입력해주세요')).toBeInTheDocument();
      expect(screen.getByText('패스워드를 입력해주세요')).toBeInTheDocument();
    });
  });

  it('입력 필드에 값을 입력할 수 있다', async () => {
    const user = userEvent.setup();
    const userIdInput = screen.getByPlaceholderText('아이디를 입력해주세요');
    const passwordInput =
      screen.getByPlaceholderText('패스워드를 입력해주세요');
    await user.type(userIdInput, 'testUserId');
    await user.type(passwordInput, 'testPassword');
    expect(userIdInput).toHaveValue('testUserId');
    expect(passwordInput).toHaveValue('testPassword');
  });

  it('로그인 버튼 클릭 시 login.mutate가 호출된다', async () => {
    const user = userEvent.setup();
    const userIdInput = screen.getByPlaceholderText('아이디를 입력해주세요');
    const passwordInput =
      screen.getByPlaceholderText('패스워드를 입력해주세요');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await user.type(userIdInput, 'test123');
    await user.type(passwordInput, 'test123');

    await user.click(loginButton);

    await waitFor(() => {
      expect(mockLoginMutate).toHaveBeenCalledTimes(1);

      expect(mockLoginMutate).toHaveBeenCalledWith(
        {
          userId: 'test123',
          password: 'test123',
          isRemember: false,
        },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
    });
  });

  it('아이디 저장 체크 후 로그인하면 isRemember가 true로 전달된다', async () => {
    const user = userEvent.setup();

    const userIdInput = screen.getByPlaceholderText('아이디를 입력해주세요');
    const passwordInput =
      screen.getByPlaceholderText('패스워드를 입력해주세요');
    const checkbox = screen.getByLabelText('아이디 저장');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await user.type(userIdInput, 'testUser');
    await user.type(passwordInput, 'password123');
    await user.click(checkbox);

    await user.click(loginButton);

    await waitFor(() => {
      expect(mockLoginMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'testUser',
          password: 'password123',
          isRemember: true,
        }),
        expect.any(Object)
      );
    });
  });
});
