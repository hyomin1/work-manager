// import { fireEvent, render, screen } from '@testing-library/react';
// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import LoginForm from './LoginForm';
// import { useCookies } from 'react-cookie';

// // mock navigate
// const mockNavigate = vi.fn();

// // mock useAuth
// const mockLoginMutate = vi.fn();

// vi.mock('react-router-dom', async () => {
//   const actual = await vi.importActual('react-router-dom');
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//   };
// });

// vi.mock('../hooks/useAuth', () => ({
//   default: () => ({
//     login: {
//       mutate: vi.fn(),
//       isPending: false,
//     },
//     redirectIfAuthenticated: vi.fn(),
//   }),
// }));

// vi.mock('react-cookie', async () => {
//   const actual = await vi.importActual('react-cookie');
//   return {
//     ...actual,
//     useCookies: vi.fn(),
//   };
// });

// vi.mocked(useCookies).mockReturnValue([
//   { rememberUserId: '' },
//   vi.fn(),
//   vi.fn(),
//   vi.fn(),
// ]);
// describe('LoginForm 테스트', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });
//   it('입력 없는 제출 시 에러가 표시된다.', async () => {
//     render(<LoginForm />);
//     fireEvent.click(screen.getByRole('button', { name: '로그인' }));

//     expect(
//       await screen.findAllByText('아이디를 입력해주세요')
//     ).toBeInTheDocument();
//   });

//   it('회원가입 버튼 클릭 시 navigate가 호출된다.', () => {
//     render(<LoginForm />);
//     const button = screen.getByRole('button', { name: '회원가입' });
//     fireEvent.click(button);

//     expect(mockNavigate).toHaveBeenCalledWith('/signup');
//   });
// });
