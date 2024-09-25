import { Schema, model } from "mongoose";

interface IWork {
  work: string;
}

const workSchema = new Schema<IWork>({
  work: { type: String, required: true, trim: true },
});

const Work = model<IWork>("Work", workSchema);
export default Work;
