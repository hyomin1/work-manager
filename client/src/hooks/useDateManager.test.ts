import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useDateManager from './useDateManager';

describe('useDateManager', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('초기 상태가 올바르게 설정되어야 한다', () => {
    const { result } = renderHook(() => useDateManager());

    expect(result.current.currentDate).toBeInstanceOf(Date);
    expect(result.current.isOpen).toBe(false);
  });

  it('currentDate를 변경할 수 있다', () => {
    const { result } = renderHook(() => useDateManager());
    const newDate = new Date('2025-10-20');

    act(() => {
      result.current.setCurrentDate(newDate);
    });

    expect(result.current.currentDate).toBe(newDate);
  });

  it('isOpen을 변경할 수 있다', () => {
    const { result } = renderHook(() => useDateManager());

    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.setIsOpen(true);
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.setIsOpen(false);
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('자정이 되면 currentDate가 자동으로 업데이트 된다', () => {
    const date = new Date(2025, 10, 15, 23, 59, 59);
    vi.setSystemTime(date);

    const { result } = renderHook(() => useDateManager());

    const initialDate = result.current.currentDate;
    expect(initialDate.getDate()).toBe(15);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.currentDate.getDate()).toBe(16);
  });

  it('timeout이 올바르게 설정 된다', () => {
    const spy = vi.spyOn(global, 'setTimeout');

    renderHook(() => useDateManager());
    expect(spy).toHaveBeenCalled();
  });

  it('언마운트시 timeout이 클리어된다', () => {
    const spy = vi.spyOn(global, 'clearTimeout');

    const { unmount } = renderHook(() => useDateManager());
    unmount();
    expect(spy).toHaveBeenCalled();
  });

  it('날짜를 여러번 변경할 수 있다', () => {
    const { result } = renderHook(() => useDateManager());
    const date1 = new Date(2025, 1, 20);
    const date2 = new Date(2025, 2, 25);

    act(() => {
      result.current.setCurrentDate(date1);
    });

    expect(result.current.currentDate).toBe(date1);

    act(() => {
      result.current.setCurrentDate(date2);
    });

    expect(result.current.currentDate).toBe(date2);
  });

  it('반환된 객체가 필요한 모든 속성을 포함한다', () => {
    const {
      result: { current },
    } = renderHook(() => useDateManager());

    expect(current).toHaveProperty('currentDate');
    expect(current).toHaveProperty('setCurrentDate');
    expect(current).toHaveProperty('isOpen');
    expect(current).toHaveProperty('setIsOpen');

    expect(typeof current.setCurrentDate).toBe('function');
    expect(typeof current.setIsOpen).toBe('function');
  });
});
