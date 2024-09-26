import { Schema, model } from "mongoose";

interface ICar {
  car: string;
}

const carSchema = new Schema<ICar>({
  car: { type: String, required: true, trim: true },
});

const Car = model<ICar>("Car", carSchema);
export default Car;
