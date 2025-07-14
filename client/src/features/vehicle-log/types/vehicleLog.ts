export interface Car {
  _id: string;
  car: string;
  notification: string;
}

export interface Etc {
  _id: string;
  etcName: string;
}

interface BaseVehicleLog {
  startKM: number;
  endKM: number;
  totalKM: number;
  fuelCost: number;
  toll: number;
  etc: { name: string; cost: number };
}

export interface VehicleLogForm extends BaseVehicleLog {
  selectedDate: Date | null;
  selectedUsernames: string[];
  car: string;
  destination: string;
}

export interface VehicleLog extends BaseVehicleLog {
  _id: string;
  isOwner: boolean;
  driveDay: Date;
  createdAt: Date;
  username: string[];
  drivingDestination: string;
}
export interface Cost {
  totalFuelCost: number;
  totalToll: number;
  totalEtcCost: number;
  totalDrivingKM: number;
  grandTotal: number;
}
