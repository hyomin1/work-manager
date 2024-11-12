import { model, Schema } from 'mongoose';

interface IUser {
  userId: string;
  password: string;
  role: string;
  createdAt: Date;
  isApproved: boolean;
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    isApproved: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>('User', userSchema);
export default User;
