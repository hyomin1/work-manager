import { Schema, model } from "mongoose";

interface IEmployeeInform {
  username: string;
  destination: string;
  business: string;
  work: string;
  car: string;
  isDaily: number;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
}
const employeeInformSchema = new Schema<IEmployeeInform>(
  {
    username: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    business: { type: String, required: true, trim: true },
    work: { type: String, required: true, trim: true },
    isDaily: { type: Number, default: 0 },
    startDate: { type: Date, default: new Date() },
    endDate: { type: Date, default: new Date() },
    car: { type: String, trim: true },
  },
  {
    timestamps: true, // 이 옵션을 추가하면 createdAt과 updatedAt이 자동으로 추가됨
  }
);

const EmployeeInform = model<IEmployeeInform>(
  "EmployeeInform",
  employeeInformSchema
);
export default EmployeeInform;
