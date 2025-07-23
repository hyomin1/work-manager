export interface DailyWorkForm {
  writingDate: Date | null;
  username: string;
  department: string;
  content: string;
  nextContent: string;
}

export interface DailyWork {
  _id: string;
  username: string;
  department: string;
  content: string;
  nextContent: string;
  writerId: string;
  createdAt: Date;
  isOwner: boolean;
}
