export interface IDepartments {
  _id: string;
  department: string;
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
