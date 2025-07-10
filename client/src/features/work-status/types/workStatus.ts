export interface Username {
  //_id: string;
  username: string;
}
export interface Destination {
  _id: string;
  destination: string;
}
export interface Business {
  _id: string;
  business: string;
  destinationId: string;
}
export interface Car {
  _id: string;
  car: string;
  notification: string;
}
export interface Work {
  _id: string;
  work: string;
}

export interface FormValidation {
  selectedUsername: string;
  selectedDestinations: string[];
  selectedBusinesses: string[];
  selectedWorks: string[];
  selectedCar: string;
  isDaily: number;
  startDate: Date | null;
  endDate: Date | null;
}

export interface AddWork extends FormValidation {
  remarks: string;
}
