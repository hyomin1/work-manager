import { Schema, model } from "mongoose";

interface IName {
  username: string;
}

const nameSchema = new Schema<IName>({
  username: { type: String, required: true, trim: true },
});

const Name = model<IName>("Name", nameSchema);
export default Name;
