import { describe, expect, it } from 'vitest';
import { validateForm } from './formUitls';
import type { VehicleLogForm } from '../types/vehicleLog';

describe('validateForm 테스트', () => {
  const baseForm: VehicleLogForm & { privateCarId: string } = {
    selectedDate: new Date(2025, 0, 15),
    selectedUsernames: ['이효민'],
    car: '차량1',
    destination: '서울',
    privateCarId: '개인차량',
    startKM: 100,
    endKM: 150,
    totalKM: 0,
    toll: 0,
    fuelCost: 0,
    etc: {
      name: '',
      cost: 0,
    },
  };

  describe('필수 필드 검증', () => {
    it('날짜가 없으면 에러 메시지를 반환해야 한다', () => {
      const form = { ...baseForm, selectedDate: null };
      const result = validateForm(form);

      expect(result).toBe('날짜를 선택해주세요');
    });

    it('운전자가 선택되지 않으면 에러 메시지를 반환해야 한다', () => {
      const form = { ...baseForm, selectedUsernames: [] };
      const result = validateForm(form);

      expect(result).toBe('운전자를 선택해주세요');
    });

    it('차량이 선택되지 않으면 에러 메시지를 반환해야 한다', () => {
      const form = { ...baseForm, car: '' };
      const result = validateForm(form);

      expect(result).toBe('차량을 선택해주세요');
    });

    it('행선지가 입력되지 않으면 에러 메시지를 반환해야 한다', () => {
      const form = { ...baseForm, destination: '' };
      const result = validateForm(form);

      expect(result).toBe('행선지를 입력해주세요');
    });
  });

  describe('주행거리 검증 - 일반 차량', () => {
    it('일반 차량의 경우 startKM이 없으면 에러 메시지를 반환해야 한다', () => {
      const form = { ...baseForm, startKM: 0 };
      const result = validateForm(form);

      expect(result).toBe('주행거리를 입력해주세요.');
    });

    it('일반 차량의 경우 endKM이 없으면 에러 메시지를 반환해야 한다', () => {
      const form = { ...baseForm, endKM: 0 };
      const result = validateForm(form);

      expect(result).toBe('주행거리를 입력해주세요.');
    });

    it('일반 차량의 경우 startKM과 endKM이 모두 있으면 null을 반환해야 한다', () => {
      const form = { ...baseForm };
      const result = validateForm(form);

      expect(result).toBeNull();
    });
  });

  describe('주행거리 검증 - 개인 차량', () => {
    it('개인 차량의 경우 totalKM이 없으면 에러 메시지를 반환해야 한다', () => {
      const form = {
        ...baseForm,
        car: '개인차량',
        totalKM: 0,
      };
      const result = validateForm(form);

      expect(result).toBe('주행거리를 입력해주세요.');
    });

    it('개인 차량의 경우 totalKM이 있으면 null을 반환해야 한다', () => {
      const form = {
        ...baseForm,
        car: '개인차량',
        totalKM: 50,
      };
      const result = validateForm(form);

      expect(result).toBeNull();
    });
  });

  describe('기타 비용 검증', () => {
    it('기타 비용 항목은 있는데 비용이 없으면 에러 메시지를 반환해야 한다', () => {
      const form = {
        ...baseForm,
        etc: {
          name: '주차비',
          cost: 0,
        },
      };
      const result = validateForm(form);

      expect(result).toBe('비용을 입력해주세요.');
    });

    it('비용은 있는데 항목이 없으면 에러 메시지를 반환해야 한다', () => {
      const form = {
        ...baseForm,
        etc: {
          name: '',
          cost: 5000,
        },
      };
      const result = validateForm(form);

      expect(result).toBe('항목을 선택해주세요.');
    });

    it('기타 비용 항목과 비용이 모두 있으면 null을 반환해야 한다', () => {
      const form = {
        ...baseForm,
        etc: {
          name: '주차비',
          cost: 5000,
        },
      };
      const result = validateForm(form);

      expect(result).toBeNull();
    });

    it('기타 비용 항목과 비용이 모두 없으면 null을 반환해야 한다', () => {
      const form = {
        ...baseForm,
        etc: {
          name: '',
          cost: 0,
        },
      };
      const result = validateForm(form);

      expect(result).toBeNull();
    });
  });

  describe('통합 검증', () => {
    it('모든 필드가 올바르게 입력되면 null을 반환해야 한다', () => {
      const form = { ...baseForm };
      const result = validateForm(form);

      expect(result).toBeNull();
    });
  });
});
