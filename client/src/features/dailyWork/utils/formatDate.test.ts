import { describe, expect, it } from 'vitest';
import {
  calCarDay,
  calYearMonth,
  serviceDay,
} from '../../vehicle-log/utils/formatDate';

describe('차량 운행일지 날짜 포맷 함수', () => {
  describe('calCarDay', () => {
    it('월/일 형식으로 반환한다.', () => {
      const date = new Date('2024-12-25');
      expect(calCarDay(date)).toBe('12/25');
    });

    it('한 자리 숫자도 올바르게 처리한다.', () => {
      const date = new Date('2024-01-05');
      expect(calCarDay(date)).toBe('1/5');
    });
  });

  describe('serviceDay', () => {
    it('YY.M.D 형식으로 반환한다.', () => {
      const date = new Date('2024-12-25');
      expect(serviceDay(date)).toBe('24.12.25');
    });

    it('null일 때 undefined를 반환한다.', () => {
      expect(serviceDay(null)).toBeUndefined();
    });

    it('한 자리 월과 일도 처리한다', () => {
      const date = new Date('2025-03-05');
      expect(serviceDay(date)).toBe('25.3.5');
    });
  });

  describe('calYearMonth', () => {
    it('YYYY년 M월 형식으로 반환한다', () => {
      const date = new Date('2024-12-01');
      expect(calYearMonth(date)).toBe('2024년 12월');
    });

    it('한 자리 월도 처리힌다.', () => {
      const date = new Date('2024-01-01');
      expect(calYearMonth(date)).toBe('2024년 1월');
    });
  });
});
