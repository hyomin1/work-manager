import type { VehicleLogForm } from '../types/vehicleLog';

export function validateForm(form: VehicleLogForm & { privateCarId: string }) {
  const {
    selectedDate,
    selectedUsernames,
    car,
    destination,
    privateCarId,
    startKM,
    endKM,
    totalKM,
    etc,
  } = form;

  if (!selectedDate) {
    return '날짜를 선택해주세요';
  }

  if (selectedUsernames.length === 0) {
    return '운전자를 선택해주세요';
  }
  if (!car) {
    return '차량을 선택해주세요';
  }
  if (!destination) {
    return '행선지를 입력해주세요';
  }

  if (car !== privateCarId && (!startKM || !endKM)) {
    return '주행거리를 입력해주세요.';
  }
  if (car === privateCarId && !totalKM) {
    return '주행거리를 입력해주세요.';
  }
  if (etc.name && !etc.cost) {
    return '비용을 입력해주세요.';
  }
  if (etc.cost && !etc.name) {
    return '항목을 선택해주세요.';
  }
  return null;
}

export function formatUsernames(
  selectedUsernames: VehicleLogForm['selectedUsernames']
) {
  const usernames = selectedUsernames.filter(Boolean);
  return usernames.join(', ');
}
