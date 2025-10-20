import { describe, expect, it } from 'vitest';
import { formReducer, initialFormState } from './vehicleLogReducer';

describe('vehicleLogReducer', () => {
  it('초기 상태가 올바르게 설정된다', () => {
    expect(initialFormState).toEqual({
      selectedDate: null,
      selectedUsernames: [],
      car: '',
      destination: '',
      startKM: 0,
      endKM: 0,
      totalKM: 0,
      fuelCost: 0,
      toll: 0,
      etc: { name: '', cost: 0 },
    });
  });

  describe('SET_DATE', () => {
    it('날짜를 설정해야 한다', () => {
      const date = new Date('2024-12-25');
      const newState = formReducer(initialFormState, {
        type: 'SET_DATE',
        payload: date,
      });
      expect(newState.selectedDate).toEqual(date);
    });

    it('날짜를 null로 설정할 수 있다', () => {
      const state = {
        ...initialFormState,
        selectedDate: new Date('2024-12-25'),
      };
      const newState = formReducer(state, {
        type: 'SET_DATE',
        payload: null,
      });
      expect(newState.selectedDate).toBeNull();
    });
  });

  describe('SET_USERNAMES', () => {
    it('특정 인덱스에 운전자 이름을 설정한다', () => {
      const state = { ...initialFormState, selectedUsernames: ['', ''] };
      const newState = formReducer(state, {
        type: 'SET_USERNAMES',
        index: 0,
        payload: '이효민',
      });
      expect(newState.selectedUsernames[0]).toBe('이효민');
      expect(newState.selectedUsernames[1]).toBe('');
    });

    it('마지막 운전자를 설정할 수 있다', () => {
      const state = { ...initialFormState, selectedUsernames: ['test', ''] };
      const newState = formReducer(state, {
        type: 'SET_USERNAMES',
        index: 1,
        payload: '이효민',
      });
      expect(newState.selectedUsernames).toEqual(['test', '이효민']);
      expect(newState.selectedUsernames[1]).toBe('이효민');
    });

    it('기존 배열을 변경하지 않고 새 배열을 생성한다', () => {
      const state = { ...initialFormState, selectedUsernames: ['', ''] };
      const originalUsernames = state.selectedUsernames;
      formReducer(state, {
        type: 'SET_USERNAMES',
        index: 0,
        payload: '이효민',
      });
      expect(originalUsernames).toEqual(['', '']);
    });
  });

  describe('SET_CAR', () => {
    it('차량을 설정 한다', () => {
      const payload = '1234';
      const newState = formReducer(initialFormState, {
        type: 'SET_CAR',
        payload,
      });
      expect(newState.car).toBe(payload);
    });
  });

  describe('SET_DESTINATION', () => {
    it('방문지를 설정 한다', () => {
      const payload = 'test';
      const newState = formReducer(initialFormState, {
        type: 'SET_DESTINATION',
        payload,
      });
      expect(newState.destination).toBe(payload);
    });
  });

  describe('SET_START_KM', () => {
    it('시작 km를 설정해야 한다', () => {
      const payload = 1000;
      const newState = formReducer(initialFormState, {
        type: 'SET_START_KM',
        payload,
      });

      expect(newState.startKM).toBe(payload);
    });
  });

  describe('SET_END_KM', () => {
    it('종료 km를 설정해야 한다', () => {
      const newState = formReducer(initialFormState, {
        type: 'SET_END_KM',
        payload: 1500,
      });

      expect(newState.endKM).toBe(1500);
    });
  });

  describe('SET_TOTAL_KM', () => {
    it('총 주행거리를 설정해야 한다', () => {
      const newState = formReducer(initialFormState, {
        type: 'SET_TOTAL_KM',
        payload: 500,
      });

      expect(newState.totalKM).toBe(500);
    });
  });

  describe('SET_FUEL_COST', () => {
    it('유류비를 설정 한다', () => {
      const payload = 50000;
      const newState = formReducer(initialFormState, {
        type: 'SET_FUEL_COST',
        payload,
      });

      expect(newState.fuelCost).toBe(payload);
    });
  });

  describe('SET_TOLL', () => {
    it('통행료를 설정 한다', () => {
      const payload = 5000;
      const newState = formReducer(initialFormState, {
        type: 'SET_TOLL',
        payload,
      });

      expect(newState.toll).toBe(payload);
    });
  });

  describe('SET_ETC', () => {
    it('기타 비용을 설정 한다', () => {
      const payload = { name: '주차비', cost: 3000 };
      const newState = formReducer(initialFormState, {
        type: 'SET_ETC',
        payload,
      });

      expect(newState.etc).toEqual(payload);
    });

    it('기타 비용을 업데이트 한다', () => {
      const payload = { name: '식비', cost: 10000 };
      const state = {
        ...initialFormState,
        etc: { name: '주차비', cost: 3000 },
      };
      const newState = formReducer(state, {
        type: 'SET_ETC',
        payload,
      });

      expect(newState.etc).toEqual(payload);
    });
  });

  describe('불변성 확인', () => {
    it('상태를 변경하지 않고 새로운 객체를 반환한다', () => {
      const state = { ...initialFormState };
      const newState = formReducer(state, {
        type: 'SET_CAR',
        payload: '1234',
      });
      expect(newState).not.toBe(state);
      expect(state.car).toBe('');
      expect(newState.car).toBe('1234');
    });
  });
  describe('연속 액션 처리', () => {
    it('여러 액션을 순차적으로 처리할 수 있어야 한다', () => {
      let state = initialFormState;

      state = formReducer(state, {
        type: 'SET_DATE',
        payload: new Date(2025, 10, 15),
      });

      state = formReducer(state, {
        type: 'SET_CAR',
        payload: '1234',
      });

      state = formReducer(state, {
        type: 'SET_DESTINATION',
        payload: '서울',
      });

      state = formReducer(state, {
        type: 'SET_START_KM',
        payload: 1000,
      });

      expect(state.selectedDate).toEqual(new Date(2025, 10, 15));
      expect(state.car).toBe('1234');
      expect(state.destination).toBe('서울');
      expect(state.startKM).toBe(1000);
    });
  });
});
