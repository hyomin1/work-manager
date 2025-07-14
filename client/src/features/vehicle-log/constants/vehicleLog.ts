import type { VehicleLog } from '../types/vehicleLog';

export const FIELDS: {
  key: keyof VehicleLog;
  label: string;
}[] = [
  { key: 'drivingDestination', label: '행선지' },
  { key: 'startKM', label: '출발(Km)' },
  { key: 'endKM', label: '도착(Km)' },
  { key: 'fuelCost', label: '주유비' },
  { key: 'toll', label: '하이패스' },
];
