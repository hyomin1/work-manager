import type { VehicleLogForm } from '../types/vehicleLog';

type FormState = VehicleLogForm;

export const initialFormState: FormState = {
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
};

export type FormAction =
  | { type: 'SET_DATE'; payload: Date | null }
  | { type: 'SET_USERNAMES'; payload: string; index: number }
  | { type: 'SET_CAR'; payload: string }
  | { type: 'SET_DESTINATION'; payload: string }
  | { type: 'SET_START_KM'; payload: number }
  | { type: 'SET_END_KM'; payload: number }
  | { type: 'SET_TOTAL_KM'; payload: number }
  | { type: 'SET_FUEL_COST'; payload: number }
  | { type: 'SET_TOLL'; payload: number }
  | { type: 'SET_ETC'; payload: { name: string; cost: number } };

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_DATE': {
      return { ...state, selectedDate: action.payload };
    }
    case 'SET_USERNAMES': {
      const newUsernames = [...state.selectedUsernames];
      newUsernames[action.index] = action.payload;
      return { ...state, selectedUsernames: newUsernames };
    }
    case 'SET_CAR': {
      return { ...state, car: action.payload };
    }
    case 'SET_DESTINATION': {
      return { ...state, destination: action.payload };
    }
    case 'SET_START_KM': {
      return { ...state, startKM: action.payload };
    }
    case 'SET_END_KM': {
      return { ...state, endKM: action.payload };
    }
    case 'SET_FUEL_COST': {
      return { ...state, fuelCost: action.payload };
    }
    case 'SET_TOTAL_KM': {
      return { ...state, totalKM: action.payload };
    }
    case 'SET_TOLL': {
      return { ...state, toll: action.payload };
    }
    case 'SET_ETC': {
      return {
        ...state,
        etc: action.payload,
      };
    }
    default:
      return state;
  }
}
