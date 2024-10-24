export interface INames {
  _id: string;
  username: string;
}
export interface IDestinations {
  _id: string;
  destination: string;
}
export interface IBusinesses {
  _id: string;
  business: string;
  destinationId: string;
}
export interface ICars {
  _id: string;
  car: string;
}
export interface IWorks {
  _id: string;
  work: string;
}

export interface IEtcNames {
  _id: string;
  etcName: string;
}

export interface INameStat {
  startDate: Date;
  endDate: Date;
  username: string;
  destination: string;
  business: string;
  work: string;
  car: string;
  specificDate: Date;
}

export interface IDestStat {
  startDate: Date;
  endDate: Date;
  username: string;
  destination: string;
  business: string;
  work: string;
}

export interface IInform extends INameStat {
  _id: string;
  createdAt: Date;
  isOwner: boolean;
}
export interface IDrivingInform {
  _id: string;
  isOwner: boolean;
  driveDay: Date;
  createdAt: Date;
  username: string;
  drivingDestination: string;
  startKM: number;
  endKM: number;
  totalKM: number;
  fuelCost: number;
  toll: number;
  etc: { name: string; cost: number };
}
