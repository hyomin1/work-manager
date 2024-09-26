import { model, Schema } from "mongoose";

interface IDrivingRecord {
  startKM: number;
  endKM: number;
}

const drivingRecordSchema = new Schema<IDrivingRecord>({
  startKM: { type: Number, required: true },
  endKM: { type: Number, required: true },
});

const DrivingRecord = model<IDrivingRecord>(
  "DrivingRecord",
  drivingRecordSchema
);
export default DrivingRecord;
