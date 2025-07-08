import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AuthButton from './AuthButton';

const renderAuthButton = (disabled: boolean = false, onClick?: () => void) => {
  return render(
    <AuthButton
      type='button'
      disabled={disabled}
      variant='primary'
      onClick={onClick}
    >
      로그인
    </AuthButton>
  );
};
describe('AuthButton 컴포넌트 테스트', () => {
  it('children이 렌더링되어야한다.', () => {
    renderAuthButton();
  });

  it('disabled일 때 버튼이 비활성화 되어야한다.', () => {
    renderAuthButton(true);
    const button = screen.getByRole('button', { name: '로그인' });
    expect(button).toBeDisabled();
  });

  it('onClick이 정상적으로 동작해야 한다', () => {
    const handleClick = vi.fn();
    renderAuthButton(false, handleClick);
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));
    expect(handleClick).toHaveBeenCalled();
  });
});
