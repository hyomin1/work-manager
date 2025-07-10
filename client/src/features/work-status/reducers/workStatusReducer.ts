import type { Business, Destination, Work } from '../types/workStatus';

export interface FormState {
  selectedUsername: string;
  selectedDestinations: Array<Destination | null>;
  selectedBusinesses: Array<Business | null>;
  selectedWorks: Array<Work | null>;
  inputDestination: string;
  inputBusiness: string;
  inputWork: string;
  selectedCar: string;
  isDaily: number;
  startDate: Date | null;
  endDate: Date | null;
  remarks: string;
}

export const initialFormState: FormState = {
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
};

export type FormAction =
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'SET_DESTINATION'; index: number; payload: Destination | null }
  | { type: 'SET_BUSINESS'; index: number; payload: Business | null }
  | { type: 'SET_WORK'; index: number; payload: Work | null }
  | { type: 'SET_INPUT_DESTINATION'; payload: string }
  | { type: 'SET_INPUT_BUSINESS'; payload: string }
  | { type: 'SET_INPUT_WORK'; payload: string }
  | { type: 'SET_CAR'; payload: string }
  | { type: 'SET_IS_DAILY'; payload: number }
  | { type: 'SET_DATE'; payload: { start: Date | null; end: Date | null } }
  | { type: 'SET_START_DATE'; payload: Date | null }
  | { type: 'SET_END_DATE'; payload: Date | null }
  | { type: 'SET_REMARKS'; payload: string }
  | { type: 'RESET' };

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, selectedUsername: action.payload };
    case 'SET_DESTINATION': {
      const newDestinations = [...state.selectedDestinations];
      newDestinations[action.index] = action.payload;
      // 해당 방문지 변경 시 사업명 초기화
      const newBusinesses = [...state.selectedBusinesses];
      newBusinesses[action.index] = null;
      return {
        ...state,
        selectedDestinations: newDestinations,
        selectedBusinesses: newBusinesses,
      };
    }
    case 'SET_INPUT_DESTINATION':
      return { ...state, inputDestination: action.payload };
    case 'SET_BUSINESS': {
      const newBusinesses = [...state.selectedBusinesses];
      newBusinesses[action.index] = action.payload;
      return { ...state, selectedBusinesses: newBusinesses };
    }
    case 'SET_INPUT_BUSINESS': {
      return { ...state, inputBusiness: action.payload };
    }

    case 'SET_WORK': {
      const newWorks = [...state.selectedWorks];
      newWorks[action.index] = action.payload;
      return { ...state, selectedWorks: newWorks };
    }
    case 'SET_INPUT_WORK': {
      return { ...state, inputWork: action.payload };
    }
    case 'SET_CAR': {
      return { ...state, selectedCar: action.payload };
    }
    case 'SET_IS_DAILY':
      return {
        ...state,
        isDaily: action.payload,
        startDate: action.payload === 1 ? new Date() : state.startDate,
        endDate: action.payload === 1 ? new Date() : state.endDate,
      };
    case 'SET_DATE':
      return {
        ...state,
        startDate: action.payload.start,
        endDate: action.payload.end,
      };
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_REMARKS':
      return { ...state, remarks: action.payload };
    case 'RESET':
      return initialFormState;
    default:
      return state;
  }
}
