export interface WorkStatus {
  _id: string;
  isDaily: number;
  createdAt: Date;
  isOwner: boolean;
  car: string;
  startDate: Date;
  endDate: Date;
  username: string;
  destination: string;
  business: string;
  work: string;
  specificDate: Date;
  remarks: string;
}
