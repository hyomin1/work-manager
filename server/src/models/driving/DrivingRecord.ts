import mongoose, { model, ObjectId, Schema } from "mongoose";

interface IDrivingRecord {
  username: string;
  car: ObjectId;
  drivingDestination: string;
  startKM: number;
  endKM: number;
  totalKM: number;
  fuelCost: number;
  toll: number;
  etc: { name: String; cost: Number }; // etc. can be any additional fields you want to add.
}

const drivingRecordSchema = new Schema<IDrivingRecord>(
  {
    username: { type: String, required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    drivingDestination: { type: String, required: true },
    startKM: { type: Number, required: true },
    endKM: { type: Number, required: true },
    totalKM: { type: Number, required: true },
    fuelCost: { type: Number, required: true, default: 0 },
    toll: { type: Number, required: true, default: 0 },
    etc: { type: Object, default: { name: "", cost: 0 } },
  },
  {
    timestamps: true,
  }
);

const DrivingRecord = model<IDrivingRecord>(
  "DrivingRecord",
  drivingRecordSchema
);
export default DrivingRecord;
