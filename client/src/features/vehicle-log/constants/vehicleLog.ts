import { Pencil, Settings, Sheet, Users, Wrench } from 'lucide-react';
import type { VehicleLog } from '../types/vehicleLog';
import { ROUTES } from '../../../constants/constant';

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

export const NAV_ITEMS = [
  {
    icon: Pencil,
    label: '입력',
    route: ROUTES.VEHICLES.CREATE,
    variant: 'blue',
    onClickType: 'user',
    condition: () => true,
  },
  {
    icon: Users,
    label: '근무',
    route: ROUTES.WORKS.LIST,
    variant: 'green',
    onClickType: 'user',
    condition: () => true,
  },
  {
    icon: Sheet,
    label: '엑셀',
    variant: 'green',
    onClickType: 'excel',
    condition: (carId: string) => !!carId,
  },
  {
    icon: Wrench,
    label: '점검',
    route: ROUTES.VEHICLES.SERVICE,
    variant: 'blue',
    onClickType: 'user',
    condition: () => true,
  },
  {
    icon: Settings,
    label: '설정',
    variant: 'green',
    onClickType: 'admin',
    condition: () => true,
  },
] as const;

export const MAINTENANCE_HEADER = [
  '점검 일자',
  '점검 유형',
  '최근 점검(km)',
  '다음 점검(km)',
  '비고',
  '',
];

export const EXCEL_HEADER = [
  '날짜',
  '운전자',
  '행선지',
  '출발(km)',
  '도착(km)',
  '주행거리',
  '주유비',
  '하이패스',
  '기타',
  '합계',
];
