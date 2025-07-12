export interface IDepartments {
  _id: string;
  department: string;
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
  role: number;
}

// 차량 정비 내역

export interface ICarServiceBase {
  _id: string;
  date: Date;
  type: string;
  mileage: {
    base: string;
    next: string;
  };
  note: string;
}

export interface ICarService extends ICarServiceBase {
  isOwner: boolean;
}

// 일일 업무 현황
export interface IDailyWork {
  _id: string;
  username: string;
  department: string;
  content: string;
  writerId: string;
  createdAt: Date;
  isOwner: boolean;
}
