import { model, Schema } from "mongoose";

interface IDrivingRecord {
  username: string;
  car: string;
  drivingDestination: string;
  startTime: string;
  endTime: string;
  startKM: number;
  endKM: number;
  totalKM: number;
  fuelCost: number;
  toll: number;
}

const drivingRecordSchema = new Schema<IDrivingRecord>(
  {
    username: { type: String, required: true },
    car: { type: String, required: true },
    drivingDestination: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    startKM: { type: Number, required: true },
    endKM: { type: Number, required: true },
    totalKM: { type: Number, required: true },
    fuelCost: { type: Number, required: true, default: 0 },
    toll: { type: Number, required: true, default: 0 },
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
