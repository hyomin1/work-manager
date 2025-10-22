import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignupForm from '../SignupForm';

const mockSignupMutate = vi.fn();
vi.mock('../../hooks/useAuth', () => ({
  default: vi.fn(() => ({
    signup: {
      mutate: mockSignupMutate,
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

const renderSignupForm = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('SignupForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    renderSignupForm();
  });
  const user = userEvent.setup();

  it('회원가입 폼이 렌더링된다', () => {
    expect(screen.getByLabelText('아이디')).toBeInTheDocument();
    expect(screen.getByLabelText('패스워드')).toBeInTheDocument();
    expect(screen.getByLabelText('패스워드 확인')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '회원가입' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument();
  });

  it('모든 입력 필드가 렌더링된다', () => {
    expect(
      screen.getByPlaceholderText('아이디를 입력해주세요')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('패스워드를 입력해주세요')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('패스워드를 다시 입력해 주세요')
    ).toBeInTheDocument();
  });

  it('입력 필드에 값을 입력할 수 있다', async () => {
    const userIdInput = screen.getByPlaceholderText(
      '아이디를 입력해주세요'
    ) as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText(
      '패스워드를 입력해주세요'
    ) as HTMLInputElement;
    const passwordConfirmInput = screen.getByPlaceholderText(
      '패스워드를 다시 입력해 주세요'
    ) as HTMLInputElement;

    await user.type(userIdInput, 'newuser');
    await user.type(passwordInput, 'password123');
    await user.type(passwordConfirmInput, 'password123');

    expect(userIdInput.value).toBe('newuser');
    expect(passwordInput.value).toBe('password123');
    expect(passwordConfirmInput.value).toBe('password123');
  });

  it('필수 입력값이 없으면 에러 메시지가 표시된다', async () => {
    const signupButton = screen.getByRole('button', { name: '회원가입' });
    await user.click(signupButton);

    await waitFor(() => {
      expect(screen.getByText('아이디를 입력해주세요')).toBeInTheDocument();
    });
  });

  it('패스워드가 일치하지 않으면 에러 메시지가 표시된다', async () => {
    const userIdInput = screen.getByPlaceholderText('아이디를 입력해주세요');
    const passwordInput =
      screen.getByPlaceholderText('패스워드를 입력해주세요');
    const passwordConfirmInput = screen.getByLabelText('패스워드 확인');

    await user.type(userIdInput, 'newuser');
    await user.type(passwordInput, 'password123');
    await user.type(passwordConfirmInput, 'differentpassword');

    const signupButton = screen.getByRole('button', { name: '회원가입' });
    await user.click(signupButton);

    await waitFor(() => {
      expect(
        screen.getByText('패스워드가 일치하지 않습니다')
      ).toBeInTheDocument();
    });
  });

  it('모든 입력이 올바르면 signup.mutate가 호출된다', async () => {
    const userIdInput = screen.getByPlaceholderText('아이디를 입력해주세요');
    const passwordInput =
      screen.getByPlaceholderText('패스워드를 입력해주세요');
    const passwordConfirmInput =
      screen.getByPlaceholderText('패스워드를 다시 입력해 주세요');
    const signupButton = screen.getByRole('button', { name: '회원가입' });

    await user.type(userIdInput, 'newuser');
    await user.type(passwordInput, 'password123');
    await user.type(passwordConfirmInput, 'password123');
    await user.click(signupButton);

    await waitFor(() => {
      expect(mockSignupMutate).toHaveBeenCalledWith(
        {
          userId: 'newuser',
          password: 'password123',
          passwordConfirm: 'password123',
        },
        expect.any(Object)
      );
    });
  });
});
