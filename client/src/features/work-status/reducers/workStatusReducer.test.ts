import { describe, expect, it } from 'vitest';
import { formReducer, initialFormState } from './workStatusReducer';
import type { Business, Destination, Work } from '../types/workStatus';

describe('workStatusReducer 테스트', () => {
  it('초기 상태가 올바르게 설정되어야 한다', () => {
    expect(initialFormState).toEqual({
      selectedUsername: '',
      selectedDestinations: [null, null, null],
      selectedBusinesses: [null, null, null],
      selectedWorks: [null, null, null],
      inputDestination: '',
      inputBusiness: '',
      inputWork: '',
      selectedCar: '',
      isDaily: 0,
      startDate: null,
      endDate: null,
      remarks: '',
    });
  });

  describe('SET_USERNAME', () => {
    it('사용자 이름을 설정해야 한다', () => {
      const payload = '이효민';
      const newState = formReducer(initialFormState, {
        type: 'SET_USERNAME',
        payload,
      });

      expect(newState.selectedUsername).toBe(payload);
    });
  });

  describe('SET_DESTINATION', () => {
    it('특정 인덱스에 방문지를 설정해야 한다', () => {
      const destination: Destination = { _id: 'test', destination: 'test' };
      const newState = formReducer(initialFormState, {
        type: 'SET_DESTINATION',
        index: 0,
        payload: destination,
      });

      expect(newState.selectedDestinations[0]).toBe(destination);
      expect(newState.selectedDestinations[1]).toBeNull();
    });

    it('방문지 변경 시 해당 인덱스의 사업명을 초기화해야 한다', () => {
      const business: Business = {
        _id: 'test',
        business: '사업',
        destinationId: 'test',
      };
      const state = {
        ...initialFormState,
        selectedBusinesses: [business, null, null],
      };

      const destination: Destination = { _id: 'test', destination: 'test' };
      const newState = formReducer(state, {
        type: 'SET_DESTINATION',
        index: 0,
        payload: destination,
      });

      expect(newState.selectedDestinations[0]).toBe(destination);
      expect(newState.selectedBusinesses[0]).toBeNull();
    });

    it('기존 배열을 변경하지 않고 새 배열을 생성해야 한다', () => {
      const destination: Destination = { _id: 'test', destination: 'test' };
      const originalDestinations = initialFormState.selectedDestinations;

      formReducer(initialFormState, {
        type: 'SET_DESTINATION',
        index: 0,
        payload: destination,
      });

      expect(originalDestinations).toEqual([null, null, null]);
    });
  });

  describe('SET_INPUT_DESTINATION', () => {
    it('입력된 방문지를 설정해야 한다', () => {
      const payload = 'test';
      const newState = formReducer(initialFormState, {
        type: 'SET_INPUT_DESTINATION',
        payload,
      });

      expect(newState.inputDestination).toBe(payload);
    });
  });

  describe('SET_BUSINESS', () => {
    it('특정 인덱스에 사업명을 설정해야 한다', () => {
      const business: Business = {
        _id: 'test',
        business: 'test',
        destinationId: 'test',
      };
      const newState = formReducer(initialFormState, {
        type: 'SET_BUSINESS',
        index: 1,
        payload: business,
      });

      expect(newState.selectedBusinesses[1]).toBe(business);
      expect(newState.selectedBusinesses[0]).toBeNull();
    });
  });

  describe('SET_INPUT_BUSINESS', () => {
    it('입력된 사업명을 설정해야 한다', () => {
      const payload = 'test';
      const newState = formReducer(initialFormState, {
        type: 'SET_INPUT_BUSINESS',
        payload,
      });

      expect(newState.inputBusiness).toBe(payload);
    });
  });

  describe('SET_WORK', () => {
    it('특정 인덱스에 업무를 설정해야 한다', () => {
      const work: Work = { _id: 'test', work: 'test' };
      const newState = formReducer(initialFormState, {
        type: 'SET_WORK',
        index: 2,
        payload: work,
      });

      expect(newState.selectedWorks[2]).toBe(work);
    });
  });

  describe('SET_INPUT_WORK', () => {
    it('입력된 업무를 설정해야 한다', () => {
      const payload = 'test';
      const newState = formReducer(initialFormState, {
        type: 'SET_INPUT_WORK',
        payload,
      });

      expect(newState.inputWork).toBe(payload);
    });
  });

  describe('SET_CAR', () => {
    it('차량을 설정해야 한다', () => {
      const payload = 'test';
      const newState = formReducer(initialFormState, {
        type: 'SET_CAR',
        payload,
      });

      expect(newState.selectedCar).toBe(payload);
    });
  });

  describe('SET_IS_DAILY', () => {
    it('일일 업무로 설정하면 날짜가 오늘로 설정되어야 한다', () => {
      const payload = 1;
      const now = new Date();
      const newState = formReducer(initialFormState, {
        type: 'SET_IS_DAILY',
        payload,
      });

      expect(newState.isDaily).toBe(payload);
      expect(newState.startDate).toBeInstanceOf(Date);
      expect(newState.endDate).toBeInstanceOf(Date);
      expect(newState.startDate?.getDate()).toBe(now.getDate());
    });

    it('장기 업무로 설정하면 기존 날짜를 유지해야 한다', () => {
      const startDate = new Date(2025, 10, 15);
      const endDate = new Date(2025, 10, 20);
      const state = {
        ...initialFormState,
        startDate,
        endDate,
      };

      const newState = formReducer(state, {
        type: 'SET_IS_DAILY',
        payload: 0,
      });

      expect(newState.isDaily).toBe(0);
      expect(newState.startDate).toBe(startDate);
      expect(newState.endDate).toBe(endDate);
    });
  });

  describe('SET_DATE', () => {
    it('시작일과 종료일을 동시에 설정해야 한다', () => {
      const startDate = new Date(2025, 10, 15);
      const endDate = new Date(2025, 10, 20);

      const newState = formReducer(initialFormState, {
        type: 'SET_DATE',
        payload: { start: startDate, end: endDate },
      });

      expect(newState.startDate).toBe(startDate);
      expect(newState.endDate).toBe(endDate);
    });
  });

  describe('SET_START_DATE', () => {
    it('시작일을 설정해야 한다', () => {
      const date = new Date(2025, 10, 15);
      const newState = formReducer(initialFormState, {
        type: 'SET_START_DATE',
        payload: date,
      });

      expect(newState.startDate).toBe(date);
    });
  });

  describe('SET_END_DATE', () => {
    it('종료일을 설정해야 한다', () => {
      const payload = new Date(2025, 10, 20);
      const newState = formReducer(initialFormState, {
        type: 'SET_END_DATE',
        payload,
      });

      expect(newState.endDate).toBe(payload);
    });
  });

  describe('SET_REMARKS', () => {
    it('비고를 설정해야 한다', () => {
      const payload = 'test';
      const newState = formReducer(initialFormState, {
        type: 'SET_REMARKS',
        payload,
      });

      expect(newState.remarks).toBe(payload);
    });
  });

  describe('RESET', () => {
    it('상태를 초기 상태로 리셋해야 한다', () => {
      const state = {
        ...initialFormState,
        selectedUsername: 'test',
        selectedCar: 'test',
        remarks: 'test',
      };

      const newState = formReducer(state, { type: 'RESET' });

      expect(newState).toEqual(initialFormState);
    });
  });

  describe('불변성 테스트', () => {
    it('상태를 변경하지 않고 새로운 객체를 반환해야 한다', () => {
      const payload = 'test';
      const state = { ...initialFormState };
      const newState = formReducer(state, {
        type: 'SET_USERNAME',
        payload,
      });

      expect(newState).not.toBe(state);
      expect(state.selectedUsername).toBe('');
      expect(newState.selectedUsername).toBe(payload);
    });
  });

  describe('복합 시나리오', () => {
    it('여러 액션을 순차적으로 처리할 수 있어야 한다', () => {
      let state = initialFormState;

      state = formReducer(state, {
        type: 'SET_USERNAME',
        payload: 'test',
      });

      const destination: Destination = { _id: 'dest1', destination: '서울' };
      state = formReducer(state, {
        type: 'SET_DESTINATION',
        index: 0,
        payload: destination,
      });

      const business: Business = {
        _id: 'test',
        business: 'test',
        destinationId: 'test',
      };
      state = formReducer(state, {
        type: 'SET_BUSINESS',
        index: 0,
        payload: business,
      });

      const work: Work = { _id: 'test', work: 'test' };
      state = formReducer(state, {
        type: 'SET_WORK',
        index: 0,
        payload: work,
      });

      expect(state.selectedUsername).toBe('test');
      expect(state.selectedDestinations[0]).toBe(destination);
      expect(state.selectedBusinesses[0]).toBe(business);
      expect(state.selectedWorks[0]).toBe(work);
    });
  });
});
