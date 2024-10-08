import mongoose, { ObjectId, Schema, model } from "mongoose";

interface IEmployeeInform {
  username: string;
  destination: string;
  business: string;
  work: string;
  car: string;
  isDaily: number;
  writerId: ObjectId;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
}
const employeeInformSchema = new Schema<IEmployeeInform>(
  {
    username: { type: String, required: true, trim: true },
    destination: { type: String, trim: true },
    business: { type: String, trim: true },
    work: { type: String, required: true, trim: true },
    isDaily: { type: Number, default: 0 },
    writerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startDate: { type: Date },
    endDate: { type: Date },
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
