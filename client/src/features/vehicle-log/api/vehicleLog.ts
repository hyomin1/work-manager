import { api } from '../../../api';
import type { VehicleLogForm } from '../types/vehicleLog';

export async function addVehicleLog(form: VehicleLogForm) {
  const newForm = {
    ...form,
    driveDay: form.selectedDate,
    drivingDestination: form.destination,
  };
  return await api.post('/api/driving-inform/addInform', newForm);
}
