import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AuthCheckBox from '../AuthCheckBox';

const renderAuthCheckBox = (
  checked: boolean = false,
  onChange: () => void = () => {}
) => {
  return render(
    <AuthCheckBox
      id='remember'
      label='아이디 저장'
      checked={checked}
      onChange={onChange}
    />
  );
};

describe('AuthCheckBox 테스트', () => {
  it('label 텍스트가 렌더링되어야한다. ', () => {
    renderAuthCheckBox();
    expect(screen.getByText('아이디 저장')).toBeInTheDocument();
  });

  it('체크 상태가 반영되어야한다', () => {
    const { rerender } = renderAuthCheckBox(true);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    rerender(
      <AuthCheckBox
        id='remember'
        label='아이디저장'
        checked={false}
        onChange={() => {}}
      />
    );
    expect(checkbox).not.toBeChecked();
  });

  it('체크할 때 onChange가 호출되어야 한다', () => {
    const handleChange = vi.fn();

    renderAuthCheckBox(true, handleChange);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });
});
