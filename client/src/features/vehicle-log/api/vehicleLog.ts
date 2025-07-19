import { api, calMonth, calYear } from '../../../api';
import type {
  MaintenanceBase,
  VehicleLog,
  VehicleLogForm,
} from '../types/vehicleLog';

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
  const { selectedDate, selectedUsernames, destination } = form;
  const newForm = {
    ...form,
    driveDay: selectedDate,
    username: selectedUsernames,
    drivingDestination: destination,
  };
  return await api.post('/api/driving-inform/addInform', newForm);
}

export async function editVehicleLog(form: VehicleLog) {
  return await api.put('/api/driving-inform/editInform', form);
}

export async function deleteVehicleLog(id: string) {
  return await api.delete(`/api/driving-inform/removeInform/${id}`);
}

export async function addVehicleNotice(carId: string, notification: string) {
  return await api.post('/api/driving-inform/addNotification', {
    id: carId,
    notification,
  });
}

export async function deleteVehicleNotice(carId: string) {
  return await api.delete(`/api/driving-inform/removeNotification/${carId}`);
}

// 차량 정비 내역
export async function getCarMaintenances(carId: string) {
  const res = await api.get(`/api/driving-inform/getServices?carId=${carId}`);
  return res.data.services || [];
}

export async function addVehicleMaintenance(
  carId: string,
  form: MaintenanceBase
) {
  return await api.post('/api/driving-inform/addService', {
    carId,
    ...form,
  });
}

export async function deleteVehicleMaintenance(carId: string) {
  return await api.delete(`/api/driving-inform/removeService/${carId}`);
}

export async function editVehicleMaintenance(form: MaintenanceBase) {
  return await api.put('/api/driving-inform/editService', form);
}

export const checkCarSession = async () => {
  const { data } = await api.get('/auth/checkCarSession');
  return data;
};
