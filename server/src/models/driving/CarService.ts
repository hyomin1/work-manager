import mongoose, { model, ObjectId, Schema } from 'mongoose';

interface ICarService {
  carId: ObjectId;
  date: Date;
  type: string;
  mileage: {
    base: number;
    next?: number;
  };

  note: string;
}

const carServiceSchema = new Schema<ICarService>(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    mileage: {
      base: { type: Number, required: true },
      next: { type: Number },
    },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

const CarService = model<ICarService>('CarService', carServiceSchema);

export default CarService;
