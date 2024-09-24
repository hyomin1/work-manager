import { Schema, model } from "mongoose";

interface IBusiness {
  business: string;
}

const businessSchema = new Schema<IBusiness>({
  business: { type: String, required: true, trim: true },
});

const Business = model<IBusiness>("Business", businessSchema);
export default Business;
