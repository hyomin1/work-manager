import mongoose, { ObjectId, Schema, model } from 'mongoose';

interface IBusiness {
  business: string;
  destinationId: ObjectId;
}

const businessSchema = new Schema<IBusiness>({
  business: { type: String, required: true, trim: true },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
  },
});

const Business = model<IBusiness>('Business', businessSchema);
export default Business;
