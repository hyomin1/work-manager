import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AuthInput from './AuthInput';

const register = {
  name: 'userId',
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
};

const renderAuthInput = (error: string = '') => {
  return render(
    <AuthInput
      name='userId'
      label='아이디'
      type='text'
      placeholder='아이디를 입력하세요'
      icon={<span data-testid='icon'>아이콘</span>}
      register={register}
      error={error}
    />
  );
};

describe('AuthInput 테스트', () => {
  it('label과 placeholder가 렌더링 된다.', () => {
    renderAuthInput();
    expect(screen.getByLabelText('아이디')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('아이디를 입력하세요')
    ).toBeInTheDocument();
  });

  it('에러메시지가 존재하면 에러메시지가 렌더링된다.', () => {
    renderAuthInput('아이디를 입력해주세요');
    expect(screen.getByText('아이디를 입력해주세요')).toBeInTheDocument();
  });

  it('아이콘이 렌더링 된다.', () => {
    renderAuthInput();
    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });
});
