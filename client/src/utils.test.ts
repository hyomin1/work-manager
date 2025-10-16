import { describe, expect, it } from 'vitest';
import {
  calculateDate,
  calDay,
  calDayOfWeek,
  calMonth,
  calYear,
} from './utils';

describe('기본 날짜 유틸 함수', () => {
  const testDate = new Date('2024-12-25');

  describe('calYear', () => {
    it('연도를 반환한다', () => {
      expect(calYear(testDate)).toBe(2024);
    });
  });

  describe('calMonth', () => {
    it('월을 반환한다 ', () => {
      expect(calMonth(testDate)).toBe(12);
    });

    it('한 자리월을 반환한다', () => {
      const date = new Date('2024-01-05');
      expect(calMonth(date)).toBe(1);
    });
  });

  describe('calDay', () => {
    it('일을 반환한다', () => {
      expect(calDay(testDate)).toBe(25);
    });

    it('한 자리 일을 반환한다', () => {
      const date = new Date('2024-01-05');
      expect(calDay(date)).toBe(5);
    });
  });

  describe('calDayOfWeek', () => {
    it('수요일을 반환한다', () => {
      expect(calDayOfWeek(testDate)).toBe('수');
    });

    it('일요일을 반환한다', () => {
      expect(calDayOfWeek(new Date('2024-12-22'))).toBe('일');
    });
  });

  describe('calculateDate', () => {
    it('날짜를 한글 형식으로 반환한다', () => {
      const result = calculateDate(testDate);
      expect(result).toBe('2024년 12월 25일 (수)');
    });

    it('1월 1일을 반환한다', () => {
      const result = calculateDate(new Date('2024-01-01'));
      expect(result).toBe('2024년 1월 1일 (월)');
    });
  });
});
