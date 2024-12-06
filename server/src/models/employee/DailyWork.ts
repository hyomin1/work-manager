import mongoose, { model, ObjectId, Schema } from 'mongoose';

interface IDailyWork {
  username: string;
  department: string;
  content: string;
  nextContent: string;
  writerId: ObjectId;
}

const dailyWorkSchema = new Schema<IDailyWork>(
  {
    username: { type: String, required: true },
    department: { type: String, required: true },
    content: { type: String, required: true },
    nextContent: { type: String, required: true },
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

const DailyWork = model<IDailyWork>('DailyWork', dailyWorkSchema);

export default DailyWork;
