export interface IDepartments {
  _id: string;
  department: string;
}

// 유저 인터페이스

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
