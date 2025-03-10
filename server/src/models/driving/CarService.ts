import mongoose, { model, ObjectId, Schema } from 'mongoose';

interface ICarService {
  carId: ObjectId;
  date: Date;
  type: string;
  mileage: {
    base: string;
    next?: string;
  };

  note: string;
  writerId: ObjectId;
}

const carServiceSchema = new Schema<ICarService>(
  {
    carId: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    mileage: {
      base: { type: String, required: true },
      next: { type: String },
    },
    note: { type: String },
    writerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CarService = model<ICarService>('CarService', carServiceSchema);

export default CarService;
