export type AdminType =
  | 'username'
  | 'destination'
  | 'business'
  | 'work'
  | 'car'
  | 'etcName'
  | 'department';

export interface AdminBody {
  username: { username: string };
  destination: { destination: string };
  business: { business: string; destinationId?: string };
  work: { work: string };
  car: { car: string };
  etcName: { etcName: string };
  department: { department: string };
}

export type AdminDataItem =
  | { _id: string; username: string }
  | { _id: string; destination: string }
  | { _id: string; business: string; destinationId?: string }
  | { _id: string; work: string }
  | { _id: string; car: string }
  | { _id: string; etcName: string }
  | { _id: string; department: string };

export interface Department {
  _id: string;
  department: string;
}
