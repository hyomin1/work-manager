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

export interface IInform {
  _id: string;
  username: string;
  destination: string;
  business: string;
  work: string;
  car: string;
  createdAt: Date;
  isOwner: boolean;
}
