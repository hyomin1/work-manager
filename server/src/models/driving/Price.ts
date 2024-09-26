import { model, Schema } from "mongoose";

interface IPrice {
  fuel: number;
  toll: number;
}

const priceSchema = new Schema<IPrice>({
  fuel: { type: Number, required: true, default: 0 },
  toll: { type: Number, required: true, default: 0 },
});

const Price = model<IPrice>("Price", priceSchema);
export default Price;
