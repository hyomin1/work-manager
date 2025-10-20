import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useEscapeKey from './useEscapeKey';

describe('useEscapeKey', () => {
  let addEventListener: ReturnType<typeof vi.spyOn>;
  let removeEventListener: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    addEventListener = vi.spyOn(window, 'addEventListener');
    removeEventListener = vi.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    addEventListener.mockRestore();
    removeEventListener.mockRestore();
  });

  it('마운트 시 keydown 이벤트를 등록한다', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(onEscape));

    expect(addEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });

  it('ESC 키를 누르면 콜백 함수가 호출된다', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(onEscape));

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(event);

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('Enter키를 누르면 호출되지 않는다', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(onEscape));

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    window.dispatchEvent(event);

    expect(onEscape).not.toHaveBeenCalled();
  });

  it('여러 키를 누르더라도 ESC키만 누르면 콜백을 호출한다', () => {
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(onEscape));

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(onEscape).toHaveBeenCalledTimes(2);
  });

  it('언마운트 시 이벤트 리스너를 제거한다', () => {
    const onEscape = vi.fn();
    const { unmount } = renderHook(() => useEscapeKey(onEscape));

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
  });

  it('언마운트 후에는 ESC를 눌러도 콜백이 호출되지 않는다', () => {
    const onEscape = vi.fn();
    const { unmount } = renderHook(() => useEscapeKey(onEscape));
    unmount();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(onEscape).not.toHaveBeenCalled();
  });
});
