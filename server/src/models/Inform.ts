import { Schema, model } from "mongoose";

interface IInform {
  username: string;
  destination: string;
  business: string;
  state: string;
  car: string;
  isDaily: number;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
}
const informSchema = new Schema<IInform>(
  {
    username: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    business: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    isDaily: { type: Number, default: 0 },
    startDate: { type: Date, default: new Date() },
    endDate: { type: Date, default: new Date() },
    car: { type: String, trim: true },
  },
  {
    timestamps: true, // 이 옵션을 추가하면 createdAt과 updatedAt이 자동으로 추가됨
  }
);

const Inform = model<IInform>("Inform", informSchema);
export default Inform;
