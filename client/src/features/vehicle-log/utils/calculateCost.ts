import type { VehicleLog } from '../types/vehicleLog';

export function calculateCost(vehicleLogs: VehicleLog[] | undefined) {
  if (!vehicleLogs)
    return {
      totalFuelCost: 0,
      totalToll: 0,
      totalEtcCost: 0,
      totalDrivingKM: 0,
      grandTotal: 0,
    };
  const totalFuelCost =
    vehicleLogs?.reduce((acc, item) => acc + item.fuelCost, 0) || 0;
  const totalToll = vehicleLogs?.reduce((acc, item) => acc + item.toll, 0) || 0;
  const totalEtcCost =
    vehicleLogs?.reduce((acc, item) => acc + item.etc.cost, 0) || 0;
  const totalDrivingKM =
    vehicleLogs?.reduce((acc, item) => acc + item.totalKM, 0) || 0;
  const grandTotal = totalFuelCost + totalToll + totalEtcCost;

  return { totalFuelCost, totalToll, totalEtcCost, totalDrivingKM, grandTotal };
}
