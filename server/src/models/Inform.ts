import { Schema, model } from "mongoose";

interface IInform {
  username: string;
  destination: string;
  business: string;
  state: string;
  car: string;
  createdAt?: Date;
}
const informSchema = new Schema<IInform>(
  {
    username: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    business: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    car: { type: String, required: true, trim: true },
  },
  {
    timestamps: true, // 이 옵션을 추가하면 createdAt과 updatedAt이 자동으로 추가됨
  }
);

const Inform = model<IInform>("Inform", informSchema);
export default Inform;
