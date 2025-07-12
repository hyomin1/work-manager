export interface Etc {
  _id: string;
  etcName: string;
}

export interface VehicleLogForm {
  selectedDate: Date | null;
  selectedUsernames: string[];
  car: string;
  destination: string;
  startKM: number;
  endKM: number;
  totalKM: number;
  fuelCost: number;
  toll: number;
  etc: { name: string; cost: number };
}
