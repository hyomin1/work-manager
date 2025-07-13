import { api, calMonth, calYear } from '../../../api';
import type { VehicleLogForm } from '../types/vehicleLog';

export async function getCars() {
  const res = await api.get('/api/employee-inform/getCar');
  return res.data.allCars || [];
}

export async function getVehicleLogs(currentDate: Date, car: string) {
  const year = calYear(currentDate);
  const month = calMonth(currentDate);

  if (car) {
    const res = await api.get(
      `/api/driving-inform/getInform?year=${year}&month=${month}&car=${car}&date=${new Date()}`
    );
    return res.data.allDrivingInforms || [];
  }
  return [];
}

export const getNotification = async (carId: string) => {
  const res = await api.get(`/api/driving-inform/getNotification?id=${carId}`);
  return res.data || '';
};

export async function addVehicleLog(form: VehicleLogForm) {
  const {
    selectedDate,
    selectedUsernames,
    destination,
    car,
    startKM,
    endKM,
    totalKM,
    fuelCost,
    toll,
    etc,
  } = form;
  const newForm = {
    driveDay: selectedDate,
    username: selectedUsernames,
    drivingDestination: destination,
    car,
    startKM,
    endKM,
    totalKM,
    fuelCost,
    toll,
    etc,
  };
  return await api.post('/api/driving-inform/addInform', newForm);
}

export const checkCarSession = async () => {
  const res = await api.get('/auth/checkCarSession');
  console.log(res.data);
  return res.data;
};
