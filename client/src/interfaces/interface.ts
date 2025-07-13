export interface IDepartments {
  _id: string;
  department: string;
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
