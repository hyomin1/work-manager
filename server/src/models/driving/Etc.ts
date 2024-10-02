import { model, Schema } from "mongoose";

interface IEtc {
  etcName: string;
}

const etcSchema = new Schema<IEtc>({
  etcName: { type: String, required: true, trim: true },
});

const Etc = model<IEtc>("Etc", etcSchema);
export default Etc;
