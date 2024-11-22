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
  notification: string;
}
export interface IWorks {
  _id: string;
  work: string;
}

export interface IEtcNames {
  _id: string;
  etcName: string;
}

// 통계 방문지 검색 인터페이스스
export interface IDestStat {
  startDate: Date;
  endDate: Date;
  username: string;
  destination: string;
  business: string;
  work: string;
  specificDate: Date;
  remarks: string;
}

// 통계 이름 검색 인터페이스
export interface INameStat extends IDestStat {
  car: string;
}

export interface IInform extends INameStat {
  _id: string;
  isDaily: number;
  createdAt: Date;
  isOwner: boolean;
}

export interface FormData {
  date: Date;
  username: string;
  destination: string;
  business: string;
  work: string;
  car: string;
  startDate: Date;
  endDate: Date;
  remarks: string;
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

// 유저 인터페이스
export interface Users {
  _id: string;
  userId: string;
  isApproved: true;
  role: string;
}

// 차량 정비 내역

export interface ICarService {
  _id: string;
  date: Date;
  type: string;
  mileage: {
    base: number;
    next: number;
  };
  note: string;
}
